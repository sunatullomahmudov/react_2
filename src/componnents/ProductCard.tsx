import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Switch,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../store/productSlice";

import EditProductDialog from "./dialogs/EditproductDialog";
import { useState } from "react";
import axios from "axios";
import { API } from "../api/api";

const ProductCard = ({ product }: any) => {

  const handleStatus = async () => {
    await axios.put(`${API}/${product.id}`,{status: !product.status,})
    dispatch(getProducts() as any)    
  }

  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  } 

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const dispatch = useDispatch()

  const handleDelete = async () => {
    await dispatch(deleteProduct(product.id) as any)

    dispatch(getProducts() as any)
  }

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
      <CardContent className="flex flex-col gap-4">
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
        color="success" 
        />

        <div className="flex gap-2">
          <Button
            variant="contained"
            fullWidth
            onClick={handleOpenEdit}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDelete}
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