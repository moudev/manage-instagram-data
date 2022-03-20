
// https://www.freecodecamp.org/news/node-js-async-await-tutorial-with-asynchronous-javascript-examples/
(async function main() {
  require('dotenv').config()
  const insta = require('instagram-private-api')
  const fs = require('fs')

  const FILENAME_FOLLOWERS = 'followers-data.json'
  const FILENAME_FOLLOWING = 'following-data.json'

  // https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
  const myArgs = process.argv.slice(2);

  const { IgApiClient } = insta

  const ig = new IgApiClient()
  ig.state.generateDevice(process.env.IG_USERNAME);

  const user = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)

  switch (myArgs[0]) {
    case '--followers':
      try {
        const followers = await ig.feed.accountFollowers(user.pk).items()
        // https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
        fs.writeFile(FILENAME_FOLLOWERS, JSON.stringify(followers), function (err) {
          if (err) return console.log(err);
          console.log(`${FILENAME_FOLLOWERS}: OK`);
        });
      } catch (error) {
        console.log(error)
      }
      break;
    case '--following':
      try {
        const following = await ig.feed.accountFollowing(user.pk).items()
        // https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
        fs.writeFile(FILENAME_FOLLOWING, JSON.stringify(following), function (err) {
          if (err) return console.log(err);
          console.log(`${FILENAME_FOLLOWING}: OK`);
        });
      } catch (error) {
        console.log(error)
      }
      break;
    default:
      console.log('Command not available');
  }
})();