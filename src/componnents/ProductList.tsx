import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import { getProducts, setPage } from "../store/productSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const usersPerPage = 6

  const dispatch = useDispatch();

  const { data, loading, error, search, status, page } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    dispatch(getProducts() as any);
  }, [dispatch]);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading...
      </h2>
    );
  }

  const filteredData = data.filter((product: any) => {
  const name = (product.name || "").toLowerCase();
  const searchText = (search || "").toLowerCase();

  const matchesSearch = name.includes(searchText);

  const matchesStatus =
    status === "all" ||
    (status === "active" && product.status === true) ||
    (status === "inactive" && product.status === false);

  return matchesSearch && matchesStatus;
});

const startIndex = (page -1) * usersPerPage;
const endIndex = startIndex + usersPerPage;
const currentUsers = filteredData.slice(
  startIndex,
  endIndex
)
const pageCount = Math.ceil(
  filteredData.length / usersPerPage
)

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error}
      </h2>
    );
  }

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentUsers.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

    <div className="flex justify-center mt-8">
      <Pagination
      count={pageCount}
      page={page}
      onChange={(_, value) => dispatch(setPage(value))}
      color="primary"
      />
    </div>
    </>
  );
};

export default ProductList;
