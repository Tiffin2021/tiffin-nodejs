import { IShopAccountRepository } from './interfaces/IShopAccountRepository';
import { ShopAccount } from '../model/ShopAccount';
import { Client, Query, QueryResult } from 'pg';

export class ShopAccountRepository implements IShopAccountRepository{
  private connection: Client;

  constructor(connection: Client){
    this.connection = connection;
  }

  getAll(): Promise<ShopAccount[]> {
    const query = {
      text: 'SELECT * FROM shop_accounts',
    };
    
  }
  
} 