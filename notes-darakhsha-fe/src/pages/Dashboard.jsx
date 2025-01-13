import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../features/notes/notesSlice';
import { HiDocumentText, HiCollection, HiStar } from 'react-icons/hi';
import Loader from '../components/common/Loader';


const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const RecentNoteCard = ({ note }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.content}</p>
    <div className="mt-2 flex items-center text-sm text-gray-500">
      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
        {note.category}
      </span>
      <span className="ml-auto">
        {new Date(note.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes, isLoading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  const totalNotes = notes.length;
  const categoryCounts = notes.reduce((acc, note) => {
    return { ...acc, [note.category]: (acc[note.category] || 0) + 1 };
  }, {});
  const uniqueCategories = Object.keys(categoryCounts).length;

  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Notes"
          value={totalNotes}
          icon={HiDocumentText}
          color="bg-blue-500"
        />
        <StatCard
          title="Categories"
          value={uniqueCategories}
          icon={HiCollection}
          color="bg-green-500"
        />
        <StatCard
          title="Recent Activities"
          value={recentNotes.length}
          icon={HiStar}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentNotes.map((note) => (
            <RecentNoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Category Distribution
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div
              key={category}
              className="bg-gray-50 p-4 rounded-lg text-center"
            >
              <p className="text-sm font-medium text-gray-600">{category}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
