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
                    internalType: "struct PaymentSplitterERC20.PayeeShare[]",
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
        "0x60806040526040516200268738038062002687833981810160405281019062000029919062000631565b805182511462000070576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000067906200073d565b60405180910390fd5b6000825111620000b7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000ae90620007af565b60405180910390fd5b60005b8251811015620001265762000110838281518110620000de57620000dd620007d1565b5b6020026020010151838381518110620000fc57620000fb620007d1565b5b60200260200101516200012f60201b60201c565b80806200011d906200082f565b915050620000ba565b50505062000a7c565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620001a2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200019990620008f3565b60405180910390fd5b60008111620001e8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001df9062000965565b60405180910390fd5b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054146200026d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200026490620009fd565b60405180910390fd5b6004829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508060008082825462000327919062000a1f565b925050819055505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000396826200034b565b810181811067ffffffffffffffff82111715620003b857620003b76200035c565b5b80604052505050565b6000620003cd62000332565b9050620003db82826200038b565b919050565b600067ffffffffffffffff821115620003fe57620003fd6200035c565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004418262000414565b9050919050565b620004538162000434565b81146200045f57600080fd5b50565b600081519050620004738162000448565b92915050565b6000620004906200048a84620003e0565b620003c1565b90508083825260208201905060208402830185811115620004b657620004b56200040f565b5b835b81811015620004e35780620004ce888262000462565b845260208401935050602081019050620004b8565b5050509392505050565b600082601f83011262000505576200050462000346565b5b81516200051784826020860162000479565b91505092915050565b600067ffffffffffffffff8211156200053e576200053d6200035c565b5b602082029050602081019050919050565b6000819050919050565b62000564816200054f565b81146200057057600080fd5b50565b600081519050620005848162000559565b92915050565b6000620005a16200059b8462000520565b620003c1565b90508083825260208201905060208402830185811115620005c757620005c66200040f565b5b835b81811015620005f45780620005df888262000573565b845260208401935050602081019050620005c9565b5050509392505050565b600082601f83011262000616576200061562000346565b5b8151620006288482602086016200058a565b91505092915050565b600080604083850312156200064b576200064a6200033c565b5b600083015167ffffffffffffffff8111156200066c576200066b62000341565b5b6200067a85828601620004ed565b925050602083015167ffffffffffffffff8111156200069e576200069d62000341565b5b620006ac85828601620005fe565b9150509250929050565b600082825260208201905092915050565b7f5061796d656e7453706c69747465723a2070617965657320616e64207368617260008201527f6573206c656e677468206d69736d617463680000000000000000000000000000602082015250565b600062000725603283620006b6565b91506200073282620006c7565b604082019050919050565b60006020820190508181036000830152620007588162000716565b9050919050565b7f5061796d656e7453706c69747465723a206e6f20706179656573000000000000600082015250565b600062000797601a83620006b6565b9150620007a4826200075f565b602082019050919050565b60006020820190508181036000830152620007ca8162000788565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200083c826200054f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141562000872576200087162000800565b5b600182019050919050565b7f5061796d656e7453706c69747465723a206163636f756e74206973207468652060008201527f7a65726f20616464726573730000000000000000000000000000000000000000602082015250565b6000620008db602c83620006b6565b9150620008e8826200087d565b604082019050919050565b600060208201905081810360008301526200090e81620008cc565b9050919050565b7f5061796d656e7453706c69747465723a20736861726573206172652030000000600082015250565b60006200094d601d83620006b6565b91506200095a8262000915565b602082019050919050565b6000602082019050818103600083015262000980816200093e565b9050919050565b7f5061796d656e7453706c69747465723a206163636f756e7420616c726561647960008201527f2068617320736861726573000000000000000000000000000000000000000000602082015250565b6000620009e5602b83620006b6565b9150620009f28262000987565b604082019050919050565b6000602082019050818103600083015262000a1881620009d6565b9050919050565b600062000a2c826200054f565b915062000a39836200054f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111562000a715762000a7062000800565b5b828201905092915050565b611bfb8062000a8c6000396000f3fe6080604052600436106100a05760003560e01c80639852595c116100645780639852595c146101f3578063c4e3294514610230578063cdd9ac381461026d578063ce7c2ac2146102aa578063f3ff4961146102e7578063f9a76be214610310576100f5565b806310098ad5146100fa578063191655871461013757806319766c481461016057806327f381131461019d5780633a98ef39146101c8576100f5565b366100f5573373ffffffffffffffffffffffffffffffffffffffff167f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be770346040516100eb9190611023565b60405180910390a2005b600080fd5b34801561010657600080fd5b50610121600480360381019061011c91906110a1565b610339565b60405161012e9190611023565b60405180910390f35b34801561014357600080fd5b5061015e6004803603810190610159919061110c565b610420565b005b34801561016c57600080fd5b5061018760048036038101906101829190611177565b61053c565b6040516101949190611023565b60405180910390f35b3480156101a957600080fd5b506101b2610554565b6040516101bf91906112a0565b60405180910390f35b3480156101d457600080fd5b506101dd6106aa565b6040516101ea9190611023565b60405180910390f35b3480156101ff57600080fd5b5061021a600480360381019061021591906110a1565b6106b0565b6040516102279190611023565b60405180910390f35b34801561023c57600080fd5b50610257600480360381019061025291906112c2565b6106c8565b6040516102649190611023565b60405180910390f35b34801561027957600080fd5b50610294600480360381019061028f91906112c2565b6108a3565b6040516102a19190611023565b60405180910390f35b3480156102b657600080fd5b506102d160048036038101906102cc91906110a1565b6108c8565b6040516102de9190611023565b60405180910390f35b3480156102f357600080fd5b5061030e600480360381019061030991906110a1565b6108e0565b005b34801561031c57600080fd5b50610337600480360381019061033291906112c2565b6109c5565b005b600080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054116103bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b390611385565b60405180910390fd5b6000600154476103cc91906113d4565b90506104188382600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610b75565b915050919050565b600061042b82610339565b90506000811415610471576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104689061149c565b60405180910390fd5b80600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104c091906113d4565b9250508190555080600160008282546104d991906113d4565b925050819055506104ea8282610be3565b8173ffffffffffffffffffffffffffffffffffffffff167fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056826040516105309190611023565b60405180910390a25050565b60056020528060005260406000206000915090505481565b6060600060048054905067ffffffffffffffff811115610577576105766114bc565b5b6040519080825280602002602001820160405280156105b057816020015b61059d610fda565b8152602001906001900390816105955790505b50905060005b6004805490508110156106a2576000600482815481106105d9576105d86114eb565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060405180604001604052808273ffffffffffffffffffffffffffffffffffffffff168152602001600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815250838381518110610683576106826114eb565b5b602002602001018190525050808061069a9061151a565b9150506105b6565b508091505090565b60005481565b60036020528060005260406000206000915090505481565b600080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541161074b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074290611385565b60405180910390fd5b6000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548473ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016107c69190611572565b602060405180830381865afa1580156107e3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080791906115b9565b61081191906113d4565b905061089a8382600660008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610b75565b91505092915050565b6006602052816000526040600020602052806000526040600020600091509150505481565b60026020528060005260406000206000915090505481565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610962576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095990611658565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16633ccfd60b6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156109aa57600080fd5b505af11580156109be573d6000803e3d6000fd5b5050505050565b60006109d183836106c8565b90506000811415610a17576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0e9061149c565b60405180910390fd5b80600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610aa391906113d4565b9250508190555080600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610af991906113d4565b92505081905550610b0b838383610cd7565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f3be5b7a71e84ed12875d241991c70855ac5817d847039e17a9d895c1ceb0f18a83604051610b689190611023565b60405180910390a3505050565b600081600054600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205485610bc69190611678565b610bd09190611701565b610bda9190611732565b90509392505050565b80471015610c26576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1d906117b2565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff1682604051610c4c90611803565b60006040518083038185875af1925050503d8060008114610c89576040519150601f19603f3d011682016040523d82523d6000602084013e610c8e565b606091505b5050905080610cd2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cc99061188a565b60405180910390fd5b505050565b610d588363a9059cbb60e01b8484604051602401610cf69291906118aa565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610d5d565b505050565b6000610dbf826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610e249092919063ffffffff16565b9050600081511115610e1f5780806020019051810190610ddf919061190b565b610e1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e15906119aa565b60405180910390fd5b5b505050565b6060610e338484600085610e3c565b90509392505050565b606082471015610e81576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7890611a3c565b60405180910390fd5b610e8a85610f50565b610ec9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec090611aa8565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610ef29190611b37565b60006040518083038185875af1925050503d8060008114610f2f576040519150601f19603f3d011682016040523d82523d6000602084013e610f34565b606091505b5091509150610f44828286610f73565b92505050949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60608315610f8357829050610fd3565b600083511115610f965782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fca9190611ba3565b60405180910390fd5b9392505050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b6000819050919050565b61101d8161100a565b82525050565b60006020820190506110386000830184611014565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061106e82611043565b9050919050565b61107e81611063565b811461108957600080fd5b50565b60008135905061109b81611075565b92915050565b6000602082840312156110b7576110b661103e565b5b60006110c58482850161108c565b91505092915050565b60006110d982611043565b9050919050565b6110e9816110ce565b81146110f457600080fd5b50565b600081359050611106816110e0565b92915050565b6000602082840312156111225761112161103e565b5b6000611130848285016110f7565b91505092915050565b600061114482611063565b9050919050565b61115481611139565b811461115f57600080fd5b50565b6000813590506111718161114b565b92915050565b60006020828403121561118d5761118c61103e565b5b600061119b84828501611162565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6111d981611063565b82525050565b6111e88161100a565b82525050565b60408201600082015161120460008501826111d0565b50602082015161121760208501826111df565b50505050565b600061122983836111ee565b60408301905092915050565b6000602082019050919050565b600061124d826111a4565b61125781856111af565b9350611262836111c0565b8060005b8381101561129357815161127a888261121d565b975061128583611235565b925050600181019050611266565b5085935050505092915050565b600060208201905081810360008301526112ba8184611242565b905092915050565b600080604083850312156112d9576112d861103e565b5b60006112e785828601611162565b92505060206112f88582860161108c565b9150509250929050565b600082825260208201905092915050565b7f5061796d656e7453706c69747465723a206163636f756e7420686173206e6f2060008201527f7368617265730000000000000000000000000000000000000000000000000000602082015250565b600061136f602683611302565b915061137a82611313565b604082019050919050565b6000602082019050818103600083015261139e81611362565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113df8261100a565b91506113ea8361100a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561141f5761141e6113a5565b5b828201905092915050565b7f5061796d656e7453706c69747465723a206163636f756e74206973206e6f742060008201527f647565207061796d656e74000000000000000000000000000000000000000000602082015250565b6000611486602b83611302565b91506114918261142a565b604082019050919050565b600060208201905081810360008301526114b581611479565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006115258261100a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611558576115576113a5565b5b600182019050919050565b61156c81611063565b82525050565b60006020820190506115876000830184611563565b92915050565b6115968161100a565b81146115a157600080fd5b50565b6000815190506115b38161158d565b92915050565b6000602082840312156115cf576115ce61103e565b5b60006115dd848285016115a4565b91505092915050565b7f5061796d656e7453706c69747465723a2063616c6c657220686173206e6f207360008201527f6861726573000000000000000000000000000000000000000000000000000000602082015250565b6000611642602583611302565b915061164d826115e6565b604082019050919050565b6000602082019050818103600083015261167181611635565b9050919050565b60006116838261100a565b915061168e8361100a565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156116c7576116c66113a5565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061170c8261100a565b91506117178361100a565b925082611727576117266116d2565b5b828204905092915050565b600061173d8261100a565b91506117488361100a565b92508282101561175b5761175a6113a5565b5b828203905092915050565b7f416464726573733a20696e73756666696369656e742062616c616e6365000000600082015250565b600061179c601d83611302565b91506117a782611766565b602082019050919050565b600060208201905081810360008301526117cb8161178f565b9050919050565b600081905092915050565b50565b60006117ed6000836117d2565b91506117f8826117dd565b600082019050919050565b600061180e826117e0565b9150819050919050565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b6000611874603a83611302565b915061187f82611818565b604082019050919050565b600060208201905081810360008301526118a381611867565b9050919050565b60006040820190506118bf6000830185611563565b6118cc6020830184611014565b9392505050565b60008115159050919050565b6118e8816118d3565b81146118f357600080fd5b50565b600081519050611905816118df565b92915050565b6000602082840312156119215761192061103e565b5b600061192f848285016118f6565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b6000611994602a83611302565b915061199f82611938565b604082019050919050565b600060208201905081810360008301526119c381611987565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b6000611a26602683611302565b9150611a31826119ca565b604082019050919050565b60006020820190508181036000830152611a5581611a19565b9050919050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000611a92601d83611302565b9150611a9d82611a5c565b602082019050919050565b60006020820190508181036000830152611ac181611a85565b9050919050565b600081519050919050565b60005b83811015611af1578082015181840152602081019050611ad6565b83811115611b00576000848401525b50505050565b6000611b1182611ac8565b611b1b81856117d2565b9350611b2b818560208601611ad3565b80840191505092915050565b6000611b438284611b06565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b6000611b7582611b4e565b611b7f8185611302565b9350611b8f818560208601611ad3565b611b9881611b59565b840191505092915050565b60006020820190508181036000830152611bbd8184611b6a565b90509291505056fea2646970667358221220395f5ebb0f3d730bf5de083ecf9391db2bb0a1b5e8ed7ad9b6df627b117f5b0e64736f6c634300080a0033",
};

