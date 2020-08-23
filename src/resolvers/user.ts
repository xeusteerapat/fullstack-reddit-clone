import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from './../entities/User';
import { MyContext } from './../types';

// Create an Input type
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 4) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username length must be more than 2 characters',
          },
        ],
      };
    }

    if (options.password.length <= 6) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password length must be more than 2 characters',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'This username has been already taken',
            },
          ],
        };
      }
      console.log('message', err.message);
    }

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "This username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid credential',
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
