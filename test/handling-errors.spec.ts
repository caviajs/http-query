import http from 'http';
import supertest from 'supertest';
import { HttpException } from '@caviajs/http-exception';
import { HttpRouter } from '../src';

function createServer(): http.Server {
  const httpRouter: HttpRouter = new HttpRouter();

  httpRouter
    .route({
      handler: () => {
        throw new HttpException(401);
      },
      method: 'GET',
      path: '/exception-1',
    })
    .route({
      handler: () => {
        throw new HttpException(401, 'Hello Cavia');
      },
      method: 'GET',
      path: '/exception-2',
    })
    .route({
      handler: () => {
        throw new HttpException(409, { hello: 'cavia' });
      },
      method: 'GET',
      path: '/exception-3',
    })
    .route({
      handler: () => {
        throw new Error('Hello Cavia');
      },
      method: 'GET',
      path: '/error',
    });

  return http.createServer(async (request, response) => {
    await httpRouter.handle(request, response);
  });
}

describe('Handling errors', () => {
  it('should handle HttpException correctly', (done) => {
    const httpServer: http.Server = createServer();

    supertest(httpServer)
      .get('/exception-1')
      .expect(401, { statusCode: 401, statusMessage: 'Unauthorized' }, done);

    supertest(httpServer)
      .get('/exception-2')
      .expect(401, { statusCode: 401, statusMessage: 'Hello Cavia' }, done);

    supertest(httpServer)
      .get('/exception-3')
      .expect(409, { hello: 'cavia' }, done);
  });

  it('should handle Error correctly', (done) => {
    const httpServer: http.Server = createServer();

    supertest(httpServer)
      .get('/error')
      .expect(500, { statusCode: 500, statusMessage: 'Internal Server Error' }, done);
  });
});
