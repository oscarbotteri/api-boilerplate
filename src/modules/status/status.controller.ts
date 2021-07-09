import { Get, JsonController, OnUndefined, QueryParam } from 'routing-controllers';
import { HttpStatus } from '../../common/enums';
import { StatusService } from './status.service';
import { ApiStatus } from './interfaces';

@JsonController('/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @OnUndefined(HttpStatus.INTERNAL_SERVER_ERROR)
  async getStatus(@QueryParam('db') db: boolean): Promise<ApiStatus> {
    return await this.statusService.getStatus(db);
  }
}
