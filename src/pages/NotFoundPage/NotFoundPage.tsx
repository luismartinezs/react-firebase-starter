import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>Not found page</h1>
      <p>We didn&apos;t find the content you are requesting 😔</p>
      <Link to="/">Take me to the home page</Link>
    </>
  );
};

export default NotFoundPage;
