import React from 'react';
import { Spinner } from '@chakra-ui/core';

const Loading = () => {
  return (
    <div>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </div>
  );
};

export default Loading;
