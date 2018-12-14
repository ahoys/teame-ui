## Teame UI
A small proto UI for Teame backend.

### Requirements
- [Node >= 10](https://nodejs.org/en/)
- [Yarn >= v.1.12](https://yarnpkg.com/en/docs/install)
- [Visual Studio Code](https://code.visualstudio.com/download)
- Recommended VS code extensions: ESLint & Prettier & GraphQL.

### Installation
1. Clone this repository (git clone https://github.com/ahoys/teame-ui.git).
2. Run command "yarn" for the directory. This will install the dependencies.
3. (optional) Install graphql-cli "yarn global graphql-cli".
4. (optional) Download newest graphql schema "graphql get-schema --project teame".

Done.

### Commands
- "yarn build": builds a full production release.
- "yarn start": starts a development server.
- "node dist/server": starts a production server (you must build first).
