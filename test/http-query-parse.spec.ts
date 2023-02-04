import http from 'http';
import supertest from 'supertest';
import { Query, HttpQuery } from '../src';

it('parse', async () => {
  let query: Query;

  const httpServer: http.Server = http.createServer((request, response) => {
    query = HttpQuery.parse(request);

    response.end();
  });

  await supertest(httpServer)
    .get('/')
    .query({
      foo: 1245,
      bar: 4512,
    });

  expect(query).toEqual({ foo: '1245', bar: '4512' });
});
