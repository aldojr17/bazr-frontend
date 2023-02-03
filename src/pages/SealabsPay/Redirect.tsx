import { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    if (window.top) {
      window.top.history.replaceState(
        { search: window.location.search },
        "",
        `${window.top.location.href}`
      );
    }
  }, []);

  return <h1>Redirecting you...</h1>;
};

export default Redirect;
