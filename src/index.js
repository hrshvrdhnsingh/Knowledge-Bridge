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

const store = configureStore({
  reducer: rootReducer,
})
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Toaster gutter={24} toastOptions={{className: 'toast-message', style: {maxWidth: '400px', minHeight: '30px', wordWrap: 'break-word', overflow: 'hidden', fontSize: '12px'},}} containerStyle={{ top: 80,left: 0,bottom: 20, right: 20, }}/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
