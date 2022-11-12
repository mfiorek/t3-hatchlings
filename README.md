<p align="center">
  <img src="./public/Egg.webp" width="200px" align="center" alt="logo" />
  <h1 align="center">Pokedoro</h1>
  <p align="center">
    <a href="https://pokedoro.fiorek.codes/">pokedoro.fiorek.codes</a>
  </p>
  <hr />
</p>

# A simple Pomodoro app gamefied with collecting Pokémon

Built with T3 stack.
Feel free to use both for an app and/or for educational purposes.

## What is [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique)?

It is a simple time management technique developed by Francesco Cirillo in the late 1980s. You set the timer for a set interval of time and focus on the task to be done. Once the timer ends take 5-10min break and then set another.

## What is Pokedoro?

Pokedoro is a simple app that combines Pomodoro technique with gamimg element of collecting Pokémon for each interval you manage to get to the end. This app 'blocks' you from using the device, because if the app looses focus, the timer will be stopped and you will not be rewarded with the Pokémon. This may be very usefull if the device itself prevents you from concentrating on the task.

## What is [T3 stack](https://init.tips/)?

It is a technological stack popularized by [Theo](https://t3.gg/) that focuses on TypeScript, tRPC, and Tailwind in the combination with Next.js. It could be easily created using [create-t3-app](https://create.t3.gg/), and this app was created this way.

## Stack:

- TypeScript - because it is better than JavaScript
- [Next.js](https://nextjs.org/) - framework used for both Frontend and Backend hosted on [Vercel](https://vercel.com/)
- [PostgreSQL](https://www.postgresql.org/) database - hosted on [Railway](https://railway.app/)
- [Prisma](https://www.prisma.io/) - TypeScript ORM
- [tRPC](https://trpc.io/) - for end-to-end typesafe APIs
  - [ReactQuery](https://tanstack.com/query/v4) - used by tRPC under the hood as an asynchronous state management tool
  - [zod](https://zod.dev/) - TypeScript schema validation tool
- [TailwindCSS](https://tailwindcss.com/) - for easier styling
- [NextAuth](https://next-auth.js.org/) - open source authentication solution for Next.js
- [headlessUI](https://headlessui.com/) - unstyled, fully accessible UI components, created by TailwindLabs
- [react-timer-hook](https://www.npmjs.com/package/react-timer-hook) - simple library with 0 dependencies for a useTimer hook
