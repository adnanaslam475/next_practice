import React from "react";
import { useRouter } from "next/router";
function withAuth  (WrappedComponent) {
  return (props) => {
      if (typeof window !== "undefined") {
          const Router = useRouter();
      const accessToken = window.document.cookie.split('=')[1];
      if (!accessToken) {
        Router.replace("/");
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
