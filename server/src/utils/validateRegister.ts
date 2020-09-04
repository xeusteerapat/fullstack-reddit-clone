import { UsernamePasswordInput } from './../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Invalid Email',
      },
    ];
  }

  if (options.username.length <= 4) {
    return [
      {
        field: 'username',
        message: 'Username length must be more than 4 characters',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Username cannot include @',
      },
    ];
  }

  if (options.password.length <= 6) {
    return [
      {
        field: 'password',
        message: 'Password length must be more than 6 characters',
      },
    ];
  }

  return null;
};
