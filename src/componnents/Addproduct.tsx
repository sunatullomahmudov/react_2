import { useEffect } from "react";
import { useFormik } from "formik";
import { useAtomValue, useSetAtom } from "jotai";

import {
  addProductAtom,
  editProductAtom,
  selectedProductAtom,
} from "../store/jotai";

const AddProduct = () => {
  const selectedProduct = useAtomValue(selectedProductAtom);

  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const addProduct = useSetAtom(addProductAtom);
  const editProduct = useSetAtom(editProductAtom);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      category: "",
      image: "",
    },

    onSubmit: async (values) => {
      if (selectedProduct) {
        await editProduct({
          ...selectedProduct,
          title: values.title,
          price: Number(values.price),
          category: values.category,
          image: values.image,
        });

        setSelectedProduct(null);
      } else {
        await addProduct({
          title: values.title,
          price: Number(values.price),
          category: values.category,
          image: values.image,
        });
      }

      formik.resetForm();
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      formik.setValues({
        title: selectedProduct.title,
        price: String(selectedProduct.price),
        category: selectedProduct.category,
        image: selectedProduct.image,
      });
    }
  }, [selectedProduct]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Title"
      />

      <input
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        placeholder="Price"
      />

      <input
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        placeholder="Category"
      />

      <input
        name="image"
        value={formik.values.image}
        onChange={formik.handleChange}
        placeholder="Image"
      />

      <button type="submit">
        {selectedProduct ? "Save Edit" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;