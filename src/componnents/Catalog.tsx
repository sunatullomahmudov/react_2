import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import {
  productsAtom,
  getProductsAtom,
  deleteProductAtom,
  selectedProductAtom,
} from "../store/jotai";

const Catalog = () => {
  const products = useAtomValue(productsAtom);

  const getProducts = useSetAtom(getProductsAtom);
  const deleteProduct = useSetAtom(deleteProductAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Catalog</h1>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.price}$</p>
          <p>{product.category}</p>
          <img
            src={product.image}
            alt={product.title}
            width={120}
          />

          <button onClick={() => setSelectedProduct(product)}>
            Edit
          </button>

          <button onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;