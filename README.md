# React firebase starter

Starter template to create web apps with Firebase backend

Does not assume any specific features, just common ones.

Does not assume any UI library or CSS framework, but I'll probably create a template with tailwindCSS

Currently implemented features / tools:

- [x] Vite
- [x] Typescript, obviously
- [x] Firebase Auth with regular users and admins
- [x] Firestore database
- [x] Firebase Cloud functions
- [x] Firebase emulation
- [x] Firebase hosting
- [x] Vitest for unit testing
- [x] React router
- [x] Public and private pages
- [x] Login page
- [x] Account page with logout and delete account
- [x] Component generator with plop
- [x] Linting
- [x] Prettier code formatting
- [x] React testing library
- [x] React-query for server state
- [x] Github actions
- [x] Recaptcha

Not implemented but recommended:

- [ ] Redux toolkit for global client state
- [ ] Cypress e2e
- [ ] Google analytics
- [ ] Google tag manager
- [ ] TailwindCSS
- [ ] DaisyUI / react-daisyui
- [ ] React form hooks for forms
- [ ] yum for schema validation
- [ ] Storybook
- [ ] Commitlint
- [ ] Cookie consent + gtag
- [ ] Sentry
- [ ] Unplugin icons

Tasks:

- [x] Lint and format entire project
- [x] Setup firebase storage
- [x] Connect this to a test project
- [x] Setup cloud functions
- [x] Make sure delete user is possible
- [x] Create a minimal plop generator for different types of files
- [x] Create a basic navigation header
- [x] Create component that shows user data in every route, for dev
- [x] Setup CRUD sample api for firestore that covers common use cases
- [x] Create simple form with validation to create, edit and delete data entries
- [x] Create view to show existing entries
- [x] Setup user data api
- [x] Setup firebase hosting
- [x] Add generators for pages, features, etc
- [x] Remove all firebase config values from repo, and use firebase secrets instead
- [x] Recaptcha
- [ ] Cookie consent + gtag
- [x] Able to refresh page when in non root path
- [ ] Make communication with firestore work with captcha in production

## First steps to use this project

