import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Loading from '../components/Loading';
import { Layout } from '../components/Layout';
import { Link } from '@chakra-ui/core';
import NextLink from 'next/link'

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href='/create-post'>
      <Link>Create Post</Link>
      </NextLink>
      <div>Hello</div>
      {!data ? (
        <Loading />
      ) : (
        data.posts.map(post => <div key={post.id}>{post.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
