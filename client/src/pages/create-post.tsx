import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = () => {
  useIsAuth()
  const [, createPost] = useCreatePostMutation()
  const router = useRouter()

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{
          title: '',
          text: '',
        }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='title'
              label='Title'
              placeholder='title'
            />
            <Box mt={4}>
              <InputField
                textarea
                name='text'
                label='Body'
                placeholder='text...'
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              variantColor='teal'
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
