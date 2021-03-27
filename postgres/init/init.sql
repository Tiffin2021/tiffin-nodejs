SET client_encoding = 'UTF8';

CREATE TABLE shop_accounts (
  id SERIAL NOT NULL,
  email varchar(64) NOT NULL,
  pass varchar(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (id)
);

INSERT INTO shop_accounts (email, pass) VALUES
('shop01@example.com', 'shop01'),
('shop02@example.com', 'shop02'),
('shop03@example.com', 'shop03')
;

CREATE TABLE shop_info (
  id SERIAL NOT NULL ,
  shop_accounts_id int NOT NULL,
  name varchar(100) NOT NULL,
  address varchar(50) NOT NULL,
  station varchar(50) NOT NULL,
  tel varchar(50) NOT NULL,
  opentime varchar(10) NOT NULL,
  closetime varchar(10) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  FOREIGN KEY (shop_accounts_id) REFERENCES shop_accounts(id),
  PRIMARY KEY (id)
);

INSERT INTO shop_info (shop_accounts_id, name, address, station, tel, opentime, closetime) VALUES
(1, 'サンプル店01', '東京都新宿区歌舞伎町1-1-1', '新宿駅', '0120-107-929', '1100', '1700'),
(2, 'サンプル店02', '東京都千代田区1-1', '半蔵門駅', '0120-828-828', '1100', '1400'),
(3, 'サンプル店03', '東京都豊島区1-1-1', '池袋駅', '0120-370-009', '1130', '1400')
;


-- ----------------------------------------------------------------------

-- CREATE TABLE prefectures (
--   id int NOT NULL,
--   name varchar(255) NOT NULL,
--   PRIMARY KEY (id)
-- );

-- INSERT INTO prefectures (id, name) VALUES
--   (1,'北海道'),
--   (2,'青森県'),
--   (3,'岩手県'),
--   (4,'宮城県'),
--   (5,'秋田県'),
--   (6,'山形県'),
--   (7,'福島県'),
--   (8,'茨城県'),
--   (9,'栃木県'),
--   (10,'群馬県'),
--   (11,'埼玉県'),
--   (12,'千葉県'),
--   (13,'東京都'),
--   (14,'神奈川県'),
--   (15,'新潟県'),
--   (16,'富山県'),
--   (17,'石川県'),
--   (18,'福井県'),
--   (19,'山梨県'),
--   (20,'長野県'),
--   (21,'岐阜県'),
--   (22,'静岡県'),
--   (23,'愛知県'),
--   (24,'三重県'),
--   (25,'滋賀県'),
--   (26,'京都府'),
--   (27,'大阪府'),
--   (28,'兵庫県'),
--   (29,'奈良県'),
--   (30,'和歌山県'),
--   (31,'鳥取県'),
--   (32,'島根県'),
--   (33,'岡山県'),
--   (34,'広島県'),
--   (35,'山口県'),
--   (36,'徳島県'),
--   (37,'香川県'),
--   (38,'愛媛県'),
--   (39,'高知県'),
--   (40,'福岡県'),
--   (41,'佐賀県'),
--   (42,'長崎県'),
--   (43,'熊本県'),
--   (44,'大分県'),
--   (45,'宮崎県'),
--   (46,'鹿児島県'),
--   (47,'沖縄県');

-- CREATE TABLE areas (
--   id int NOT NULL,
--   name varchar(255) NOT NULL,
--   prefectures_id int NOT NULL,
--   FOREIGN KEY (prefectures_id) REFERENCES prefectures(id),
--   PRIMARY KEY (id)
-- )

-- INSERT INTO areas (id, name, prefectures_id) VALUES
--   (1, '銀座・新橋・有楽町', 13),
--   (2, '東京・日本橋', 13),
--   (3, '渋谷・恵比寿・代官山', 13),
--   (4, '新宿・代々木・大久保', 13),
--   (5, '池袋〜高田馬場・早稲田', 13),
--   (6, '原宿・表参道・青山', 13),
--   (7, '六本木・麻布・広尾', 13),
--   (8, '赤坂・永田町・溜池', 13),
--   (9, '四ツ谷・市ヶ谷・飯田橋', 13),
--   (10, '秋葉原・神田・水道橋', 13),
--   (11, '海老名', 14),

-- CREATE TABLE stations (
--   id int NOT NULL,
--   name varchar(255) NOT NULL,
--   areas_id int NOT NULL,
--   FOREIGN KEY (areas_id) REFERENCES areas(id),
--   PRIMARY KEY (id)
-- )

-- INSERT INTO stations (id, name, area_id) VALUES
--   (1, '銀座', 1),
--   (2, '有楽町・日比谷', 1),
--   (3, '新橋・汐留', 1),

-- ----------------------------------------------------------------------


CREATE TABLE stations (
  id SERIAL NOT NULL,
  prefecture varchar(255) NOT NULL,
  area varchar(255) NOT NULL,
  station varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO stations (prefecture, area, station) VALUES
  ('北海道', '札幌市', '札幌'),
  ('北海道', '札幌市', 'すすきの'),
  ('北海道', '旭川・富良野・士別', '旭川'),
  ('北海道', '旭川・富良野・士別', '士別'),
  ('北海道', '函館・松前・檜山', '函館'),
  ('北海道', '函館・松前・檜山', '松前'),
  ('東京都', '新宿・代々木・大久保', '新宿'),
  ('東京都', '新宿・代々木・大久保', '代々木'),
  ('東京都', '上野・浅草・日暮里', '上野'),
  ('東京都', '上野・浅草・日暮里', '浅草'),
  ('東京都', '秋葉原・神田・水道橋', '秋葉原'),
  ('東京都', '秋葉原・神田・水道橋', '神田')
;

CREATE TABLE times (
  id SERIAL NOT NULL,
  time time NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO times (time) VALUES
  ('1100'),
  ('1130'),
  ('1200'),
  ('1230'),
  ('1300'),
  ('1330'),
  ('1400'),
  ('1430'),
  ('1500'),
  ('1530'),
  ('1600'),
  ('1630'),
  ('1700')
;