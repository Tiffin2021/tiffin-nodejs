//必要なimport一覧
import express from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import { Request, Response, Router } from 'express';
import { ShopAccountRepository } from './repository/ShopAccountRepository';

//定義
const app = express();

//expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log(`Node.js is listening to PORT: ${address.port}`);
});

//expressの設定(cors method header 許可の設定)
app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

// postgres 接続情報
const connection = new Client({
  host: '',
  port: 5432,
  user: 'user',
  password: 'password',
  database: 'tiffin',
});

// postgresに接続
connection
  .connect()
  .then(() => console.log('postgres connect success!'))
  .catch((err) => console.log(err));

const repository = new ShopAccountRepository(connection);

app.get('/api/shop_accounts/', async (req: Request, res: Response) => {
  const shopAccounts = await repository.getAll().catch((err) => {
    console.log(err);
    res.status(500).json(err);
    return;
  });
  res.json(shopAccounts);
});
