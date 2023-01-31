import { useState, useEffect, useCallback } from "react";
import { ScreenLayout, ScreenSize, LayoutDirection } from "src/types";

export const useResponsive = () => {
  const [screenLayout, setScreenLayout] = useState<ScreenLayout>(
    getScreenLayout(window.innerWidth, window.innerHeight)
  );

  const handleSizeChange = useCallback(() => {
    const newScreenLayout = getScreenLayout(
      window.innerWidth,
      window.innerHeight
    );

    if (!layoutsEqual(screenLayout, newScreenLayout)) {
      setScreenLayout(newScreenLayout);
    }
  }, [screenLayout]);

  useEffect(() => {
    window.addEventListener("resize", handleSizeChange);
    window.addEventListener("orientationchange", handleSizeChange);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
      window.removeEventListener("orientationchange", handleSizeChange);
    };
  }, [handleSizeChange]);

  return screenLayout;
};

function layoutsEqual(layout1: ScreenLayout, layout2: ScreenLayout) {
  return layout1.height === layout2.height && layout1.width === layout2.width;
}

const breakpointSmall = 768;
const breakpointMedium = 992;
const breakpointBig = 1200;

function getScreenSize(screenWidth: number): ScreenSize {
  if (screenWidth >= breakpointBig) {
    return "large";
  } else if (screenWidth >= breakpointMedium) {
    return "big";
  } else if (screenWidth >= breakpointSmall) {
    return "medium";
  } else {
    return "small";
  }
}

function getLayoutDirection(
  screenWidth: number,
  screenHeight: number
): LayoutDirection {
  return screenWidth >= screenHeight ? "horizontal" : "vertical";
}

function getScreenLayout(
  screenWidth: number,
  screenHeight: number
): ScreenLayout {
  return {
    screenSize: getScreenSize(screenWidth),
    width: screenWidth,
    height: screenHeight,
    direction: getLayoutDirection(screenWidth, screenHeight),
  };
}
