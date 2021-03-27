export interface IRepository {
  transaction(): void;
  commit(): void;
  rollback(): void;
}
