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
  prefecture varchar(50) NOT NULL,
  area varchar(50) NOT NULL,
  station varchar(50) NOT NULL,
  tel varchar(50) NOT NULL,
  opentime int NOT NULL,
  closetime int NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  FOREIGN KEY (shop_accounts_id) REFERENCES shop_accounts(id),
  PRIMARY KEY (id)
);

INSERT INTO shop_info (shop_accounts_id, name, address, prefecture, area, station, tel, opentime, closetime) VALUES
(1, 'サンプル店01', '東京都新宿区歌舞伎町1-1-1', '東京都', '新宿・代々木・大久保', '新宿駅', '0120-107-929', 1100, 1700),
(2, 'サンプル店02', '東京都千代田区1-1', '東京都', '新宿・代々木・大久保', '代々木', '0120-828-828', 1100, 1400),
(3, 'サンプル店03', '東京都豊島区1-1-1', '東京都', '秋葉原・神田・水道橋', '秋葉原', '0120-370-009', 1130, 1400)
;

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
  time int NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO times (time) VALUES
  (1100),
  (1115),
  (1130),
  (1145),
  (1200),
  (1215),
  (1230),
  (1245),
  (1300),
  (1315),
  (1330),
  (1345),
  (1400),
  (1415),
  (1430),
  (1445),
  (1500),
  (1515),
  (1530),
  (1545),
  (1600),
  (1615),
  (1630),
  (1645),
  (1700)
;

CREATE TABLE budgets (
  id SERIAL NOT NULL,
  budget int NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO budgets (budget) VALUES
  (500),
  (1000),
  (1500),
  (2000),
  (2500),
  (3000),
  (3500),
  (4000),
  (4500),
  (5000)
;

CREATE TABLE genres (
  id SERIAL NOT NULL,
  genre varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO genres (genre) VALUES
  ('和食'),
  ('洋食'),
  ('中華')
;

CREATE TABLE photos (
  id SERIAL NOT NULL,
  path varchar(100) NOT NULL,
  genre varchar(50) NOT NULL,
  prefecture varchar(50) NOT NULL,
  area varchar(50) NOT NULL,
  station varchar(50) NOT NULL,
  price int NOT NULL,
  menu varchar(50) NOT NULL,
  opentime int NOT NULL,
  closetime int NOT NULL,
  shop_info_id int,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  FOREIGN KEY (shop_info_id) REFERENCES shop_info(id),
  PRIMARY KEY (id)
);

INSERT INTO photos (path, genre, prefecture, area, station, price, menu, opentime, closetime, shop_info_id) VALUES
('http://localhost:4000/images/testDirectory/1.jpg', '和食', '東京都', '新宿・代々木・大久保', '新宿', 550, '鯖の味噌煮定食', 1130, 1400, 1),
('http://localhost:4000/images/testDirectory/2.jpg', '和食', '東京都', '新宿・代々木・大久保', '大久保', 1000, '寿司', 1130, 1400, 1),
('http://localhost:4000/images/testDirectory/3.jpg', '和食', '北海道', '札幌市', '札幌', 750, '豚の角煮定食', 1130, 1400, 1),
('http://localhost:4000/images/testDirectory/4.jpg', '和食', '北海道', '札幌市', '札幌', 700, '焼き魚定食', 1200, 1500, 2),
('http://localhost:4000/images/testDirectory/5.jpg', '中華', '東京都', '新宿・代々木・大久保', '大久保', 1000, '餃子定食', 1130, 1400, 2),
('http://localhost:4000/images/testDirectory/6.jpg', '洋食', '東京都', '新宿・代々木・大久保', '大久保', 1000, 'ハンバーグランチ', 1130, 1400, 3)
;
-- ('http://13.115.158.163:4000/images/testDirectory/1.jpg', '和食', '東京都', '新宿・代々木・大久保', '新宿', 550, '鯖の味噌煮定食', 1130, 1400, 1),
-- ('http://13.115.158.163:4000/images/testDirectory/2.jpg', '和食', '東京都', '新宿・代々木・大久保', '大久保', 1000, '寿司', 1130, 1400, 1),
-- ('http://13.115.158.163:4000/images/testDirectory/3.jpg', '和食', '北海道', '札幌市', '札幌', 750, '豚の角煮定食', 1130, 1400, 1),
-- ('http://13.115.158.163:4000/images/testDirectory/4.jpg', '和食', '北海道', '札幌市', '札幌', 700, '焼き魚定食', 1200, 1500, 2),
-- ('http://13.115.158.163:4000/images/testDirectory/5.jpg', '中華', '東京都', '新宿・代々木・大久保', '大久保', 1000, '餃子定食', 1130, 1400, 2),
-- ('http://13.115.158.163:4000/images/testDirectory/6.jpg', '洋食', '東京都', '新宿・代々木・大久保', '大久保', 1000, 'ハンバーグランチ', 1130, 1400, 3)
-- ;