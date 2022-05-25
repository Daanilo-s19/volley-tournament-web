import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";

import Navbar from "../components/navbar";

import theme from "../theme";
import ReactQueryClientProvider from "../libs/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryClientProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Grid gridTemplateColumns="minmax(120px, 1fr) minmax(auto, 1126px) minmax(120px, 1fr)">
          <GridItem />
          <GridItem>
            <Navbar />
            <Component {...pageProps} />
          </GridItem>
        </Grid>
        <GridItem />
      </ChakraProvider>
    </ReactQueryClientProvider>
  );
}

export default MyApp;
