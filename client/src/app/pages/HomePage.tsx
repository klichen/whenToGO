import TripScheduler from '@/app/components/TripScheduler';
import { Link } from 'react-router-dom';
function HomePage() {
  // const [count, setCount] = useState(0);

  return (
    <div className="bg-trains bg-left-middle h-screen overflow-hidden bg-cover">
      <div className="flex h-5/6 flex-col bg-white sm:container sm:h-5/6 sm:rounded-b-lg xl:max-w-screen-lg">
        <div className="flex flex-row justify-between border-b-2 p-4">
          <Link
            to="/"
            className="font-mono text-2xl font-bold tracking-wide text-gray-700 text-opacity-90 hover:italic sm:text-3xl"
          >
            whenToGO
          </Link>
          <Link
            to="/saved-trips"
            className="inline-flex items-center rounded bg-gray-200 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-300 sm:text-base"
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
