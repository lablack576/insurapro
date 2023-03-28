# InsuraPro

This project is a management software for insurance companies, this is an internship prototype.

## Getting Started

### Prerequisites

To use this project, you will need:

- A Google account
- Node.js installed on your computer
- An IDE or text editor

### Creating a Firebase Project

To create a Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click on "Add project" and follow the prompts to create a new project.
3. Once your project is created, click on "Authentication" in the left sidebar.
4. Click on the "Sign-in method" tab and enable Phone authentication.
5. Click on "Firestore Database" in the left sidebar and create a new Firestore database.

### Creating a Web App

To create a web app:

1. In your Firebase project, click on the gear icon next to "Project Overview" in the left sidebar and select "Project settings".
2. Scroll down to the "Your apps" section and click on "Add app".
3. Select "Web" and follow the prompts to register your app.
4. Copy the Firebase configuration settings for your app.

### Downloading the Project

To download the project:

1. Clone the repository to your local machine.
2. In the root directory of the project, create a new file called `.env`.
3. In the `.env` file, add the Firebase configuration settings you copied earlier:

`REACT_APP_API_KEY=[your API key]`<br />
`REACT_APP_AUTH_DOMAIN=[your auth domain]`<br />
`REACT_APP_PROJECT_ID=[your project ID]`<br />
`REACT_APP_STORAGE_BUCKET=[your storage bucket]`<br />
`REACT_APP_MESSAGING_SENDER_ID=[your messaging sender ID]`<br />
`REACT_APP_APP_ID=[your app ID]`<br />
`REACT_APP_MEASUREMENT_ID=[your measurement ID]`

Be sure to replace `[your API key]`, `[your auth domain]`, and so on with the actual values for your Firebase project.

4. Run `npm install` to install the project dependencies.

### Running the App

To run the app:

1. Run `npm start` in the root directory of the project.
2. The app will open in your default browser.

### Building the App

To build the app:

1. Run `npm run build` in the root directory of the project.
2. The built app will be stored in the `build` folder.
