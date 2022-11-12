import React, { useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { signIn } from "next-auth/react";
import Image from "next/image";
import PokedoroHead from "../components/PokedoroHead";

const LoginPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <PokedoroHead />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-neutral-800 text-neutral-50 lg:flex-row lg:gap-16">
        <section className="flex flex-col items-center">
          <Image
            src="/Egg.webp"
            alt="Pokemon egg image"
            width={"100"}
            height={"100"}
            style={{ imageRendering: "pixelated" }}
            priority={true}
          />
          <h1 className="text-4xl font-bold">Login to</h1>
          <h1 className="text-5xl font-extrabold">Pokedoro</h1>
        </section>
        <section className="flex w-96 flex-col items-center gap-4 rounded-2xl bg-stone-700 p-6 font-medium shadow-2xl">
          <p className="text-2xl">
            Passwords are <strong>bad</strong>
          </p>
          <div className="text-center">
            <p>You don&apos;t want another.</p>
            <p>
              Instead, select login method that uses one of your already
              existing passwords:
            </p>
          </div>
          <button
            onClick={() => {
              setIsDisabled(true);
              signIn("github");
            }}
            disabled={isDisabled}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-300 fill-stone-800 py-2 px-4 text-xl font-semibold text-stone-800 shadow-xl transition-colors duration-300 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-20"
          >
            <p>Log in with GitHub</p>
            {isDisabled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-spin"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="currentColor"
              >
                <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
              </svg>
            ) : (
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
              </svg>
            )}
          </button>
        </section>
      </div>
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
