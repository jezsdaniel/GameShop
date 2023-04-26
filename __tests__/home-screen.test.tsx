import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {HomeScreen} from '../src/screens/home-screen';
import store from '../src/store';
import appReducer from '../src/store/app-slice';
import {AppCurrency, ItemProps} from '../src/data';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

const createTestStore = (
  credits: number,
  premium: number,
  purchasedItems: ItemProps[],
) => {
  return configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState: {
      app: {
        credits,
        premium,
        purchasedItems,
      },
    },
  });
};

describe('HomeScreen', () => {
  const renderHomeScreen = (testStore = store) => {
    return render(
      <Provider store={testStore}>
        <HomeScreen />
      </Provider>,
    );
  };

  it('renders the HomeScreen without crashing', () => {
    const {getByTestId} = renderHomeScreen();
    expect(getByTestId('item-list')).toBeTruthy();
  });

  it('shows the PurchaseModal when an item is selected', async () => {
    const {getByTestId, getByText} = renderHomeScreen();

    fireEvent.press(getByTestId('item-1-button'));

    await waitFor(() => {
      expect(getByText('Confirm Purchase')).toBeTruthy();
    });
  });

  it('hides the PurchaseModal when cancel button is pressed', async () => {
    const {getByTestId, getByText, queryByText} = renderHomeScreen();

    fireEvent.press(getByTestId('item-1-button'));

    await waitFor(() => {
      expect(getByText('Confirm Purchase')).toBeTruthy();
    });

    fireEvent.press(getByTestId('purchase-cancel-button'));

    await waitFor(() => {
      expect(queryByText('Confirm Purchase')).toBeFalsy();
    });
  });

  it('displays a success message when there is enough currency to purchase an item', async () => {
    const testStore = createTestStore(1000, 500, []);

    const {getByTestId, getByText} = renderHomeScreen(testStore);

    fireEvent.press(getByTestId('item-1-button'));

    await waitFor(() => {
      expect(getByText('Confirm Purchase')).toBeTruthy();
    });

    fireEvent.press(getByTestId('purchase-confirm-button'));

    await waitFor(() => {
      expect(getByText('Purchase successful!')).toBeTruthy();
    });
  });

  it('displays an error message when there is not enough currency to purchase an item', async () => {
    const testStore = createTestStore(10, 5, []);

    const {getByTestId, getByText} = renderHomeScreen(testStore);

    fireEvent.press(getByTestId('item-1-button'));

    await waitFor(() => {
      expect(getByText('Confirm Purchase')).toBeTruthy();
    });

    fireEvent.press(getByTestId('purchase-confirm-button'));

    await waitFor(() => {
      expect(
        getByText('Not enough currency to purchase this item'),
      ).toBeTruthy();
    });
  });

  it('shows a purchased item as purchased', async () => {
    const testStore = createTestStore(1000, 500, [
      {
        id: 1,
        name: 'Item 1',
        cost: 100,
        currency: AppCurrency.Credits,
        image: require('../src/assets/images/sword.png'),
      },
    ]);

    const {getByTestId} = renderHomeScreen(testStore);

    await waitFor(() => {
      expect(getByTestId('item-1-purchased')).toBeTruthy();
    });
  });
});
