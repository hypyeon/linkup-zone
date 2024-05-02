# Linkup Zone
by [Hayeong Pyeon](https://linktr.ee/hypyeon)

![mockup](/assets/images/preview-UI.png)

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Description](#description)
3. [Setup Requirements](#setup-requirements)
4. [Github Pages](#github-pages)
5. [Known Bugs](#known-bugs)
6. [License](#license)

## Technologies used
- React, React Native 
- Expo Go
- JavaScript
- Node.js 
- Firebase (Firestore, Firebase Auth)
- Luxon, Temporal, Moment.js 

## Description
- This is a Capstone project, one of graduation requirements by Epicodus.
- Planning, research log & app planning can be found [here](https://github.com/hypyeon/epicodus-capstone-brainstorming).
- This web application allows users to create accounts, log in and out, and send other users messages (live-time) that display the delivered time in 2 time zones. 
- In the dashboard (when logged in), there are clocks with different time zones you select to display in UI (time zone list available, selection is not atm). 

## Setup Requirements
### Precondition
> [!NOTE] 
> Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

1. In your directory of choice, run the following command to clone this repo:
```bash
git clone https://github.com/hypyeon/linkup-zone.git
```
2. Open the project folder on a text editor. 
3. Create a file named `firebase-config.js` in the root directory and insert the following information. 
```bash
export const firebaseConfig = {
  apiKey: [YOUR-API-KEY],
  authDomain: [YOUR-AUTH-DOMAIN],
  projectId: [YOUR-PROJECT-ID],
  storageBucket: [YOUR-STORAGE-BUCKET],
  messagingSenderId: [YOUR-MESSAGING-SENDER-ID],
  appId: [YOUR-APP-ID]
};
``` 
> [!IMPORTANT]
> This file includes sensitive information including `apiKey` credential for Firebase Configuration thus is currently hidden by `.gitignore` file. This information will only be available to Epicodus instructors and students. 
> To create your own `apiKey` with Firebase web app, follow the steps below. 

- Create an account and log in to the Firebase. 
- Under **Your Firebase projects**, click **Add project** and create a project with your own choice of name.
- In your Firebase console, add a **web application**.
- After registering your app with your own choice of nickname, **Add Firebase SDK** step will generate your own SDKs. Copy the values of each key and replace the applicable contents of your `firebase-config.js` file you created. 
- Run `npm install firebase` in your terminal. 

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native. Run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _iOS_ app:

*only instructing iOS app running since the current responsive design is best structured with iPhone 15 Pro device*


```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _iOS Simulator_ shortly provided you have set up your simulator correctly.


## Known Bugs
- *currently under development: expected to be completed by May 6th*

## License
Copyright © 2024 Hayeong Pyeon | [MIT License](/LICENSE.txt)