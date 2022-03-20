
// https://www.freecodecamp.org/news/node-js-async-await-tutorial-with-asynchronous-javascript-examples/
(async function main() {
  require('dotenv').config()
  const insta = require('instagram-private-api')
  const fs = require('fs')

  const FILENAME = 'feed-data.json'

  // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
  const myArgs = process.argv.slice(2);

  const { IgApiClient } = insta

  const ig = new IgApiClient()
  ig.state.generateDevice(process.env.IG_USERNAME);

  const user = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)

  switch (myArgs[0]) {
    case '--get':
      try {
        const items = await ig.feed.user(user.pk).items()
        // https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
        fs.writeFile(FILENAME, JSON.stringify(items), function (err) {
          if (err) return console.log(err);
          console.log(`${FILENAME}: OK`);
        });
      } catch (error) {
        console.log(error)
      }
      break;
    case '--archive':
      try {
        // https://attacomsian.com/blog/nodejs-read-write-json-files
        const publications = JSON.parse(fs.readFileSync(FILENAME, 'utf8'))
        const ids = publications.map(p => p.id)

        console.log(ids)

        const results = await Promise.all(
          ids.map(async (i) => await ig.media.onlyMe(i))
        )

        console.log(results)
      } catch (error) {
        console.log(error)
      }
      break;
    default:
      console.log('Command not available');
  }
})();