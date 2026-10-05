---
description: Like, bookmark, follow, mute, block, and retweet from your terminal with Twitter CLI account commands.
---

# Account actions

Use likes, bookmarks, follows, mutes, blocks, and retweets from the terminal. These commands act on the account selected by `current_account` in [Configuration](./configuration). Run `twitter me` before changing an account if you are unsure which one is active.

::: warning Account changes take effect immediately
The create, delete, follow, and unfollow commands on this page have no confirmation prompt. Check the account and target ID before running one.
:::

## Like and unlike a tweet

Choose the action you want. The first command likes a tweet; the second removes your like:

```sh
twitter likes create --tweet-id TWEET_ID
twitter likes delete --tweet-id TWEET_ID
```

Replace `TWEET_ID` with the tweet's ID. To see tweets liked by the current account or users who liked a given tweet, run:

```sh
twitter likes tweets
twitter likes by --tweet-id TWEET_ID --max-results 10
```

`--max-results` defaults to 10 on `likes by`.

## Bookmark a tweet

Use these commands as needed to add, inspect, or remove a bookmark:

```sh
twitter bookmarks create --tweet-id TWEET_ID
twitter bookmarks list --max-results 10
twitter bookmarks delete --tweet-id TWEET_ID
```

These commands add, list, or remove bookmarks for the current account. `bookmarks list` defaults to 10 results. If your account has bookmark folders, inspect them with:

```sh
twitter bookmarks folders
twitter bookmarks folder --folder-id FOLDER_ID
```

Replace `FOLDER_ID` with a folder ID returned by `bookmarks folders`. Both folder commands support `--max-results`; the default is 10.

## Retweet and undo a retweet

Choose whether to retweet or undo a retweet:

```sh
twitter retweets create --tweet-id TWEET_ID
twitter retweets delete --tweet-id TWEET_ID
```

To inspect who retweeted a tweet, run `twitter retweets by --tweet-id TWEET_ID --max-results 10`. Creating and deleting retweets change the selected account immediately.

## Follow and unfollow a user

Find the user ID with `twitter users by-username --username USERNAME`, then choose whether to follow or unfollow:

```sh
twitter users follow --target-user-id USER_ID
twitter users unfollow --target-user-id USER_ID
```

Replace `USER_ID` with the returned ID. See [Read and search tweets](./read#inspect-users-and-relationships) to list followers or accounts a user follows.

## Mute or block a user

Choose the action you need. The `list` commands inspect the current state; the `delete` commands undo a mute or block:

```sh
twitter mutes create --target-user-id USER_ID
twitter mutes list
twitter mutes delete --target-user-id USER_ID

twitter blocks create --target-user-id USER_ID
twitter blocks list
twitter blocks delete --target-user-id USER_ID
```

The list commands support `--max-results` and default to 10. Replace `USER_ID` with the target's ID. The `create` and `delete` commands take effect without a confirmation prompt, so verify the account and target ID first.

If an action fails with a permission or authorization error, see [Troubleshooting](./troubleshooting).
