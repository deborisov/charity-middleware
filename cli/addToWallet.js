/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 *  SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const wallet = new FileSystemWallet('../wallet');

//MABY NEED FIX
const fixtures = path.resolve(__dirname, '../../k8s/config');

let config = {
    pathToUser:'/crypto-config/peerOrganizations/org2.com/users/Admin@org2.com/',
    pathToUserSignCert: '/msp/signcerts/Admin@org2.com-cert.pem',
    pathToUserPrivKey: '/msp/keystore/priv_sk',
    identityLabel: 'Admin@org2.com'
  }
  

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(fixtures, config.pathToUser);
        const cert = fs.readFileSync(path.join(credPath, config.pathToUserSignCert)).toString();
        const key = fs.readFileSync(path.join(credPath, config.pathToUserPrivKey)).toString();

        // Load credentials into wallet
        const identityLabel = config.identityLabel;
        const identity = X509WalletMixin.createIdentity('Org2MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});
