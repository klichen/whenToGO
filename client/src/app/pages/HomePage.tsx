import TripScheduler from '@/app/components/TripScheduler';
import { Link } from 'react-router-dom';
function HomePage() {
  // const [count, setCount] = useState(0);

  return (
    <div className="bg-trains h-screen bg-cover bg-center">
      <div className="container flex h-5/6 flex-col rounded-b-lg bg-white xl:max-w-screen-lg">
        <div className="flex flex-row justify-between border-b-2 p-4">
          <Link
            to="/"
            className="font-mono text-3xl font-bold tracking-wide text-gray-700 text-opacity-90 hover:italic"
          >
            whenToGO
          </Link>
          <Link
            to="/saved-trips"
            className="inline-flex items-center rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
          >
            Saved Trips
          </Link>
        </div>
        <TripScheduler />
      </div>
    </div>
  );
}

export default HomePage;
