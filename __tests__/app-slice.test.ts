import {configureStore} from '@reduxjs/toolkit';
import {AppCurrency, ItemProps} from '../src/data';
import {RootState} from '../src/store';
import appReducer, {purchaseItem} from './../src/store/app-slice';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('appSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({reducer: {app: appReducer}});
  });

  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.app.credits).toBe(1000);
    expect(state.app.premium).toBe(50);
    expect(state.app.purchasedItems.length).toBe(0);
  });

  it('should handle purchasing an item with credits', () => {
    const item: ItemProps = {
      id: 1,
      name: 'Item 1',
      image: require('../src/assets/images/sword.png'),
      cost: 100,
      currency: AppCurrency.Credits,
    };

    store.dispatch(purchaseItem(item));
    const state = store.getState() as RootState;

    expect(state.app.credits).toBe(900);
    expect(state.app.premium).toBe(50);
    expect(state.app.purchasedItems.length).toBe(1);
    expect(state.app.purchasedItems[0]).toEqual(item);
  });

  it('should handle purchasing an item with premium currency', () => {
    const item: ItemProps = {
      id: 2,
      name: 'Item 2',
      image: require('../src/assets/images/sword.png'),
      cost: 10,
      currency: AppCurrency.Premium,
    };

    store.dispatch(purchaseItem(item));
    const state = store.getState() as RootState;

    expect(state.app.credits).toBe(1000);
    expect(state.app.premium).toBe(40);
    expect(state.app.purchasedItems.length).toBe(1);
    expect(state.app.purchasedItems[0]).toEqual(item);
  });
});
