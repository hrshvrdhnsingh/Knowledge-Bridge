import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import rootReducer from './reducers';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({ // TO create the redux state with defaults and middlewares.
  reducer: rootReducer, // rootReducer is an abstarction of all our reducers
})

root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Makes the Redux store available to every nested component via React’s Context*/}
            <BrowserRouter> {/* Enables client-side routing based on the browser’s URL */}
                <App />
                <Toaster gutter={24} toastOptions={{className: 'toast-message', style: {maxWidth: '400px', minHeight: '30px', wordWrap: 'break-word', overflow: 'hidden', fontSize: '12px'},}} containerStyle={{ top: 80,left: 0,bottom: 20, right: 20, }}/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals(); // To measure app performance
