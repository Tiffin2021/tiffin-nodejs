//必要なimport一覧
import express from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Client } from 'pg';
import { Request, Response, Router } from 'express';
import { ShopAccountRepository } from './repository/ShopAccountRepository';
import { ShopAccountService } from './service/ShopAccountService';
import { ShopAccountController } from './controller/ShopAccountController';
import { ShopInfoRepository } from './repository/ShopInfoRepository';
import { ShopInfoService } from './service/ShopInfoService';
import { ShopInfoController } from './controller/ShopInfoController';
import { ShopController } from './controller/ShopController';
import { ShopService } from './service/ShopService';

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

const shopAccountRepository = new ShopAccountRepository(connection);
const shopInfoRepository = new ShopInfoRepository(connection);
const shopService = new ShopService(shopAccountRepository, shopInfoRepository);
const shopController = new ShopController(shopService);

app.use('/api/', shopController.router);
