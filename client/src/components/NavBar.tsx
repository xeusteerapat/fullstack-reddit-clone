import React from 'react';
import NextLink from 'next/link';
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;
  // loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='login'>
          <Link mr={2} color='white'>
            Login
          </Link>
        </NextLink>
        <NextLink href='register'>
          <Link color='white'>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2} color='white'>
          {data.me.username}
        </Box>
        <Button
          variant='link'
          color='white'
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg='tomato' p={4} position='sticky' top={0} zIndex={1}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

