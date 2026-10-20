import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import { getProducts, setPage } from "../store/productSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const usersPerPage = 6;
  const dispatch = useDispatch();
  const { data, loading, error, search, status, page } = useSelector((state: any) => state.products);

  useEffect(() => { dispatch(getProducts() as any); }, [dispatch]);

  const filteredData = data.filter((product: any) => {
    const matchesSearch = (product.name || "").toLowerCase().includes((search || "").toLowerCase());
    const matchesStatus = status === "all" || (status === "active" && product.status === true) || (status === "inactive" && product.status === false);
    return matchesSearch && matchesStatus;
  });
  const startIndex = (page - 1) * usersPerPage;
  const currentUsers = filteredData.slice(startIndex, startIndex + usersPerPage);
  const pageCount = Math.ceil(filteredData.length / usersPerPage);

  return (
    <div className="list-area">
      {loading ? <div className="empty-state"><span className="loading-ring" /><strong>Finding your people</strong><span>Syncing your constellation...</span></div>
      : error ? <div className="empty-state error-state"><strong>Connection interrupted</strong><span>{error}</span></div>
      : filteredData.length === 0 ? <div className="empty-state"><div className="empty-icon"><PeopleOutlineRoundedIcon /></div><strong>No one in this orbit yet</strong><span>Try another search or add a new connection.</span></div>
      : <>
        <div className="results-heading"><span><span className="results-indicator" /> PEOPLE IN VIEW <strong>{String(filteredData.length).padStart(2, "0")}</strong></span><span className="results-side">IDENTITY CARDS / {String(page).padStart(2, "0")}</span></div>
        <div className="people-grid" key={`${search}-${status}-${page}`}>{currentUsers.map((product: any, index: number) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        <div className="list-footer"><span>Showing <strong>{startIndex + 1}–{Math.min(startIndex + usersPerPage, filteredData.length)}</strong> of <strong>{filteredData.length}</strong> connections</span><Pagination count={pageCount} page={page} onChange={(_, value) => dispatch(setPage(value))} className="pagination" shape="rounded" /></div>
      </>}
    </div>
  );
};

export default ProductList;
