import { Box, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { HiStar } from "react-icons/hi";

const DayNightBg = ({ isDay }) => {
  let gradient = isDay
    ? "radial-gradient(#FFBC00, #F4D150)"
    : "radial-gradient(#E2DCC8, #CAC9C3)";

  const displayStars = (starPosList) => (
    <Box>
      {starPosList.map((starPos) => (
        <Text
          fontSize={"8xl"}
          position={"absolute"}
          zIndex={"1"}
          color={"#CAC9C3"}
          top={starPos.top}
          right={starPos.right}
          bottom={starPos.bottom}
          left={starPos.left}
        >
          <HiStar />
        </Text>
      ))}
    </Box>
  );

  return (
    <Fragment>
      <Box
        width={"100vw"}
        height={"100vh"}
        bgGradient={gradient}
        sx={{ "clip-path": "circle(25% at 100vw 100vh)" }}
        position={"absolute"}
        zIndex={"1"}
      />
      {isDay
        ? ""
        : displayStars([
            { top: "21vh", right: "", bottom: "", left: "21vw" },
            { top: "", right: "", bottom: "20vh", left: "30vw" },
            { top: "30vh", right: "20vw", bottom: "", left: "" },
          ])}
    </Fragment>
  );
};

export default DayNightBg;
