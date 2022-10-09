# todo list app

# project description
A simple To-Do list where a user can create todo items, edit todo items, mark items as complete, and hide todo items. User must first connect their ethereum wallet (currently Goerli testnet). If a wallet has previoulsy used this app, the page will populate with previoulsy created todo items, and will indicate whether they have been completed. Every create, edit, and complete action will initiate a smart contract transaction. Upon every confirmed transaction, the timestamp (item created), user wallet address, transaction hash, and transaction type (create, edit, complete) is sent to the REST api and recorded in a mongo database.

# development process/stack
react frontend initially created from tutorial "React & TypeScript - Course for Beginners" by freeCodeCamp.org on YouTube.

todo list smart contract and tests written in solidity using Foundry smart contract development toolchain.

deploy script made using Hardhat.

REST API made using nodejs, express, and mongodb

# run project
to test contracts, run "forge test" in /typescript-project/foundry

to deploy contract, run "npx hardhat run --network goerli scripts/deploy.ts" in /typescript-project/hardhat

update contractAddress in /typescript-project/src/App.tsx

before running react frontend with newly deployed contract, run "cp hardhat/artifacts/contracts/TodoList.sol/TodoList.json src" in /typescript-project

to start the REST api, run "npm run devStart" in /server

to run react frontend, run "npm start" in /typescript-project

# deployments
last contract deployed on goreli at 0x083D34c0CD59957920CAd94c877d57E79408aBE6

