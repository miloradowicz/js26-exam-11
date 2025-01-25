import { createSlice } from '@reduxjs/toolkit';

import { ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { createProduct } from '../thunks/newProductThunk';

interface State {
  sending: boolean;
  error: ValidationError | null;
}

const initialState: State = {
  sending: false,
  error: null,
};

const slice = createSlice({
  name: 'newProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(createProduct.rejected, (state, { payload: error }) => {
        state.sending = false;
        state.error = error ?? null;
      });
  },
});

export const newProductReducer = slice.reducer;

export const selectSending = (state: RootState) => state.newProduct.sending;
export const selectError = (state: RootState) => state.newProduct.error;
