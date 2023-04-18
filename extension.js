// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, "Tagging Tool for Docuxml" is now active. Happy tagging!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	const OtherTag1 = 'Udef_Star';
	const OtherTag2 = 'Udef_Field';
	const OtherTag3 = 'Udef_Luminaries';

	const tagList = [
		['PersonName', 'PersonName'],
		['LocName', 'LocName'],
		['Udef_BookName', 'BookName'],
		[OtherTag1, 'Other1'],
		[OtherTag2, 'Other2'],
		[OtherTag3, 'Other3']
	];

	function replacement(word, type) {
		let result = ''
		if (type == 'PersonName') {
			result = '<PersonName Term="Ｏ-' + word + '">' + word + '</PersonName>';
		}
		// else if (type == 'Udef_Dynasty2') {
		// 	result = '<Udef_Dynasty Term="先秦-' + word + '">' + word + '</Udef_Dynasty>';
		// }
		// else if (type == 'Udef_Dynasty' && word == '後魏') {
		// 	result = '<Udef_Dynasty Term="北魏">' + word + '</Udef_Dynasty>';
		// }
		else {
			result = '<' + type + ' Term="' + word + '">' + word + '</' + type + '>';
		}
		return result;
	}

	function tagging(editor, type) {
		const doc = editor.document;
		const selection = editor.selection;
		const word = doc.getText(selection);
		if (word != '') {
			editor.edit(eb => {
				eb.replace(selection, replacement(word, type))
			})
			vscode.window.setStatusBarMessage('Tagged ' + type + ': ' + word, 5000);
		}
		else {
			vscode.window.showInformationMessage('Please select some text.');
		}
	}

	tagList.forEach(function (item) {
		let command_name = 'tagging-tool-for-docuxml.tagging' + item[1]
		context.subscriptions.push(
			vscode.commands.registerCommand(command_name, function () {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					tagging(editor, item[0]);
				}
			})
		)
	});
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
