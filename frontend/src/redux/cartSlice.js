import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  deleteCartItem,
  getCartItems,
  getCartTotal,
  updateCart,
} from "../service/cartService";
import { getApiErrorMessage } from "../utils/errorMessage";

const loadCartData = async () => {
  const [itemsResponse, totalResponse] = await Promise.all([getCartItems(), getCartTotal()]);
  return {
    items: itemsResponse.data || [],
    total: Number(totalResponse.data || 0),
  };
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    return await loadCartData();
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to load cart."));
  }
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async (productId, thunkAPI) => {
  try {
    await addToCart({ productId, quantity: 1 });
    return await loadCartData();
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to add product to cart."));
  }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ productId, quantity }, thunkAPI) => {
  try {
    if (quantity <= 0) {
      await deleteCartItem(productId);
    } else {
      await updateCart(productId, { productId, quantity });
    }
    return await loadCartData();
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to update cart item."));
  }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (productId, thunkAPI) => {
  try {
    await deleteCartItem(productId);
    return await loadCartData();
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to remove cart item."));
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    await deleteCart();
    return { items: [], total: 0 };
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to clear cart."));
  }
});

const initialState = {
  items: [],
  total: 0,
  loading: false,
  actionLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setCart = (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        setCart(state, action);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addMatcher(
        (action) =>
          [addCartItem.pending.type, updateCartItem.pending.type, removeCartItem.pending.type, clearCart.pending.type].includes(action.type),
        (state) => {
          state.actionLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          [addCartItem.fulfilled.type, updateCartItem.fulfilled.type, removeCartItem.fulfilled.type, clearCart.fulfilled.type].includes(action.type),
        (state, action) => {
          state.actionLoading = false;
          setCart(state, action);
        },
      )
      .addMatcher(
        (action) =>
          [addCartItem.rejected.type, updateCartItem.rejected.type, removeCartItem.rejected.type, clearCart.rejected.type].includes(action.type),
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export default cartSlice.reducer;
