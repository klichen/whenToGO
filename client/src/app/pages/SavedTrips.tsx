import { Link } from 'react-router-dom';
function SavedTrips() {
  // const [count, setCount] = useState(0);

  return (
    <div className="bg-trains h-screen bg-cover bg-center">
      {/* <h1 className="text-3lg font-bold italic text-opacity-50">
        HELLO WORLD!!
      </h1>
      <Link to="/saved-trips">Saved Trips</Link> */}
      <div className="container flex h-5/6 flex-col rounded-b-lg bg-slate-50 xl:max-w-screen-lg">
        <div className="flex flex-row justify-between p-4">
          <Link
            to="/"
            className="font-mono text-3xl font-bold tracking-wide text-gray-700 text-opacity-90 hover:italic"
          >
            whenToGO
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SavedTrips;
