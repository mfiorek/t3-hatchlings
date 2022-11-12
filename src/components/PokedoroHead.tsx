import React from 'react';
import Head from 'next/head';

const PokedoroHead = () => {
  return (
    <Head>
      <title>Pokedoro</title>
      <meta name='description' content='Pokedoro - Pomodoro app gamefied with collecting Pokemons' />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#404040" />
      <meta name="apple-mobile-web-app-title" content="Pokedoro" />
      <meta name="application-name" content="Pokedoro" />
      <meta name="msapplication-TileColor" content="#404040" />
      <meta name="theme-color" content="#262626" />
    </Head>
  );
};

export default PokedoroHead;
