import 'react-native-gesture-handler';
import * as React from 'react';
import './config/ReactotronConfig';

import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import Toast from './components/Toast';

import {store, persistor} from './store';

import Routes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
        <Toast duration={4000} />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
