import { CalculateHashForTransaction } from '../computations/CalculateHash';
import Elliptic from 'elliptic';
const ec = new Elliptic.ec('secp256k1');

function TransactionValidator({timestamp, fromAddress, toAddress, amount}, signature) {
    // the miner transaction is valid
    // below line no longer needed...
    if (fromAddress === null) return true;

    if (!signature) {
        // if (!signature || signature.length === 0) {
        throw new Error('No signature in this transaction');
    }

    // transcode fromAddress to get the public key (this process is reversible, as it is just a format conversion process)
    const publicKey = ec.keyFromPublic(fromAddress, 'hex');
    // use the public key to verify if the signature is correct, or more specifically if the transaction was actually initiated
    return publicKey.verify(CalculateHashForTransaction(timestamp, fromAddress, toAddress, amount), signature);
}

export default TransactionValidator;