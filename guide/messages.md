---
description: Read direct message events, start conversations, and send messages from the terminal with Twitter CLI.
---

# Direct messages

Read and send direct messages (DMs) from the terminal. These commands use the account selected in [Configuration](./configuration). Sending a message is immediate and has no confirmation prompt.

## Read events

Use one of these scopes:

```sh
twitter dms events --max-results 10
twitter dms with --participant-id USER_ID --max-results 10
twitter dms conversation-events --conversation-id CONVERSATION_ID --max-results 10
```

`events` reads events for your account, `with` narrows them to a participant, and `conversation-events` narrows them to a conversation. Find a user's ID with `twitter users by-username --username USERNAME`; use a conversation ID returned by a DM command. The result limit defaults to 10.

## Start a conversation

::: warning Sends a direct message
Creating a conversation sends its first message immediately. Verify the selected account and participant IDs before running the command.
:::

To send an initial message to one or more participants, run:

```sh
twitter dms create --participant-ids USER_ID --text "Hello from my terminal"
```

For more than one participant, separate IDs with commas and no spaces, such as `--participant-ids ID1,ID2`. The command creates the conversation and sends the initial message. Save the returned conversation ID if you want to use `dms send` later.

## Send to a participant or conversation

::: warning Sends immediately
Choose one command below and check its destination ID before running it.
:::

Choose one destination: a participant or an existing conversation.

```sh
twitter dms send-with --participant-id USER_ID --text "Following up"
twitter dms send --conversation-id CONVERSATION_ID --text "Following up"
```

`send-with` identifies the recipient; `send` identifies an existing conversation. Verify the ID before running either command. If a DM call is denied, check the app's access and your account's authorization; see [Troubleshooting](./troubleshooting).
