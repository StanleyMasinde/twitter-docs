---
description: Schedule tweets with Twitter CLI, inspect the local queue, and run due posts with your operating system scheduler.
---

# Schedule tweets

Queue text tweets for later delivery. You must [configure and authorize Twitter CLI](./configuration) first. The CLI stores the queue locally; it sends due tweets only when `twitter schedule run` executes.

## Add a tweet to the queue

Provide a body and a time expression:

```sh
twitter schedule new --body "Ship update" --at "17:06"
twitter schedule new --body "Tuesday update" --on "Tuesday"
twitter schedule new --body "Soon" --in "30 minutes"
```

`--at` and `--in` are aliases for `--on`, so use one of them per command. The CLI parses the expression using the local time zone of the user running it. If a parsed time falls in the past, version <CliVersion /> advances it by one day. Always list the queue after adding a tweet to confirm the resolved send time.

Scheduling saves the text locally; it does not publish the tweet immediately. The queue is stored on this computer, so another installation does not see it. The scheduler does not accept `--image`. To queue the contents of a file, see [Unix examples](./examples#schedule-the-contents-of-a-file).

## Inspect the queue

Run:

```sh
twitter schedule list
```

The table shows an ID, status, body, send time, attempt count, and applicable error and sent timestamps. Long bodies are shortened in the display, but the full text remains stored. The summary counts pending, failed, and sent rows.

Use a filter to inspect completed or failed work:

```sh
twitter schedule list --filter failed
twitter schedule list --filter sent
```

The accepted filters are `all`, `failed`, and `sent`; `all` is the default. If a filter matches no rows, the CLI says `No scheduled tweets were found.`

## Run due tweets

::: warning Sends due tweets
`twitter schedule run` publishes every pending tweet whose scheduled time has passed. Check the queue with `twitter schedule list` before running it manually.
:::

Run:

```sh
twitter schedule run
```

The command sends **pending** rows whose scheduled time has passed. It marks each successful row `sent` and stores a sent time. It marks a failed row `failed`, increments its attempt count, and stores the error. It prints sent and failed totals when it finishes. Failed rows are not picked up by the next `schedule run`; there is no retry or single-row edit command in version <CliVersion />. Recreate a failed tweet with `schedule new` after fixing the cause.

If nothing is due, the CLI prints `No pending scheduled tweets to run.`

## Run automatically

Choose the setup for your operating system. The scheduler must run under the **same operating system user** who configured and authorized the CLI, so it can read the configuration and local queue. On macOS or Linux, run `command -v twitter` and use its output as the binary path below.

### Linux and macOS

Add the configuration for your operating system:

::: code-group

```text [Linux · crontab entry]
* * * * * /usr/local/bin/twitter schedule run >> /tmp/twitter-schedule.log 2>&1
```

```xml [macOS · LaunchAgent plist]
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key><string>com.twitter.schedule</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/twitter</string>
      <string>schedule</string>
      <string>run</string>
    </array>
    <key>StartInterval</key><integer>60</integer>
    <key>StandardOutPath</key><string>/tmp/twitter-schedule.log</string>
    <key>StandardErrorPath</key><string>/tmp/twitter-schedule.log</string>
  </dict>
</plist>
```

:::

Replace `/usr/local/bin/twitter` with the result of `command -v twitter` in either tab.

On Linux, open your crontab with `crontab -e`, add the line from the Linux tab, and inspect `/tmp/twitter-schedule.log` if a run fails.

On macOS, save the plist from the macOS tab as `~/Library/LaunchAgents/com.twitter.schedule.plist`, then load and start it:

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.twitter.schedule.plist
launchctl kickstart -k gui/$(id -u)/com.twitter.schedule
```

Review `/tmp/twitter-schedule.log` and `twitter schedule list` to verify delivery.

### Windows

If you use a Windows build, find `twitter.exe` with `where.exe twitter` in PowerShell. In Task Scheduler, create a task that repeats every minute under the Windows account that configured and authorized the CLI. Set **Program/script** to the full path to `twitter.exe` and **Add arguments** to `schedule run`. Run the task once and inspect `twitter schedule list`.

## Clear the queue

::: warning Removes every scheduled row
`twitter schedule clear` deletes pending, sent, and failed rows without a confirmation prompt. Check `twitter schedule list` first.
:::

Run `twitter schedule clear` to remove the queue. The CLI reports how many records it removed.
