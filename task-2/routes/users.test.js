/*
cd into task-2 folder. Run npm i to install required dependencies. ✅

Familiarise yourself with the contents and structure of the task-2 folder. 
You haven't written it, but there also shouldn't be anything new or unfamiliar in there. ✅

Write an asynchronous test (in routes/users.test.js) which:

Sends a GET /users request to our app using Supertest ✅
  - import superTest ✅
  - import app from file path ✅
Checks if the response's HTTP status code is 200 ✅
Checks if the response's body is an object with the structure: 
{ success: true, payload: array }
  - import jest ✅ 
  - check structure against an object declared as expected and 
  within that use a expect.any method for array? ✅ 
Checks if every item in the payload array is an object with the structure: 
{ id: any number, username: any string } ✅
  - using jest check each payload array item and check using object 
  declared with expect.any for number and string respectively
    - can we loop with forEach using jest? ✅✅✅✅
*/

import request from "supertest";
import app from "../app.js";
import { test, expect, describe} from "@jest/globals";

describe(`when get req to /users returns 200, a res with body structured correctly and a payload of an array of correctly structured objects within the body`,
() => {
  test(`when get req to /users returns 200 status code`,
  async () => {
    const response = await request(app).get(`/users`);
    expect(response.statusCode).toBe(200);
  });
  test(`a res with body structured { success: true, payload: array } is returned`,
  async () => {  
    const response = await request(app).get(`/users`);
    const actual = response.body;
    const expected = { success: true, payload: expect.any(Array) };
    expect(actual).toEqual(expected);
  });
  test(`payload within body is structured { id: any number, username: any string }`,
  async () => {
    const response = await request(app).get(`/users`);
    const actual = response.body.payload;
    //const actual = [{ id: 1, username: `Josh` }, { id: 2, username: `JJOSH` }, /*{ id: true, username: 1n }*/]
    const expected = { id: expect.any(Number), username: expect.any(String) };
    actual.forEach(e => expect(e).toEqual(expected));
  });
})

/*
Write an asynchronous test (in routes/users.test.js) which: ✅

Sends a GET /users/4 request to our app using Supertest ✅
Checks if the response's HTTP status code is 200 ✅
Checks if the response's body is an object with the structure { success: true, payload: { id: 4, username: any string } } ✅
*/

describe(`when get req to /users/4 returns 200 and a res with body structured correctly`,
() => {
  test(`when get req to /users/4 returns 200 status code`,
  async () => {
    const response = await request(app).get(`/users/4`);
    expect(response.statusCode).toBe(200);
  });
  test(`a res with body structured { success: true, payload: { id: 4, username: any string } is returned`,
  async () => {  
    const response = await request(app).get(`/users/4`);
    const actual = response.body;
    const expected = { success: true, payload: { id: 4, username: expect.any(String) }};
    expect(actual).toEqual(expected);
  });
})

/*
Write an asynchronous test (in routes/users.test.js) which:

Sends a GET /users/99 request to our app using Supertest
Checks if the response's HTTP status code is 404
Checks if the response's body is an object with the structure { success: false, reason: "No user with ID 99 was found" }
*/