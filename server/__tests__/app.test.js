const request = require('supertest');
const app = require('../app.js');
const oneHero = ['iron man']
const heroes = ['iron man', 'spider-man']

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

describe('Test successful request for post to /v1/api/fetch_cards', () => {
  test('should get the correct status code', async () => {
    const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: oneHero });
    const { body } = response;
    const { statusCode } = body;
    expect(statusCode).toEqual(200);
  });
  test('should include an avatars array with double the length of the heroes length', async () => {
    const response = await request(app).post('/v1/api/fetch_cards').send({ heroes });
    const { body } = response;
    const { avatars } = body;
    const avatarsLength = avatars.length;
    const heroesLength = heroes.length
    expect(avatarsLength).toEqual(heroesLength * 2);
  });
  test('should include a non empty image http link', async () => {
    const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: oneHero });
    const { body } = response;
    const { avatars } = body;
    const { image } = avatars[0];
    expect(image.length).toBeGreaterThan(0);
    expect(image).toContain('https://');
    expect(image).toContain('.jpg');
  });
  test('should include a hero name with the same name as the request', async () => {
    const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: oneHero });
    const { body } = response;
    const { avatars } = body;
    const { hero } = avatars[0];
    expect(hero.length).toBeGreaterThan(0);
    expect(hero).toEqual(oneHero[0]);
  });
  test('should include two hero names with the same name as the request', async () => {
    const response = await request(app).post('/v1/api/fetch_cards').send({ heroes: oneHero });
    const { body } = response;
    const { avatars } = body;
    const heroA = avatars[0].hero;
    const heroB = avatars[1].hero;
    expect(heroA).toEqual(oneHero[0]);
    expect(heroB).toEqual(oneHero[0]);
  });
});
