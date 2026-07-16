import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  updateProduct,
} from "../service/productService";
import { getApiErrorMessage } from "../utils/errorMessage";

const normalizePage = (data) => ({
  products: data?.content || [],
  totalPages: data?.totalPages || 0,
});

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (page, thunkAPI) => {
  try {
    const res = await getAllProducts(page, 5, { signal: thunkAPI.signal });
    return normalizePage(res.data);
  } catch (error) {
    if (error?.code === "ERR_CANCELED") {
      throw error;
    }
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to load products."));
  }
});

export const fetchByName = createAsyncThunk("product/fetchByName", async ({ search, page }, thunkAPI) => {
  try {
    const res = await searchProducts(search, page, 5, { signal: thunkAPI.signal });
    return normalizePage(res.data);
  } catch (error) {
    if (error?.code === "ERR_CANCELED") {
      throw error;
    }
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to search products."));
  }
});

export const fetchByCategory = createAsyncThunk(
  "product/fetchByCategory",
  async ({ category, page }, thunkAPI) => {
    try {
      const res = await getProductsByCategory(category, page, 5, { signal: thunkAPI.signal });
      return normalizePage(res.data);
    } catch (error) {
      if (error?.code === "ERR_CANCELED") {
        throw error;
      }
      return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to load this category."));
    }
  },
);

export const fetchProductDetails = createAsyncThunk("product/fetchProductDetails", async (id, thunkAPI) => {
  try {
    const res = await getProductById(id, { signal: thunkAPI.signal });
    return res.data;
  } catch (error) {
    if (error?.code === "ERR_CANCELED") {
      throw error;
    }
    const message = error?.response?.status === 404
      ? "Product not found."
      : getApiErrorMessage(error, "Unable to load product details.");
    return thunkAPI.rejectWithValue(message);
  }
});

export const addProduct = createAsyncThunk("product/addProduct", async (product, thunkAPI) => {
  try {
    const res = await createProduct(product);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to add product."));
  }
});

export const editProduct = createAsyncThunk("product/editProduct", async ({ id, product }, thunkAPI) => {
  try {
    const res = await updateProduct(id, product);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to update product."));
  }
});

export const removeProduct = createAsyncThunk("product/removeProduct", async (id, thunkAPI) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(error, "Unable to delete product."));
  }
});

const initialState = {
  products: [],
  currentProduct: null,
  search: "",
  category: "",
  page: 0,
  totalPages: 0,
  loading: false,
  detailsLoading: false,
  mutationLoading: false,
  error: null,
  detailsError: null,
  mutationError: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearProductDetails(state) {
      state.currentProduct = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.error?.name === "AbortError") {
          return;
        }
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByName.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchByName.rejected, (state, action) => {
        if (action.error?.name === "AbortError") {
          return;
        }
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        if (action.error?.name === "AbortError") {
          return;
        }
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.currentProduct = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        if (action.error?.name === "AbortError") {
          return;
        }
        state.detailsLoading = false;
        state.detailsError = action.payload || action.error.message;
      })
      .addMatcher(
        (action) => [addProduct.pending.type, editProduct.pending.type, removeProduct.pending.type].includes(action.type),
        (state) => {
          state.mutationLoading = true;
          state.mutationError = null;
        },
      )
      .addMatcher(
        (action) => [addProduct.fulfilled.type, editProduct.fulfilled.type, removeProduct.fulfilled.type].includes(action.type),
        (state, action) => {
          state.mutationLoading = false;
          if (action.type === removeProduct.fulfilled.type) {
            state.products = state.products.filter((product) => product.id !== action.payload);
          }
        },
      )
      .addMatcher(
        (action) => [addProduct.rejected.type, editProduct.rejected.type, removeProduct.rejected.type].includes(action.type),
        (state, action) => {
          state.mutationLoading = false;
          state.mutationError = action.payload || action.error.message;
        },
      );
  },
});

export const { clearProductDetails, setCategory, setPage, setSearch } = productSlice.actions;

export default productSlice.reducer;
