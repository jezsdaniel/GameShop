import React from 'react';
import {Provider} from 'react-redux';

import {HomeScreen} from './src/screens/home-screen';
import store from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
