const {
  basPools,
  INITIAL_BSS_FOR_DAI_BSC,
  INITIAL_BSS_FOR_DAI_BSS,
} = require('./pools');

// Pools
// deployed first
const Share = artifacts.require('Share');
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForDAIBSC = unit.muln(INITIAL_BSS_FOR_DAI_BSC);
  const totalBalanceForDAIBSS = unit.muln(INITIAL_BSS_FOR_DAI_BSS);
  const totalBalance = totalBalanceForDAIBSC.add(totalBalanceForDAIBSS);

  const share = await Share.deployed();

  const lpPoolDAIBSC = artifacts.require(basPools.DAIBSC.contractName);
  const lpPoolDAIBSS = artifacts.require(basPools.DAIBSS.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    share.address,
    lpPoolDAIBSC.address,
    totalBalanceForDAIBSC.toString(),
    lpPoolDAIBSS.address,
    totalBalanceForDAIBSS.toString()
  );
  const distributor = await InitialShareDistributor.deployed();

  await share.mint(distributor.address, totalBalance.toString());
  console.log(
    `Deposited ${INITIAL_BSS_FOR_DAI_BSC} BSS to InitialShareDistributor.`
  );

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolDAIBSC
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));
  await lpPoolDAIBSS
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
