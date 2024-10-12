require("dotenv").config();

// const BigNumber = require("bignumber.js");
const Web3 = require("web3");
const ethUtil = require("ethereumjs-util");
const web3 = new Web3("https://bsc-dataseed1.defibit.io");
const fs = require("fs");
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
// console.log(account);
const acc1 = web3.eth.accounts.wallet.add(account);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const myAddress = web3.eth.defaultAccount;
// const addys = require("./Output2.json");

//THREADS
const stakingv1_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_NFTaddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_NFTaddress2",
        type: "address",
      },
      {
        internalType: "address",
        name: "_USDTaddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenRecovered",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AdminTokenRecovery",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "ClaimIsInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "CompoundIsInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "depositFeeBP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawFeeBP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "compoundFeeBP",
        type: "uint256",
      },
    ],
    name: "SetFees",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserCompound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserWithdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "WithdrawIsInitiated",
    type: "event",
  },
  {
    inputs: [],
    name: "ActionDay",
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
        name: "_Emergencyfund",
        type: "address",
      },
    ],
    name: "ChangeEmergencyfeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeWallet",
        type: "address",
      },
    ],
    name: "ChangefeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "Claim",
    outputs: [
      {
        internalType: "uint256",
        name: "claimed",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "Compound",
    outputs: [
      {
        internalType: "uint256",
        name: "compoundedAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DROP_RATE",
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
    name: "Emergencyfund",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Friday",
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
        internalType: "uint256",
        name: "_action",
        type: "uint256",
      },
    ],
    name: "InitiateAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "InjectRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTContract",
    outputs: [
      {
        internalType: "contract myNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTContract2",
    outputs: [
      {
        internalType: "contract myNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTaddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTaddress2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TotalmemberDeposits",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_decision",
        type: "uint256",
      },
    ],
    name: "UnlockDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "UsersInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "finalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newRate",
        type: "uint256",
      },
    ],
    name: "changeDROP_RATE",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depositFeeBP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_withdrawFeeBP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_compoundFeeBP",
        type: "uint256",
      },
    ],
    name: "changeFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_NFT",
        type: "address",
      },
      {
        internalType: "address",
        name: "_NFT2",
        type: "address",
      },
    ],
    name: "changeNFTcontract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_USDTaddress",
        type: "address",
      },
    ],
    name: "changeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawLimit",
        type: "uint256",
      },
    ],
    name: "changeWithdraw_Limit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newaddy",
        type: "address",
      },
    ],
    name: "changeWithdrawalAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "compoundFeeBP",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_days",
        type: "uint256",
      },
    ],
    name: "depositCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositFeeBP",
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
    name: "feeWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDifferenceFromActionDay",
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
    name: "getWeek",
    outputs: [
      {
        internalType: "uint256",
        name: "totalweeks",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "memberDeposit",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastActionTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "isCompound",
            type: "uint256",
          },
        ],
        internalType: "struct Staking.Depo",
        name: "dep",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
    ],
    name: "pendingReward",
    outputs: [
      {
        internalType: "uint256",
        name: "USDTReward",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "USDTReward",
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
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "returnFinalAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "finalAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "seconds_per_day",
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
    name: "startBlock",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
    name: "userInfo",
    outputs: [
      {
        internalType: "address",
        name: "WithdrawAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "TotalDeposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "TotalWithdrawn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "NoOfDeposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "TotalReinvested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initialDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastRewardTimeStamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "WithdrawDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "WithdrawInitiated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ClaimInitiated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "CompoundInitiated",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFeeBP",
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
    name: "withdrawLimit",
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
];
const stakingv2_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
    ],
    name: "createDeposits",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenRecovered",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AdminTokenRecovery",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_claimLimit",
        type: "uint256",
      },
    ],
    name: "changeclaim_Limit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_EmergencyfeeWallet",
        type: "address",
      },
    ],
    name: "ChangeEmergencyfeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeWallet",
        type: "address",
      },
    ],
    name: "ChangefeeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depositFeeBP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_withdrawFeeBP",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_compoundFeeBP",
        type: "uint256",
      },
    ],
    name: "changeFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newFriday",
        type: "uint256",
      },
    ],
    name: "changeFriday",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_NFT",
        type: "address",
      },
      {
        internalType: "address",
        name: "_NFT2",
        type: "address",
      },
    ],
    name: "changeNFTcontract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawLimit",
        type: "uint256",
      },
    ],
    name: "changeWithdraw_Limit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newaddy",
        type: "address",
      },
    ],
    name: "changeWithdrawalAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "Claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "ClaimComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "ClaimIsInitiated",
    type: "event",
  },
  {
    inputs: [],
    name: "Compound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "CompoundComplete",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "createCompound",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "createInitiateClaim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "InitiateClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
    ],
    name: "InitiateWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "pew",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
    ],
    name: "recoverTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_seconds_per_day",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_warm_up_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unlock_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_interaction_period_gap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reward_period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_withdraw_delay",
        type: "uint256",
      },
    ],
    name: "safety",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "depositFeeBP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawFeeBP",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "compoundFeeBP",
        type: "uint256",
      },
    ],
    name: "SetFees",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_depo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_decision",
        type: "uint256",
      },
    ],
    name: "UnlockDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserWithdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "finalAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depoNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decision",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unlockDay",
        type: "uint256",
      },
    ],
    name: "WithdrawIsInitiated",
    type: "event",
  },
  {
    inputs: [],
    name: "claimLimit",
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
    name: "compoundFeeBP",
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
        name: "_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_days",
        type: "uint256",
      },
    ],
    name: "depositCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositFeeBP",
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
    name: "DROP_RATE",
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
    name: "EmergencyfeeWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Friday",
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
    name: "getAllPendingClaims",
    outputs: [
      {
        internalType: "uint256",
        name: "totalUSDT",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPendingRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "totalUSDT",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPendingWithdrawls",
    outputs: [
      {
        internalType: "uint256",
        name: "totalUSDT",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDifferenceFromActionDay",
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
    name: "getWeek",
    outputs: [
      {
        internalType: "uint256",
        name: "totalweeks",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interaction_period_gap",
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
        name: "_addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
    ],
    name: "memberDeposit",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastActionTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlocked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "isCompound",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "WithdrawDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "WithdrawInitiated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastRewardTimeStamp",
            type: "uint256",
          },
        ],
        internalType: "struct Staking.Depo",
        name: "dep",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTaddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTaddress2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingClaims",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPending",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingReward",
    outputs: [
      {
        internalType: "uint256",
        name: "finalAmount",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPending",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingWithdrawls",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPending",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reward_period",
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
    name: "seconds_per_day",
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
    name: "startBlock",
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
    name: "unlock_period",
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
    name: "USDT",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address",
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
    name: "userInfo",
    outputs: [
      {
        internalType: "address",
        name: "WithdrawAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "NoOfDeposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initialDeposit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "ClaimInitiated",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "UsersInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "warm_up_period",
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
    name: "withdraw_delay",
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
    name: "withdrawFeeBP",
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
    name: "withdrawLimit",
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
];

var REFERENCE_BLOCK = 26526515;
var REFERENCE_TIMESTAMP = 1679005580;

const stakingv1_addy = "0x13f68067Da73c13aeAFEbd1349167a3040217F09";

const stakingv2_addy = "0xA44368ca739B769c143EBA9389646540cCe46688";

var stakingv1_contract = new web3.eth.Contract(stakingv1_abi, stakingv1_addy);
var stakingv2_contract = new web3.eth.Contract(stakingv2_abi, stakingv2_addy);

var Final = [];
var amountsFinal = [];
// const gasPrice = new BigNumber(web3.utils.toWei("300001", "gwei"));
const gaslimit1 = 1000000;
var sumis = 0;
var totalis = 1615326695;
var newOutput = [];

async function getinfo() {
  try {
    var nnn = 0;

    var ALLevents = [];
    var currentBlock = await web3.eth.getBlockNumber();
    //var frombl = 26525537; // creation block Staking v1
    var frombl2 = 27007056; // creation block Staking v2
    //var iters = Math.ceil((currentBlock - frombl) / 10000);
    var iters2 = Math.ceil((currentBlock - frombl2) / 10000);

    //var tobl = frombl + 10000 - 1;
    var tobl2 = frombl2 + 10000 - 1;
    // var times = (currentBlock - frombl) / 10000;
    //////////////data get part
    /*
    for (let i = 0; i < iters; i++) {
      var events = await stakingv1_contract.getPastEvents("Deposit", {
        fromBlock: frombl,
        toBlock: tobl,
      });
      console.log(tobl, frombl, tobl - frombl);
      ALLevents.push(events);
      frombl += 10000;
      tobl += 10000;
    }
    console.log(ALLevents.length);
       */

    for (let i = 0; i < iters2; i++) {
      var events = await stakingv2_contract.getPastEvents("ClaimIsInitiated", {
        fromBlock: frombl2,
        toBlock: tobl2,
      });
      console.log(tobl2, frombl2, tobl2 - frombl2);
      ALLevents.push(events);
      frombl2 += 10000;
      tobl2 += 10000;
    }

    console.log(ALLevents.length);

    var ALLeventsflattened = ALLevents.flat();

    var json = JSON.stringify(ALLeventsflattened);
    fs.writeFile(`ClaimsNewInitiated.json`, json, (err) => {
      if (err) throw err;
    });
    return;
    ///////////////////////process part
    // var ALLeventsflattened = require("./Events.json");
    /*
    var json = JSON.stringify(events);

    fs.writeFile(`Events${frombl}to${tobl}`, json, (err) => {
      if (err) throw err;
    });
*/
    var ALLeventsflattened = require("./EventsCompoundIsInitiated.json");

    const uniqueAddresses = Array.from(
      new Set(ALLeventsflattened.map((item) => item.returnValues.user))
    ).map((address) => {
      return { address };
    });

    //console.log(uniqueAddresses);
    const addressStringsArray = uniqueAddresses.map((obj) => obj.address);

    console.log(addressStringsArray);

    for (i = 0; i < ALLeventsflattened.length; i++) {
      var account = ALLeventsflattened[i].returnValues[0];
      var amount = 0.9 * ALLeventsflattened[i].returnValues[1];
      var timest = await web3.eth.getBlock(ALLeventsflattened[i].blockNumber);
      //  console.log([account, amount, timest.timestamp]);
      Final.push([
        i,
        account,
        amount / 10 ** 18,
        amount,
        ALLeventsflattened[i].blockNumber,
        timest.timestamp,
      ]);
      //   setTimeout(async () => {}, 2000);
    }
    var json = JSON.stringify(Final);
    fs.writeFile(`FinalDeposits.json`, json, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
}

async function execDeposit() {
  try {
    const final = require("./EventsDepositsBothContracts.json");
    var lengthis = final.length;
    console.log(lengthis);

    for (let i = 0; i < lengthis; i++) {
      var timest = await web3.eth.getBlock(final[i].blockNumber);
      console.log(i);
      var nonce = await web3.eth.getTransactionCount(myAddress);
      await stakingv2_contract.methods
        .createDeposits(
          final[i].returnValues.user,
          (0.9 * final[i].returnValues[1]).toLocaleString("fullwide", {
            useGrouping: false,
          }),
          timest.timestamp
        )
        .send({
          from: myAddress,
          gas: gaslimit1,
          //gasPrice: gasPrice,
          nonce: nonce,
        });
      await setTimeout(await myFunction, 2000);
    }
  } catch (e) {
    console.log(e);
  }
}
async function execClaim() {
  try {
    //const final = require("./Migrations2Claims.json");

    var lengthis = final.length;

    for (let i = 0; i < lengthis; i++) {
      console.log(i);
      var nonce = await web3.eth.getTransactionCount(myAddress);
      await stakingv2_contract.methods.createInitiateClaim(final[i]).send({
        from: myAddress,
        gas: gaslimit1,
        //gasPrice: gasPrice,
        nonce: nonce,
      });
      await setTimeout(await myFunction, 3000);
    }
  } catch (e) {
    console.log(e);
  }
}
async function execComp() {
  try {
    const final = require("./Migrations2Compounds.json");
    var lengthis = final.length;

    for (let i = 0; i < lengthis; i++) {
      console.log(i, final[i]);
      var nonce = await web3.eth.getTransactionCount(myAddress);
      await stakingv2_contract.methods.createCompound(final[i]).send({
        from: myAddress,
        gas: gaslimit1,
        //gasPrice: gasPrice,
        nonce: nonce,
      });
      await setTimeout(await myFunction, 3000);
    }
  } catch (e) {
    console.log(e);
  }
}
//getinfo();
//execClaim();
//execDeposit();
//execComp();
//getAllClaims();
async function getAllClaims() {
  const final = require("./Migrations2Claims.json");
  var lengthis = final.length;
  var total = 0;
  for (let i = 0; i < lengthis; i++) {
    var noDep = await stakingv2_contract.methods
      .userInfo(final[i])
      .call({ from: myAddress });
    for (let j = 0; j < noDep.NoOfDeposits; j++) {
      const usd = await stakingv2_contract.methods
        .pendingReward(j, final[i])
        .call({
          from: myAddress,
        });
      total = Number(total) + Number(usd);
    }
    console.log(i, total / 10 ** 18);
  }
}
function toChecksumAddress(address) {
  // Ensure the address is in lowercase before converting
  const lowercaseAddress = address.toLowerCase();

  // Convert the address to its checksummed version
  const checksummedAddress = ethUtil.toChecksumAddress(lowercaseAddress);

  return checksummedAddress;
}

function myFunction() {}

// Call the function immediately
//myFunction();

// Call the function again after a 2-second delay (2000 milliseconds)
