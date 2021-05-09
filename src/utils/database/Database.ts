import { Client, QueryConfig } from 'pg';
import { DatabaseErrorMessages } from '../database';
import * as dotenv from 'dotenv';

dotenv.config();

export type DatabaseResult<T extends any = null> = {
  value?: T;
  error?: Error;
};

type DBConfig_Local = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

type DBConfig_Production = {
  connectionString: string;
  ssl: { rejectUnauthorized: false };
};
export class Database {
  private connection: Client;

  constructor() {
    // 実行環境に合わせてデータベース設定を変更
    switch (process.env.ENV_ENVIRONMENT!) {
      case 'LOCAL':
        this.connection = new Client(this.createLocalDBConfig());
        break;
      case 'PRODUCTION':
        this.connection = new Client(this.createProductionDBConfig());
        break;
      // どれにも属さない場合、ローカル環境の設定にする
      default:
        this.connection = new Client(this.createLocalDBConfig());
        break;
    }

    this.connection
      .connect()
      .then(() => console.log('postgres connect success!'))
      .catch((err) => console.log(err));
  }

  /**
   * ローカル環境用のDB設定を作成する
   * @returns DBConfig_Local
   */
  private createLocalDBConfig(): DBConfig_Local {
    return {
      host: process.env.ENV_HOST!,
      database: process.env.ENV_DB!,
      user: process.env.ENV_USER!,
      port: parseInt(process.env.ENV_PORT!),
      password: process.env.ENV_PASSWORD!,
    } as DBConfig_Local;
  }

  /**
   * 本番環境用のDB設定を作成する
   * @returns DBConfig_Production
   */
  private createProductionDBConfig(): DBConfig_Production {
    console.log(process.env.DATABASE_URL!);
    return {
      connectionString: process.env.DATABASE_URL!,
    } as DBConfig_Production;
  }

  public async transaction() {
    this.connection.query('BEGIN');
  }

  public async commit() {
    this.connection.query('COMMIT');
  }

  public async rollback() {
    this.connection.query('ROLLBACK');
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
