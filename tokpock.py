import json
import os
from typing import Final, Literal

from beaker import *
from pyteal import *

PasswordHash = abi.StaticBytes[Literal[32]]


class Tokpock(Application):
    # Global Bytes (4)
    contract_family: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        static=True,
        default=Bytes("Tokpock-algo 1.0.0"),
    )
    manager: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        default=Bytes(""),
    )
    account_name: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        default=Bytes(""),
    )
    password_hash: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        default=Bytes(""),
    )

    # Global Ints (1)
    micro_algos_amt: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )
    unknown_calls: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
    )

    @create
    def create(self):
        return self.initialize_application_state()

    @internal(TealType.none)
    def pay(self, receiver: Expr):
        return InnerTxnBuilder.Execute(
            {
                TxnField.type_enum: TxnType.Payment,
                TxnField.close_remainder_to: receiver,
                TxnField.receiver: receiver,
            }
        )

    @external(authorize=Authorize.only(Global.creator_address()))
    def init_wallet(
        self,
        payment: abi.PaymentTransaction,
        manager: abi.Address,
        account_name: abi.String,
        password_hash: PasswordHash,
    ):

        payment = payment.get()

        return Seq(
            # Verify payment txn
            Assert(payment.receiver() == Global.current_application_address()),
            Assert(payment.amount() > Int(200_000)),
            # Set global state
            self.manager.set(manager.get()),
            self.password_hash.set(password_hash.get()),
            self.account_name.set(account_name.get()),
            self.micro_algos_amt.set(payment.amount() - Global.min_txn_fee()),
        )

    @external(authorize=Authorize.only(Global.creator_address()))
    def set_manager(self, new_manager: abi.Address):
        return self.manager.set(new_manager.get())

    @external(authorize=Authorize.only(manager))
    def claim_funds(self, password: abi.String, account: abi.Account):

        return Seq(
            Assert(self.password_hash.get() == Sha512_256(password.get())),
            self.pay(account.address()),
        )


if __name__ == "__main__":
    app = Tokpock()

    if os.path.exists("artifacts/approval.teal"):
        os.remove("artifacts/approval.teal")

    if os.path.exists("artifacts/approval.teal"):
        os.remove("artifacts/clear.teal")

    if os.path.exists("artifacts/abi.json"):
        os.remove("artifacts/abi.json")

    if os.path.exists("artifacts/app_spec.json"):
        os.remove("artifacts/app_spec.json")

    with open("artifacts/approval.teal", "w") as f:
        f.write(app.approval_program)

    with open("artifacts/clear.teal", "w") as f:
        f.write(app.clear_program)

    with open("artifacts/abi.json", "w") as f:
        f.write(json.dumps(app.contract.dictify(), indent=4))

    with open("artifacts/app_spec.json", "w") as f:
        f.write(json.dumps(app.application_spec(), indent=4))
