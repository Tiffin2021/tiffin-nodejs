import { FileHandle } from 'fs/promises';
import { FieldDef } from 'pg';

export type Photo = {
  id: number;
  path: string;
  genre: string;
  prefecture: string;
  area: string;
  station: string;
  price: number;
  menu: string;
  opentime: number;
  closetime: number;
  shop_info_id: number;
  img: string;
};
