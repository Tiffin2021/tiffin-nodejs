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
import { ShopController } from './controller/ShopController';
import { ShopService } from './service/ShopService';
import { Database } from './utils/database/Database';
import { GenreRepository } from './repository/GenreRepository';
import { GenreService } from './service/GenreService';
import { GenreController } from './controller/GenreController';
import { StationMasterRepository } from './repository/StationMasterRepository';
import { StationMasterService } from './service/StationMasterService';
import { StationMasterController } from './controller/StationMasterController';
import { TimeMasterRepository } from './repository/TimeMasterRepository';
import { TimeMasterService } from './service/TimeMasterService';
import { TimeMasterController } from './controller/TimeMasterController';
import { PhotoRepository } from './repository/PhotoRepository';
import { PhotoService } from './service/PhotoService';
import { PhotoController } from './controller/PhotoController';

//定義
const app = express();

//expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log(`Node.js is listening to PORT: ${address.port}`);
});

// expressの設定(cors method header 許可の設定)
app.disable('x-powered-by');
// jsonでのPOST時に最大10MBまで許容する
app.use(cors()).use(express.json({ limit: '10mb' })); // マックス10mb

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

// staticにアクセスできるディレクトリ
app.use(express.static(__dirname + '/public'));

//店舗アカウントの操作
const shopAccountRepository = new ShopAccountRepository(db);
const shopAccountService = new ShopAccountService(shopAccountRepository);
const shopAccountController = new ShopAccountController(shopAccountService);
app.use('/api/', shopAccountController.router);

//店舗情報の操作
const shopInfoRepository = new ShopInfoRepository(db);
const shopInfoService = new ShopInfoService(shopInfoRepository);
const shopInfoController = new ShopInfoController(shopInfoService);
app.use('/api/', shopInfoController.router);

//画像テーブルの操作
const photoRepository = new PhotoRepository(db);
const photoService = new PhotoService(photoRepository, shopInfoRepository);
const photoController = new PhotoController(photoService);
app.use('/api/', photoController.router);

//店舗アカウントと店舗情報の両方の操作
const shopService = new ShopService(shopAccountRepository, shopInfoRepository, photoRepository);
const shopController = new ShopController(shopService);
app.use('/api/', shopController.router);

//ジャンルマスターの操作
const genreRepository = new GenreRepository(db);
const genreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);
app.use('/api/', genreController.router);

//ステーションマスターの操作
const stationMasterRepository = new StationMasterRepository(db);
const stationMasterService = new StationMasterService(stationMasterRepository);
const stationMasterController = new StationMasterController(stationMasterService);
app.use('/api/', stationMasterController.router);

//タイムマスターの操作
const timeMasterRepository = new TimeMasterRepository(db);
const timeMasterService = new TimeMasterService(timeMasterRepository);
const timeMasterController = new TimeMasterController(timeMasterService);
app.use('/api/', timeMasterController.router);
