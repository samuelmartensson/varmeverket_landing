import React, { useEffect, useState } from "react";

const NoSSR = ({ children }) => {
  const [onBrowser, setOnBrowser] = useState(false);

  useEffect(() => {
    setOnBrowser(true);
  }, []);

  return onBrowser ? <>{children}</> : null;
};

export default NoSSR;
