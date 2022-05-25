export const metadataDeploy = {
    abi: [
        {
            inputs: [
                {
                    internalType: "address[]",
                    name: "_payees",
                    type: "address[]",
                },
                {
                    internalType: "uint256[]",
                    name: "_shares",
                    type: "uint256[]",
                },
            ],
            stateMutability: "payable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "contract IERC20",
                    name: "token",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "ERC20PaymentReleased",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "PaymentReceived",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "PaymentReleased",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "available",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "token",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "availableERC20",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getPayees",
            outputs: [
                {
                    components: [
                        {
                            internalType: "address",
                            name: "payee",
                            type: "address",
                        },
                        {
                            internalType: "uint256",
                            name: "share",
                            type: "uint256",
                        },
                    ],
                    internalType: "struct Splitz.PayeeShare[]",
                    name: "",
                    type: "tuple[]",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address payable",
                    name: "account",
                    type: "address",
                },
            ],
            name: "release",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "token",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "releaseERC20",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "released",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "releasedERC20",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "shares",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
            ],
            name: "totalReleasedERC20",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalShares",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "addr",
                    type: "address",
                },
            ],
            name: "withdrawFromContract",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            stateMutability: "payable",
            type: "receive",
        },
    ],
    bytecode:
        "0x608060405260405162001321380380620013218339810160408190526200002691620003cd565b80518251146200008f5760405162461bcd60e51b815260206004820152602960248201527f53706c69747a3a2070617965657320616e6420736861726573206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084015b60405180910390fd5b6000825111620000d65760405162461bcd60e51b815260206004820152601160248201527053706c69747a3a206e6f2070617965657360781b604482015260640162000086565b60005b825181101562000142576200012d838281518110620000fc57620000fc620004ab565b6020026020010151838381518110620001195762000119620004ab565b60200260200101516200014b60201b60201c565b806200013981620004d7565b915050620000d9565b50505062000510565b6001600160a01b038216620001af5760405162461bcd60e51b815260206004820152602360248201527f53706c69747a3a206163636f756e7420697320746865207a65726f206164647260448201526265737360e81b606482015260840162000086565b60008111620002015760405162461bcd60e51b815260206004820152601460248201527f53706c69747a3a20736861726573206172652030000000000000000000000000604482015260640162000086565b6001600160a01b03821660009081526002602052604090205415620002745760405162461bcd60e51b815260206004820152602260248201527f53706c69747a3a206163636f756e7420616c7265616479206861732073686172604482015261657360f01b606482015260840162000086565b60048054600181019091557f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0180546001600160a01b0319166001600160a01b038416908117909155600090815260026020526040812082905580548291908190620002e2908490620004f5565b90915550505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156200032c576200032c620002eb565b604052919050565b60006001600160401b03821115620003505762000350620002eb565b5060051b60200190565b600082601f8301126200036c57600080fd5b81516020620003856200037f8362000334565b62000301565b82815260059290921b84018101918181019086841115620003a557600080fd5b8286015b84811015620003c25780518352918301918301620003a9565b509695505050505050565b60008060408385031215620003e157600080fd5b82516001600160401b0380821115620003f957600080fd5b818501915085601f8301126200040e57600080fd5b81516020620004216200037f8362000334565b82815260059290921b840181019181810190898411156200044157600080fd5b948201945b83861015620004785785516001600160a01b0381168114620004685760008081fd5b8252948201949082019062000446565b918801519196509093505050808211156200049257600080fd5b50620004a1858286016200035a565b9150509250929050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415620004ee57620004ee620004c1565b5060010190565b600082198211156200050b576200050b620004c1565b500190565b610e0180620005206000396000f3fe6080604052600436106100a05760003560e01c80639852595c116100645780639852595c1461019b578063c4e32945146101c8578063cdd9ac38146101e8578063ce7c2ac214610220578063f3ff49611461024d578063f9a76be21461026d57600080fd5b806310098ad5146100e1578063191655871461011457806319766c481461013657806327f38113146101635780633a98ef391461018557600080fd5b366100dc5760405134815233907f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be7709060200160405180910390a2005b600080fd5b3480156100ed57600080fd5b506101016100fc366004610b54565b61028d565b6040519081526020015b60405180910390f35b34801561012057600080fd5b5061013461012f366004610b54565b610337565b005b34801561014257600080fd5b50610101610151366004610b54565b60056020526000908152604090205481565b34801561016f57600080fd5b506101786103f9565b60405161010b9190610b71565b34801561019157600080fd5b5061010160005481565b3480156101a757600080fd5b506101016101b6366004610b54565b60036020526000908152604090205481565b3480156101d457600080fd5b506101016101e3366004610bc9565b6104f7565b3480156101f457600080fd5b50610101610203366004610bc9565b600660209081526000928352604080842090915290825290205481565b34801561022c57600080fd5b5061010161023b366004610b54565b60026020526000908152604090205481565b34801561025957600080fd5b50610134610268366004610b54565b61061e565b34801561027957600080fd5b50610134610288366004610bc9565b6106d0565b6001600160a01b0381166000908152600260205260408120546102f75760405162461bcd60e51b815260206004820152601d60248201527f53706c69747a3a206163636f756e7420686173206e6f2073686172657300000060448201526064015b60405180910390fd5b6000600154476103079190610c18565b6001600160a01b03841660009081526003602052604090205490915061033090849083906107c2565b9392505050565b60006103428261028d565b9050806103615760405162461bcd60e51b81526004016102ee90610c30565b6001600160a01b03821660009081526003602052604081208054839290610389908490610c18565b9250508190555080600160008282546103a29190610c18565b909155506103b2905082826107fd565b816001600160a01b03167fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056826040516103ed91815260200190565b60405180910390a25050565b60045460609060009067ffffffffffffffff81111561041a5761041a610c72565b60405190808252806020026020018201604052801561045f57816020015b60408051808201909152600080825260208201528152602001906001900390816104385790505b50905060005b6004548110156104f15760006004828154811061048457610484610c88565b60009182526020808320909101546040805180820182526001600160a01b0390921680835280855260028452932054918101919091528451919250908490849081106104d2576104d2610c88565b60200260200101819052505080806104e990610c9e565b915050610465565b50919050565b6001600160a01b03811660009081526002602052604081205461055c5760405162461bcd60e51b815260206004820152601d60248201527f53706c69747a3a206163636f756e7420686173206e6f2073686172657300000060448201526064016102ee565b6001600160a01b0383166000818152600560205260408082205490516370a0823160e01b8152306004820152919290916370a0823190602401602060405180830381865afa1580156105b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d69190610cb9565b6105e09190610c18565b6001600160a01b0380861660009081526006602090815260408083209388168352929052205490915061061690849083906107c2565b949350505050565b3360009081526002602052604090205461067a5760405162461bcd60e51b815260206004820152601c60248201527f53706c69747a3a2063616c6c657220686173206e6f207368617265730000000060448201526064016102ee565b806001600160a01b0316633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156106b557600080fd5b505af11580156106c9573d6000803e3d6000fd5b5050505050565b60006106dc83836104f7565b9050806106fb5760405162461bcd60e51b81526004016102ee90610c30565b6001600160a01b03808416600090815260066020908152604080832093861683529290529081208054839290610732908490610c18565b90915550506001600160a01b0383166000908152600560205260408120805483929061075f908490610c18565b90915550610770905083838361091b565b816001600160a01b0316836001600160a01b03167f3be5b7a71e84ed12875d241991c70855ac5817d847039e17a9d895c1ceb0f18a836040516107b591815260200190565b60405180910390a3505050565b600080546001600160a01b0385168252600260205260408220548391906107e99086610cd2565b6107f39190610cf1565b6106169190610d13565b8047101561084d5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e636500000060448201526064016102ee565b6000826001600160a01b03168260405160006040518083038185875af1925050503d806000811461089a576040519150601f19603f3d011682016040523d82523d6000602084013e61089f565b606091505b50509050806109165760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d6179206861766520726576657274656400000000000060648201526084016102ee565b505050565b604080516001600160a01b03848116602483015260448083018590528351808403909101815260649092018352602080830180516001600160e01b031663a9059cbb60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656490840152610916928692916000916109ab918516908490610a28565b80519091501561091657808060200190518101906109c99190610d2a565b6109165760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016102ee565b60606106168484600085856001600160a01b0385163b610a8a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102ee565b600080866001600160a01b03168587604051610aa69190610d7c565b60006040518083038185875af1925050503d8060008114610ae3576040519150601f19603f3d011682016040523d82523d6000602084013e610ae8565b606091505b5091509150610af8828286610b03565b979650505050505050565b60608315610b12575081610330565b825115610b225782518084602001fd5b8160405162461bcd60e51b81526004016102ee9190610d98565b6001600160a01b0381168114610b5157600080fd5b50565b600060208284031215610b6657600080fd5b813561033081610b3c565b602080825282518282018190526000919060409081850190868401855b82811015610bbc57815180516001600160a01b03168552860151868501529284019290850190600101610b8e565b5091979650505050505050565b60008060408385031215610bdc57600080fd5b8235610be781610b3c565b91506020830135610bf781610b3c565b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c2b57610c2b610c02565b500190565b60208082526022908201527f53706c69747a3a206163636f756e74206973206e6f7420647565207061796d656040820152611b9d60f21b606082015260800190565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6000600019821415610cb257610cb2610c02565b5060010190565b600060208284031215610ccb57600080fd5b5051919050565b6000816000190483118215151615610cec57610cec610c02565b500290565b600082610d0e57634e487b7160e01b600052601260045260246000fd5b500490565b600082821015610d2557610d25610c02565b500390565b600060208284031215610d3c57600080fd5b8151801515811461033057600080fd5b60005b83811015610d67578181015183820152602001610d4f565b83811115610d76576000848401525b50505050565b60008251610d8e818460208701610d4c565b9190910192915050565b6020815260008251806020840152610db7816040850160208701610d4c565b601f01601f1916919091016040019291505056fea2646970667358221220c99777ef5916318bd7f68ca6f393afa6168a8b69b0e0f766273874716612e28e64736f6c634300080a0033",
};

