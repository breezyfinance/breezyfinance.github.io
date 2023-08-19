$.CONFIG = function() {};
$.CONFIG.prototype = (function() {
    var setting = {

    };
    var CONTRACTS = {
        11155111: {
            breezySwapV1: {
                'wethusdbc': {
                    contract: '0xbcF0CC1e8bdEcE008a7F4958c4d2C06AF4b8D59F',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'usdbc',
                },
                'usdbcweth': {
                    contract: '0xbcF0CC1e8bdEcE008a7F4958c4d2C06AF4b8D59F',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'usdbc',
                },
                'cbethweth': {
                    contract: '0xB44653e1791aa84f42b6fd6eb3A0080896f54cA2',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'cbeth',
                },
                'wethcbeth': {
                    contract: '0xB44653e1791aa84f42b6fd6eb3A0080896f54cA2',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'cbeth',
                },
                'daiweth': {
                    contract: '0x5dD76bf5a9889B21d72971b434F74fC2b8Ff2286',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'dai',
                },
                'wethdai': {
                    contract: '0x5dD76bf5a9889B21d72971b434F74fC2b8Ff2286',
                    tradeFee: 0.002,
                    performanceFee: 0.5,
                    safuFund: 0,
                    lbDecimal: 18,
                    base: 'weth',
                    token: 'dai',
                },
            },
            breezySwapper: {
                contract: '0x03bd9436f5196a0D2B84a772e5A5755ac70aeAF9',
            },
        },
    };
    var TOKENS = {
        11155111: { //mainnet arbitrum one
            'usdbc': '0x316500301b0a501Bf04b897474365ceF52d6b863',
            'weth': '0x8114b91c6Ae47d1679b7A32CaeCA473cbab9C14A',
            'cbeth': '0x3563fA251beEa49f96bD1FCD9eF2CBbE9FA88343',
            'dai': '0xE4DcDbff9f336bF236Dfa3506165f7C946522668',
        },
    }
    var TOKENS_DECIMAL = {
        11155111: {
            'weth': 18,
            'usdbc': 6,
            'cbeth': 18,
            'dai': 18,
        },
    };
    var PRICES = {
        11155111: {
            'weth': 1807,
            'usdbc': 1,
            'cbeth': 1,
            'dai': 1,
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