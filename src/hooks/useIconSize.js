import { useState, useEffect } from "react";

export const useIconSize = (defaultSize = 24, mobileSize = 18) => {
  const [iconSize, setIconSize] = useState(defaultSize);

  useEffect(() => {
    const updateSize = () => {
      setIconSize(window.innerWidth <= 540 ? mobileSize : defaultSize);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [defaultSize, mobileSize]);

  return iconSize;
};
