import React from 'react';
import ReactDOM from 'react-dom/client';
import routes from '@/routes/index.jsx';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import {rotuerViews} from "@/utils";
import "./index.less";
const routers = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <Routes>
                    {rotuerViews(routes)}
                </Routes>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>
)
