import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Switch,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeStatus, deleteProduct, getProducts } from "../store/productSlice";

import EditProductDialog from "./dialogs/EditproductDialog";
import { useState } from "react";

const ProductCard = ({ product }: any) => {

  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const handleStatus = async () => {
    setSaving(true)
    setError("")
    try {
      await dispatch(changeStatus({ id: product.id, status: !product.status }) as any).unwrap()
      await dispatch(getProducts() as any)
    } catch {
      setError("Could not change status")
    } finally {
      setSaving(false)
    }
  }

  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  } 

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleDelete = async () => {
    setSaving(true)
    setError("")
    try {
      await dispatch(deleteProduct(product.id) as any).unwrap()
      await dispatch(getProducts() as any)
    } catch {
      setError("Could not delete user")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
      <CardContent className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center gap-4">
          <Avatar
            src={product.image}
            alt={product.name}
            sx={{ width: 70, height: 70 }}
          />

          <div>
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-500">
              ID: {product.id}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>{product.email}</p>
          <p>{product.phone}</p>
        </div>

        <Chip
          label={product.status ? "Active" : "Inactive"}
          color={product.status ? "success" : "default"}
        />
        <Switch
        checked={product.status}
        onChange={handleStatus}
        disabled={saving}
        color="success" 
        />

        <div className="flex gap-2">
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpenEdit}
            disabled={saving}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDelete}
            disabled={saving}
          >
            Delete
          </Button>
        </div>
      </CardContent>
      <EditProductDialog 
         open={openEdit}
         handleClose={handleCloseEdit}
         product={product}/>
    </Card>
  );
};

export default ProductCard;
