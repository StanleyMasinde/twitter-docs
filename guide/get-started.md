---
description: Install Twitter CLI on macOS, Linux, or Windows, connect a developer app, and publish your first tweet from the terminal.
---

# Get started

Install Twitter CLI, connect a developer app, and send a first tweet. This guide is for people who can run commands in a terminal. You need a Twitter account with access to a developer app that can write tweets.

## Documentation compatibility

These docs assume Twitter CLI v1.10.0 and later. For instructions specific to a newer release, open the [CLI repository](https://github.com/StanleyMasinde/twitter), check out that release's tag, and read its `README.md`:

```sh
git clone https://github.com/StanleyMasinde/twitter.git
cd twitter
git checkout RELEASE_TAG
```

Replace `RELEASE_TAG` with the tag for your release from [Releases](https://github.com/StanleyMasinde/twitter/releases). Read `README.md` in that checkout for the release's setup and usage instructions.

## Before you begin

Twitter CLI is a standalone executable named `twitter`. It uses the Twitter API. API access and write permissions depend on your developer app; installing the executable does not grant API access.

Have these ready:

- A Twitter developer app with **Read and write** permissions.
- The app's OAuth 2.0 client ID and client secret, plus its bearer token for app-only reads and usage.
- A browser you can use for the first authorization.
- On Windows, PowerShell 7 or later and the [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist/) matching your CLI architecture. Install the Redistributable before running `twitter`.

Set the app's OAuth 2.0 callback URL to `http://127.0.0.1:3000`. The CLI asks you to paste the complete callback URL after you authorize it. See [Configure authentication](./configuration#authorize-the-cli) for that step.

## Install Twitter CLI

Choose the commands for your operating system. On macOS and Linux, review the [Unix installer script](https://github.com/StanleyMasinde/twitter/blob/main/install.sh) before running it. On Windows, use PowerShell 7 or later and review the [PowerShell installer script](https://github.com/StanleyMasinde/twitter/blob/main/install.ps1) before running it.

::: code-group

```sh [macOS and Linux]
curl -fsSL https://twitter.stanleymasinde.com/install.sh | sh
```

```powershell [Windows · PowerShell 7+]
irm https://twitter.stanleymasinde.com/install.ps1 | iex
```

:::

### macOS and Linux options

The Unix installer detects the operating system and architecture, downloads the matching release archive, and installs `twitter` in `/usr/local/bin`. It uses the release metadata to find the archive and verify its SHA-256 digest. A release without the digest cannot be installed by this script.

If you prefer an install directory owned by your user, run:

```sh
curl -fsSL https://twitter.stanleymasinde.com/install.sh | TWITTER_INSTALL="$HOME/.local/bin" sh
```

Add that directory to your shell's `PATH` if `twitter` is not found. To install a particular release, pass its tag to the script:

```sh
curl -fsSL https://twitter.stanleymasinde.com/install.sh | sh -s v1.10.0
```

Replace `v1.10.0` with the release tag you want from [Releases](https://github.com/StanleyMasinde/twitter/releases).

### Windows options

The installer selects the x64 or ARM64 release archive for your system, extracts `twitter.exe`, and installs it in `$env:USERPROFILE\bin`. It adds that directory to your user and current session `PATH` and verifies the SHA-256 digest when one is available. Git, Rust, and C++ build tools are not required to install a release archive.

Windows builds require the Microsoft Visual C++ Redistributable runtime. Download the latest supported package directly from Microsoft for your CLI architecture:

- [x64 Redistributable](https://aka.ms/vc14/vc_redist.x64.exe) for the x64 release.
- [ARM64 Redistributable](https://aka.ms/vc14/vc_redist.arm64.exe) for the ARM64 release.

Run the downloaded installer and complete the setup before running `twitter --version`. See [Microsoft's Redistributable download page](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist/) for package details. Installing the Redistributable may prompt for administrator approval. The Twitter CLI installer needs administrator rights only for a protected install directory.

To choose an install directory, set `TWITTER_INSTALL` before running the installer:

```powershell
$env:TWITTER_INSTALL = "$env:USERPROFILE\.local\bin"
irm https://twitter.stanleymasinde.com/install.ps1 | iex
```

To install a particular release, pass its tag to the installer:

```powershell
$installer = irm https://twitter.stanleymasinde.com/install.ps1
& ([scriptblock]::Create($installer)) -Version v1.10.0
```

Replace `v1.10.0` with a release tag that includes a Windows archive for your architecture from [Releases](https://github.com/StanleyMasinde/twitter/releases).

## Verify the executable

After installation, check the version and available commands:

::: code-group

```sh [macOS and Linux]
twitter --version
twitter --help
```

```powershell [Windows · PowerShell 7+]
twitter --version
twitter --help
```

:::

The first command prints the installed version. The second lists top-level commands. If the shell cannot find `twitter`, see [Troubleshooting](./troubleshooting#twitter-is-not-found).

## Create a configuration file

Run the initializer:

```sh
twitter config --init
```

`--init` writes a template; it does **not** ask for credentials, and it replaces an existing configuration. If initialization fails while setting file permissions, it may stop before writing a new file. If that happens, follow the path and recovery steps in [Troubleshooting](./troubleshooting#config-init-fails-to-set-file-permissions), then run `--init` again.

Open the template with `twitter config --edit`, replace the placeholder values, and save it. This command opens the CLI's configuration file for your operating system; you do not need to know its path. See [Configuration](./configuration) for each field and a multi-account example.

## Authorize and check the account

Run:

```sh
twitter me
```

On first use, the CLI prints an authorization URL. Open it, approve access, and paste the **full callback URL** into the terminal when asked. The browser might show an unreachable local page after redirecting to `127.0.0.1:3000`; copy the URL from its address bar. `twitter me` then prints the authenticated account's ID, name, and username.

## Publish a first tweet

::: warning Publishes immediately
The command below sends a real tweet from the selected account. Run `twitter me` first if you need to check the account.
:::

Run:

```sh
twitter tweet --body "Hello from my terminal"
```

A successful request prints the new tweet's ID and body. For editor input, files, images, and threads, see [Tweet and write threads](./tweet).

## Update the CLI

On macOS, run `twitter update` to fetch the latest matching release. If your executable is in a root-owned directory such as `/usr/local/bin`, the update may need elevated privileges; use `sudo twitter update` only for that case. A user-owned install directory does not need `sudo`.

On Linux, rerun the Unix installer from [Install Twitter CLI](#install-twitter-cli) to update. If `twitter update` reports that no asset exists even when a Linux release is available, rerun the installer to fetch the matching archive. On Windows, rerun the PowerShell installer from [Install Twitter CLI](#install-twitter-cli) to download and install the latest release for your architecture.

After updating, run `twitter --version`. On macOS or Linux, use `command -v twitter` to locate the executable; on Windows, use `where.exe twitter`. If your shell still finds an older binary, see [Troubleshooting](./troubleshooting#twitter-is-not-found).

## Next steps

- [Schedule tweets](./schedule) and set up automatic delivery.
- [Read and search](./read) without opening the website.
- [Command reference](./commands) for the full command tree.
