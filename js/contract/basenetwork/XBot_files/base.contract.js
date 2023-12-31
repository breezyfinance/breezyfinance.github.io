$.CONTRACTBASE = function() {
};
$.CONTRACTBASE.prototype = (function() {
        var setting = {
                chainId: 11155111
        };
        var _readContracts = {};
        return {
                init: function(options) {
                        if (typeof options === "undefined" || options.length < 1) {
                                return false;
                        }
                        setting = $.extend({}, setting, options);
                },
                getWeb3ToReadData(_chainId = null) {
                        _chainId = _chainId ? _chainId : setting.chainId;
                        let bscRpcEndPoint = 'https://arb-mainnet.g.alchemy.com/v2/eAgGBBNJUIxmvqkKrNl2-nhRB6Q_UJk-';
                        if(_chainId == 11155111) {
                                bscRpcEndPoint = 'https://eth-sepolia.g.alchemy.com/v2/Dy4zBBd1RgIFZIn16MxMmTn0zP-l5FjT';
                        }
                        if(_chainId == 8453) {
                                bscRpcEndPoint = 'https://base-mainnet.g.alchemy.com/v2/RiRR61_VDAl_rWcpolrbp_MKJiq0q_6j';  
                        }
                        return new Web3(bscRpcEndPoint);
                },
                getReadContract(_addr, _abi, _chainId = null) {
                        _chainId = _chainId ? _chainId : setting.chainId;
                        if (!_readContracts[_addr]) {
                                let _web3 = this.getWeb3ToReadData(_chainId);
                                _readContracts[_addr] = new _web3.eth.Contract(_abi, _addr);
                        }
                        return _readContracts[_addr];
                },
                getMainContract(_addr, _abi) {
                        let _provider = this.getProvider();
                        let _web3 = new Web3(_provider);
                        return new _web3.eth.Contract(_abi, _addr);
                },
                getProvider() {
                        return window.ethereum;
                }
        };
}(jQuery));
