import { Field, ObjectType } from 'type-graphql';
import { ApiStatus as ApiStatusInterface } from './interfaces';

@ObjectType()
export class ApiStatus implements ApiStatusInterface {
  @Field()
  status: string;
}
