# Troubleshooting

Diagnose installation, configuration, authentication, tweeting, and scheduler failures. Start with the failing command's `--help` output and note the full error message. Do not share credentials or complete callback URLs when asking for help.

## `twitter` is not found

Run `command -v twitter` on macOS or Linux, or `where.exe twitter` in PowerShell. If nothing appears, verify that the installer completed and that its destination is on your `PATH`.

The Unix installer defaults to `/usr/local/bin`. With `TWITTER_INSTALL`, it uses your chosen directory. The Windows installer defaults to `%USERPROFILE%\bin` and updates the user `PATH`; open a new terminal after installation if the old session cannot see it.

## `config --init` fails to set file permissions

On macOS and Linux, version <CliVersion /> attempts to set permissions on the configuration file before it creates the file. If this is your first run, `twitter config --init` prints the file path in its error message.

1. Copy that complete path as `CONFIG_FILE`. Set `CONFIG_DIR` to its parent directory.
2. Create the directory and empty file with these commands, replacing both placeholders with the paths from your system:

   ```sh
   mkdir -p "CONFIG_DIR"
   chmod 700 "CONFIG_DIR"
   touch "CONFIG_FILE"
   chmod 600 "CONFIG_FILE"
   ```

3. Run `twitter config --init` again. It now writes the template.
4. Run `twitter config --edit` to fill in your credentials.

`--init` overwrites the file, so do not rerun it over a configuration you want to keep. Use `twitter config --edit` for later changes.

## Validation completes but commands still fail

`twitter config --validate` checks file and directory permissions; it does not test credentials or make an API request. Run `twitter config --show` to confirm the selected account index and client ID, then run `twitter me` to test authorization. Check that `current_account` points to an existing `[[accounts]]` entry.

## Authorization URL or callback fails

Confirm that the developer app's callback URL is `http://127.0.0.1:3000` and that its OAuth 2.0 client ID and secret match your configuration. After authorization, the browser may display a connection error on the local callback page. Copy the full URL from the address bar and paste it into the terminal. The CLI needs the `code` and `state` query parameters; a shortened URL will not work.

If the CLI reports a state mismatch, start a fresh authorization with `twitter me` and paste the callback URL from that same attempt. Do not reuse an earlier URL.

## Tweeting returns HTTP 403

Check that the developer app has **Read and write** permissions. After changing permissions, regenerate the relevant access credentials and update the configuration. Then run `twitter me` to confirm the selected account and retry a minimal text tweet:

```sh
twitter tweet --body "test"
```

This command publishes a real tweet. Delete it afterward with `twitter tweets delete TWEET_ID` if needed. An API 403 can also reflect access or scope restrictions, so inspect the developer portal if the permission change does not resolve it.

## Tweeting returns HTTP 503

Check your developer app's billing and available credits, then confirm write permissions. Retry a minimal text-only tweet. If text works, retry the tweet with an image; this separates tweet creation from media upload. Check your developer dashboard for usage limits or an API incident. A successful media upload does not prove that the later tweet creation request succeeded.

## Image upload fails

Confirm that the file exists and that the path points to a readable image. The CLI detects the file type from its contents and uploads one image path per command. Video upload is not supported. Run `twitter tweet --body "test"` without `--image` to determine whether tweet creation works.

## A thread stopped partway through

A thread is sent as successive tweet requests. Earlier parts can be live even if a later part fails. Inspect your account's tweets before retrying the whole file, or you may publish duplicates. Correct the failing content or permission issue first; see [Tweet and write threads](./tweet#write-a-thread).

## A scheduled tweet did not send

Check `twitter schedule list` for its resolved send time and status. Scheduling only writes a local row; `twitter schedule run` must execute after the send time. Run it manually, then inspect `twitter schedule list --filter failed` and your OS scheduler log.

The scheduler must run as the user who created the queue and authorized the CLI. A failed row will not be retried automatically by the next run. Fix the issue and create a new scheduled row. See [Schedule tweets](./schedule).

## An API request is denied or empty

Use `twitter usage` to inspect reported API usage and check the developer app's access to the requested endpoint. Search, DM, and stream availability may vary with API access. An empty result is not always an error: the CLI prints a no-results message for several read commands.

For exact flags, run `twitter --help` or `twitter COMMAND --help`. The [command reference](./commands) maps every command group in version <CliVersion />.
