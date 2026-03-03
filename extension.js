const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

class CheatsheetProvider {
    constructor(workspaceRoot, extensionPath) {
        this.workspaceRoot = workspaceRoot;
        this.extensionPath = extensionPath;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    async getChildren(element) {
        if (element) {
            return [];
        }

        let docsPath = '';
        if (this.workspaceRoot) {
            docsPath = path.join(this.workspaceRoot, 'docs');
        }

        // If no docs in workspace or no workspace, check extension docs
        if (!docsPath || !fs.existsSync(docsPath)) {
            docsPath = path.join(this.extensionPath, 'docs');
        }

        console.log('Searching for docs in:', docsPath);

        if (fs.existsSync(docsPath)) {
            return this.getDocsInFolder(docsPath);
        } else {
            return [];
        }
    }

    getDocsInFolder(folderPath) {
        try {
            const files = fs.readdirSync(folderPath);
            return files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const title = path.basename(file, '.md');
                    const filePath = path.join(folderPath, file);
                    const item = new vscode.TreeItem(title, vscode.TreeItemCollapsibleState.None);
                    item.command = {
                        command: 'cheatsheet.openFile',
                        title: 'Open File',
                        arguments: [vscode.Uri.file(filePath)]
                    };
                    item.contextValue = 'cheatsheet';
                    item.tooltip = title;
                    return item;
                });
        } catch (err) {
            console.error('Error reading docs folder:', err);
            return [];
        }
    }
}

function activate(context) {
    console.log('Cheatsheet extension activated');

    const rootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;

    const cheatsheetProvider = new CheatsheetProvider(rootPath, context.extensionPath);
    vscode.window.registerTreeDataProvider('cheatsheet-list', cheatsheetProvider);

    vscode.commands.registerCommand('cheatsheet.openFile', (resource) => {
        vscode.commands.executeCommand('markdown.showPreview', resource);
    });

    vscode.commands.registerCommand('cheatsheet.refresh', () => cheatsheetProvider.refresh());
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}
