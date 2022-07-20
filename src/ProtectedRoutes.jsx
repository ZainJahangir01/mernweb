import React from "react";
import { Navigate, Route, Outlet } from "react-router";

const Protectedroute = ({ auth, component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (auth) return <Component {...props} />;
          if (!auth)
            return (
              <Navigate to={{ path: "/", state: { from: props.location } }} />
            );
        }}
      />
    </div>
  );
};

export default Protectedroute;
