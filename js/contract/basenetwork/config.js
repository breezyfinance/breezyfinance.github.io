$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        11155111: {
            breezySwapV1: {
                'basetrade': {
                    contract: '0xE265b1Eca719fd95294105019C6B14dCe698B4a4',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'base',
                    token: 'trade',
                },
                'tradebase': {
                    contract: '0xE265b1Eca719fd95294105019C6B14dCe698B4a4',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'base',
                    token: 'trade',
                },
            },
        },
    };
    var TOKENS = {
        11155111: { //mainnet arbitrum one
            'base': '0xA4aa8f1dC9dE6e4Cbd7B95c57bc59EF682995F70',
            'trade': '0x8d919d7c7EB395aEB8e3997DE3F385b264231781',
        },
    }
    var TOKENS_DECIMAL = {
        11155111: {
            'base': 8,
            'trade': 6,
        },
    };
    var PRICES = {
        11155111: {
            'base': 1807,
            'trade': 1
        },
    };
    return {
        init: function(options) {
            if (typeof options === "undefined" || options.length < 1) {
                return false;
            }
            setting = $.extend({}, setting, options);
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         */
        getContracts(_chainId = 42161) {
            return CONTRACTS[_chainId];
        },
        /**
         * @param _chainId {Number} 56 || 421613
         */
        getTokens(_chainId = 42161) {
            return TOKENS[_chainId];
        },
        getTokenList(_chainId = 42161) {
            let _tokenObj = this.getTokens(_chainId);
            let _tokenList = [];
            for (let idx in _tokenObj) {
                _tokenList.push(_tokenObj[idx]);
            }
            return _tokenList;
        },
        getPrices(_chainId = 42161) {
            return PRICES[_chainId];
        },
        getPriceByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return PRICES[_chainId][_tokenName] ? PRICES[_chainId][_tokenName] : 0;
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS[_chainId][_tokenName];
        },
        getTokenNameByAddress(_chainId = 42161, _tokenAddr = '') {
            _tokenAddr = _tokenAddr.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenName in _tokens) {
                if (_tokens[_tokenName].toLowerCase() == _tokenAddr) return _tokenName;
            }
            return "";
        },
        getAddressByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenAddr in _tokens) {
                if (_tokens[_tokenAddr].toLowerCase() == _tokenName) return _tokenAddr;
            }
            return "";
        },
        getTokenDecimalByAddress(_chainId = 42161, _tokenAddr = '') {
            _tokenAddr = _tokenAddr.toLowerCase();
            let _tokens = TOKENS[_chainId];
            for (let _tokenName in _tokens) {
                if (_tokens[_tokenName].toLowerCase() == _tokenAddr) return TOKENS_DECIMAL[_chainId][_tokenName];;
            }
            throw new Error("Invalid Token Address");
        },
        /**
         * @param _chainId {Number} 42161 || 421613
         * @param _tokenName {String}
         */
        getTokenDecimalByTokenName(_chainId = 42161, _tokenName = '') {
            _tokenName = _tokenName.toLowerCase();
            return TOKENS_DECIMAL[_chainId][_tokenName];
        },
        getAmountLimit() {
            return '115792089237316195423570985008687907853269984665640564039457584007913129639935';
        },
        getContractAddressByName(_chainId = 421613, name) {
            return CONTRACTS[_chainId][name].contract;
        },

        getFarmContractByPid(_chainId, _pid) {
            return CONTRACTS[_chainId].farms[_pid];
        },

        getAllPidOfFarmContractByType(_type, _chainId) {
            let data = [];
            let pids = CONTRACTS[_chainId].farms;
            let lengthPids = Object.keys(pids).length;
            for (let i = 0; i < lengthPids; i++) {
                let valuePid = Object.values(pids)[i];
                if (valuePid.type == _type) {
                    data.push(valuePid.pid);
                }
            }
            return data;
        }
    };
}(jQuery));