import React, { useEffect } from "react";

const useTitle = (title = "BAZR") => {
  const titleDom = document.getElementById("title") as HTMLTitleElement;

  useEffect(() => {
    titleDom.innerHTML = title;
  }, [title]);
};

export default useTitle;
