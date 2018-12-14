## Teame UI
A small proto UI for Teame backend.

### Requirements
- [Node >= 10](https://nodejs.org/en/)
- [Yarn >= v.1.12](https://yarnpkg.com/en/docs/install)
- [Visual Studio Code](https://code.visualstudio.com/download)

### Installation
1. Install Node.
2. Install Yarn.
3. Clone this repository (git clone https://github.com/ahoys/teame-ui.git).
4. Run command "yarn" for the directory. This will install dependencies.
5. Open VS Code and install extensions: ESLint & Prettier & GraphQL.
6. (optional) Install graphql-cli "yarn global graphql-cli".
7. (optional) Download newest graphql schema "graphql get-schema --project teame".

Done.

### Commands
- "yarn build": builds a full production release.
- "yarn start": starts a development server.
- "node dist/server": starts a production server (you must build first).
