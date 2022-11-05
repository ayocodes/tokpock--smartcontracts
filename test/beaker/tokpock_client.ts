import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Tokpock extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { contract_family: { type: bkr.AVMType.bytes, key: "contract_family", desc: "", static: false }, manager: { type: bkr.AVMType.bytes, key: "manager", desc: "", static: false }, account_name: { type: bkr.AVMType.bytes, key: "account_name", desc: "", static: false }, password_hash: { type: bkr.AVMType.bytes, key: "password_hash", desc: "", static: false }, micro_algos_amt: { type: bkr.AVMType.uint64, key: "micro_algos_amt", desc: "", static: false }, unknown_calls: { type: bkr.AVMType.uint64, key: "unknown_calls", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NmQ2MTZlNjE2NzY1NzIgMHggMHg3MDYxNzM3Mzc3NmY3MjY0NWY2ODYxNzM2OCAweDYzNmY2ZTc0NzI2MTYzNzQ1ZjY2NjE2ZDY5NmM3OSAweDYxNjM2MzZmNzU2ZTc0NWY2ZTYxNmQ2NSAweDZkNjk2MzcyNmY1ZjYxNmM2NzZmNzM1ZjYxNmQ3NAp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGU0Zjg1NDZkIC8vICJpbml0X3dhbGxldChwYXksYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0pdm9pZCIKPT0KYm56IG1haW5fbDcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg5NjY3ZDZkZSAvLyAic2V0X21hbmFnZXIoYWRkcmVzcyl2b2lkIgo9PQpibnogbWFpbl9sNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGI4OWNlOWJlIC8vICJjbGFpbV9mdW5kcyhzdHJpbmcsYWNjb3VudCl2b2lkIgo9PQpibnogbWFpbl9sNQplcnIKbWFpbl9sNToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSA2CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3CmxvYWQgNgpsb2FkIDcKY2FsbHN1YiBjbGFpbWZ1bmRzXzcKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDY6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKY2FsbHN1YiBzZXRtYW5hZ2VyXzYKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDc6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKc3RvcmUgMwp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCnN0b3JlIDQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpzdG9yZSA1CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMgpsb2FkIDIKZ3R4bnMgVHlwZUVudW0KaW50Y18xIC8vIHBheQo9PQphc3NlcnQKbG9hZCAyCmxvYWQgMwpsb2FkIDQKbG9hZCA1CmNhbGxzdWIgaW5pdHdhbGxldF81CmludGNfMSAvLyAxCnJldHVybgptYWluX2w4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxMAplcnIKbWFpbl9sMTA6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgppbnRjXzAgLy8gMApieXRlY18zIC8vICJjb250cmFjdF9mYW1pbHkiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDEKc3RvcmUgMApsb2FkIDEKIQphc3NlcnQKYnl0ZWNfMyAvLyAiY29udHJhY3RfZmFtaWx5IgpwdXNoYnl0ZXMgMHg1NDZmNmI3MDZmNjM2YjJkNjE2YzY3NmYyMDMxMmUzMDJlMzAgLy8gIlRva3BvY2stYWxnbyAxLjAuMCIKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMCAvLyAibWFuYWdlciIKYnl0ZWNfMSAvLyAiIgphcHBfZ2xvYmFsX3B1dApieXRlYyA0IC8vICJhY2NvdW50X25hbWUiCmJ5dGVjXzEgLy8gIiIKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAicGFzc3dvcmRfaGFzaCIKYnl0ZWNfMSAvLyAiIgphcHBfZ2xvYmFsX3B1dApieXRlYyA1IC8vICJtaWNyb19hbGdvc19hbXQiCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CnB1c2hieXRlcyAweDc1NmU2YjZlNmY3NzZlNWY2MzYxNmM2YzczIC8vICJ1bmtub3duX2NhbGxzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8xOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzM6CmJ5dGVjXzAgLy8gIm1hbmFnZXIiCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gcGF5CnBheV80OgpzdG9yZSAxNQppdHhuX2JlZ2luCmludGNfMSAvLyBwYXkKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDE1Cml0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwpsb2FkIDE1Cml0eG5fZmllbGQgUmVjZWl2ZXIKaXR4bl9zdWJtaXQKcmV0c3ViCgovLyBpbml0X3dhbGxldAppbml0d2FsbGV0XzU6CnN0b3JlIDExCnN0b3JlIDEwCnN0b3JlIDkKc3RvcmUgOAp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmxvYWQgOApndHhucyBSZWNlaXZlcgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQphc3NlcnQKbG9hZCA4Cmd0eG5zIEFtb3VudApwdXNoaW50IDIwMDAwMCAvLyAyMDAwMDAKPgphc3NlcnQKYnl0ZWNfMCAvLyAibWFuYWdlciIKbG9hZCA5CmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gInBhc3N3b3JkX2hhc2giCmxvYWQgMTEKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNCAvLyAiYWNjb3VudF9uYW1lIgpsb2FkIDEwCmV4dHJhY3QgMiAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjIDUgLy8gIm1pY3JvX2FsZ29zX2FtdCIKbG9hZCA4Cmd0eG5zIEFtb3VudApnbG9iYWwgTWluVHhuRmVlCi0KYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBzZXRfbWFuYWdlcgpzZXRtYW5hZ2VyXzY6CnN0b3JlIDEyCnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8yCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWNfMCAvLyAibWFuYWdlciIKbG9hZCAxMgphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIGNsYWltX2Z1bmRzCmNsYWltZnVuZHNfNzoKc3RvcmUgMTQKc3RvcmUgMTMKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzMKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18yIC8vICJwYXNzd29yZF9oYXNoIgphcHBfZ2xvYmFsX2dldApsb2FkIDEzCmV4dHJhY3QgMiAwCnNoYTUxMl8yNTYKPT0KYXNzZXJ0CmxvYWQgMTQKdHhuYXMgQWNjb3VudHMKY2FsbHN1YiBwYXlfNApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "init_wallet", desc: "", args: [{ type: "pay", name: "payment", desc: "" }, { type: "address", name: "manager", desc: "" }, { type: "string", name: "account_name", desc: "" }, { type: "byte[32]", name: "password_hash", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_manager", desc: "", args: [{ type: "address", name: "new_manager", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "claim_funds", desc: "", args: [{ type: "string", name: "password", desc: "" }, { type: "account", name: "account", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async init_wallet(args: {
        payment: algosdk.TransactionWithSigner | algosdk.Transaction;
        manager: string;
        account_name: string;
        password_hash: Uint8Array;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.init_wallet({ payment: args.payment, manager: args.manager, account_name: args.account_name, password_hash: args.password_hash }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async set_manager(args: {
        new_manager: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.set_manager({ new_manager: args.new_manager }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async claim_funds(args: {
        password: string;
        account: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.claim_funds({ password: args.password, account: args.account }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        init_wallet: async (args: {
            payment: algosdk.TransactionWithSigner | algosdk.Transaction;
            manager: string;
            account_name: string;
            password_hash: Uint8Array;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "init_wallet"), { payment: args.payment, manager: args.manager, account_name: args.account_name, password_hash: args.password_hash }, txnParams, atc);
        },
        set_manager: async (args: {
            new_manager: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_manager"), { new_manager: args.new_manager }, txnParams, atc);
        },
        claim_funds: async (args: {
            password: string;
            account: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "claim_funds"), { password: args.password, account: args.account }, txnParams, atc);
        }
    };
}
