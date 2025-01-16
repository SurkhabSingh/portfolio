import { React, useState, useEffect } from "react";
import { Container, useMediaQuery, styled, useTheme } from "@mui/material";
import avatar from "../assets/hampter.webp";
 
import {
  Loader,
  Navbar,
  SideAnchorLinks,
  Hero,
  About,
  Experience,
  Projects,
  Hobbies,
  Footer,
} from "../components";

const StyledMainPage = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  overflow: "hidden",
}));
const StyledMainContainer = styled(Container)({
  maxWidth: "1600px",
});

const Main = () => {
  const theme = useTheme();
  const showSideAnchor = useMediaQuery(theme.breakpoints.up("lg"));
  const [isLoading, setIsloading] = useState(true);
  const [heroImg, setHeroImg] = useState(null);

  //Loader animation before rest of the page gets rendered
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2400);

    const loadImage = async () => {
      const img = new Image();
      img.src = avatar;
      await img.decode();
      setHeroImg(avatar);
    };
    loadImage();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <StyledMainPage>
            {showSideAnchor && <SideAnchorLinks />}
            <StyledMainContainer>
              <Hero img={heroImg} />
              <About />
              <Experience />
              <Projects />
              <Hobbies />
              <Footer />
            </StyledMainContainer>
          </StyledMainPage>
        </>
      )}
    </>
  );
};

export default Main;
