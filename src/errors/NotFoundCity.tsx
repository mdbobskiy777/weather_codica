import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const NotFoundCity = () => {
  const { cityName } = useParams();

  return (
    <div>
      <div>{`City ${cityName} is not added to list`}</div>
      <div>
        <span>
          Go <Link to="/citiesList">here</Link> to add city you need
        </span>
      </div>
    </div>
  );
};
