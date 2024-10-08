import SavedTripsViewer from '@/app/components/SavedTripsViewer';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="bg-trains bg-left-middle h-screen overflow-hidden bg-cover">
      <div className="flex h-full flex-col bg-transparent pb-2 sm:container sm:h-5/6 sm:rounded-b-lg xl:max-w-screen-xl">
        <div className="flex flex-row justify-between border-b-2 p-4 sm:px-0">
          <Link
            to="/"
            className="font-mono text-2xl font-bold tracking-wide text-gray-700 text-opacity-90 hover:italic sm:text-3xl"
          >
            whenToGO
          </Link>
          {/* TODO: add context menu for extra features */}
        </div>
        <SavedTripsViewer />
      </div>
    </div>
  );
}

export default HomePage;