export const contractsDeploy = {
    "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol":
        '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (token/ERC20/utils/SafeERC20.sol)\n\npragma solidity ^0.8.0;\n\nimport "../IERC20.sol";\nimport "../../../utils/Address.sol";\n\n/**\n * @title SafeERC20\n * @dev Wrappers around ERC20 operations that throw on failure (when the token\n * contract returns false). Tokens that return no value (and instead revert or\n * throw on failure) are also supported, non-reverting calls are assumed to be\n * successful.\n * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,\n * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.\n */\nlibrary SafeERC20 {\n    using Address for address;\n\n    function safeTransfer(\n        IERC20 token,\n        address to,\n        uint256 value\n    ) internal {\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));\n    }\n\n    function safeTransferFrom(\n        IERC20 token,\n        address from,\n        address to,\n        uint256 value\n    ) internal {\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));\n    }\n\n    /**\n     * @dev Deprecated. This function has issues similar to the ones found in\n     * {IERC20-approve}, and its usage is discouraged.\n     *\n     * Whenever possible, use {safeIncreaseAllowance} and\n     * {safeDecreaseAllowance} instead.\n     */\n    function safeApprove(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        // safeApprove should only be called when setting an initial allowance,\n        // or when resetting it to zero. To increase and decrease it, use\n        // \'safeIncreaseAllowance\' and \'safeDecreaseAllowance\'\n        require(\n            (value == 0) || (token.allowance(address(this), spender) == 0),\n            "SafeERC20: approve from non-zero to non-zero allowance"\n        );\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));\n    }\n\n    function safeIncreaseAllowance(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        uint256 newAllowance = token.allowance(address(this), spender) + value;\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));\n    }\n\n    function safeDecreaseAllowance(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        unchecked {\n            uint256 oldAllowance = token.allowance(address(this), spender);\n            require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");\n            uint256 newAllowance = oldAllowance - value;\n            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));\n        }\n    }\n\n    /**\n     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement\n     * on the return value: the return value is optional (but if data is returned, it must not be false).\n     * @param token The token targeted by the call.\n     * @param data The call data (encoded using abi.encode or one of its variants).\n     */\n    function _callOptionalReturn(IERC20 token, bytes memory data) private {\n        // We need to perform a low level call here, to bypass Solidity\'s return data size checking mechanism, since\n        // we\'re implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that\n        // the target address contains contract code and also asserts for success in the low-level call.\n\n        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");\n        if (returndata.length > 0) {\n            // Return data is optional\n            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");\n        }\n    }\n}\n',
    "@openzeppelin/contracts/token/ERC20/IERC20.sol":
        "// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Interface of the ERC20 standard as defined in the EIP.\n */\ninterface IERC20 {\n    /**\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\n     * another (`to`).\n     *\n     * Note that `value` may be zero.\n     */\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    /**\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\n     * a call to {approve}. `value` is the new allowance.\n     */\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    /**\n     * @dev Returns the amount of tokens in existence.\n     */\n    function totalSupply() external view returns (uint256);\n\n    /**\n     * @dev Returns the amount of tokens owned by `account`.\n     */\n    function balanceOf(address account) external view returns (uint256);\n\n    /**\n     * @dev Moves `amount` tokens from the caller's account to `to`.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transfer(address to, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Returns the remaining number of tokens that `spender` will be\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\n     * zero by default.\n     *\n     * This value changes when {approve} or {transferFrom} are called.\n     */\n    function allowance(address owner, address spender) external view returns (uint256);\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\n     * that someone may use both the old and the new allowance by unfortunate\n     * transaction ordering. One possible solution to mitigate this race\n     * condition is to first reduce the spender's allowance to 0 and set the\n     * desired value afterwards:\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     *\n     * Emits an {Approval} event.\n     */\n    function approve(address spender, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Moves `amount` tokens from `from` to `to` using the\n     * allowance mechanism. `amount` is then deducted from the caller's\n     * allowance.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transferFrom(\n        address from,\n        address to,\n        uint256 amount\n    ) external returns (bool);\n}\n",
    "@openzeppelin/contracts/utils/Address.sol":
        '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.5.0) (utils/Address.sol)\n\npragma solidity ^0.8.1;\n\n/**\n * @dev Collection of functions related to the address type\n */\nlibrary Address {\n    /**\n     * @dev Returns true if `account` is a contract.\n     *\n     * [IMPORTANT]\n     * ====\n     * It is unsafe to assume that an address for which this function returns\n     * false is an externally-owned account (EOA) and not a contract.\n     *\n     * Among others, `isContract` will return false for the following\n     * types of addresses:\n     *\n     *  - an externally-owned account\n     *  - a contract in construction\n     *  - an address where a contract will be created\n     *  - an address where a contract lived, but was destroyed\n     * ====\n     *\n     * [IMPORTANT]\n     * ====\n     * You shouldn\'t rely on `isContract` to protect against flash loan attacks!\n     *\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\n     * constructor.\n     * ====\n     */\n    function isContract(address account) internal view returns (bool) {\n        // This method relies on extcodesize/address.code.length, which returns 0\n        // for contracts in construction, since the code is only stored at the end\n        // of the constructor execution.\n\n        return account.code.length > 0;\n    }\n\n    /**\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\n     * `recipient`, forwarding all available gas and reverting on errors.\n     *\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\n     * imposed by `transfer`, making them unable to receive funds via\n     * `transfer`. {sendValue} removes this limitation.\n     *\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\n     *\n     * IMPORTANT: because control is transferred to `recipient`, care must be\n     * taken to not create reentrancy vulnerabilities. Consider using\n     * {ReentrancyGuard} or the\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\n     */\n    function sendValue(address payable recipient, uint256 amount) internal {\n        require(address(this).balance >= amount, "Address: insufficient balance");\n\n        (bool success, ) = recipient.call{value: amount}("");\n        require(success, "Address: unable to send value, recipient may have reverted");\n    }\n\n    /**\n     * @dev Performs a Solidity function call using a low level `call`. A\n     * plain `call` is an unsafe replacement for a function call: use this\n     * function instead.\n     *\n     * If `target` reverts with a revert reason, it is bubbled up by this\n     * function (like regular Solidity function calls).\n     *\n     * Returns the raw returned data. To convert to the expected return value,\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\n     *\n     * Requirements:\n     *\n     * - `target` must be a contract.\n     * - calling `target` with `data` must not revert.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionCall(target, data, "Address: low-level call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\n     * `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but also transferring `value` wei to `target`.\n     *\n     * Requirements:\n     *\n     * - the calling contract must have an ETH balance of at least `value`.\n     * - the called Solidity function must be `payable`.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(address(this).balance >= value, "Address: insufficient balance for call");\n        require(isContract(target), "Address: call to non-contract");\n\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\n        return functionStaticCall(target, data, "Address: low-level static call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        require(isContract(target), "Address: static call to non-contract");\n\n        (bool success, bytes memory returndata) = target.staticcall(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(isContract(target), "Address: delegate call to non-contract");\n\n        (bool success, bytes memory returndata) = target.delegatecall(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Tool to verifies that a low level call was successful, and revert if it wasn\'t, either by bubbling the\n     * revert reason using the provided one.\n     *\n     * _Available since v4.3._\n     */\n    function verifyCallResult(\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal pure returns (bytes memory) {\n        if (success) {\n            return returndata;\n        } else {\n            // Look for revert reason and bubble it up if present\n            if (returndata.length > 0) {\n                // The easiest way to bubble the revert reason is using memory via assembly\n\n                assembly {\n                    let returndata_size := mload(returndata)\n                    revert(add(32, returndata), returndata_size)\n                }\n            } else {\n                revert(errorMessage);\n            }\n        }\n    }\n}\n',
    "contracts/Splitz.sol":
        '// SPDX-License-Identifier: MIT\n// Adaptation of the OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)\npragma solidity ^0.8.10;\n\nimport "../@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";\nimport "../@openzeppelin/contracts/utils/Address.sol";\n\ninterface IWithdrawal_ {\n    function withdraw() external;\n}\n\n/**\n * @title Splitz\n * @dev This contract allows to split REEF payments among a group of accounts. The sender does not need to be aware\n * that the REEF will be split in this way, since it is handled transparently by the contract.\n *\n * The split can be in equal parts or in any other arbitrary proportion. The way this is specified is by assigning each\n * account to a number of shares. Of all the REEF that this contract receives, each account will then be able to claim\n * an amount proportional to the percentage of total shares they were assigned.\n *\n * `Splitz` follows a _pull payment_ model. This means that payments are not automatically forwarded to the\n * accounts but kept in this contract, and the actual transfer is triggered as a separate step by calling the {release}\n * function.\n *\n * NOTE: This contract assumes that ERC20 tokens will behave similarly to native tokens (Ether). Rebasing tokens, and\n * tokens that apply fees during transfers, are likely to not be supported as expected. If in doubt, we encourage you\n * to run tests before sending real value to this contract.\n */\ncontract Splitz {\n    event PaymentReleased(address indexed to, uint256 amount);\n    event PaymentReceived(address indexed from, uint256 amount);\n    event ERC20PaymentReleased(IERC20 indexed token, address indexed to, uint256 amount);\n\n    struct PayeeShare {\n        address payee;\n        uint256 share;\n    }\n\n    uint256 public totalShares;\n    uint256 private totalReleased;\n    mapping(address => uint256) public shares;\n    mapping(address => uint256) public released;\n    address[] private payees;\n    mapping(IERC20 => uint256) public totalReleasedERC20;\n    mapping(IERC20 => mapping(address => uint256)) public releasedERC20;\n\n    /**\n     * @dev Creates an instance of `Splitz` where each account in `_payees` is assigned the number of shares at\n     * the matching position in the `_shares` array.\n     *\n     * All addresses in `_payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no\n     * duplicates in `_payees`.\n     */\n    constructor(address[] memory _payees, uint256[] memory _shares) payable {\n        require(\n            _payees.length == _shares.length,\n            "Splitz: payees and shares length mismatch"\n        );\n        require(_payees.length > 0, "Splitz: no payees");\n\n        for (uint256 i; i < _payees.length; i++) {\n            _addPayee(_payees[i], _shares[i]);\n        }\n    }\n\n    /**\n     * @dev The REEF received will be logged with {PaymentReceived} events. Note that these events are not fully\n     * reliable: it\'s possible for a contract to receive REEF without triggering this function. This only affects the\n     * reliability of the events, and not the actual splitting of REEF.\n     *\n     * To learn more about this see the Solidity documentation for\n     * https://solidity.readthedocs.io/en/latest/contracts.html#fallback-function[fallback\n     * functions].\n     */\n    receive() external payable {\n        emit PaymentReceived(msg.sender, msg.value);\n    }\n\n    /**\n     * @dev Triggers a transfer to `account` of the amount of REEF they are owed, according to their percentage of the\n     * total shares and their previous withdrawals.\n     */\n    function release(address payable account) external {\n        uint256 payment = available(account);\n\n        require(payment != 0, "Splitz: account is not due payment");\n\n        released[account] += payment;\n        totalReleased += payment;\n\n        Address.sendValue(account, payment);\n        emit PaymentReleased(account, payment);\n    }\n\n    /**\n     * @dev Triggers a transfer to `account` of the amount of `token` tokens they are owed, according to their\n     * percentage of the total shares and their previous withdrawals. `token` must be the address of an IERC20\n     * contract.\n     */\n    function releaseERC20(IERC20 token, address account) public virtual {\n        uint256 payment = availableERC20(token, account);\n\n        require(payment != 0, "Splitz: account is not due payment");\n\n        releasedERC20[token][account] += payment;\n        totalReleasedERC20[token] += payment;\n\n        SafeERC20.safeTransfer(token, account, payment);\n        emit ERC20PaymentReleased(token, account, payment);\n    }\n\n    /**\n     * @dev Withdraws available balance for contract with address `addr`. To be used with contracts that implement the\n     * _pull payment_ model with a _withdrawal()_ function.\n     */\n    function withdrawFromContract(address addr) external {\n        require(shares[msg.sender] > 0, "Splitz: caller has no shares");\n        IWithdrawal_(addr).withdraw();\n    }\n\n    /**\n     * @dev Returns the amount of REEF owed to `account`, according to their percentage of the total shares and their\n     * previous withdrawals.\n     */\n    function available(address account) public view returns (uint256) {\n        require(shares[account] > 0, "Splitz: account has no shares");\n\n        uint256 totalReceived = address(this).balance + totalReleased;\n        return _pendingPayment(account, totalReceived, released[account]);\n    }\n\n    /**\n     * @dev Returns the amount of `token` tokens owed to `account`, according to their percentage of the total shares\n     * and their previous withdrawals.\n     */\n    function availableERC20(IERC20 token, address account) public view returns (uint256) {\n        require(shares[account] > 0, "Splitz: account has no shares");\n\n        uint256 totalReceived = token.balanceOf(address(this)) + totalReleasedERC20[token];\n        return _pendingPayment(account, totalReceived, releasedERC20[token][account]);\n    }\n\n    /**\n     * @dev Returns an array with all payees with their respective shares.\n     */\n    function getPayees() external view returns (PayeeShare[] memory) {\n        PayeeShare[] memory payeeShareArray = new PayeeShare[](payees.length);\n        for (uint256 i; i < payees.length; i++) {\n            address payee = payees[i];\n            payeeShareArray[i] = PayeeShare(payee, shares[payee]);\n        }\n        return payeeShareArray;\n    }\n\n    /**\n     * @dev internal logic for computing the pending payment of an `account` given the token historical balances and\n     * already released amounts.\n     */\n    function _pendingPayment(\n        address account,\n        uint256 totalReceived,\n        uint256 alreadyReleased\n    ) private view returns (uint256) {\n        return (totalReceived * shares[account]) / totalShares - alreadyReleased;\n    }\n\n    /**\n     * @dev Add a new payee to the contract.\n     * @param account The address of the payee to add.\n     * @param _shares The number of shares owned by the payee.\n     */\n    function _addPayee(address account, uint256 _shares) private {\n        require(account != address(0), "Splitz: account is the zero address");\n        require(_shares > 0, "Splitz: shares are 0");\n        require(shares[account] == 0, "Splitz: account already has shares");\n\n        payees.push(account);\n        shares[account] = _shares;\n        totalShares += _shares;\n    }\n}\n',
};

export const metadataArtifactDeploy = {
    compiler: {
        version: "0.8.10+commit.fc410830",
    },
    settings: {
        compilationTarget: {
            "contracts/Splitz.sol": "Splitz",
        },
        evmVersion: "istanbul",
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
    version: 1,
    license: "MIT",
};
