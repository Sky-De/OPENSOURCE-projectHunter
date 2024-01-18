import request from 'supertest';
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';
import { setupDatabase, teardownDatabase } from './utils';
import { seq } from '../src/models/connection';

import { makeServer } from '../src/app';

const app = makeServer();
const endpoint = '/api/user';

beforeAll(async () => {
  await seq.sync({ force: true });
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

describe('GET /users (getUser)', function () {
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

describe('PUT /users (login)', function () {
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

// Don't work on this, as the flow of account creation will change due to email verification
describe('POST /users (createUser)', function () {
  test('should create account if correct information is provided', async () => {});
});
