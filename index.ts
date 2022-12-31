import { ethers } from 'ethers';
import config from './utils/config';
import fn from './utils/fn';


async function main() {
    const ACCOUNT_MNEMONIC = config['account']['mnemonic'];
    const ACCOUNT_INDEX = config['account']['index'];
    const passphrase = await fn.askForPassphrase();
    const account = ethers.utils.HDNode.fromMnemonic(ACCOUNT_MNEMONIC, passphrase).derivePath(`m/44'/60'/0'/0/${ACCOUNT_INDEX}`);
    const wallet = new ethers.Wallet(account.privateKey);

    console.log();
    console.log('---');
    console.log(`--- Signer: ${wallet.address}`);
    console.log('---');
    console.log();

    const messageHash = ethers.utils.solidityKeccak256(
        [
            'address',
            'uint256',
        ],
        [
            '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
            '0',
        ]
    );

    const ethSignedMessageHash = fn.toEthSignedMessageHash(messageHash);
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));

    console.log('--- messageHash ---');
    console.log(messageHash);
    console.log();
    console.log('--- ethSignedMessageHash ---');
    console.log(ethSignedMessageHash);
    console.log();
    console.log('--- signature ---');
    console.log(signature);
    console.log();
}

main();
