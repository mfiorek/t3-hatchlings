import React from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import pokemonArray from "../utils/pokemonArray";
import Content from "../components/Content";
import Loader from "../components/Loader";

const HatchlingsPage = () => {
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
      <div className="grid h-full w-full grid-cols-2 items-center justify-center gap-2 py-8 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {pokemonArray.map((pokemon) => (
          <div key={pokemon.id} className="flex items-center justify-center">
            {data.some(
              (hatchling) => hatchling.hatchlingId === pokemon.id.toString()
            ) ? (
              <div className="relative rounded-xl border bg-neutral-600">
                <span className="absolute top-0 left-0 rounded-b-md rounded-l-none border-r border-b p-1">
                  {pokemon.id}
                </span>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt="Pokemon image"
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
              <div className="relative rounded-xl border bg-neutral-600 opacity-20">
                <span className="absolute top-0 left-0 rounded-b-md rounded-l-none border-r border-b p-1">
                  {pokemon.id}
                </span>
                <p
                  className="vt323 text-center text-9xl"
                  style={{ width: "150px", height: "150px" }}
                >
                  ?
                </p>
                <p className="pb-2 text-center font-semibold capitalize">
                  Unknown
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Content>
  );
};

export default HatchlingsPage;

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
