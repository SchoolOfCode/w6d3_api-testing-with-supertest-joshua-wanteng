# Purpose

Become familiar with API testing. We happen to be using Jest and Supertest, but if you understand the key concepts, you can apply the same principles with any testing library.

# Task 1

1. Complete the tests written in `index.test.js`.

# Task 2

Briefly familiarise yourself with the contents and structure of the `task-2` folder. It's not an API or Express app that you've written, but there also shouldn't be anything new or unfamiliar in there.

1. Add a test (in `routes/users.test.js`) which checks whether sending a `GET /users` request (using Supertest) gives us back a response containing:

   - HTTP status 200
   - A response body that has the following structure:

   ```ts
   {
     "success": true,
     "payload": [
       { "id": number, "username": string }, // so "id" can be any number, "username" can be any string
       { "id": number, "username": string }
       // ... and so forth for any other users.
     ]
   }
   ```

   (Remember to use the skills you've picked up in task 1. If you're stuck, look at the docs for both Jest and Supertest.)

2. Add a test (in `routes/users.test.js`) which checks whether sending a `GET /users/:id` request (using Supertest) for an existing ID gives us back a response containing:

   - HTTP status 200
   - A response body that has the following structure:

   ```ts
   {
       "success": true,
       "payload": { "id": number, "username": string }
   }
   ```

3. Add a test (in `routes/users.test.js`) which checks whether sending a `GET /users/:id` request (using Supertest) for a non-existing ID gives us back a response containing:

   - HTTP status 404
   - A response body that has the following structure:

   ```ts
   {
       "success": false,
       "reason": "No user with ID <REQUESTED_ID> was found."
   }
   ```

   _See if you can store the non-existing ID in a variable so that you can then refer to the variable throughout your test._

# Task 3

## Setup

1. Create a `.env` file (using `.env.example` to see which variables need to be filled out), so that our Node.js project can connect to a PostgreSQL instance.
2. If you're connecting to a local PostgreSQL instance, make sure it's running (on the port that you specified in your `.env` file).
3. `cd` into `task-3` folder, install dependencies, then run the `db-reset` script (see `package.json` for details).

**Heads-up:** we will be repeatedly creating and dropping a `users` table in this task. So, if your database happens to already contain a `users` table that you don't want to lose, create a fresh, separate database and provide its name instead via `PGDATABASE` environment variable.

## Tests

Create a `users.test.js` file (within `routes` folder).

1. For each of these requests:

- `GET /users`
- `GET /users?username=<some_username>`
- `GET /users/:id`

complete the following:

- Look at that route's request handler (in `routes/users.js`) and discuss how many scenarios need to be tested. Usually, the more conditions (e.g. the more IF statements) the handler contains, the more scenarios that need testing.
- Write a test (in `routes/users.test.js`) for each scenario.
- Assert whether all the expected information (e.g. HTTP status code, response's body's structure) is present within the response.

Seeing a yellow warning like `Jest did not exit one second after the test run has completed.` when you run your tests? Google the warning and try to work out how to get the tests to gracefully end. Potentially helpful:

- https://stackoverflow.com/questions/53935108/
- https://node-postgres.com/features/pooling#shutdown
- https://jestjs.io/docs/setup-teardown

Until then, you should be able to CTRL+C (or equivalent for your machine) to abruptly exit and return control to your terminal.

2. Do the same as the above for the routes below. However, before doing so, have a look at https://jestjs.io/docs/setup-teardown to see how Jest might give us an opportunity to get ourselves a fresh `users` table for each test.

- `POST /users/:id`
- `DELETE /users/:id`

Stuck? See if `beforeEach` (from Jest) and the function exported in `db/scripts/reset-table.js` might be useful.

# Bonus

- Discuss why it might be useful to have a fresh `users` table for each test. Are there other (potentially better) ways to get a fresh context?
- Look at the `test` script in `task-3/package.json`. Additional information has been passed to Jest. Have a look at the Jest documentation and discuss what the purpose of this information is.
- Take turns to summarise to each other what's involved when we're testing an API endpoint. Covering just the high-level concepts is a good starting point.
