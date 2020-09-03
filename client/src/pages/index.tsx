import NavBar from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => (
  <>
    <NavBar />
    <div>Hello</div>
  </>
);

export default withUrqlClient(createUrqlClient)(Index);
