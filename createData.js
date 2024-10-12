require("dotenv").config();

// const BigNumber = require("bignumber.js");
const Web3 = require("web3");

const web3 = new Web3(
  "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
);
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

const stakingv1_addy = "0x13f68067Da73c13aeAFEbd1349167a3040217F09";
var TORR = "0x195Ca22A177e6ED905c469f4F64Cf67e819f49c2";
var stakingv1_contract = new web3.eth.Contract(stakingv1_abi, stakingv1_addy);
var Final = [];
var amountsFinal = [];
// const gasPrice = new BigNumber(web3.utils.toWei("300001", "gwei"));
const gaslimit1 = 10000000;
var sumis = 0;
var totalis = 1615326695;
var newOutput = [];

async function getinfo() {
  try {
    var nnn = 0;

    // console.log(time.timestamp);
    // return;
    var currentBlock = await web3.eth.getBlockNumber();
    var frombl = 26525537;
    var tobl = 26525537 + 50000 - 1;
    var times = (currentBlock - frombl) / 50000;
    /*
    const events = await stakingv1_contract.getPastEvents("Deposit", {
      fromBlock: frombl,
      toBlock: tobl,
    });

    var json = JSON.stringify(events);

    fs.writeFile(`Events${frombl}to${tobl}`, json, (err) => {
      if (err) throw err;
    });
    */
    var eventsJSON = require("./Events26525537to26575536.json");
    console.log(eventsJSON.length);
    for (i = 0; i < 5; i++) {
      var account = eventsJSON[i].address;
      var amount = eventsJSON[i].returnValues[1];
      var timest = await web3.eth.getBlock(eventsJSON[i].blockNumber);
      //  console.log([account, amount, timest.timestamp]);
      Final.push([i, account, amount, timest.timestamp]);
    }
    console.log(Final);
    /*
    for (var i = 500; i < 703; i++) {
      var tempp = addys[i].addyw3;
      addysFinal.push(tempp);
      var tempp2 = addys[i].total_Bal;
      nnn += Number(
        ((10000 * tempp2) / totalis).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
      amountsFinal.push(
        ((10000 * 10 ** 18 * tempp2) / totalis).toLocaleString("fullwide", {
          useGrouping: false,
        })
      );
    }

    var batch = await stakingv1_contract.methods
      .getinfo(TORR, addysFinal, amountsFinal, 703 - 500)
      .send({
        from: "0x27D74069B4d7F2b9EeB35D2F6826738fe3EDE423",
        gas: gaslimit1,
        gasPrice: gasPrice,
      });
      */
  } catch (e) {
    console.log(e);
  }
}
getinfo();

async function exec() {
  try {
    for (var i = 0; i < addys2.length - 1; i++) {
      if (addys[i] && addys[i].total_Bal >= 10000)
        console.log(addys[i].total_Bal);
      newOutput.push(addys[i]);
    }

    var json = JSON.stringify(newOutput);
    fs.writeFile("OutputNEW.txt", json, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
}

// exec();
