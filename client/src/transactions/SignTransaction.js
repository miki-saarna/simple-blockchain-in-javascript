import CalculateHash from "../computations/CalculateHash";

function SignTransaction(transactionFormData, setTransaction, signingKey ) {
    
    const { fromAddress, toAddress, amount } = transactionFormData;
    // miner transaction is valid
    if (fromAddress === null) return true;

    if (signingKey.getPublic('hex') !== fromAddress) {
        throw new Error('You cannot sign transactions for other wallets!');
    }

    // sign transaction hash with the private key
    const hash = CalculateHash(fromAddress, toAddress, amount);
    const sign = signingKey.sign(hash, 'base64');
    // convert the signature to the DER format
    const signature = sign.toDER('hex');

    setTransaction({
        ...transactionFormData,
        siganture: signature,
    })
    
    console.log("signature: " + signature);
    return signature
}

export default SignTransaction;
