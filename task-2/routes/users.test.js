import request from "supertest";
import app from "../app.js";
import {test,expect} from "@jest/globals";

test(`check correct request path, response structure, payload structure`, async function () {
    
    const response = await request(app).get("/users");
    const expected = {
        body:{ 
            success: true, 
            payload: { id: expect.arrayContaining([expect.any(Number)]), 
                username: expect.arrayContaining([expect.any(String)]) }
             }

    }
    
    //check reuquest path is 200
    expect(response.statusCode).toBe(200);
    expect(response._body).toStrictEqual(expectedBody);
    expect(response._body.payload).toStrictEqual(expect.arrayContaining(expectedPayload));


});