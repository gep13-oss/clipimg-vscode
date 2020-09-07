# ClipImg Visual Studio Code Extension

This extension brings support for [ClipImg](https://github.com/gep13-oss/clipimg-vscode) to Visual Studio Code.

## Table of Contents

1. [What is ClipImg?](#what-is-clipimg)
1. [Commands](#commands)
1. [Resources](#resources)
1. [Installation](#installation)
1. [Documentation](#documentation)
1. [Contributing](#contributing)
1. [Releases](#releases)

## What is ClipImg?

ClipImg will let you take an image from your clipboard and automatically uploaded it to Azure blob storage, and the markdown needed to display that image inserted to the editor.

![Example usage ClipImg](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/056f020b-dbf5-4ce7-8fee-60364f53e0c4.gif?sv=2019-02-02&st=2020-09-06T18%3A53%3A00Z&se=2030-09-07T18%3A53%3A00Z&sr=b&sp=r&sig=WODnerlYHYnA869E4TLJGI1wphm9uj6S%2FhI3kl1H3YI%3D)

## Commands

The ClipImg Visual Studio Code provides the following commands:

* Paste Image as Markdown
    * MacOS <kbd>Ctrl</kbd> + <kbd>Cmd</kbd> + <kbd>v</kbd>
    * Linux / Windows <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>v</kbd>

## Installation

You can either install this extension in the normal way, or you can choose to install using Chocolatey:

```powershell
choco install clipimg-vscode
```

## Usage

1. Have an image in the clipboard
1. Invoke command
    - Pick `Paste Image as Markdown` from command palette!<br/>
    ![Paste Image as Markdown in Command Palette](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/1e3da757-6c35-cfd1-79e5-26df02236946.png?sv=2019-12-12&st=2020-09-05T14%3A51%3A52Z&se=2030-09-06T14%3A51%3A52Z&sr=b&sp=r&sig=vh4TxVmnFcoQfR4QVAHQ%2B2d1E4AciBXDVljZRpEUWAo%3D)<br/>or
    - Use keyboard shortcut
        - MacOS <kbd>Ctrl</kbd> + <kbd>Cmd</kbd> + <kbd>v</kbd>
        - Linux / Windows <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>v</kbd>
1. Enter image alt text<br/>![Image alt text input](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/9a2251d7-08cf-72e5-d158-4cc5676add06.png?sv=2019-12-12&st=2020-09-05T14%3A57%3A25Z&se=2030-09-06T14%3A57%3A25Z&sr=b&sp=r&sig=POT%2Bd0dfrAZxewCNhq8WUUj9xi3Uh23K170i2QcKip4%3D)
1. The first time you execute the command in a workspace you'll be asked for the Azure storage account name to use<br/>
![Azure storage account input](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/8b160ae5-e702-a119-86e5-0d1324f4140c.png?sv=2019-12-12&st=2020-09-05T15%3A00%3A26Z&se=2030-09-06T15%3A00%3A26Z&sr=b&sp=r&sig=xESopPy9X9hGidHH4BGD4NPEn4%2BSYbKSqvJEifpmX8o%3D)<br/>
this is then stored in the current workspace settings.
1. The first time you use a specific storage account on your computer it'll ask for the Azure storage account key.</br>
![Azure storage account key input](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/911030b1-7b7a-a642-5aad-ac32f512af0e.png?sv=2019-12-12&st=2020-09-05T15%3A04%3A43Z&se=2030-09-06T15%3A04%3A43Z&sr=b&sp=r&sig=WgECpUxYCyaDf%2FjXrOHDEuxG3a46QLwaccvCJkajiNw%3D)
the key is stored in
    - Windows: Credential manager
    - MacOS: Keychain
    - Linux: Secret Service API/libsecret
1. Image is uploaded and markdown for the newly uploaded image is inserted into the editor</br>
![Example image markdown](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/5319cd97-a3a9-17e9-86d4-3a21182ca5d0.png?sv=2019-12-12&st=2020-09-05T15%3A22%3A24Z&se=2030-09-06T15%3A22%3A24Z&sr=b&sp=r&sig=jwSUpS89MJa%2BvQ5GOQR%2BQ%2BcMI8MyUJq1tvBK83qIK30%3D)

### Requirements

* Azure Storage Account
    - Name
    - Key
    ![Azure portal storage account name and key](https://clipimg.blob.core.windows.net/clipimg-vscode/2020/09/06/b9c20692-3eb1-e630-bd03-89e95c902076.png?sv=2019-12-12&st=2020-09-05T16%3A02%3A30Z&se=2030-09-06T16%3A02%3A30Z&sr=b&sp=r&sig=aPEl4ploTM%2Bdy6t73n2eH8hBbWWRl9BNS09D0Y2%2FXlI%3D)
* Linux
    - xclip
    - libsecret

## Contributing

If you would like to see any features added for this VS Code Extension, feel free to raise an [issue](https://github.com/gep13-oss/clipimg-vscode/issues), and if possible, a follow up pull request.

You can also join in the Gitter Chat [![Join the chat at https://gitter.im/gep13-oss/community](https://badges.gitter.im/gep13-oss/community.svg)](https://gitter.im/gep13-oss/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