- Clone this project locally
- Create new firebase project here: https://console.firebase.google.com/
- Upgrade firebase project to Blaze plan to be able to use cloud functions and hosting
- Copy the contents of `.env.local.example` to `.env.local`
- Create new firebase web app and copy the config values to `.env.local`
- Push the repo to your own github repo
- In your github repo, create the secrets necessary for the github actions to run following this: https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository, or via cli: https://cli.github.com/manual/gh_secret_set
- In firebase enable at least the following services:
  - authentication (google login)
  - firestore (in production mode)
  - cloud functions
  - Hosting (we will deploy via github actions, so you don't need to deploy using the command line)
- Install Firebase cli version 10.9.2 in your computer and login with it (`firebase login`)
- Run `firebase init` in the root folder of this project, do not override any files
  - Use the services auth, firestore, functions and hosting, use emulators and accept to download them, and use github actions.
- Run `firebase deploy --only firestore:rules`
- Run locally the app and emulate firebase services
  - Build functions by running `(cd functions && pnpm build)`
  - Run these two commands in separate shells: `pnpm emu:dev`, `pnpm emu:start`
- Try to login with google. If you go to your firestore emulator you should see a user entry
- You should be able to navigate to `http://localhost:3000/account`
- In the firestore emulator, change `isAdmin` for your user to true, then you should be able to access `http://localhost:3000/admin`
- Run `firebase deploy --only functions` to deploy cloud functions
- For user generated content (e.g. todo items), extend dataEntries api starting from `dataEntriesTypes.ts`, or create a new type of entry from scratch using dataEntries as reference
  - Copy or modify files inside the following folders:
    - `src/features/dataEntries`
    - `src/features/dataEntryView`
    - `src/pages/*DataEntry*`
    - `src/Router`
  - Modify `firestore.rules`
  - Modify `deleteUserDataEntries` in `functions/src/index.ts`
- Enable firebase app check
  - Follow these instructions [Enable App Check with reCAPTCHA v3 in web apps  |  Firebase Documentation](https://firebase.google.com/docs/app-check/web/recaptcha-provider)
  - Add your public recaptcha v3 site key to `.env.local` and to your github secrets
- Deploy your app by pushing your main branch to the remote repo

If you want to host with another provider such as Netlify, skip everything related to firebase hosting:

- Remove hosting keys from `firebase.json`
- Remove github actions

## Code generators

- Run `pnpm plop` to scaffold components or pages

## Emulate firebase services

To develop locally, it's convenient to emulate the firebase services and avoid interacting with the production services.

- If you changed cloud functions, rebuild them before running the emulator: `(cd functions && pnpm build)`
- Run the emulators: `pnpm emu:start`
- Run the app locally in "emulator mode": `pnpm emu:dev`

Note: you should emulate firebase services when running locally. If you try to use the production firebase services from `localhost` with app check enabled, you won't be able to connect. If you really need to do so, follow this [Use App Check with the debug provider in web apps  |  Firebase Documentation](https://firebase.google.com/docs/app-check/web/debug-provider)

## Deploy to production

- Configure files under `.github/workflows` as needed
- Try to run locally with `pnpm build` and fix any issues
- Push `main` branch (auto deployed via github action)
- If functions changed, run `firebase deploy --only functions`

## Import firestore indexes to local file

If or when firestore indexes are generated remotely, you can import them to the local indexes file

- `firebase firestore:indexes`
- Copy output of the command to `firestore.indexes.json` file

Read more: [Manage indexes in Cloud Firestore  |  Firebase Documentation](https://firebase.google.com/docs/firestore/query-data/indexing)

## Debug cloud functions

References:

- [Test functions interactively  |  Firebase Documentation](https://firebase.google.com/docs/functions/local-shell#invoke_https_callable_functions)
- [Debugging Firebase Functions in VS Code | by Jorge Menjivar | Firebase Developers | Medium](https://medium.com/firebase-developers/debugging-firebase-functions-in-vs-code-a1caf22db0b2)

### Initial setup (only the first time)

- Setup admin credentials locally following this: [Test functions interactively  |  Firebase Documentation](https://firebase.google.com/docs/functions/local-shell#set_up_admin_credentials_optional)
- Add the file to the root of the folder (**ADD IT TO GIT IGNORE, DO NOT COMMIT IT**)
- Setup debugging config as described here: [Debugging Firebase Functions in VS Code | by Jorge Menjivar | Firebase Developers | Medium](https://medium.com/firebase-developers/debugging-firebase-functions-in-vs-code-a1caf22db0b2)

### Debugging

- `(cd functions && pnpm build:watch)`
- `(export GOOGLE_APPLICATION_CREDENTIALS=~/admin-key-credentials.json && cd function && firebase emulators:start --inspect-functions)` (`admin-key-credentials.json` is the file you got during the setup)
- Comment references to `context.auth`, because that is not available locally (and restore it after testing!)
- Start debug mode
- Set breakpoints
- Send requests with postman

## Testing

- Run `pnpm test` to run all tests
- `src/util/test.tsx` re-exports all react testing library utilities as well as a version of the render method decorated with mock providers. See a usage example in `src/components/SuspenseWrapper/SuspenseWrapper.test.tsx`

## Issues

- Recaptcha token is missing from client
  - [x] Make sure recaptcha key is correct in github secrets
  - [x] Use key directly instead of environment variable


## References

### Firebase

- Modular setup for firebase app: https://sourcegraph.com/github.com/firebase/firebase-js-sdk/-/blob/e2e/sample-apps/modular.js
- A similar template: https://github.com/TeXmeijin/vite-react-ts-tailwind-firebase-starter
