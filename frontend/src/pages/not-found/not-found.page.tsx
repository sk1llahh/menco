import { Link } from 'react-router';
import { ROUTES } from '@/shared/model/routes';

const Page = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <button className="btn">
        <Link to={ROUTES.HOME}>Go to Home</Link>
      </button>
    </div>
  );
};

export const Component = Page;
