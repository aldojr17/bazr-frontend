import { useState } from "react";

const useToggle = (defaultValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

  const onToggle = (callback?: () => void) => {
    setIsOpen(!isOpen);

    if (callback) callback();
  };

  const onOpen = (callback?: () => void) => {
    setIsOpen(true);
    if (callback) callback();
  };

  const onClose = (callback?: () => void) => {
    setIsOpen(false);
    if (callback) callback();
  };

  return {
    isOpen,

    onOpen,
    onClose,
    onToggle,
  };
};

export default useToggle;

// onclose(()=>console.log('do something'))
