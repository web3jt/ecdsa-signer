import prompts from 'prompts';
import { ethers } from 'ethers';

/**
 * Ask for a BIP39 passphrase
 * 
 * @return {string} passphrase
 * 
 * @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#from-mnemonic-to-seed
 */
async function askForPassphrase(): Promise<string> {
    while (true) {
        const response = await prompts({
            type: 'password',
            name: 'value',
            message: 'BIP39 Passphrase',
            validate: value => 8 > value.length ? 'Too short..' : true
        });

        if (response.value) {
            return response.value;
        }
    }
}

/**
 * Convert a message hash to an Ethereum Signed Message hash
 * 
 * @param {string} messageHash
 * @return {string}
 * 
 * @see https://eips.ethereum.org/EIPS/eip-191
 */
function toEthSignedMessageHash(messageHash: string): string {
    return ethers.utils.solidityKeccak256(
        ['string', 'bytes32'],
        ['\x19Ethereum Signed Message:\n32', messageHash]
    );
}

export default {
    askForPassphrase: askForPassphrase,
    toEthSignedMessageHash: toEthSignedMessageHash,

}
