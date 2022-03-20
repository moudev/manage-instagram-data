# Manage Instagram data

- Get feed
- Archive feed
- Save account followers
- Save account following

## Configuration

***Install dependencies***

```bash
npm install
```

***Configurate Instagram credentials***

- Rename the file `.env.sample` to the name `.env`
- Add the instagram credentials

## Get feed & archive feed

Save the entire feed in a JSON file and archive ***all the publications***.

First, it's necessary `get` the feed, and the second step is `archive` the feed. Each one is a param of the shell.

The `--get-data` param saves the data in the `feed-data.json` file and the `--save-data` param read the data from `feed-data.json` and archives each publication.

***Get feed*** (first step)

```bash
node save-all-feed.js --get-data
```

***Archive feed*** (second step)

```bash
node save-all-feed.js --save-data
```

## Save account followers & account following list

Only saves the data in JSON files.

The account followers list is saved in the `followers-data.json` file and the account following in the `following-data.json` file.

***Save followers list***

```bash
node save-all-following-followers.js --followers
```

***Save following list***

```bash
node save-all-following-followers.js --following
```
