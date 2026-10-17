import { useState } from "react"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { addProduct, getProducts } from "../../store/productSlice"
import UserFields from "./UserFields"
import { userSchema, validateUser } from "./userValidation"

const AddProductDialog = ({ open, handleClose }: any) => {
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", image: "" },
    validate: validateUser,
    onSubmit: async (values, { resetForm }) => {
      setError("")
      try {
        await dispatch(addProduct({ ...userSchema.parse(values), status: true }) as any).unwrap()
        resetForm()
        handleClose()
        dispatch(getProducts() as any)
      } catch {
        setError("Could not add user")
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
        <DialogTitle>Add User</DialogTitle>
        <DialogContent className="flex flex-col gap-4 pt-4">
          {error && <p className="text-red-500">{error}</p>}
          <UserFields formik={formik} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="error" disabled={formik.isSubmitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProductDialog
