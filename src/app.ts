//必要なimport一覧
import express from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import { ShopAccountRepository } from './repository/ShopAccountRepository';
import { ShopAccountService } from './service/ShopAccountService';
import { ShopAccountController } from './controller/ShopAccountController';
import { ShopInfoRepository } from './repository/ShopInfoRepository';
import { ShopInfoService } from './service/ShopInfoService';
import { ShopInfoController } from './controller/ShopInfoController';
import { Database } from './utils/database/Database';

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

const db = new Database();

// // postgres 接続情報
// const connection = new Client({
//   host: '',
//   port: 5432,
//   user: 'user',
//   password: 'password',
//   database: 'tiffin',
// });

// // postgresに接続
// connection
//   .connect()
//   .then(() => console.log('postgres connect success!'))
//   .catch((err) => console.log(err));

const shopAccountRepository = new ShopAccountRepository(db);
const shopAccountService = new ShopAccountService(shopAccountRepository);
const shopAccountController = new ShopAccountController(shopAccountService);

app.use('/api/', shopAccountController.router);

const shopInfoRepository = new ShopInfoRepository(db);
const shopInfoService = new ShopInfoService(shopInfoRepository);
const shopInfoController = new ShopInfoController(shopInfoService);

app.use('/api/', shopInfoController.router);
