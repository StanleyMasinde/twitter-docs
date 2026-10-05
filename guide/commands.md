---
description: Find Twitter CLI commands and options for tweeting, scheduling, account management, lists, messages, and streams.
---

# Command reference

Find a Twitter CLI command and its main options. This reference describes the `twitter` <CliVersion /> command tree. Run `twitter COMMAND --help` for the exact syntax on your version. Commands that change account data take effect immediately unless a guide says otherwise.

## Global commands

| Command | What it does |
| --- | --- |
| `twitter --help` | Lists top-level commands. |
| `twitter --version` | Prints the installed version. |
| `twitter me` | Shows the selected account's ID, name, and username. May start OAuth authorization. |
| `twitter usage` | Shows API usage reported for the developer app. |
| `twitter update` | Attempts to install the latest matching release. See [Update the CLI](./get-started#update-the-cli) for platform guidance. |

For installation and authorization, see [Get started](./get-started) and [Configuration](./configuration).

## Tweeting and configuration

| Command | Main options or arguments | What it does |
| --- | --- | --- |
| `twitter tweet` | `--body TEXT`, `--image PATH`, `--editor` | Publishes a tweet or a `---`-separated thread. Also accepts piped text. |
| `twitter config --init` | None | Writes a template and replaces the existing config. |
| `twitter config --edit` | None | Opens the config in an editor. |
| `twitter config --show` | None | Shows the selected account index and client ID. |
| `twitter config --validate` | None | Checks config file and directory permissions on Unix. |

See [Tweet and write threads](./tweet) for input precedence, images, and partial thread failures. See [Unix examples](./examples) for pipes, heredocs, and clipboard input. See [Configuration](./configuration) for field meanings and the first-run file preparation needed on Unix.

## Scheduled tweets

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter schedule new` | `--body TEXT --on TIME` | Saves text for later. `--at` and `--in` are aliases for `--on`. |
| `twitter schedule list` | `--filter all\|failed\|sent` | Displays saved rows. Default: `all`. |
| `twitter schedule run` | None | Sends due pending rows. |
| `twitter schedule clear` | None | Removes every saved row, including sent and failed rows. |

See [Schedule tweets](./schedule) for local storage, automatic runners, and failure handling.

## Tweet lookup and search

| Command | Main options or arguments | What it does |
| --- | --- | --- |
| `twitter tweets by-id` | `TWEET_ID` | Gets one tweet. |
| `twitter tweets by-ids` | `--ids ID1,ID2` | Gets multiple tweets. |
| `twitter tweets delete` | `TWEET_ID` | Deletes a tweet immediately. |
| `twitter tweets user` | `--id USER_ID` | Gets 10 tweets by a user. |
| `twitter tweets recent` | `--query QUERY [--max-results N]` | Searches recent tweets. Default: 10 results. |
| `twitter tweets count-recent` | `--query QUERY` | Gets recent search counts. |
| `twitter tweets all` | `--query QUERY [--max-results N]` | Searches all tweets available to the app. Default: 10 results. |
| `twitter tweets count-all` | `--query QUERY` | Gets all-time search counts. |
| `twitter timeline reverse-chronological` | None | Gets the current account's home timeline. Alias: `reverse`. |
| `twitter mentions` | None | Gets mentions for the current account. |

Replace IDs and query text with real values. For examples, see [Read and search tweets](./read).

## Users and follows

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter users by-id` | `--id USER_ID` | Gets one user. |
| `twitter users by-ids` | `--ids ID1,ID2` | Gets multiple users. |
| `twitter users by-username` | `--username NAME` | Gets one user by name. |
| `twitter users by-usernames` | `--usernames NAME1,NAME2` | Gets multiple users by name. |
| `twitter users following` | `--id USER_ID [--max-results N]` | Lists accounts a user follows. Default: 10. |
| `twitter users followers` | `--id USER_ID [--max-results N]` | Lists a user's followers. Default: 10. |
| `twitter users follow` | `--target-user-id USER_ID` | Follows a user from the selected account. |
| `twitter users unfollow` | `--target-user-id USER_ID` | Unfollows a user from the selected account. |

See [Read and search tweets](./read#inspect-users-and-relationships) and [Account actions](./account#follow-and-unfollow-a-user).

## Likes, bookmarks, and retweets

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter likes by` | `--tweet-id ID [--max-results N]` | Lists users who liked a tweet. Default: 10. |
| `twitter likes create` | `--tweet-id ID` | Likes a tweet. |
| `twitter likes delete` | `--tweet-id ID` | Removes the current account's like. |
| `twitter likes tweets` | None | Lists tweets liked by the current account. |
| `twitter bookmarks list` | `[--max-results N]` | Lists bookmarks. Default: 10. |
| `twitter bookmarks create` | `--tweet-id ID` | Bookmarks a tweet. |
| `twitter bookmarks delete` | `--tweet-id ID` | Removes a bookmark. |
| `twitter bookmarks folders` | `[--max-results N]` | Lists bookmark folders. Default: 10. |
| `twitter bookmarks folder` | `--folder-id ID [--max-results N]` | Lists tweets in a folder. Default: 10. |
| `twitter retweets by` | `--tweet-id ID [--max-results N]` | Lists users who retweeted a tweet. Default: 10. |
| `twitter retweets create` | `--tweet-id ID` | Retweets from the current account. |
| `twitter retweets delete` | `--tweet-id ID` | Removes the current account's retweet. |

See [Account actions](./account) for worked commands.

## Lists

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter lists by-id` | `--list-id ID` | Gets a list. |
| `twitter lists create` | `--name NAME [--description TEXT] [--private true\|false]` | Creates a list. |
| `twitter lists owned` | `[--max-results N]` | Lists owned lists. Default: 10. |
| `twitter lists memberships` | `[--max-results N]` | Lists list memberships. Default: 10. |
| `twitter lists update` | `--list-id ID` plus at least one field | Changes name, description, or privacy. |
| `twitter lists delete` | `--list-id ID` | Deletes a list. |
| `twitter lists members` | `--list-id ID [--max-results N]` | Lists members. Default: 10. |
| `twitter lists tweets` | `--list-id ID [--max-results N]` | Lists tweets in a list. Default: 10. |
| `twitter lists add-member` | `--list-id ID --user-id USER_ID` | Adds a user. |
| `twitter lists remove-member` | `--list-id ID [--user-id USER_ID]` | Removes a member; omitted user ID targets the current account. |

See [Lists](./lists) before using `remove-member` or `delete`.

## Direct messages

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter dms events` | `[--max-results N]` | Gets the current account's DM events. Default: 10. |
| `twitter dms with` | `--participant-id ID [--max-results N]` | Gets events with a participant. Default: 10. |
| `twitter dms conversation-events` | `--conversation-id ID [--max-results N]` | Gets conversation events. Default: 10. |
| `twitter dms create` | `--participant-ids ID1,ID2 --text TEXT` | Creates a conversation and sends its first message. |
| `twitter dms send-with` | `--participant-id ID --text TEXT` | Sends to a participant. |
| `twitter dms send` | `--conversation-id ID --text TEXT` | Sends to an existing conversation. |

See [Direct messages](./messages) for the distinction between participant and conversation IDs.

## Mutes and blocks

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter mutes create` | `--target-user-id ID` | Mutes a user. |
| `twitter mutes list` | `[--max-results N]` | Lists muted users. Default: 10. |
| `twitter mutes delete` | `--target-user-id ID` | Unmutes a user. |
| `twitter blocks create` | `--target-user-id ID` | Blocks a user. |
| `twitter blocks list` | `[--max-results N]` | Lists blocked users. Default: 10. |
| `twitter blocks delete` | `--target-user-id ID` | Unblocks a user. |

See [Account actions](./account#mute-or-block-a-user).

## Filtered streams

| Command | Main options | What it does |
| --- | --- | --- |
| `twitter streams rules list` | None | Lists active rules. |
| `twitter streams rules add` | `--value RULE [--tag TAG]` | Adds a filter rule. |
| `twitter streams rules delete` | `--ids ID1,ID2` | Deletes rules by ID. |
| `twitter streams connect` | `[--backfill-minutes 1..5]` | Connects and reads matching events. |

See [Filtered streams](./streams) for a complete workflow.

## Option conventions

An item in square brackets is optional. `ID1,ID2` means a comma-separated list with no spaces. Options that accept a count default to 10 unless stated otherwise. Command names and long option names are case sensitive. When a command fails, run its `--help` output first, then see [Troubleshooting](./troubleshooting).
