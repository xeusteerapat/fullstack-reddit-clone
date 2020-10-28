import { MyContext } from '../types';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Sorry, Unauthorized');
  }

  return next();
};
