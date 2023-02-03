import { useEffect, useState } from "react";
import { useNetwork } from "../../hooks/useNetwork";
import useToast from "../../hooks/useToast";

const NetworkStatus = () => {
  const isOnline = useNetwork();
  const [isRendered, setIsRendered] = useState(false);
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    if (!isOnline) {
      errorToast("You are offline!");
      return;
    }

    if (isRendered) {
      successToast("You are online!");
    }
  }, [isOnline]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return <></>;
};

export default NetworkStatus;
