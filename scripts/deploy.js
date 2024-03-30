const hre = require("hardhat");

// 0x5fbdb2315678afecb367f032d93f642f64180aa3

async function main()
{
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();

    // await CrowdFunding.deployed();

    // Wait for 2 seconds (adjust as needed)
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`CrowdFunding deployed to ${crowdFunding.address}`);
}

main().catch((error) =>{
    console.error(error);
    process.exitCode = 1;
});