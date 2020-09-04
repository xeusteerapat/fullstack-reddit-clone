import { InputType, Field } from 'type-graphql';
// Create an Input type
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
