import { Arg, Query, Resolver } from 'type-graphql';
import { ApiStatus } from './api-status.type';
import { StatusService } from './status.service';

@Resolver()
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Query(() => ApiStatus)
  async getStatus(@Arg('db', { nullable: true }) db: boolean) {
    return await this.statusService.getStatus(db);
  }
}
