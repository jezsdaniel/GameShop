import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppCurrency, ItemProps} from '../data';

export interface AppState {
  credits: number;
  premium: number;
  purchasedItems: ItemProps[];
}

const initialState: AppState = {
  credits: 1000,
  premium: 50,
  purchasedItems: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    purchaseItem: (state, action: PayloadAction<ItemProps>) => {
      const item = action.payload;
      if (item.currency === AppCurrency.Premium) {
        state.premium -= item.cost;
      } else {
        state.credits -= item.cost;
      }
      state.purchasedItems.push(action.payload);
    },
  },
});

export const {purchaseItem} = appSlice.actions;

export default appSlice.reducer;
