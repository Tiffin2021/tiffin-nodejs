export type Result<T extends any = null> = {
  result?: T;
  statusCode?: number;
  error?: Error;
};
