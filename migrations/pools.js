// https://docs.basis.cash/mechanisms/yield-farming
const INITIAL_BSC_FOR_POOLS = 50000;
const INITIAL_BSS_FOR_DAI_BSC = 750000;
const INITIAL_BSS_FOR_DAI_BSS = 250000;

const POOL_START_DATE = Date.parse('2020-12-05T00:00:00Z') / 1000;

const bacPools = [
  { contractName: 'BSCDAIPool', token: 'DAI' },
  { contractName: 'BSCSUSDPool', token: 'SUSD' },
  { contractName: 'BSCUSDCPool', token: 'USDC' },
  { contractName: 'BSCUSDTPool', token: 'USDT' },
  { contractName: 'BSCyCRVPool', token: 'yCRV' },
];

const basPools = {
  DAIBSC: { contractName: 'DAIBSCLPTokenSharePool', token: 'DAI_BSC-LPv2' },
  DAIBSS: { contractName: 'DAIBSSLPTokenSharePool', token: 'DAI_BSS-LPv2' },
};

module.exports = {
  POOL_START_DATE,
  INITIAL_BSC_FOR_POOLS,
  INITIAL_BSS_FOR_DAI_BSC,
  INITIAL_BSS_FOR_DAI_BSS,
  bacPools,
  basPools,
};
