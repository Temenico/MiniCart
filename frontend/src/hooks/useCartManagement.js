import { useCallback, useEffect, useMemo, useState } from "react";
import { listProducts } from "../services/productService.js";
import {
  addCartItem,
  createCart,
  deleteCartItem,
  findCartById,
  listCarts,
  updateCartItemQuantity,
} from "../services/cartService.js";

function useCartManagement() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshSelectedCart = useCallback(async (cartId) => {
    if (!cartId) {
      setSelectedCart(null);
      return { ok: true };
    }

    try {
      const cart = await findCartById(cartId);
      setSelectedCart(cart);
      return { ok: true, data: cart };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const refreshCarts = useCallback(async () => {
    try {
      const data = await listCarts();
      setCarts(data);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, cartsData] = await Promise.all([listProducts(), listCarts()]);
      setProducts(productsData.filter((product) => product.active));
      setCarts(cartsData);

      if (cartsData.length > 0) {
        const firstCartId = cartsData[0].id;
        setSelectedCartId(firstCartId);
        const selected = await findCartById(firstCartId);
        setSelectedCart(selected);
      } else {
        setSelectedCartId(null);
        setSelectedCart(null);
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const chooseCart = useCallback(
    async (cartId) => {
      if (!cartId) {
        setSelectedCartId(null);
        setSelectedCart(null);
        return { ok: true };
      }

      const parsedId = Number(cartId);
      setSelectedCartId(parsedId);
      return refreshSelectedCart(parsedId);
    },
    [refreshSelectedCart],
  );

  const createNewCart = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const created = await createCart();
      setCarts((previous) => [...previous, created]);
      setSelectedCartId(created.id);
      setSelectedCart(created);
      return { ok: true, data: created };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const addItemToCart = useCallback(async (payload) => {
    if (!selectedCartId) {
      return { ok: false, message: "Primero debes crear o seleccionar un carrito." };
    }

    setIsSubmitting(true);
    try {
      const updatedCart = await addCartItem(selectedCartId, payload);
      setSelectedCart(updatedCart);
      await refreshCarts();
      return { ok: true, data: updatedCart };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshCarts, selectedCartId]);

  const updateItemQuantity = useCallback(async (itemId, quantity) => {
    if (!selectedCartId) {
      return { ok: false, message: "No hay carrito seleccionado." };
    }

    setIsSubmitting(true);
    try {
      const updatedCart = await updateCartItemQuantity(selectedCartId, itemId, {
        quantity,
      });
      setSelectedCart(updatedCart);
      await refreshCarts();
      return { ok: true, data: updatedCart };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshCarts, selectedCartId]);

  const removeItemFromCart = useCallback(async (itemId) => {
    if (!selectedCartId) {
      return { ok: false, message: "No hay carrito seleccionado." };
    }

    setIsSubmitting(true);
    try {
      await deleteCartItem(selectedCartId, itemId);
      const refreshed = await findCartById(selectedCartId);
      setSelectedCart(refreshed);
      await refreshCarts();
      return { ok: true, data: refreshed };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshCarts, selectedCartId]);

  const activeCartItemsCount = useMemo(
    () =>
      (selectedCart?.items ?? []).reduce(
        (accumulator, item) => accumulator + Number(item.quantity ?? 0),
        0,
      ),
    [selectedCart?.items],
  );

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    products,
    carts,
    selectedCartId,
    selectedCart,
    isLoading,
    isSubmitting,
    activeCartItemsCount,
    fetchInitialData,
    refreshCarts,
    chooseCart,
    createNewCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
  };
}

export default useCartManagement;
