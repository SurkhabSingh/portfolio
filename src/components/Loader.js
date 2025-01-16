import { React, useState, useEffect } from "react";
import { useTheme, styled } from "@mui/material";

import "animate.css";

// Component styles
const StyledLoaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  position: "fixed",
  backgroundColor: theme.palette.background.main,
}));

const StyledLoadingBar = styled("div")(({ theme, progress }) => ({
  width: "80%",
  height: "10px",
  backgroundColor: theme.palette.grey[300],
  borderRadius: "5px",
  marginTop: "20px",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: `${progress}%`,
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    transition: "width 1s ease",
  },
}));

const Loader = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) return prevProgress + 9;
        clearInterval(loadingInterval);
        setHasLoaded(true);
        return prevProgress;
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <StyledLoaderContainer>
      <div className={hasLoaded ? "animate__animated animate__fadeOut" : ""}>
        <img
          src={process.env.PUBLIC_URL + "/logo.webp"}
          alt="loading"
          width="150"
          height="150"
        />
        <StyledLoadingBar theme={theme} progress={progress} />
      </div>
    </StyledLoaderContainer>
  );
};

export default Loader;
