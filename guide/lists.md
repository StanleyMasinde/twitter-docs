---
description: Create, update, and manage Twitter lists from the terminal with Twitter CLI.
---

# Lists

Create and manage Twitter lists from the terminal. List commands use the account selected in [Configuration](./configuration). IDs identify lists and users; display names are not accepted where an ID flag is required.

## Create a list

Run:

```sh
twitter lists create --name "CLI builders" --description "People building terminal tools"
```

To make the list private, add `--private true`:

```sh
twitter lists create --name "Reading" --private true
```

`--private` takes an explicit `true` or `false` value. Save the returned list ID for later commands.

## Find your lists

Run:

```sh
twitter lists owned --max-results 10
twitter lists memberships --max-results 10
twitter lists by-id --list-id LIST_ID
```

`owned` lists the current account's lists. `memberships` lists those it belongs to. The result limit defaults to 10. Replace `LIST_ID` with a real list ID.

## Change a list

Pass at least one field to change:

```sh
twitter lists update --list-id LIST_ID --name "Updated name"
twitter lists update --list-id LIST_ID --description "A revised description" --private false
```

The CLI reports `Provide at least one field to update.` if you pass only the list ID. To permanently delete a list, run:

::: warning Deletes the list immediately
Check the list ID with `twitter lists by-id --list-id LIST_ID` before running the delete command.
:::

```sh
twitter lists delete --list-id LIST_ID
```

Deletion has no confirmation prompt.

## Read members and tweets

Run:

```sh
twitter lists members --list-id LIST_ID --max-results 10
twitter lists tweets --list-id LIST_ID --max-results 10
```

Both commands default to 10 results. An empty list produces a specific no-results message.

## Add or remove a member

Find a user's ID with `twitter users by-username --username USERNAME`, then choose whether to add or remove that member:

```sh
twitter lists add-member --list-id LIST_ID --user-id USER_ID
twitter lists remove-member --list-id LIST_ID --user-id USER_ID
```

Replace the placeholders with real IDs. If you omit `--user-id` from `remove-member`, the CLI removes the **current authenticated user** from that list instead. Supply the ID explicitly when managing another member.
