import { useEffect, useState } from "react";
import { useNetwork } from "../../hooks/useNetwork";

const NetworkStatus = () => {
  const isOnline = useNetwork();
  const [showStatus, setShowStatus] = useState(!isOnline);

  useEffect(() => {
    setShowStatus(!isOnline);
  }, [isOnline]);

  if (showStatus) {
    return <h1>You are offline!</h1>;
  }

  return null;
};

export default NetworkStatus;
