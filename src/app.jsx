// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import Routing from './routes';
function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;