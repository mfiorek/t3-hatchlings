import React from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import pokemonArray from "../utils/pokemonArray";
import Content from "../components/Content";
import Loader from "../components/Loader";

const CollectionPage = () => {
  const { data, isLoading } = trpc.hatchling.getHatchlings.useQuery();

  if (isLoading || !data) {
    return (
      <Content>
        <Loader text="Loading..." />
      </Content>
    );
  }
  return (
    <Content>
      <h1 className="px-4 pt-8 text-center text-4xl font-extrabold">
        Your current collection of hatched pokemon
      </h1>
      <div className="grid h-full w-full grid-cols-2 items-center justify-center gap-8 p-8 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {pokemonArray.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex h-full items-center justify-center"
          >
            {data.some(
              (hatchling) => hatchling.hatchlingId === pokemon.id.toString()
            ) ? (
              <div className="relative w-full rounded-xl border bg-neutral-600">
                <span className="absolute top-0 left-0 rounded-b-md rounded-l-none border-r border-b p-1">
                  {pokemon.id}
                </span>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt="Pokemon image"
                  className="w-full"
                  width={"150"}
                  height={"150"}
                  style={{ imageRendering: "pixelated" }}
                  priority={true}
                />
                <p className="pb-2 text-center font-semibold capitalize">
                  {pokemon.name}
                </p>
              </div>
            ) : (
              <div className="relative h-full w-full rounded-xl border bg-neutral-600 opacity-20">
                <span className="absolute top-0 left-0 rounded-b-md rounded-l-none border-r border-b p-1">
                  {pokemon.id}
                </span>
                <div className="flex h-full flex-col">
                  <p className="vt323 my-auto text-center text-9xl">?</p>
                  <p className="pb-2 text-center font-semibold">Not seen yet</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Content>
  );
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
