import http from 'http';
import * as url from 'url';

export class HttpQuery {
  public static parse(request: http.IncomingMessage): any {
    request.query = url.parse(request.url, true).query as any;
  }
}
