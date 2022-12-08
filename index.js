const { IgApiClient } =  require('instagram-private-api');
const { sample } = require('lodash');

const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time

ig.state.generateDevice(process.env.IG_USERNAME);


// Optionally you can setup proxy url
//ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  // Create UserFeed instance to get loggedInUser's posts
  //const userFeed = ig.feed.user(loggedInUser.pk);
  //get followers list
  console.log("Getting followers...")
  const followersFeed = ig.feed.accountFollowers(loggedInUser.pk);
  //const followersFeed = ig.feed.directInbox();
 // const followersFeed = ig.feed.directPending();
  const wholeResponse = await followersFeed.request();
  //console.log(wholeResponse); // You can reach any properties in instagram response

  wholeResponse.users.forEach(user => {
    console.log("Following user: " + user.full_name)
    console.log(user);
  })

  //const followers = ig.feed.accountFollowers(243722311);
  //const res = await followers.request();

  //const items = await followersFeed.items();
  //console.log(items); // Here you can reach items. It's array.


  //const items = ig.feed.directInbox(loggedInUser.pk);
  //console.log(items)
})();