const request = require('supertest');
const app = require('../app.js');

describe('Test errors for post to /v1/api/fetch_cards', () => {
    test('should get the correct error if no body is provided', async () => {
      const response = await request(app).post('/v1/api/fetch_cards').send();
      const { body } = response;
      const { message, statusCode } = body;
      expect(statusCode).toEqual(400);
      expect(message).toContain('Body has not been provided!');
    });

    test('should get a the correct error if wrong body provided', async () => {
      const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: '' });
      const { body } = response;
      const { message, statusCode } = body;
      expect(statusCode).toEqual(400);
      expect(message).toContain('Incorrect data provided! Accepts a heroes array with the names of the heroes');
    });

    test('should get a the correct error if empty array provided', async () => {
      const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: [] });
      const { body } = response;
      const { message, statusCode } = body;
      expect(statusCode).toEqual(400);
      expect(message).toContain('Incorrect data provided! Accepts a heroes array with the names of the heroes');
    });
});
