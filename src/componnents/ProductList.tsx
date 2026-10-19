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
      {loading ? <div className="empty-state"><span className="loading-ring" /><strong>Loading your people</strong><span>Just a moment...</span></div>
      : error ? <div className="empty-state error-state"><strong>Couldn’t load your people</strong><span>{error}</span></div>
      : filteredData.length === 0 ? <div className="empty-state"><div className="empty-icon"><PeopleOutlineRoundedIcon /></div><strong>No people found</strong><span>Try another search or add someone new.</span></div>
      : <>
        <div className="table-wrap">
          <table className="people-table">
            <thead><tr><th>PERSON</th><th>CONTACT</th><th>PHONE</th><th>STATUS</th><th className="actions-heading">ACTIONS</th></tr></thead>
            <tbody>{currentUsers.map((product: any) => <ProductCard key={product.id} product={product} />)}</tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing <strong>{startIndex + 1}–{Math.min(startIndex + usersPerPage, filteredData.length)}</strong> of <strong>{filteredData.length}</strong> people</span><Pagination count={pageCount} page={page} onChange={(_, value) => dispatch(setPage(value))} className="pagination" shape="rounded" /></div>
      </>}
    </div>
  );
};
export default ProductList;
