# Apollo-Plugin-Sentry

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
<a href="https://gitmoji.dev">
<img  style="border-radius: 3px;" src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

<br/>

An Apollo Plugin for Sentry Monitoring 🔍

[Tracking Errors in Apollo GraphQL with Sentry](https://medium.com/@mahyor.sam/tracking-errors-in-apollo-graphql-with-sentry-549ae52c0c76)

<br/>

## How it works

Apollo server uses lifecycle events, enabling us to easily instrument an app for sentry integration.

Here's a visual diagram of the flow of lifecycle events. Learn more at the [Apollo Plugin Docs 📚](https://www.apollographql.com/docs/apollo-server/integrations/plugins/)

![Lifecycle Events Diagram](apollo-hooks-diagram.png)

<br/>

## Install

```bash
# yarn
yarn add @pointblankdev/apollo-plugin-sentry

# npm
npm install @pointblankdev/apollo-plugin-sentry
```

<br/>

## Usage

- To get started, you need to have a Sentry DSN which you can get [here](https://sentry,io). This value should be assigned to the `SENTRY_DSN` environment variable.
- Make sure you have the `ENV` variable set so Sentry knows which environment to use for tracking your errors
- Import the package and pass an array containing the variable to the plugin options of your Apollo Server and you're good to go 🚀

  ```
  const {
    sentryPlugin,
  } = require('@pointblankdev/apollo-plugin-sentry');
  ```

  ```bash
  server = new ApolloServer({
      ...,
      plugins: [sentryPlugin],
  });
  ```
