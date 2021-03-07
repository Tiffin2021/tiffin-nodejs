//必要なimport一覧
import express from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from 'pg';
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

// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.json('Hello World');
// })

const connection = new Client({
  host: '',
  port: 5432,
  user: 'user',
  password: 'password',
  database: 'tiffin'
})

connection.connect();

//SQL文の生成
const query = {
  text: 'INSERT INTO shop_accounts(email, pass) VALUES($1, $2)',
  values: ['shop04@gmail.com', 'shop04'],
}

//Promiseを使ったクエリ操作
connection.query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))