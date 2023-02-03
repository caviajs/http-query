import http from 'http';
import * as url from 'url';

export class HttpQuery {
  public static parse(request: http.IncomingMessage): Query {
    return url.parse(request.url, true).query as Query;
  }
}

export interface Query {
  [name: string]: boolean | number | string;
}
