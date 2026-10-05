# Unix examples

Use shell tools with Twitter CLI to turn text from files, commands, and the clipboard into tweets. These examples use POSIX-style shell syntax that works in common macOS and Linux shells. Configure and authorize the CLI before trying them.

::: warning The examples publish real tweets
Every `twitter tweet` command in this guide sends immediately. Run the part before a pipe by itself to inspect its output first.
:::

A line containing only `---` becomes a thread separator; see [Tweet and write threads](./tweet#write-a-thread).

## Tweet one line with `printf`

`printf` gives you predictable newlines and works well in scripts:

```sh
printf '%s\n' 'A thought from the terminal' | twitter tweet
```

The first `%s` is a format placeholder for the quoted text. `\n` adds a final newline; the CLI trims trailing whitespace from piped input.

## Tweet more than one line

Pass each line as a separate argument to `printf`:

```sh
printf '%s\n' 'First line' 'Second line' | twitter tweet
```

The result is **one** tweet with a line break. To make a thread instead, put `---` on its own line as shown later in this guide.

## Preview a draft before tweeting

Save a draft, display it, and only then pipe it to Twitter CLI:

```sh
printf '%s\n' 'A draft worth checking' > draft.txt
cat draft.txt
cat draft.txt | twitter tweet
```

`draft.txt` is a local file, and `cat` shows exactly what you are about to send. Replace its contents before running the last line. Use an editor for longer drafts.

## Tweet text from another command

Shell command output can become tweet text. For example, add today's local date:

```sh
printf 'Notes from %s\n' "$(date +%F)" | twitter tweet
```

To tweet the subject of the latest Git commit, first preview it, then send it:

```sh
git log -1 --format='%s'
git log -1 --format='%s' | twitter tweet
```

Run this inside the Git repository whose commit you mean to share. The second line sends the subject exactly as returned by Git.

## Edit a draft in a pipeline

Use `sed` to replace a marker before tweeting:

```sh
sed 's/PROJECT_NAME/Twitter CLI/g' draft.txt
sed 's/PROJECT_NAME/Twitter CLI/g' draft.txt | twitter tweet
```

The first command previews the transformed text. The second sends it. Replace `PROJECT_NAME` and the replacement text with values that fit your draft. Shell filters can change meaning, so inspect the complete result before you send it.

## Tweet from your clipboard

Choose the clipboard command for your system. Linux examples require `wl-paste` or `xclip` to be installed:

::: code-group

```sh [macOS]
pbpaste
pbpaste | twitter tweet
```

```sh [Linux · Wayland]
wl-paste --no-newline
wl-paste --no-newline | twitter tweet
```

```sh [Linux · X11]
xclip -selection clipboard -o
xclip -selection clipboard -o | twitter tweet
```

:::

Read the clipboard output first. It might contain text other than the draft you meant to tweet.

## Write a thread without a file

A shell heredoc sends several lines to standard input. The quoted delimiter keeps the shell from expanding `$` or command substitutions inside the draft:

```sh
twitter tweet <<'TWEET'
First thought.
---
Second thought.
---
Final thought.
TWEET
```

The CLI recognizes each `---` line as a boundary and sends the parts as replies in order. If a later tweet fails, earlier parts can already be live.

## Combine piped text and an image

Add `--image` while the tweet body comes from standard input:

```sh
printf '%s\n' 'A photo from today' |
  twitter tweet --image "$HOME/Pictures/photo.png"
```

Replace the image path with a readable local image. The CLI uploads the image first, then tweets the text with that image. It supports one image path per command.

## Schedule the contents of a file

`twitter schedule new` takes its body as an option, so use command substitution to read a file into that option:

```sh
cat draft.txt
twitter schedule new --body "$(cat draft.txt)" --in "30 minutes"
twitter schedule list
```

The quotes preserve internal line breaks. Command substitution removes trailing newlines. The final command shows the resolved send time. Scheduling only adds a local queue item; [set up a scheduler](./schedule#run-due-tweets) to send it automatically.

## Send one tweet per line

If each nonempty line of `tweets.txt` should be a separate tweet, inspect the numbered file first:

```sh
cat -n tweets.txt
```

Then run this loop:

```sh
while IFS= read -r line || [ -n "$line" ]; do
  [ -n "$line" ] || continue
  twitter tweet --body "$line"
done < tweets.txt
```

This sends **every nonempty line** as a separate tweet, in order. It does not turn the lines into a thread, and it does not stop automatically if one API request fails. Use it only when you intend to send the entire file.

## Page through read-only output

Unix tools also help with long CLI output. For example:

```sh
twitter schedule list | less -S
twitter tweets recent --query "rustlang" | less
```

`less -S` keeps wide schedule rows on one line and lets you scroll horizontally. Press `q` to exit. These commands read data; they do not send tweets.

For the complete options behind these recipes, see the [command reference](./commands).
