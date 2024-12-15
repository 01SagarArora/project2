import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { initStore } from './app/store';
import App from './App';
import './index.css';



console.log('Starting hydration...');

if (typeof window !== 'undefined') {

  // const store = initStore(window.__PRELOADED_STATE__ && window.__PRELOADED_STATE__);
  const store = initStore();


  const container = document.getElementById('root');

  console.log(container); // Should log the `div#root` element
  if (!container) {
    throw new Error('Root container not found');
  }

  hydrateRoot(
    container!,
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

