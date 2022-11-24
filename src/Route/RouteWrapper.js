import React from "react";
import { Route } from "react-router-dom";

function RouteWrapper({ component: Component, layout: Layout, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

export default RouteWrapper