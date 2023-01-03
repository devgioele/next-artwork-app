A simple web app made to demonstrate my skills as frontend developer.

It is a [Next.js 13](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run the web app locally

Install dependencies:

```sh
npm install
```

Build the project:

```sh
npm run build
```

Run the built project:

```sh
npm run start
```

## Dependencies worth noting

- [SWR](https://swr.vercel.app/) for data fetching

## Requirements

The goal of this exercise is to create a website that has two screens.

Artworks API: https://api.artic.edu/docs/

Technologies to be used:

- [Next.js](https://nextjs.org/), which implies [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### List screen

The first screen is a list of artworks. It should be possible to search the list of
artworks. As the dataset is quite large, it should be possible to paginate through the
data. If the user is interested, it should be possible to navigate to a details screen of
the artwork.

### Details screen

The details screen is the second screen of the page. Try to add a couple of
interesting data points about the artwork. You don’t have to display all possible
values. Choose about 10 that you like and which allow you to create a nice details
page.
