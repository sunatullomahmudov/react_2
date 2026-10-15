import { atom } from "jotai";
import axios from "axios";
import { api } from "../api/api";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
};

export const selectedProductAtom = atom<Product | null>(null);

export const productsAtom = atom<Product[]>([]);

export const getProductsAtom = atom(
  null,
  async (get, set) => {
    try {
      const { data } = await axios.get(api);

      set(productsAtom, data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProductAtom = atom(
    null,
    async (get, set, newProduct: Omit<Product, 'id'>) => {
        try {
            const { data } = await axios.post(api, newProduct);
            set(productsAtom, [...get(productsAtom), data]);
        } catch (error) {
            console.error(error);
        }
    } 
)

export const deleteProductAtom = atom(
    null,
    async (get, set, id: string)=> {
        try {
            await axios.delete(`${api}/${id}`);
            const products = get(productsAtom);

            set(productsAtom, products.filter((product)=> product.id !== id))
        } catch (error) {
            console.error(error);
        }
    }
)

export const editProductAtom = atom(
    null,
    async(get, set, product: Product) => {
        try {
        const { data } =  await axios.put(`${api}/${product.id}`, product);
            set(productsAtom, get(productsAtom).map((item)=> {
                return item.id === product.id ? data : item
            }))
        } catch (error) { 
            console.error(error)
        }
    }
)