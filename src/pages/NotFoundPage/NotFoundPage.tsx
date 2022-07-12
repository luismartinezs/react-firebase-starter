import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <div>We didn&apos;t find the content you are requesting 😔</div>
      <Link to="/">Take me to the home page</Link>
    </div>
  );
};

export default NotFoundPage;
