# todo list app

# description
react project initially created from tutorial "React & TypeScript - Course for Beginners" by freeCodeCamp.org on YouTube.

todo list smart contract and tests written in solidity using Foundry smart contract development toolchain.

deploy script made using Hardhat.

# run project
to test contracts, run "forge test" in typescript-project/foundry

to deploy contract, run "npx hardhat run --network goreli scripts/deploy.ts" in typescript-project/hardhat

if new deploy, running react frontend, run "cp hardhat/artifacts/contracts/TodoList.sol/TodoList.json src" in typescript-project

update contractAddress in typescript-project/src/App.tsx

to run react frontend, run "npm start" in typescript-project

# deployments
last contract deployed on goreli at 0xaA3bcffb2599dfF278C8121E260107e307744404

