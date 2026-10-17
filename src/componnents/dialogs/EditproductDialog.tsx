import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { editProduct, getProducts } from "../../store/productSlice"
import UserFields from "./UserFields"
import { userSchema, validateUser } from "./userValidation"

const EditProductDialog = ({ open, handleClose, product }: any) => {
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      name: product.name || "",
      email: product.email || "",
      phone: product.phone || "",
      image: product.image || "",
    },
    enableReinitialize: true,
    validate: validateUser,
    onSubmit: async (values) => {
      setError("")
      try {
        await dispatch(editProduct({
          id: product.id,
          updateUser: { ...userSchema.parse(values), status: product.status },
        }) as any).unwrap()
        handleClose()
        dispatch(getProducts() as any)
      } catch {
        setError("Could not edit user")
      }
    },
  })

  const closeDialog = () => {
    if (formik.isSubmitting) return
    formik.resetForm()
    setError("")
    handleClose()
  }

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-4">
          {error && <p className="text-red-500">{error}</p>}
          <UserFields formik={formik} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error" disabled={formik.isSubmitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditProductDialog
