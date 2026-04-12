import { useCallback, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../services/productService.js";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await listProducts();
      setProducts(response);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (payload) => {
    try {
      const created = await createProduct(payload);
      setProducts((previous) => [...previous, created]);
      return { ok: true, data: created };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const editProduct = useCallback(async (id, payload) => {
    try {
      const updated = await updateProduct(id, payload);
      setProducts((previous) =>
        previous.map((product) => (product.id === id ? updated : product)),
      );
      return { ok: true, data: updated };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const removeProduct = useCallback(async (id) => {
    try {
      await deleteProduct(id);
      setProducts((previous) => previous.filter((product) => product.id !== id));
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    addProduct,
    editProduct,
    removeProduct,
    fetchProducts,
  };
}

export default useProducts;
