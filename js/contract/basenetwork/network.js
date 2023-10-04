$.BREEZY_NETWORK = function() {};
$.BREEZY_NETWORK.prototype = (function() {
    const network = {
        Sepolia: {
            chainId: 11155111,
            chainName: "Sepolia",
            currencySymbol: "SepoliaETH",
            rpcList: ['https://eth-sepolia.g.alchemy.com/v2/Dy4zBBd1RgIFZIn16MxMmTn0zP-l5FjT'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/tx/']
        },
        Base: {
            chainId: 8453,
            chainName: "Base",
            currencySymbol: "ETH",
            rpcList: ['https://base-mainnet.g.alchemy.com/v2/RiRR61_VDAl_rWcpolrbp_MKJiq0q_6j'],
            blockExplorerUrls: ['https://basescan.org/tx/']
        },
    };

    return {
        GetNetworkByNetworkName(chainName) {
            return network[chainName];
        },

        GetChainIdByNetworkNameToRead(chainName) {
            return network[chainName].chainId;
        },

        GetNetworkByChainId(chainId) {
            let lengthNetworkConfig = Object.keys(network).length;
            for (let i = 0; i < lengthNetworkConfig; i++) {
                if (chainId == Object.values(network)[i].chainId) {
                    return (Object.values(network)[i]);
                }
            }
            throw new Error(`ChainId ${chainId} is not config`);
        },

        CheckConnected() {
            return web3.currentProvider.selectedAddress !== null ? true : false;
        },

        async SwichNetworkByChainId(chainId) {
            let network = this.GetNetworkByChainId(chainId);
            await this.SwichNetwork(network);
        },

        async SwichNetworkByChainName(chainName) {
            let network = this.GetNetworkByNetworkName(chainName);
            await this.SwichNetwork(network);
        },

        async SwichNetwork(selectNetwork) {

            let checkNetwork = await this.IsValidNode(selectNetwork.chainId);
            if (checkNetwork == false) {
                let provider = window.ethereum;
                let chainIdToHex = this.ConvertChainIdToHex(selectNetwork.chainId);

                let networkChain = [{
                    "chainId": chainIdToHex,
                    "chainName": selectNetwork.chainName,
                    "nativeCurrency": {
                        "name": 'ETH',
                        "symbol": 'ETH',
                        "decimals": 18
                    },
                    "rpcUrls": selectNetwork.rpcList,
                    "blockExplorerUrls": selectNetwork.blockExplorerUrls,
                }];

                try {
                    await provider.request({
                        "method": 'wallet_addEthereumChain',
                        "params": networkChain,
                    });
                } catch (error) {
                    await web3.currentProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: chainId }],
                    });
                }
            }
        },

        async IsValidNode(chainIdNetworkDeposit) {
            let self = this;
            let chainIdActive = await self.GetChainIdToMain();
            if (chainIdActive != chainIdNetworkDeposit) {
                return false;
            }
            return true;
        },

        async GetChainIdToMain() {
            let chainId = await web3.currentProvider.request({ method: 'eth_chainId' });
            
            if (`${chainId.charAt(0)}${chainId.charAt(1)}` == '0x') {
                return parseInt(chainId.slice(2), 16);
            } else {
                return parseInt(chainId, 16);
            }
        },

        ConvertChainIdToHex(chainId) {
            return `0x${parseInt(chainId, 10).toString(16)}`;
        },

        GetblockExplorerUrlsNetworkName(chainName) {
            return network[chainName].blockExplorerUrls;
        },

        GetblockExplorerUrlsNetworkId(chainId) {
            let network = this.GetNetworkByChainId(chainId);
            return network.blockExplorerUrls;
        },
    }
}(jQuery))