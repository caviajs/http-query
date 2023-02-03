declare module 'http' {
  export interface IncomingMessage {
    query: { [name: string]: boolean | number | string; } | undefined;
  }
}
