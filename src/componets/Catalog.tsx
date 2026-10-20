import { useAtomValue, useSetAtom } from "jotai"
import { changeStatusAtom, deleteUserAtom, getUsersAtom, selectedUserAtom, usersAtom } from "../store/jotai"
import { useEffect, useState } from "react"



const Catalog = () => {
    const users = useAtomValue(usersAtom)

    const getUsers = useSetAtom(getUsersAtom)

    const deleteUser = useSetAtom(
        deleteUserAtom
    )

    const setSelectedUser = useSetAtom(
        selectedUserAtom
    )

    const changeStatus = useSetAtom (
        changeStatusAtom
    )

    const [ search, setSearch ] = useState("")
    const [ status, setStatus ] = useState("all")
    const [page, setPage] = useState(1)
    const usersPage = 6

    useEffect(()=> {
        getUsers()
    },[])

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

const startIndex = (page -1) * usersPage
const endIndex = startIndex + usersPage

const currentUsers = filteredUsers.slice(
    startIndex,
    endIndex
)
const pageCount = Math.ceil(
    filteredUsers.length / usersPage
)
    useEffect(() => {
        setPage(1)
    },[search, status])

    return (
        <div>
            <input 
            placeholder="Search..."
            value={search}
            onChange={(e) => 
                setSearch(e.target.value)
            }
            className="border p-2 mb-5"
            />
            <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 mb-5 ml-3"
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            <div className="grid grid-cols-3 gap-5">
                {currentUsers.map((user: any) => (
                    <div key={user.id} className="border p-4">
                
                        <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full object-cover"/>
                        <h2 className="text-xl font-bold">{user.name}</h2>

                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>ID: {user.id}</p>

                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox"
                            checked={user.status}
                            onChange={() => changeStatus(user)}
                            />

                            <span>
                                {user.status? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button onClick={()=> setSelectedUser(user)}
                                className="bg-green-500 text-white  px-3 py-1"
                                >
                                Edit
                            </button>

                            <button 
                            onClick={() => 
                                deleteUser(user.id)
                            }
                            className="bg-red-500 text-white px-3 py-1"
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-8">
             {Array.from({ length: pageCount }, (_, index) => {
               const pageNumber = index + 1;
           
               return (
                 <button
                   key={pageNumber}
                   onClick={() => setPage(pageNumber)}
                   className={`
                     w-10 h-10 rounded-xl border transition-all duration-300
                     ${
                       page === pageNumber
                         ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110"
                         : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:scale-105"
                     }
                   `}
                 >
                   {pageNumber}
                 </button>
               );
             })}
           </div>
        </div>
    )
}

export default Catalog