export const contractsDeploy = {
    "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol":
        '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts v4.4.1 (token/ERC20/utils/SafeERC20.sol)\n\npragma solidity ^0.8.0;\n\nimport "../IERC20.sol";\nimport "../../../utils/Address.sol";\n\n/**\n * @title SafeERC20\n * @dev Wrappers around ERC20 operations that throw on failure (when the token\n * contract returns false). Tokens that return no value (and instead revert or\n * throw on failure) are also supported, non-reverting calls are assumed to be\n * successful.\n * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,\n * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.\n */\nlibrary SafeERC20 {\n    using Address for address;\n\n    function safeTransfer(\n        IERC20 token,\n        address to,\n        uint256 value\n    ) internal {\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));\n    }\n\n    function safeTransferFrom(\n        IERC20 token,\n        address from,\n        address to,\n        uint256 value\n    ) internal {\n        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));\n    }\n\n    /**\n     * @dev Deprecated. This function has issues similar to the ones found in\n     * {IERC20-approve}, and its usage is discouraged.\n     *\n     * Whenever possible, use {safeIncreaseAllowance} and\n     * {safeDecreaseAllowance} instead.\n     */\n    function safeApprove(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        // safeApprove should only be called when setting an initial allowance,\n        // or when resetting it to zero. To increase and decrease it, use\n        // \'safeIncreaseAllowance\' and \'safeDecreaseAllowance\'\n        require(\n            (value == 0) || (token.allowance(address(this), spender) == 0),\n            "SafeERC20: approve from non-zero to non-zero allowance"\n        );\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));\n    }\n\n    function safeIncreaseAllowance(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        uint256 newAllowance = token.allowance(address(this), spender) + value;\n        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));\n    }\n\n    function safeDecreaseAllowance(\n        IERC20 token,\n        address spender,\n        uint256 value\n    ) internal {\n        unchecked {\n            uint256 oldAllowance = token.allowance(address(this), spender);\n            require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");\n            uint256 newAllowance = oldAllowance - value;\n            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));\n        }\n    }\n\n    /**\n     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement\n     * on the return value: the return value is optional (but if data is returned, it must not be false).\n     * @param token The token targeted by the call.\n     * @param data The call data (encoded using abi.encode or one of its variants).\n     */\n    function _callOptionalReturn(IERC20 token, bytes memory data) private {\n        // We need to perform a low level call here, to bypass Solidity\'s return data size checking mechanism, since\n        // we\'re implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that\n        // the target address contains contract code and also asserts for success in the low-level call.\n\n        bytes memory returndata = address(token).functionCall(data, "SafeERC20: low-level call failed");\n        if (returndata.length > 0) {\n            // Return data is optional\n            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");\n        }\n    }\n}\n',
    "@openzeppelin/contracts/token/ERC20/IERC20.sol":
        "// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)\n\npragma solidity ^0.8.0;\n\n/**\n * @dev Interface of the ERC20 standard as defined in the EIP.\n */\ninterface IERC20 {\n    /**\n     * @dev Emitted when `value` tokens are moved from one account (`from`) to\n     * another (`to`).\n     *\n     * Note that `value` may be zero.\n     */\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    /**\n     * @dev Emitted when the allowance of a `spender` for an `owner` is set by\n     * a call to {approve}. `value` is the new allowance.\n     */\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    /**\n     * @dev Returns the amount of tokens in existence.\n     */\n    function totalSupply() external view returns (uint256);\n\n    /**\n     * @dev Returns the amount of tokens owned by `account`.\n     */\n    function balanceOf(address account) external view returns (uint256);\n\n    /**\n     * @dev Moves `amount` tokens from the caller's account to `to`.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transfer(address to, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Returns the remaining number of tokens that `spender` will be\n     * allowed to spend on behalf of `owner` through {transferFrom}. This is\n     * zero by default.\n     *\n     * This value changes when {approve} or {transferFrom} are called.\n     */\n    function allowance(address owner, address spender) external view returns (uint256);\n\n    /**\n     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * IMPORTANT: Beware that changing an allowance with this method brings the risk\n     * that someone may use both the old and the new allowance by unfortunate\n     * transaction ordering. One possible solution to mitigate this race\n     * condition is to first reduce the spender's allowance to 0 and set the\n     * desired value afterwards:\n     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729\n     *\n     * Emits an {Approval} event.\n     */\n    function approve(address spender, uint256 amount) external returns (bool);\n\n    /**\n     * @dev Moves `amount` tokens from `from` to `to` using the\n     * allowance mechanism. `amount` is then deducted from the caller's\n     * allowance.\n     *\n     * Returns a boolean value indicating whether the operation succeeded.\n     *\n     * Emits a {Transfer} event.\n     */\n    function transferFrom(\n        address from,\n        address to,\n        uint256 amount\n    ) external returns (bool);\n}\n",
    "@openzeppelin/contracts/utils/Address.sol":
        '// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v4.5.0) (utils/Address.sol)\n\npragma solidity ^0.8.1;\n\n/**\n * @dev Collection of functions related to the address type\n */\nlibrary Address {\n    /**\n     * @dev Returns true if `account` is a contract.\n     *\n     * [IMPORTANT]\n     * ====\n     * It is unsafe to assume that an address for which this function returns\n     * false is an externally-owned account (EOA) and not a contract.\n     *\n     * Among others, `isContract` will return false for the following\n     * types of addresses:\n     *\n     *  - an externally-owned account\n     *  - a contract in construction\n     *  - an address where a contract will be created\n     *  - an address where a contract lived, but was destroyed\n     * ====\n     *\n     * [IMPORTANT]\n     * ====\n     * You shouldn\'t rely on `isContract` to protect against flash loan attacks!\n     *\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\n     * constructor.\n     * ====\n     */\n    function isContract(address account) internal view returns (bool) {\n        // This method relies on extcodesize/address.code.length, which returns 0\n        // for contracts in construction, since the code is only stored at the end\n        // of the constructor execution.\n\n        return account.code.length > 0;\n    }\n\n    /**\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\n     * `recipient`, forwarding all available gas and reverting on errors.\n     *\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\n     * imposed by `transfer`, making them unable to receive funds via\n     * `transfer`. {sendValue} removes this limitation.\n     *\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\n     *\n     * IMPORTANT: because control is transferred to `recipient`, care must be\n     * taken to not create reentrancy vulnerabilities. Consider using\n     * {ReentrancyGuard} or the\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\n     */\n    function sendValue(address payable recipient, uint256 amount) internal {\n        require(address(this).balance >= amount, "Address: insufficient balance");\n\n        (bool success, ) = recipient.call{value: amount}("");\n        require(success, "Address: unable to send value, recipient may have reverted");\n    }\n\n    /**\n     * @dev Performs a Solidity function call using a low level `call`. A\n     * plain `call` is an unsafe replacement for a function call: use this\n     * function instead.\n     *\n     * If `target` reverts with a revert reason, it is bubbled up by this\n     * function (like regular Solidity function calls).\n     *\n     * Returns the raw returned data. To convert to the expected return value,\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\n     *\n     * Requirements:\n     *\n     * - `target` must be a contract.\n     * - calling `target` with `data` must not revert.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionCall(target, data, "Address: low-level call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\n     * `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, 0, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but also transferring `value` wei to `target`.\n     *\n     * Requirements:\n     *\n     * - the calling contract must have an ETH balance of at least `value`.\n     * - the called Solidity function must be `payable`.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value\n    ) internal returns (bytes memory) {\n        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\n     *\n     * _Available since v3.1._\n     */\n    function functionCallWithValue(\n        address target,\n        bytes memory data,\n        uint256 value,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(address(this).balance >= value, "Address: insufficient balance for call");\n        require(isContract(target), "Address: call to non-contract");\n\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\n        return functionStaticCall(target, data, "Address: low-level static call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a static call.\n     *\n     * _Available since v3.3._\n     */\n    function functionStaticCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal view returns (bytes memory) {\n        require(isContract(target), "Address: static call to non-contract");\n\n        (bool success, bytes memory returndata) = target.staticcall(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\n        return functionDelegateCall(target, data, "Address: low-level delegate call failed");\n    }\n\n    /**\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\n     * but performing a delegate call.\n     *\n     * _Available since v3.4._\n     */\n    function functionDelegateCall(\n        address target,\n        bytes memory data,\n        string memory errorMessage\n    ) internal returns (bytes memory) {\n        require(isContract(target), "Address: delegate call to non-contract");\n\n        (bool success, bytes memory returndata) = target.delegatecall(data);\n        return verifyCallResult(success, returndata, errorMessage);\n    }\n\n    /**\n     * @dev Tool to verifies that a low level call was successful, and revert if it wasn\'t, either by bubbling the\n     * revert reason using the provided one.\n     *\n     * _Available since v4.3._\n     */\n    function verifyCallResult(\n        bool success,\n        bytes memory returndata,\n        string memory errorMessage\n    ) internal pure returns (bytes memory) {\n        if (success) {\n            return returndata;\n        } else {\n            // Look for revert reason and bubble it up if present\n            if (returndata.length > 0) {\n                // The easiest way to bubble the revert reason is using memory via assembly\n\n                assembly {\n                    let returndata_size := mload(returndata)\n                    revert(add(32, returndata), returndata_size)\n                }\n            } else {\n                revert(errorMessage);\n            }\n        }\n    }\n}\n',
    "contracts/PaymentSplitter.sol":
        '// SPDX-License-Identifier: MIT\n// Adaptation of the OpenZeppelin Contracts v4.4.1 (finance/PaymentSplitter.sol)\npragma solidity ^0.8.10;\n\nimport "../@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";\nimport "../@openzeppelin/contracts/utils/Address.sol";\n\ninterface IWithdrawal_ {\n    function withdraw() external;\n}\n\n/**\n * @title PaymentSplitter\n * @dev This contract allows to split REEF payments among a group of accounts. The sender does not need to be aware\n * that the REEF will be split in this way, since it is handled transparently by the contract.\n *\n * The split can be in equal parts or in any other arbitrary proportion. The way this is specified is by assigning each\n * account to a number of shares. Of all the REEF that this contract receives, each account will then be able to claim\n * an amount proportional to the percentage of total shares they were assigned.\n *\n * `PaymentSplitter` follows a _pull payment_ model. This means that payments are not automatically forwarded to the\n * accounts but kept in this contract, and the actual transfer is triggered as a separate step by calling the {release}\n * function.\n *\n * NOTE: This contract assumes that ERC20 tokens will behave similarly to native tokens (Ether). Rebasing tokens, and\n * tokens that apply fees during transfers, are likely to not be supported as expected. If in doubt, we encourage you\n * to run tests before sending real value to this contract.\n */\ncontract PaymentSplitterERC20 {\n    event PaymentReleased(address indexed to, uint256 amount);\n    event PaymentReceived(address indexed from, uint256 amount);\n    event ERC20PaymentReleased(IERC20 indexed token, address indexed to, uint256 amount);\n\n    struct PayeeShare {\n        address payee;\n        uint256 share;\n    }\n\n    uint256 public totalShares;\n    uint256 private totalReleased;\n    mapping(address => uint256) public shares;\n    mapping(address => uint256) public released;\n    address[] private payees;\n    mapping(IERC20 => uint256) public totalReleasedERC20;\n    mapping(IERC20 => mapping(address => uint256)) public releasedERC20;\n\n    /**\n     * @dev Creates an instance of `PaymentSplitter` where each account in `_payees` is assigned the number of shares at\n     * the matching position in the `_shares` array.\n     *\n     * All addresses in `_payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no\n     * duplicates in `_payees`.\n     */\n    constructor(address[] memory _payees, uint256[] memory _shares) payable {\n        require(\n            _payees.length == _shares.length,\n            "PaymentSplitter: payees and shares length mismatch"\n        );\n        require(_payees.length > 0, "PaymentSplitter: no payees");\n\n        for (uint256 i; i < _payees.length; i++) {\n            _addPayee(_payees[i], _shares[i]);\n        }\n    }\n\n    /**\n     * @dev The REEF received will be logged with {PaymentReceived} events. Note that these events are not fully\n     * reliable: it\'s possible for a contract to receive REEF without triggering this function. This only affects the\n     * reliability of the events, and not the actual splitting of REEF.\n     *\n     * To learn more about this see the Solidity documentation for\n     * https://solidity.readthedocs.io/en/latest/contracts.html#fallback-function[fallback\n     * functions].\n     */\n    receive() external payable {\n        emit PaymentReceived(msg.sender, msg.value);\n    }\n\n    /**\n     * @dev Triggers a transfer to `account` of the amount of REEF they are owed, according to their percentage of the\n     * total shares and their previous withdrawals.\n     */\n    function release(address payable account) external {\n        uint256 payment = available(account);\n\n        require(payment != 0, "PaymentSplitter: account is not due payment");\n\n        released[account] += payment;\n        totalReleased += payment;\n\n        Address.sendValue(account, payment);\n        emit PaymentReleased(account, payment);\n    }\n\n    /**\n     * @dev Triggers a transfer to `account` of the amount of `token` tokens they are owed, according to their\n     * percentage of the total shares and their previous withdrawals. `token` must be the address of an IERC20\n     * contract.\n     */\n    function releaseERC20(IERC20 token, address account) public virtual {\n        uint256 payment = availableERC20(token, account);\n\n        require(payment != 0, "PaymentSplitter: account is not due payment");\n\n        releasedERC20[token][account] += payment;\n        totalReleasedERC20[token] += payment;\n\n        SafeERC20.safeTransfer(token, account, payment);\n        emit ERC20PaymentReleased(token, account, payment);\n    }\n\n    /**\n     * @dev Withdraws available balance for contract with address `addr`. To be used with contracts that implement the\n     * _pull payment_ model with a _withdrawal()_ function.\n     */\n    function withdrawFromContract(address addr) external {\n        require(shares[msg.sender] > 0, "PaymentSplitter: caller has no shares");\n        IWithdrawal_(addr).withdraw();\n    }\n\n    /**\n     * @dev Returns the amount of REEF owed to `account`, according to their percentage of the total shares and their\n     * previous withdrawals.\n     */\n    function available(address account) public view returns (uint256) {\n        require(shares[account] > 0, "PaymentSplitter: account has no shares");\n\n        uint256 totalReceived = address(this).balance + totalReleased;\n        return _pendingPayment(account, totalReceived, released[account]);\n    }\n\n    /**\n     * @dev Returns the amount of `token` tokens owed to `account`, according to their percentage of the total shares\n     * and their previous withdrawals.\n     */\n    function availableERC20(IERC20 token, address account) public view returns (uint256) {\n        require(shares[account] > 0, "PaymentSplitter: account has no shares");\n\n        uint256 totalReceived = token.balanceOf(address(this)) + totalReleasedERC20[token];\n        return _pendingPayment(account, totalReceived, releasedERC20[token][account]);\n    }\n\n    /**\n     * @dev Returns an array with all payees with their respective shares.\n     */\n    function getPayees() external view returns (PayeeShare[] memory) {\n        PayeeShare[] memory payeeShareArray = new PayeeShare[](payees.length);\n        for (uint256 i; i < payees.length; i++) {\n            address payee = payees[i];\n            payeeShareArray[i] = PayeeShare(payee, shares[payee]);\n        }\n        return payeeShareArray;\n    }\n\n    /**\n     * @dev internal logic for computing the pending payment of an `account` given the token historical balances and\n     * already released amounts.\n     */\n    function _pendingPayment(\n        address account,\n        uint256 totalReceived,\n        uint256 alreadyReleased\n    ) private view returns (uint256) {\n        return (totalReceived * shares[account]) / totalShares - alreadyReleased;\n    }\n\n    /**\n     * @dev Add a new payee to the contract.\n     * @param account The address of the payee to add.\n     * @param _shares The number of shares owned by the payee.\n     */\n    function _addPayee(address account, uint256 _shares) private {\n        require(account != address(0), "PaymentSplitter: account is the zero address");\n        require(_shares > 0, "PaymentSplitter: shares are 0");\n        require(shares[account] == 0, "PaymentSplitter: account already has shares");\n\n        payees.push(account);\n        shares[account] = _shares;\n        totalShares += _shares;\n    }\n}\n',
};

export const metadataArtifactDeploy = {
    compiler: {
        version: "0.8.4+commit.c7e474f2",
    },
    settings: {
        compilationTarget: {
            "contracts/PaymentSplitter.sol": "PaymentSplitterERC20",
        },
        evmVersion: "istanbul",
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
    version: 1,
};
