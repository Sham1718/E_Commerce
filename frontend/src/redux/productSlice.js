import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts,searchProducts } from "../service/productService";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (page, thunkAPI) => {
        try {
            const res = await getAllProducts(page);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const fetchByName = createAsyncThunk(
    "product/fetchByName",
    async ({ search, page }, thunkAPI) => {
        try {
            const res = await searchProducts(search, page);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);

export const fetchByCategory = createAsyncThunk(
    "product/fetchByCategory",
    async ({ category, page }, thunkAPI) => {
        try {
            const res = await getProductsByCategory(category, page);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);


const initialState = {
    products: [],
    search: "",
    category: "",
    page: 0,
    totalPages: 0,
    loading: false,
    error: null,
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
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.content;
                state.totalPages = action.payload.totalPages;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(fetchByName.pending, (state) => {
    state.loading = true;
    state.error = null;
})

.addCase(fetchByName.fulfilled, (state, action) => {
    state.loading = false;
    state.products = action.payload.content;
    state.totalPages = action.payload.totalPages;
})

.addCase(fetchByName.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
})

.addCase(fetchByCategory.pending, (state) => {
    state.loading = true;
    state.error = null;
})

.addCase(fetchByCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.products = action.payload.content;
    state.totalPages = action.payload.totalPages;
})

.addCase(fetchByCategory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error.message;
})
    }
});

export const {
    setSearch,
    setCategory,
    setPage
} = productSlice.actions;

export default productSlice.reducer;