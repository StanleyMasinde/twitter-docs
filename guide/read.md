# Read and search tweets

Look up tweets, search for tweets, inspect a timeline, and find users from the terminal. Configure Twitter CLI first. Some reads use an app bearer token; user-specific reads use the account you authorized in [Configuration](./configuration).

## Look up tweets by ID

Use the ID from a tweet URL or command output:

```sh
twitter tweets by-id 1234567890
twitter tweets by-ids --ids 1234567890,1234567891
```

Replace the sample numbers with tweet IDs. `--ids` accepts a comma-separated list. A lookup with no matching results prints `No tweets found.` for the multi-ID form.

## Search tweets

Search recent tweets with a query:

```sh
twitter tweets recent --query "rustlang" --max-results 10
```

`--max-results` defaults to `10`. The CLI passes the query to the Twitter API, so use the API's search syntax for more precise searches. Search across all accessible tweets with:

```sh
twitter tweets all --query "rustlang" --max-results 10
```

Availability of all-time search depends on your developer app's API access. To request counts instead of tweet bodies, run:

```sh
twitter tweets count-recent --query "rustlang"
twitter tweets count-all --query "rustlang"
```

The CLI reports when a search or count returns no results. If a request is refused, check your app access and usage with `twitter usage`.

## Read a user's tweets

Find the user ID from a username, then pass the ID to the tweet command:

```sh
twitter users by-username --username USERNAME
twitter tweets user --id USER_ID
```

Replace `USERNAME` with the account name without `@`, and replace `USER_ID` with the ID returned by the lookup. The `tweets user` command fetches 10 results in version <CliVersion /> and does not expose a result-count flag.

## Read your home timeline and mentions

Run:

```sh
twitter timeline reverse-chronological
twitter mentions
```

`twitter timeline reverse` is an alias for the timeline command. These commands use the authenticated account; run `twitter me` first if you are unsure which account `current_account` selects.

## Inspect users and relationships

Use IDs for follow lists:

```sh
twitter users by-id --id USER_ID
twitter users followers --id USER_ID --max-results 10
twitter users following --id USER_ID --max-results 10
```

The user lookup also supports `by-ids --ids ID1,ID2` and `by-usernames --usernames NAME1,NAME2`. Replace those sample values with real IDs or usernames. The `--max-results` option defaults to 10 where available.

For bookmarks, likes, and follow actions, see [Account actions](./account). For list timelines, see [Lists](./lists).
