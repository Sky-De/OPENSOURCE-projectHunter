import request from 'supertest';
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'vitest';
import { setupDatabase, teardownDatabase } from './utils';

import { makeServer } from '../src/app';

const app = await makeServer();
const endpoint = '/api/user';

beforeAll(async () => {
  //await seq.sync({ force: true });
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

describe('GET /user (getUser)', function () {
  let token;

  beforeEach(async () => {
    const { body } = await request(app).put(endpoint).send({
      username: 'testuser2',
      password: 'Password12!',
    });

    token = body.token;
  });

  test('should return user if valid token is provided', async () => {
    const { body, statusCode } = await request(app)
      .get(endpoint)
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toBe(200);

    expect(body).toMatchObject({
      username: 'testuser2',
      email: 'testuser2@gmail.com',
      firstName: 'John',
    });
  });

  test('should return bad status code and message if token is missing', async () => {
    const { statusCode, text } = await request(app).get(endpoint);
    // .set('Authorization', `Bearer ${token}`)

    expect(statusCode).toBe(400);
    expect(text).toBe('token is missing');
  });

  test('should return bad status code and message if token is invalid', async () => {
    // May have to console log the message to see what it is
    const { body, statusCode } = await request(app)
      .get(endpoint)
      .set('Authorization', `Bearer ${token}2`);

    expect(statusCode).toBe(401);
    // console.log(body)
    expect(body.error.message).toBe('invalid signature');
  });

  test('should return bad status code and message if token is invalid malformed', async () => {
    // May have to console log the message to see what it is
    const { body, statusCode } = await request(app)
      .get(endpoint)
      .set('Authorization', 'Bearer abc');

    expect(statusCode).toBe(401);
    // console.log(body)
    expect(body.error.message).toBe('jwt malformed');
  });
});

describe('PUT /user (login)', function () {
  test('should login and return token if correct information is provided', async () => {
    const { body, statusCode } = await request(app).put(endpoint).send({
      username: 'testuser1',
      password: 'Password12!',
    });

    expect(statusCode).toBe(200);

    expect(body).toHaveProperty('token');
  });

  test('should return bad status code and reason if username does not exist', async () => {
    const { text, statusCode } = await request(app).put(endpoint).send({
      username: 'testuser',
      password: 'Password12!',
    });

    expect(statusCode).toBe(400);
    expect(text).toBe('Incorrect username or password');
  });

  test('should return bad status code and reason if password is incorrect', async () => {
    const { text, statusCode } = await request(app).put(endpoint).send({
      username: 'testuser1',
      password: 'Password1!',
    });

    expect(statusCode).toBe(400);
    expect(text).toBe('Incorrect username or password');
  });
});

describe('POST /user/invite (createInvite)', function () {
  beforeEach(async () => {
    //await seq.sync({ force: true });
    await setupDatabase();
  });

  afterEach(async () => {
    await teardownDatabase();
  });

  test('should create Invite object and respond with status 201 if correct information is provided', async () => {
    const { text, statusCode } = await request(app)
      .post(endpoint + '/invite')
      .send({
        username: 'testfromtest',
        email: 'testfromtest@gmail.com',
      });

    expect(statusCode).toBe(201);
    expect(text).toBe('Invite sent.');
  });

  test('should return status code 400 if username is not passed', async () => {
    const { text, statusCode } = await request(app)
      .post(endpoint + '/invite')
      .send({
        email: 'testfromtest@gmail.com',
      });

    expect(statusCode).toBe(400);
    expect(text).toBe('Username not provided');
  });

  test('should return status code 400 if email is not passed', async () => {
    const { text, statusCode } = await request(app)
      .post(endpoint + '/invite')
      .send({
        username: 'testfromtest',
      });

    expect(statusCode).toBe(400);
    expect(text).toBe('Email not provided');
  });

  test('should return status code 400 if username is already taken', async () => {
    const { text, statusCode } = await request(app)
      .post(endpoint + '/invite')
      .send({
        username: 'testuser1',
        email: 'testfromtest@gmail.com',
      });

    expect(statusCode).toBe(400);
    expect(text).toBe('Username is already taken');
  });

  test('should return status code 400 if email is already taken', async () => {
    const { text, statusCode } = await request(app)
      .post(endpoint + '/invite')
      .send({
        username: 'testfromtest',
        email: 'testuser1@gmail.com',
      });

    expect(statusCode).toBe(400);
    expect(text).toBe('Email is already taken');
  });
});

// describe('GET /user/invite/:ikey (getInvite)', function () {
//   test('should return the Invite object and status 200 if correct ikey is provided', async () => {
//     expect(1).toBe(2);
//   });

//   test('should return status 400 if invalid ikey is provided', async () => {
//     expect(1).toBe(2);
//   });

//   test('should return status 400 if the corresponding Invite has been expired', async () => {
//     expect(1).toBe(2);
//   });
// });

// // Don't work on this, as the flow of account creation will change due to email verification
// describe('POST /user (createUser)', function () {
//   test('should create account if correct information is provided', async () => {
//     expect(1).toBe(2);
//   });

//   test('should return status 400 if the corresponding Invite has been expired', async () => {
//     expect(1).toBe(2);
//   });

//   test('should return status 400 if they are a minor', async () => {
//     expect(1).toBe(2);
//   })

//   test('should return status 400 and reason for failure if password is too short', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should return status 400 and reason for failure if password is too long', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should return status 400 and reason for failure if password is has no uppercase', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should return status 400 and reason for failure if password is has no lowercase', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should return status 400 and reason for failure if password is no number', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should return status 400 and reason for failure if password is no symbol', async () => {
//     // *NOTE YOU WILL HAVE TO CONSOLE LOG TO SEE THE MESSAGE
//     expect(1).toBe(2);
//   });

//   test('should have deleted the corresponding invite', async () => {

//   })
// });
