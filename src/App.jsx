import React from 'react';
import RootNavigation from './routes/stackNavigation';
import {Provider} from 'react-redux';
import {store} from './reduxManagment/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
