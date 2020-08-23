import { User } from './../entities/User';
import { MyContext } from './../types';
import { Resolver, Ctx, Arg, Mutation, InputType, Field } from 'type-graphql';
import argon2 from 'argon2';

// Create an Input type
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = await em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    await em.persistAndFlush(user);
    return user;
  }
}
