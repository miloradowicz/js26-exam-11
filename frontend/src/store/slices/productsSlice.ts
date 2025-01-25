import { createSlice } from '@reduxjs/toolkit';

import { Category, GenericError, Product, ProductBrief } from '../../types';
import { RootState } from '../../app/store';
import {
  deleteProduct,
  loadCategories,
  loadProduct,
  loadProductBriefs,
} from '../thunks/productsThunk';

interface State {
  categories: Category[];
  products: ProductBrief[];
  currentProduct: Product | null;
  lastError: GenericError | null;
  loading: boolean;
  deleting: boolean;
}

const initialState: State = {
  categories: [],
  products: [],
  currentProduct: null,
  lastError: null,
  loading: false,
  deleting: false,
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.lastError = null;
        state.loading = true;
      })
      .addCase(loadCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.loading = false;
      })
      .addCase(loadCategories.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(loadProductBriefs.pending, (state) => {
        state.lastError = null;
        state.loading = true;
      })
      .addCase(loadProductBriefs.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.loading = false;
      })
      .addCase(loadProductBriefs.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(loadProduct.pending, (state) => {
        state.lastError = null;
        state.loading = true;
      })
      .addCase(loadProduct.fulfilled, (state, { payload }) => {
        state.currentProduct = payload;
        state.loading = false;
      })
      .addCase(loadProduct.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.lastError = null;
        state.deleting = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteProduct.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.deleting = false;
      });
  },
});

export const productsReducer = slice.reducer;
export const { clearCurrent } = slice.actions;

export const selectCategories = (state: RootState) => state.products.categories;
export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;
export const selectLastError = (state: RootState) => state.products.lastError;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectDeleting = (state: RootState) => state.products.deleting;
