import TripScheduler from '@/app/components/TripScheduler';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="bg-trains bg-left-middle h-screen overflow-hidden bg-cover">
      <div className="flex h-full flex-col bg-transparent pb-2 sm:container sm:h-5/6 sm:rounded-b-lg xl:max-w-screen-xl">
        <div className="flex flex-row justify-between p-4 sm:px-0">
          <Link
            to="/"
            className="font-mono text-2xl font-bold tracking-wide text-gray-700 text-opacity-90 active:scale-95 sm:text-3xl sm:hover:italic"
          >
            whenToGO
          </Link>
          <Link
            to="/saved-trips"
            className="inline-flex items-center rounded bg-gray-200 px-4 py-1 text-sm font-bold text-gray-800 hover:bg-gray-300 sm:text-base"
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
