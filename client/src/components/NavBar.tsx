import React from 'react';
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery();
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
        <Button variant='link' color='white'>
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg='tomato' p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
