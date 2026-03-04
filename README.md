# [Cheatsheet VS Code Extension](https://marketplace.visualstudio.com/items?itemName=1u.cheatsheet-viewer)

Quickly search and view markdown cheatsheets directly from the VS Code sidebar.

## Features

-   **Sidebar Browser**: A dedicated activity bar icon to browse all markdown files.
-   **Markdown Preview**: Click any document to instantly view its rendered version.
-   **Quick Search**: Focus the sidebar list and start typing to filter the available cheatsheets.
-   **Keybindings**: Use `cmd+shift+c` to quickly open and focus the Cheatsheet sidebar.

## Getting Started

### Development & Testing
1.  Open the workspace in VS Code.
2.  Press `F5` to launch the **Extension Development Host**.
3.  Click the **Cheatsheet** icon in the sidebar (Activity Bar) of the new window.

### Structure
-   `extension.js`: Main logic for the sidebar tree view and file-opening commands.
-   `package.json`: Extension manifest and layout contribution.
-   `docs/`: Folder where markdown cheatsheets should be placed.

## Publishing

The way to publish is via the **Web UI**:

1.  **Install**: Install the npm package `vsce` by running `npm install -g vsce`.
2.  **Package**: Run `vsce package`. This generates a `.vsix` file.
3.  **Upload**: Go to the [Marketplace Management Portal](https://marketplace.visualstudio.com/manage) and upload the `.vsix` file.

## Acknowledgements

**Credits:** [Quick Reference Cheatsheets](https://github.com/jaywcjlove/reference) by jaywcjlove.
