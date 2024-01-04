import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@fontsource/roboto-condensed";

const theme = extendTheme({
  fonts: {
    heading: `"Roboto Condensed", sans-serif`,
    body: `"Roboto", sans-serif`,
  },
});

export default theme;
