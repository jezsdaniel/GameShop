import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import store, {RootState} from '../src/store';
import {TopBar} from '../src/components/top-bar';

describe('TopBar', () => {
  const renderTopBar = () => {
    return render(
      <Provider store={store}>
        <TopBar />
      </Provider>,
    );
  };

  it('renders the TopBar without crashing', () => {
    const {getByTestId} = renderTopBar();
    expect(getByTestId('top-bar')).toBeTruthy();
  });

  it('displays the correct credits and premium currency values', () => {
    const {getByText} = renderTopBar();
    const state = store.getState() as RootState;

    expect(getByText(`Credits: ${state.app.credits}`)).toBeTruthy();
    expect(getByText(`Premium: ${state.app.premium}`)).toBeTruthy();
  });
});
