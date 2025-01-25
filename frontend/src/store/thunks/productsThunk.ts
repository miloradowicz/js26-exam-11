import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { RootState } from '../../app/store';
import { Category, Product, ProductBrief } from '../../types';
import { clearCurrent } from '../slices/productsSlice';

export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async () => {
    const { data } = await api.get<Category[]>('categories');

    return data as Category[];
  }
);

export const loadProductBriefs = createAsyncThunk(
  'products/loadProductBriefs',
  async () => {
    const { data } = await api.get<ProductBrief[]>('products');

    return data as ProductBrief[];
  }
);

export const loadProductBriefsByCategory = createAsyncThunk(
  'products/loadProductBriefsByCategory',
  async (category: string) => {
    const { data } = await api.get<ProductBrief[]>('products', {
      params: { category },
    });

    return data as ProductBrief[];
  }
);

export const loadProduct = createAsyncThunk<
  Product,
  string,
  { state: RootState }
>('products/loadProduct', async (id, thunkAPI) => {
  thunkAPI.dispatch(clearCurrent());

  const { data } = await api.get<Product>(`products/${id}`);

  return data as Product;
});

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await api.delete<null>(`products/${id}`);
  }
);
