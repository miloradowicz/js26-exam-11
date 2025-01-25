import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { api } from '../../api.ts';
import { isAxiosError } from 'axios';

export const createProduct = createAsyncThunk<
  void,
  ProductMutation,
  { rejectValue: ValidationError; state: RootState }
>(
  'newProduct/createProduct',
  async (mutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    const body = new FormData();
    body.append('title', mutation.title);
    body.append('description', mutation.description);
    body.append('price', String(mutation.price));
    body.append('image', mutation.image);
    body.append('category', mutation.category);

    try {
      await api.post('/products', body, {
        headers: { Authorization: token },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);
