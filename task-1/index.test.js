/**
 * Before we start testing APIs, the point here is to become more familiar with the matchers that Jest gives us and how we can check nested/complex structures.
 *
 * Where necessary, have a look at the Jest docs.
 *
 * @link https://jestjs.io/docs/expect
 */

/* Write a test that checks whether `actual` is an object that contains a single key-value pair:
 *      - "success": true
 */
test("Has the structure { success: true }", () => {
  const actual = {
    success: true,
  };
});

/**
 * Write a test that checks whether `actual` is an object that contains two key-value pairs:
 *      - "value": ANY number
 *      - "title": ANY string
 */
test("Has the structure { value: <number>, title: <string> }", () => {
  const actual = {
    value: 5,
    title: "THE CLOWN IN THE SHOP (1984)",
  };
});

/**
 * Write a test that checks whether `getAuthentication` (when called) resolves to an object that contains two key-value pairs:
 *      - "success": true
 *      - "payload": object
 *
 *      where "payload" itself contains three key-value pairs:
 *          - "hasAuthenticated": true
 *          - "isAdmin": false
 *          - "userId": ANY number
 *
 * Only the function has been provided. You'll have to write everything else.
 *
 * Since the function is asynchronous, you may need to read up on how Jest handles that.
 *
 * @link https://jestjs.io/docs/asynchronous
 */
const getAuthentication = async () => {
  return {
    success: true,
    payload: {
      isAuthenticated: true,
      isAdmin: false,
      userId: 125095,
    },
  };
};

/**
 * Write a test that checks whether `getUsernames` (when called) resolves to an object that contains two key-value pairs:
 *      - "ok": true
 *      - "payload": array
 *
 *      where "payload" itself is an array of objects where each object has a single key-value pair:
 *          - "username": ANY string
 *
 * Only the function has been provided. You'll have to write everything else.
 *
 * Since the function is asynchronous, you may need to read up on how Jest handles that.
 *
 * @link https://jestjs.io/docs/asynchronous
 */
const getUsernames = async () => {
  return {
    ok: true,
    payload: [
      { username: "A" },
      { username: "B" },
      { username: "C" },
      { username: "D" },
    ],
  };
};
