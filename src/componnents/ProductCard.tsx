import { Avatar, IconButton, Switch, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/productSlice";
import { useProductActions } from "../store/productActions";
import EditProductDialog from "./dialogs/EditproductDialog";
import { useState } from "react";

const ProductCard = ({ product }: any) => {
  const dispatch = useDispatch();
  const { deleteProduct, changeStatus } = useProductActions();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleStatus = async () => {
    setSaving(true);
    setError("");
    try {
      await changeStatus(product.id, !product.status);
      await dispatch(getProducts() as any);
    } catch { setError("Could not change status"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError("");
    try {
      await deleteProduct(product.id);
      await dispatch(getProducts() as any);
    } catch { setError("Could not delete user"); }
    finally { setSaving(false); }
  };

  return (
    <tr className="person-row">
      <td className="person-cell"><div className="person-info"><Avatar className="person-avatar" src={product.image} alt={product.name}>{(product.name || "?").slice(0, 1).toUpperCase()}</Avatar><div className="person-name"><strong>{product.name || "Unnamed"}</strong><span>ID · {product.id}</span>{error && <small className="row-error" role="alert">{error}</small>}</div></div></td>
      <td className="contact-cell"><span className="mobile-label">EMAIL</span><span className="cell-value">{product.email || "—"}</span></td>
      <td className="phone-cell"><span className="mobile-label">PHONE</span><span className="cell-value">{product.phone || "—"}</span></td>
      <td className="status-cell"><span className="mobile-label">STATUS</span><div className="status-content"><span className={`status-pill ${product.status ? "is-active" : "is-inactive"}`}><span />{product.status ? "Active" : "Inactive"}</span><Switch className="status-switch" checked={Boolean(product.status)} onChange={handleStatus} disabled={saving} size="small" slotProps={{ input: { "aria-label": `Change status for ${product.name}` } }} /></div></td>
      <td className="actions-cell"><span className="mobile-label">ACTIONS</span><div className="row-actions"><Tooltip title="Edit person"><span><IconButton className="action-button" aria-label={`Edit ${product.name}`} onClick={() => setOpenEdit(true)} disabled={saving}><EditOutlinedIcon /></IconButton></span></Tooltip><Tooltip title="Delete person"><span><IconButton className="action-button delete-button" aria-label={`Delete ${product.name}`} onClick={handleDelete} disabled={saving}><DeleteOutlineRoundedIcon /></IconButton></span></Tooltip></div><EditProductDialog open={openEdit} handleClose={() => setOpenEdit(false)} product={product} /></td>
    </tr>
  );
};
export default ProductCard;
