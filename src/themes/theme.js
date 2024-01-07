import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/manrope";
import "@fontsource-variable/rubik";

const theme = extendTheme({
  fonts: {
    heading: `"Manrope Variable", sans-serif`,
    body: `"Rubik Variable", sans-serif`,
  },
});

export default theme;
