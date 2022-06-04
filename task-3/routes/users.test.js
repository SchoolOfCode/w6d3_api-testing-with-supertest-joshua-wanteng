/*

1. `cd` into `task-3` folder. Run `npm i` to install required 
dependencies. ✅
2. Set up a brand new PostgreSQL database (on Heroku or locally). 
(It should be new as we will be repeatedly creating and dropping 
  a `users` table.) ✅
3. Create a `.env` file and add your connection details/credentials 
to it. Use the `.env.example` file to see which variables are needed. ✅
4. Run `npm run db-reset` (see `package.json` for details).
5. Create a file named `users.test.js` file (within `routes` folder). ✅
6. For each of these requests:

   - `GET /users`
   - `GET /users?username=some_username`
   - `GET /users/:id`
   - `POST /users`
   - `DELETE /users/:id`

   complete the following:

   1. Look at the request handler for that route (in `routes/users.js`) and discuss in your team what things might be worth testing. Think about different scenarios or edge cases.
   2. Write at least one test for each route (in `routes/users.test.js`) that checks if the following are as expected in the response:
      - HTTP status code
      - body's structure
      - anything else that you discussed

⚠️ Seeing a yellow warning like `Jest did not exit one second after the test run has completed.` when you run your tests? Google the warning and try to work out how to get the tests to gracefully end. Potentially helpful:

- https://stackoverflow.com/questions/53935108/
- https://node-postgres.com/features/pooling#shutdown
- https://jestjs.io/docs/setup-teardown

Until then, you should be able to press CTRL + C (or equivalent for your OS/keyboard) to abruptly exit and return control to your terminal.

# Bonus

- One of the problems we've not addressed is that we're not resetting the database between each test, which means one test can affect another test's outcome. (For example, imagine if we delete user ID 4 in one test, but another test tries to get user ID 4 and expects it to exist.) Have a look at https://jestjs.io/docs/setup-teardown to see how Jest might give us an opportunity to re-build a fresh `users` table for each test.
  - Stuck? See if `beforeEach` (from Jest) and the `resetUsersTable` function exported in `db/helpers.js` might be useful.
- Discuss why it might be useful to have a fresh `users` table for each test. Are there other (potentially better) ways to get a fresh context?
- Look at the command associated with the `test` script in `task-3/package.json`. Research and discuss what`--setupFiles dotenv/config` means and does for us.
- Take turns to summarise to each other what's involved when we're testing an API endpoint.
  - For example, what parts of the response did we check match our expectations?

*/

/*

   - `GET /users`
   - `GET /users?username=some_username`
   - `GET /users/:id`
   - `POST /users`
   - `DELETE /users/:id`

   complete the following:

   1. Look at the request handler for that route (in `routes/users.js`) 
   and discuss in your team what things might be worth testing.
    - a valid search/request returns 200
    - a valid search/request returns a body structured 
    correctly
    - an invalid search/request returns a 404
    - an invalid search/request returns a body structed
    correctly
   Think about different scenarios or edge cases.
   2. Write at least one test for each route (in `routes/users.test.js`)
    that checks if the following are as expected 
    in the response:
      - HTTP status code
      - body's structure
      - anything else that you discussed
*/

import request from "supertest";
import app from "../app.js";
import { test, expect, describe} from "@jest/globals";
import { seedData } from "../db/seed-data.js"
import { resetUsersTable } from "../db/helpers.js"

beforeAll(() => {
  return resetUsersTable();
});

