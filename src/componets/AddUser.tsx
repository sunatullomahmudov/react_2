import { useAtom, useSetAtom } from "jotai"
import { AdduserAtom, EditUserAtom, selectedUserAtom } from "../store/jotai"
import { useFormik } from "formik"
import { useEffect } from "react"



const AddUser = () => {
    const addUser = useSetAtom(AdduserAtom)

    const editUser = useSetAtom(EditUserAtom)

    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "", 
            phone: "",
            image: "",
        },
        onSubmit: async (values) => {
  if (selectedUser) {
    await editUser({
      ...selectedUser,
      name: values.name,
      email: values.email,
      phone: values.phone,
      image: values.image,
    });

    setSelectedUser(null);

    formik.resetForm();
  } else {
    await addUser({
      name: values.name,
      email: values.email,
      phone: values.phone,
      image: values.image,
      status: true,
    });

    formik.resetForm();
  }
},

    })

    useEffect(() => {
        if(selectedUser) {
            formik.setValues({
                name: selectedUser.name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                image: selectedUser.image,
            })
        }
    },[selectedUser])


    return (
        <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 mb-8"
        >
            <input 
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="border p-2"
            />

            <input 
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="border p-2"
            />

            <input 
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="border p-2"
            />

            <input 
            name="image"
            placeholder="Image URL"
            value={formik.values.image}
            onChange={formik.handleChange}
            className="border p-2"
            />

            <button type="submit" className="bg-blue-500 text-white p-2">
                {selectedUser? "save Edit" : "Add User"}
            </button>
        </form>
    )
}

export default AddUser