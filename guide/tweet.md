# Tweet and write threads

Publish text, images, and threads from a terminal. You must [configure and authorize Twitter CLI](./configuration) first. Tweeting sends content immediately; the CLI does not show a confirmation prompt.

## Choose an input method

`twitter tweet` accepts one of three text sources:

| Source | Command | When to use it |
| --- | --- | --- |
| Argument | `twitter tweet --body "TEXT"` | A short tweet already written on the command line. |
| Standard input | `cat DRAFT_FILE | twitter tweet` | A draft stored in a file or produced by another command. |
| Editor | `twitter tweet --editor` | A tweet or thread you want to compose before sending. |

Replace `TEXT` with the tweet body and `DRAFT_FILE` with your file path. If you provide `--body`, it takes precedence over other text input. If standard input is piped in, the CLI reads it and trims whitespace at the ends, even when you also pass `--editor`. Use `--editor` with an interactive terminal when you want the editor: bare `twitter tweet` does not open it in version <CliVersion />.

## Tweet a short message

::: warning Publishes immediately
Check the selected account with `twitter me` and review the text before running the command. The CLI does not ask for confirmation.
:::

Run:

```sh
twitter tweet --body "Building something today"
```

On success, the CLI prints a tweet ID and the tweet body. Save the ID if you expect to inspect or delete the tweet later.

For text with shell metacharacters such as `$`, quote the body carefully or use the editor. For multiline text, use a file or the editor so the shell does not change your formatting.

## Tweet from a file or a pipe

Write a UTF-8 text file named `draft.txt`, then run:

```sh
cat draft.txt | twitter tweet
```

You can pipe output from another command too:

```sh
printf 'A thought from the terminal\n' | twitter tweet
```

The CLI reads standard input until the pipe closes. If it cannot decode the input as text, it reports a UTF-8 read error. Inspect the file before piping it: the command publishes it rather than saving a draft.

## Compose in an editor

Run:

```sh
twitter tweet --editor
```

On Unix, the CLI opens `$EDITOR`, then `$VISUAL`, then `vi`. On Windows, it opens Notepad. Save and close the editor to send the text. The CLI uses a temporary `tweet.txt` file and removes it after reading a successful edit.

## Attach an image

Use `--image` with a local path:

```sh
twitter tweet --body "A photo from today" --image "$HOME/Pictures/photo.png"
```

The CLI uploads the image first, then sends the tweet with its media ID. It supports one image path per command. There is no video option. If you attach an image to a thread, it appears on the **first** tweet only. If the upload succeeds but tweet creation fails, inspect the tweet creation error before retrying; uploading media does not itself publish a tweet.

## Write a thread

::: warning A thread can publish partially
The CLI sends each part separately. If a later request fails, earlier tweets may already be live.
:::

Place a line containing only `---` between tweets:

```text
The first thought starts here.
---
The second thought follows it.
---
A final thought closes the thread.
```

Save that text in `thread.txt`, then run:

```sh
cat thread.txt | twitter tweet
```

You can write the same text with `twitter tweet --editor`. The separator is recognized when the trimmed line is exactly three dashes. The CLI sends each part in order as a reply to the previous tweet and prints progress such as `Sending tweet 1/3`. A thread is not an all-or-nothing operation: if a later request fails, earlier tweets may already be live. Check the account before retrying to avoid duplicates.

## Look up or delete a tweet

::: warning Deletion is immediate
`twitter tweets delete` removes the selected tweet without a confirmation prompt.
:::

Use the ID printed after tweeting. Look up the tweet first; run the delete command only when you intend to remove it:

```sh
twitter tweets by-id 1234567890
twitter tweets delete 1234567890
```

Replace `1234567890` with the real tweet ID. Deletion is immediate and has no confirmation prompt. The CLI reports `Deleted tweet.` if the API confirms deletion.

## Check the available options

Run `twitter tweet --help` for `--body`, `--image`, and `--editor`. For pipes, heredocs, clipboard input, and other shell recipes, see [Unix examples](./examples). See [Troubleshooting](./troubleshooting) if the request fails with an authentication, permission, or service error.
