//必要なimport一覧
import express, { response } from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client, Query, QueryResult } from 'pg';
import { NextFunction, Request, Response, Router } from 'express';


//定義
const app = express();

//expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log("Node.js is listening to PORT:" + address.port);
});

//expressの設定(cors method header 許可の設定)
app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

const connection = new Client({
  host: '',
  port: 5432,
  user: 'user',
  password: 'password',
  database: 'tiffin'
})

connection.connect();

app.get("/api/shop_accounts/", async (req: Request, res: Response, next: NextFunction) => {
  //SQL文の生成
  const query = {
    text: 'SELECT * FROM shop_accounts',
  }

  //Promiseを使ったクエリ操作
  const shopAccounts = await connection.query(query)
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
      return;
    }) as QueryResult

  res.json(shopAccounts.rows);
})