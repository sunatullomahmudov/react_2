import AddUser from "./components/AddUser";
import Catalog from "./components/Catalog";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">
            User Management
          </p>

          <h1 className="text-5xl font-bold mt-2 bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Zustand People Hub
          </h1>

          <p className="text-slate-400 mt-3">
            Manage, search and update your users beautifully.
          </p>
        </div>

        <AddUser/>

        <Catalog />
      </div>
    </div>
  );
};

export default App;