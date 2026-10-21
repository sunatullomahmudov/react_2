import { useFormik } from "formik"
import { useUserStore } from "../zustand"
import { useEffect } from "react"



const AddUser = () => {
    const addUser = useUserStore(
        (state: any) => state.addUser
    )

    const editUser = useUserStore(
        (state: any) => state.eidtUser
    )

    const selectedUser = useUserStore(
        (state: any) => state.selectedUser
    )

    const setSelectedUser = useUserStore(
        (state: any) => state.setSelectedUser
    )

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            image: "",
        },

        onSubmit: async(values) => {
            if(selectedUser) {
                await editUser({
                    ...selectedUser,

                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    image: values.image
                })
                setSelectedUser(null)

                formik.resetForm()
            }
            else{
                await addUser({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    image: values.image,
                    status: true
                })
                formik.resetForm()
            }
        }
    })

    useEffect(()=> {
        if(selectedUser) {
            formik.setValues({
                name: selectedUser.name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                image: selectedUser.image
            })
        }
    },[selectedUser])

    const handleClose = () => {
        setSelectedUser(null);

        formik.resetForm()
    }

    return (
        <form 
        onSubmit={formik.handleSubmit}
        className="mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />

                <input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />

                <input
                name="phone"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />

                <input
                name="image"
                placeholder="Image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                />
            </div>

            <div className="flex gap-3 mt-5">
                <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold shadow-lg shadow-violet-900/30 transition hover:scale-[1.02] hover:shadow-violet-500/30"
                >
                    {selectedUser? "Save Edit" : "Add User"}
                </button>
                {selectedUser && (
                    <button
                    type="button"
                    onClick={handleClose}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold transition hover:bg-white/10"
                    >
                        Close
                    </button>
                )}
            </div>

        </form>
    )
}

export default AddUser