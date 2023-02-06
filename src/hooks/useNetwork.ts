import { useEffect, useState } from "react";

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setIsOnline(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
  });

  return isOnline;
};
