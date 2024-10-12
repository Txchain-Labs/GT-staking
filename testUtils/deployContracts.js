function toBN(number, decimal) {
  return (number * 10 ** decimal).toLocaleString("fullwide", {
    useGrouping: false,
  });
}

module.exports = async function () {
  const Token = await ethers.getContractFactory("MyToken");
  const USDT = await ethers.getContractFactory("BEP20USDT");
  const Staking = await ethers.getContractFactory("StakingTest");

  global.USDTContract = await USDT.deploy();

  global.NFTtokenContract = await Token.deploy(global.USDTContract.address);
  global.NFTtokenContract2 = await Token.deploy(global.USDTContract.address);
  global.stakingContract = await Staking.deploy(
    global.NFTtokenContract.address,
    global.NFTtokenContract2.address,
    global.USDTContract.address
  );

  const [
    owner,
    wallet1,
    wallet2,
    wallet3,
    wallet4,
    wallet5,
    marketingWallet,
    devWallet,
    buybackWallet,
    rewardsWallet,
  ] = await ethers.getSigners();

  await stakingContract.changeNFTcontract(
    NFTtokenContract.address,
    NFTtokenContract2.address
  );
  await USDTContract.approve(stakingContract.address, toBN(10000000, 18));

  await USDTContract.connect(wallet1).approve(
    stakingContract.address,
    toBN(10000000, 18)
  );
  await USDTContract.connect(wallet2).approve(
    stakingContract.address,
    toBN(10000000, 18)
  );
  await USDTContract.connect(wallet3).approve(
    stakingContract.address,
    toBN(10000000, 18)
  );
  await USDTContract.transfer(stakingContract.address, toBN(200000, 18));
  await USDTContract.transfer(wallet1.address, toBN(20000, 18));
  await USDTContract.transfer(wallet2.address, toBN(20000, 18));
  await USDTContract.transfer(wallet3.address, toBN(20000, 18));
  await USDTContract.approve(NFTtokenContract.address, toBN(10000, 18));
  await USDTContract.connect(wallet1).approve(
    NFTtokenContract.address,
    toBN(10000, 18)
  );
  await USDTContract.connect(wallet2).approve(
    NFTtokenContract.address,
    toBN(10000, 18)
  );
  await USDTContract.connect(wallet3).approve(
    NFTtokenContract.address,
    toBN(10000, 18)
  );
  await stakingContract.initialize();

  global.owner = owner;
  global.wallet1 = wallet1;
  global.wallet2 = wallet2;
  global.wallet3 = wallet3;
  global.wallet4 = wallet4;
  global.wallet5 = wallet5;
  global.marketingWallet = marketingWallet;
  global.devWallet = devWallet;
  global.buybackWallet = buybackWallet;
  global.rewardsWallet = rewardsWallet;

  global.zeroAddress = "0x0000000000000000000000000000000000000000";
};
