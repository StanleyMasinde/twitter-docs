# Filtered streams

Manage filtered stream rules and read matching events in a terminal. This guide is for people with developer app access to the streaming API. A stream stays connected until you stop it; use a separate terminal for other CLI commands.

## Add a rule

Pass a rule value and, optionally, a tag:

```sh
twitter streams rules add --value "rustlang" --tag "rust"
```

The rule value uses Twitter's filtered stream syntax. The optional tag helps identify it when you list rules. Run `twitter streams rules list` to confirm that the rule appears. Check that your developer app's API access supports filtered streams if the request is denied.

## Inspect or remove rules

::: warning Removing a rule takes effect immediately
Check the rule IDs with `twitter streams rules list` before running the delete command below.
:::

Run:

```sh
twitter streams rules list
twitter streams rules delete --ids RULE_ID
```

Replace `RULE_ID` with an ID returned by the list command. To delete multiple rules, separate IDs with commas: `--ids ID1,ID2`. Deletion takes effect immediately.

## Connect to the stream

Run:

```sh
twitter streams connect
```

To request a small backfill of missed data, add `--backfill-minutes` with a value from 1 through 5:

```sh
twitter streams connect --backfill-minutes 5
```

The command keeps reading until you interrupt it. Press Ctrl+C to stop. If no data appears, confirm that rules exist and that matching events are being tweeted.
