import { Client, QueryConfig } from 'pg';
import { DatabaseErrorMessages } from '../database';

export type DatabaseResult<T extends any = null> = {
  value?: T;
  error?: Error;
};

type DBConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export class Database {
  private connection: Client;

  constructor() {
    // TODO: 環境変数から読み込むようにする
    const config: DBConfig = {
      host: '',
      port: 5432,
      user: 'user',
      password: 'password',
      database: 'tiffin',
    };
    this.connection = new Client(config);
    this.connection
      .connect()
      .then(() => console.log('postgres connect success!'))
      .catch((err) => console.log(err));
  }

  public async query<T>(
    queryTextOrConfig: string | QueryConfig<any>
  ): Promise<DatabaseResult<T[]>> {
    const result: DatabaseResult<T[]> = {};
    await this.connection
      .query<T>(queryTextOrConfig)
      .then((res) => {
        result.value = res.rows;
      })
      .catch((err: Error) => {
        console.error(err.stack);
        result.error = err;
      });
    return result;
  }

  public async queryOne<T>(
    queryTextOrConfig: string | QueryConfig<any>
  ): Promise<DatabaseResult<T>> {
    const result: DatabaseResult<T> = {};
    await this.connection
      .query<T>(queryTextOrConfig)
      .then((res) => {
        console.log(res);
        if (res.rowCount === 0) {
          result.error = new Error(DatabaseErrorMessages.NoData);
        }
        result.value = res.rows[0];
      })
      .catch((err: Error) => {
        console.error(err.stack);
        result.error = err;
      });
    return result;
  }

  public async insert(
    queryTextOrConfig: string | QueryConfig<any>
  ): Promise<DatabaseResult<number>> {
    const result: DatabaseResult<number> = {};
    await this.connection
      .query<{ id: number }>(queryTextOrConfig)
      .then((res) => {
        result.value = res.rows[0].id;
      })
      .catch((err: Error) => {
        console.error(err.stack);
        result.error = err;
      });
    return result;
  }

  public async update(queryTextOrConfig: string | QueryConfig<any>): Promise<DatabaseResult> {
    const result: DatabaseResult = {};
    await this.connection.query(queryTextOrConfig).catch((err: Error) => {
      console.error(err.stack);
      result.error = err;
    });
    return result;
  }

  public async delete(queryTextOrConfig: string | QueryConfig<any>): Promise<DatabaseResult> {
    const result: DatabaseResult = {};
    await this.connection.query(queryTextOrConfig).catch((err: Error) => {
      console.error(err.stack);
      result.error = err;
    });
    return result;
  }
}
