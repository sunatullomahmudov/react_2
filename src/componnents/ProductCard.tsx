import { Avatar, IconButton, Switch, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/productSlice";
import { useProductActions } from "../store/productActions";
import EditProductDialog from "./dialogs/EditproductDialog";
import { useState } from "react";

const ProductCard = ({ product, index }: any) => {
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
    <>
      <article className={`identity-card card-variant-${index % 3}`} style={{ animationDelay: `${index * 75}ms` }}>
        <div className="card-light" aria-hidden="true" />
        <div className="card-topline"><span><span className="topline-star">✦</span> PERSON / {String(index + 1).padStart(2, "0")}</span><ArrowOutwardRoundedIcon sx={{ fontSize: 17 }} /></div>

        <div className="card-identity">
          <div className="avatar-frame"><Avatar className="identity-avatar" src={product.image} alt={product.name}>{(product.name || "?").slice(0, 1).toUpperCase()}</Avatar><span className="avatar-orbit" /></div>
          <div className="identity-copy"><span className="identity-caption">DIGITAL IDENTITY <span>↗</span></span><h3>{product.name || "Unnamed"}</h3><span className="identity-id">ORBIT ID&nbsp; / &nbsp;{product.id}</span></div>
        </div>

        <div className="card-separator"><span /></div>
        <div className="contact-block"><div className="contact-item"><span className="contact-icon"><AlternateEmailRoundedIcon /></span><div><small>EMAIL ADDRESS</small><span>{product.email || "—"}</span></div></div><div className="contact-item"><span className="contact-icon"><PhoneInTalkOutlinedIcon /></span><div><small>PHONE NUMBER</small><span>{product.phone || "—"}</span></div></div></div>

        <div className="card-bottom"><div className="status-area"><span className={`status-orb ${product.status ? "is-active" : "is-inactive"}`}><i /></span><div><small>CONNECTION STATUS</small><strong>{product.status ? "Active" : "Inactive"}</strong></div><Switch className="status-switch" checked={Boolean(product.status)} onChange={handleStatus} disabled={saving} size="small" slotProps={{ input: { "aria-label": `Change status for ${product.name}` } }} /></div><div className="card-actions"><Tooltip title="Edit person"><span><IconButton className="action-button" aria-label={`Edit ${product.name}`} onClick={() => setOpenEdit(true)} disabled={saving}><EditOutlinedIcon /></IconButton></span></Tooltip><Tooltip title="Delete person"><span><IconButton className="action-button delete-button" aria-label={`Delete ${product.name}`} onClick={handleDelete} disabled={saving}><DeleteOutlineRoundedIcon /></IconButton></span></Tooltip></div></div>
        {error && <p className="card-error" role="alert">{error}</p>}
        <span className="card-corner" aria-hidden="true">✳</span>
      </article>
      <EditProductDialog open={openEdit} handleClose={() => setOpenEdit(false)} product={product} />
    </>
  );
};

export default ProductCard;
