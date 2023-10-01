# ELearning-backend








### Overview/clarification of some important things

- DB
  - Mongo => create a new project and have the uri
  - Redis => have a upstash account and create a db and get the db url
    - The redis url have protocol as redis convert it to rediss
  - Cloudinary => get cloudinary cloud configuration, cloud name, api key, api secret
- Backend error handling

  - Create error handling class in Errorhandler.ts
    - Why creating a class :-> To avoid write the same response message to be written in each route
      - and create a class to create a error object.
  - This ErrorHandler class extends to Error object
  - Create a error handling middleware which will handle the error generated and send it back to user.

- Create tsconfig.json file using `npx tsc --init` command
- Create email regex:

```js
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // [^\s@] => should not start with white space or @
// this pattern checks that email should not start with @ or space e.g "@abc@gmail.com" or "abc@ gmail.com" etc
```

- Check the asyncErrorHandler function ?????????????????

- added a @types folder with a file custom.d.ts to define some types globally which used to solve problem => when we assigned req.user = {<user_data>} ( from redis cache) it gave error that .user is not a property in request object so needed to specify explicitly that we might be having a proeperty associated with request object later on.

- **node-cron**
- npm i node-cron @types/node-cron

      - used to make a scheduled call after some time to our server
      - e.g. if we want to schedule a clean up of our database collection after some time or run a particular login

  ```javascript
  // this code will be running the console.logs each 5 seconds.
  cron.schedule("*/5 * * * * *", function () {
    console.log("...............");
    console.log("running cron");
  });
  ```


### Advance caching
- As we are using redis for caching,
-  If we have million of users, then our redis store will also be facing million of queries which will affect data response from redis as well.

- **What to do?**
  - add expiration time for each cache stored in redis.
