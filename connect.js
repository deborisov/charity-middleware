'use strict'

module.exports = function (config){
    const fs = require('fs');
    const yaml = require('js-yaml');
    const { Gateway, FileSystemWallet, DefaultEventHandlerStrategies, Transaction, Wallets  } = require('fabric-network');

    return new Promise (async (resolve, reject) => {
        let connectionProfile = yaml.safeLoad(fs.readFileSync(config.ccpPath, 'utf8'));
        const wallet = new FileSystemWallet(config.walletPath);
 
        const gateway = new Gateway();
        let connectionOptions = {
          identity: config.userName,
          wallet: wallet,
          discovery: { enabled: false, asLocalhost: true }
          /*** Uncomment lines below to disable commit listener on submit ****/
          // , eventHandlerOptions: {
          //     strategy: null
          //} 
      }
      await gateway.connect(connectionProfile, connectionOptions);
      const network = await gateway.getNetwork(config.channel);
      let result = {
        gateway: gateway,
        network: network
      }
      resolve(result); 
    });
}