import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../store/productSlice";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
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

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error}
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;