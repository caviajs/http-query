import http from 'http';
import { of } from 'rxjs';
import supertest from 'supertest';
import { HttpRouter } from '../src';

const EXAMPLE_UNDEFINED: undefined = undefined;

it('should correctly serialize undefined returned by handler', async () => {
  // sync
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter.route({ handler: () => EXAMPLE_UNDEFINED, method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const response = await supertest(httpServer)
      .get('/');

    expect(response.type).toBe('');
    expect(response.headers['content-length']).toBe('0');
    expect(response.headers['content-type']).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }

  // async
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter.route({ handler: () => Promise.resolve(EXAMPLE_UNDEFINED), method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const response = await supertest(httpServer)
      .get('/');

    expect(response.type).toBe('');
    expect(response.headers['content-length']).toBe('0');
    expect(response.headers['content-type']).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }

  // sync + observable
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter.route({ handler: () => of(EXAMPLE_UNDEFINED), method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const response = await supertest(httpServer)
      .get('/');

    expect(response.type).toBe('');
    expect(response.headers['content-length']).toBe('0');
    expect(response.headers['content-type']).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }

  // async + observable
  {
    const httpRouter: HttpRouter = new HttpRouter();

    httpRouter.route({ handler: () => Promise.resolve(of(EXAMPLE_UNDEFINED)), method: 'GET', path: '/' });

    const httpServer: http.Server = http.createServer((request, response) => {
      httpRouter.handle(request, response);
    });

    const response = await supertest(httpServer)
      .get('/');

    expect(response.type).toBe('');
    expect(response.headers['content-length']).toBe('0');
    expect(response.headers['content-type']).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }
});

it('should correctly overwrite headers after undefined serialization, if specified in a handler', async () => {
  const httpRouter: HttpRouter = new HttpRouter();

  httpRouter.route({
    handler: (request, response) => {
      response
        .setHeader('content-length', '0')
        .setHeader('content-type', 'application/javascript');

      return EXAMPLE_UNDEFINED;
    },
    method: 'GET',
    path: '/',
  });

  const httpServer: http.Server = http.createServer((request, response) => {
    httpRouter.handle(request, response);
  });

  const response = await supertest(httpServer)
    .get('/');

  expect(response.headers['content-length']).toBe('0');
  expect(response.headers['content-type']).toBe('application/javascript');
});
