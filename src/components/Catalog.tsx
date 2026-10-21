import { useEffect, useState } from "react";
import { useUserStore } from "../zustand";

const Catalog = () => {
  const users = useUserStore(
    (state: any) => state.users
  );

  const getUsers = useUserStore(
    (state: any) => state.getUsers
  );

  const deleteUser = useUserStore(
    (state: any) => state.deleteUser
  );

  const changeStatus = useUserStore(
    (state: any) => state.changeStatus
  );

  const setSelectedUser = useUserStore(
    (state: any) => state.setSelectedUser
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const usersPerPage = 6;

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      (status === "active" && user.status === true) ||
      (status === "inactive" && user.status === false);

    return matchesSearch && matchesStatus;
  });

  const startIndex =
    (page - 1) * usersPerPage;

  const endIndex =
    startIndex + usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      startIndex,
      endIndex
    );

  const pageCount = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 backdrop-blur-xl outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
        >
          <option value="all">
            All
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {currentUsers.map((user: any) => (
          <div
            key={user.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-violet-950/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/10"
                />

                <div>
                  <h2 className="text-xl font-bold text-white">
                    {user.name}
                  </h2>

                  <p className="text-sm text-slate-400">
                    ID: {user.id}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-300">
                <p>
                  {user.email}
                </p>

                <p>
                  {user.phone}
                </p>
              </div>

              <div className="flex items-center justify-between mt-5">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.status
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-slate-500/15 text-slate-300"
                  }`}
                >
                  {user.status
                    ? "Active"
                    : "Inactive"}
                </div>

                <input
                  type="checkbox"
                  checked={user.status}
                  onChange={() =>
                    changeStatus(user)
                  }
                  className="w-5 h-5 accent-violet-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    setSelectedUser(user)
                  }
                  className="flex-1 rounded-xl bg-indigo-500/20 py-2 text-indigo-200 transition hover:bg-indigo-500/30 hover:scale-[1.02]"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                  className="flex-1 rounded-xl bg-red-500/15 py-2 text-red-300 transition hover:bg-red-500/25 hover:scale-[1.02]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from(
          { length: pageCount },
          (_, index) => {
            const pageNumber =
              index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() =>
                  setPage(pageNumber)
                }
                className={`
                  w-11 h-11 rounded-2xl border transition-all duration-300
                  ${
                    page === pageNumber
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-400 shadow-lg shadow-violet-900/40 scale-110"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:scale-105"
                  }
                `}
              >
                {pageNumber}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Catalog;