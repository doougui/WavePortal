const wavers = [];

const getWaveCount = async (waveContract) => {
  return await waveContract.getTotalWaves();
}

const waveAtYourself = async (waveContract) => {
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();
}

const getWaveFromARandomPerson = async (waveContract, randomPerson) => {
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  wavers.push(randomPerson.address);
}

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); 
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  const { log } = console;

  log("Contract deployed to:", waveContract.address);
  log("Contract deployed by:", owner.address);

  await getWaveCount(waveContract);

  await waveAtYourself(waveContract);
  log('Oh, you waved at yourself. Here, I\'ll give you a friend and he can wave at you.');

  await getWaveCount(waveContract);

  await getWaveFromARandomPerson(waveContract, randomPerson);

  log(
    'These are all the people that waved at you (except for yourself):', 
    wavers.join(', ')
  );

  await getWaveCount(waveContract);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();