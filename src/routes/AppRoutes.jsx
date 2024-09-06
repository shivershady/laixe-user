import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '@layouts/Layout';
import PrivateRoute from '@components/PrivateRoute';
import ScrollTop from '@components/ScrollTop';
import { routes_here } from './routes';

export default function AppRoutes() {
    return (
        <Suspense fallback={<h1>Loading....</h1>}>
            <React.Fragment>
                <ScrollTop />
                <Routes>
                    {routes_here.map((route, key) => (
                        route.isPrivate ? (
                            <Route key={key} element={<PrivateRoute />}>
                                <Route
                                    path={route.path}
                                    element={
                                        <Suspense fallback={<h1>Loading....</h1>}>
                                            {route.useLayout ? <Layout>{route.element}</Layout> : route.element}
                                        </Suspense>
                                    }
                                />
                            </Route>
                        ) : (
                            <Route
                                key={key}
                                path={route.path}
                                element={route.useLayout ? <Layout>{route.element}</Layout> : route.element}
                            />
                        )
                    ))}
                </Routes>
            </React.Fragment>
        </Suspense>
    )
}