describe(`get route works for all, id search, and specific name 
search on valid and invalid requests`,
() => {
  test(`when get req to /users returns 200 status code`,
  async () => {
    const response = await request(app).get(`/users`);
    expect(response.statusCode).toBe(200);
  });
  test(`when get req to /users a res with body structured 
  { success: true, payload: array } is returned`,
  async () => {  
    const response = await request(app).get(`/users`);
    const actual = response.body;
    const expected = { success: true, payload: expect.any(Array) };
    expect(actual).toEqual(expected);
  });
  test(`when get req to /users payload within body is structured 
  { id: any number, username: any string }`,
  async () => {
    const response = await request(app).get(`/users`);
    const actual = response.body.payload;
    const expected = { id: expect.any(Number), username: expect.any(String) };
    actual.forEach(e => expect(e).toEqual(expected));
  });
  test(`when get req to /users/:id <1..200> returns 200 status code`,
  async () => {
    Array.from(Array(200).keys()).forEach(async e => {
      const response = await request(app).get(`/users/${e+1}`);
      expect(response.statusCode).toBe(200);  
    })  
  });  
  test(`when get req to /users/:id <1..200> payload within body 
  is structured { id: any number, username: any string }`,
  async () => {
    Array.from(Array(200).keys()).forEach(async e => {
      const response = await request(app).get(`/users/${e+1}`);
      const actual = response.body.payload;
      const expected = { id: expect.any(Number), username: expect.any(String) };
      expect(actual).toEqual(expected);  
    })
  });
  test(`when get req to /users/201 returns 404 status code`,
  async () => {
    const response = await request(app).get(`/users/201`);
    expect(response.statusCode).toBe(404);
  });
  test(`when get req to /users/201 a res with body structured 
  { success: false, 
    reason: "No user with that ID 201 was found!" } is returned`,
  async () => {  
    const response = await request(app).get(`/users/201`);
    const actual = response.body;
    const expected = { success: false, reason: "No user with that ID 201 was found!" };
    expect(actual).toEqual(expected);
  });
  test(`when get req to /users?username= <seedData[i].username> 
  returns 200 status code`,
  async () => {
    seedData.forEach(async e => {
      const response = await request(app).get(`/users?username=${e.username}`);
      expect(response.statusCode).toBe(200);
    });
  });  
  test(`when get req to /users?username= <seedData[i].username> 
  payload within body is structured 
  [{ id: any number, username: any string }]`,
    async () => {
      seedData.forEach(async e => {
        const response = await request(app).get(`/users?username=${e.username}`);
        const actual = response.body.payload;
        const expected = [{ id: expect.any(Number), username: expect.any(String) }];
        expect(actual).toEqual(expected);
      });        
  });     
});

describe(`post route works on valid requests`,
() => {
  test(`when valid post req to /users returns 201 status code`,
  async () => {
    const response = await request(app).post(`/users`)
    .send({username: 'JOSH!!'})
    .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  }); 
  test(`when valid post req to /users res.body.payload structured 
  {"id": any number,
  "username": any string}} and headers as json are returned`,
  async () => {
    const response = await request(app).post(`/users`)
    .send({username: 'JOSH!!'})
    const actualPayload = response.body.payload;

    //console.log(response.header)
    const expectedPayload = 
    { id: expect.any(Number), username: expect.any(String) };
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(actualPayload).toEqual(expectedPayload);  
  });     
});

describe(`delete route works`,
() => {
  beforeAll(() => {
    return resetUsersTable();
  });
  test(`when delete to /users/:id <1..200> returns 200 status code`,
  async () => {
    Array.from(Array(200).keys()).forEach(async e => {
      const response = await request(app).delete(`/users/${e+1}`);
      expect(response.statusCode).toBe(200);  
    })  
  });  
  test(`when delete req to /users/:id <1..200> payload within body 
  is structured { id: any number, username: any string }`,
  async () => {
    Array.from(Array(200).keys()).forEach(async (e) => {
      const response = await request(app).delete(`/users/${e + 1}`);
      const actual = response.body.payload;
      console.log(response.body.payload)
      const expected = { id: expect.any(Number), username: expect.any(String) };
      expect(actual).toEqual(expected);
    })
  });    
});

/*
   - `GET /users` ✅
   - `GET /users?username=some_username` ✅
   - `GET /users/:id` ✅
   - `POST /users` ✅
   - `DELETE /users/:id`

   complete the following:
   Bonus - added before All to reset database ✅
  GET
  - a valid search returns 200 ✅
  - a valid search returns a body structured correctly ✅
  - an invalid search returns a 404 ✅
    - invalid username search returns empty array and 200
      - would need to rewrite function returning 
      data to deal with this ❗
  - an invalid search/request returns a body structed correctly ✅
        - invalid username search returns empty array
      - would need to rewrite function returning 
      data to deal with this ❗

  POST 
  - success returns 201 ✅
    - always returns 201 or just hangs on incorrect input on postman ❗ 
  - on post response headers are json ✅
  - on post payload is structured correctly ✅

  DELETE
  - just returns nothing if delete request doesn't exist ❗ 
  - check status 200 ✅
  - check structure ✅

*/