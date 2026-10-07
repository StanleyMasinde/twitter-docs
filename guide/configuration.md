---
description: Configure Twitter CLI credentials, authorize your account with OAuth 2.0, validate settings, and switch between accounts.
---

# Configuration and authentication

Set up credentials, authorize your account, and switch between accounts. This guide is for people who have [installed Twitter CLI](./get-started) and have a Twitter developer app.

## Find and edit the configuration

Twitter CLI determines the configuration file location for your operating system. Use its commands to create, edit, and validate the file instead of assuming a particular path. It stores OAuth tokens and scheduled tweets separately in the operating system's application data location. Treat both locations as private account data.

`twitter config --init` writes a single-account template and **overwrites** any existing file. It does not prompt for secrets. On macOS, Linux, or Termux, initialization may fail before writing the file because it tries to set permissions first; see [Troubleshooting](./troubleshooting#config-init-fails-to-set-file-permissions).

To open the file in an editor, run:

```sh
twitter config --edit
```

On Unix, the CLI uses `$EDITOR`, then `$VISUAL`, then `vi`. On Windows, it uses Notepad. The parent directory must already exist.

## Set the account fields

The file uses TOML. Fill in the values for your developer app and account:

```toml
current_account = 0

[[accounts]]
bearer_token = "BEARER_TOKEN"
client_id = "CLIENT_ID"
client_secret = "CLIENT_SECRET"
```

Replace the uppercase placeholders with values from your developer app. This is the template produced by `twitter config --init`. `client_id` and `client_secret` are required for OAuth 2.0 account commands. App-only reads and `twitter usage` use `bearer_token`.

The configuration format also accepts `consumer_key`, `consumer_secret`, `access_token`, and `access_secret` fields. The initializer omits them, and the current CLI code does not read them for its commands. You do not need to add them for the workflows in these docs.

`current_account` selects an entry from `[[accounts]]` by a zero-based index. `0` means the first entry.

## Authorize the CLI

The CLI uses OAuth 2.0 with PKCE for user-authenticated actions. In your developer app, enable **Read and write** permissions and set the callback URL to `http://127.0.0.1:3000`. Then:

1. Run `twitter me` in a terminal that can accept input.
2. Open the authorization URL printed by the CLI in your browser.
3. Approve the requested access.
4. Copy the complete redirected URL from the address bar, including its `code` and `state` query parameters.
5. Paste that URL into the terminal and press Enter.

The local callback page may fail to load because the CLI does not start a web server there. The address bar still contains the URL the CLI needs. On success, the CLI stores the access and refresh tokens locally and uses them on later commands. It may ask you to authorize again if the cached token lacks the scopes required by your installed version.

Run `twitter me` again to confirm that the account resolves without a new authorization prompt. If you are setting up an unattended scheduler, complete this interactive authorization **before** the first scheduled run.

## Use more than one account

Add another `[[accounts]]` entry, then select it with `current_account`:

```toml
current_account = 1

[[accounts]]
client_id = "FIRST_CLIENT_ID"
client_secret = "FIRST_CLIENT_SECRET"
bearer_token = "FIRST_BEARER_TOKEN"

[[accounts]]
client_id = "SECOND_CLIENT_ID"
client_secret = "SECOND_CLIENT_SECRET"
bearer_token = "SECOND_BEARER_TOKEN"
```

Here `1` selects the second account. Run `twitter me` after changing the index to verify the selected account and authorize it if prompted. The CLI exits if the index does not correspond to an `[[accounts]]` entry. OAuth tokens are cached by account index, so keep account order stable once you have authorized multiple accounts.

## Validate and inspect the file

Run:

```sh
twitter config --validate
twitter config --show
```

`--validate` checks that the configuration file is readable and parses into the expected configuration structure, then checks Unix permissions on the directory and file. It exits with a nonzero status if the file is missing, unreadable, or malformed. It does **not** check that credentials are valid or that the app can tweet. `--show` prints the selected account index and OAuth 2.0 client ID; it does not print all secrets. Use `twitter me` to check authentication and a real tweet to check write access.

On macOS, Linux, or Termux, the expected permissions are `700` for the configuration directory and `600` for the file. If `--validate` prints a warning, use the exact path and suggested `chmod` command in that warning. The file location may differ between systems.

Do not commit the configuration file, paste it into an issue, or put its credential values in shell commands. If a credential is exposed, rotate it in the developer portal and update the local file.
