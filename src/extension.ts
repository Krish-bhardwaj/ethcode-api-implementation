import * as vscode from 'vscode';
import {ethers} from 'ethers';
import { Provider } from 'ethers/types/providers';
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "ethcode-api-implementation" is now active!');

	let ethcodeExtension: any = vscode.extensions.getExtension('7finney.ethcode');
	let api = ethcodeExtension.exports;


	context.subscriptions.push(
		vscode.commands.registerCommand('ethcode-api-implementation.helloWorld', () => {
			vscode.window.showInformationMessage('Hello World from ethcode-api-implementation!');
		}),

		// STATUS
		vscode.commands.registerCommand('ethcode-api-implementation.status', () => {
			let status = api.status();
			vscode.window.showInformationMessage('EthCode API status: ' + status);
		}),


		// PROVIDER
		// 1. Get provider
		vscode.commands.registerCommand('ethcode-api-implementation.provider', async () => {
			let myProvider:Provider = await api.provider.get();
			
			vscode.window.showInformationMessage('Provider object created');

			let balance = await myProvider.getBalance('0x4f401e3Cd7bF9293bEA676b4431352Caa876Dfda');
			vscode.window.showInformationMessage('Balance : ' + balance);
		}),

		// 2. NETWORK
		// 2.1. Get network
		vscode.commands.registerCommand('ethcode-api-implementation.getNetwork', () => {
			let network:any = api.provider.network.get();
			vscode.window.showInformationMessage('Current network chain ID selected in EthCode: ' + network.chainID);
		}),
		// 2.2. Set network
		vscode.commands.registerCommand('ethcode-api-implementation.setNetwork', () => {
			let change = api.provider.network.set('Polygon');
			vscode.window.showInformationMessage(change);
		}),
		// 2.3. Get network list
		vscode.commands.registerCommand('ethcode-api-implementation.getNetworkList', () => {
			let networkList:any = api.provider.network.list();
			vscode.window.showInformationMessage('Network list: ' + networkList.toString());
		}),


		// WALLET
		// 1. Get wallet
		vscode.commands.registerCommand('ethcode-api-implementation.getWallet', async () => {
			// Wallet object will be created with the default account selected in EthCode
			let myWallet:any = await api.wallet.get();
			// or
			// Wallet object will be created with the account selected in EthCode
			let myCustomWallet:any = await api.wallet.get('0x45dfe3201a39a46c725dee5e2df85bcde13f97c1');
			vscode.window.showInformationMessage('Wallet object created');
			
			let walletAddress1 = myWallet.address;
			let walletAddress2 = myCustomWallet.address;
			vscode.window.showInformationMessage('Wallet address 1: ' + walletAddress1);
			vscode.window.showInformationMessage('Wallet address 2: ' + walletAddress2);

		}),

		// 2. Get wallet list
		vscode.commands.registerCommand('ethcode-api-implementation.getWalletList', async () => {
			let walletList:any = await api.wallet.list();
			vscode.window.showInformationMessage('Wallet list: ' + walletList.toString());
		}),


		// Contract
		// 1. Get contract object
		vscode.commands.registerCommand('ethcode-api-implementation.getContract', async () => {
			let wallet:any = await api.wallet.get();
			let abi = [
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "x",
							"type": "uint256"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"inputs": [],
					"name": "get",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "i",
							"type": "uint256"
						}
					],
					"name": "set",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				}
			]
			let contractAddress = '0x00F9AF0aA726e2793C92474dF190Ad6644f2a28E';
			let myContract:any = await api.contract.get(contractAddress, abi, wallet);
			vscode.window.showInformationMessage('Contract object created');
		}),
		// 2. List All functions in a abi
		vscode.commands.registerCommand('ethcode-api-implementation.listAllFunctions', async () => {
			let abi:any = await api.contract.abi('TEST');
			let functions:any = await api.contract.list(abi);
			console.log(functions);
		}),
		// 3. Execute a function
		vscode.commands.registerCommand('ethcode-api-implementation.executeFunction', async () => {

			console.log(result);

		}),
		// 4. Get contract abi
		vscode.commands.registerCommand('ethcode-api-implementation.getContractAbi', async () => {
			let abi:any = await api.contract.abi('TEST');
			console.log(abi);
		}),
		// 5. Get contract address
		vscode.commands.registerCommand('ethcode-api-implementation.getContractAddress', async () => {
			let address:any = await api.contract.getContractAddress('TEST');
			console.log(address);
		}),
		// 6. Get Function inputs
		vscode.commands.registerCommand('ethcode-api-implementation.getFunctionInputs', async () => {
			let inputs:any = await api.contract.getFunctionInput('TEST');
			console.log(inputs);
		}),
		// 7. Get Constructor inputs
		vscode.commands.registerCommand('ethcode-api-implementation.getConstructorInputs', async () => {
			let inputs:any = await api.contract.getConstructorInput('TEST');
			console.log(inputs);
		}),
	);

}

export function deactivate() { }
