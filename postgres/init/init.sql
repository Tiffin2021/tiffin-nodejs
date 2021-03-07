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

-- ・『ENGINE=InnoDB DEFAULT CHARSET=utf8 ;』って何
-- 	参考URL：https://ts0818.hatenablog.com/entry/2015/06/23/221349
	
-- ・PostgreSQLとMySQLの違い
-- 	参考URL:https://www.xplenty.com/jp/blog/postgresql-vs-mysql-which-one-is-better-for-your-use-case-ja/

-- ・外部キーの設定の仕方
-- 	参考URL:https://www.dbonline.jp/postgresql/table/index11.html#section1