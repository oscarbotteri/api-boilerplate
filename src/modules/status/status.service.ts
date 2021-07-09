import { Service } from 'typedi';
import { ApiStatus } from './interfaces';
import { InjectConnection } from 'typeorm-typedi-extensions';
import { Connection } from 'typeorm';

@Service()
export class StatusService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getStatus(db: boolean): Promise<ApiStatus> {
    if (db) {
      await this.connection.query('SELECT 1+1');
    }

    return new Promise((resolve) => {
      resolve({
        status: "It's working",
      });
    });
  }
}
