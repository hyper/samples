# Double License

Allow your users to have access to a second Hyper service and "link" their existing license to the new one (if their main one expires, the second one will to).

### Prerequisites

* [Hyper](https://hyper.co) primary and secondary account with SECRET api keys.
* [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) database.
* Heroku application.

### Setup

1. Clone this repository.
2. Run `cp .env.sample .env` to create your `.env` file.
3. Input the secret api keys in the new `.env` file.
4. Create a Firebase Cloud Firestore database.
5. Generate a private key from Project Settings > Service Accounts.
6. Previous step will have you download `serviceAccountKey.json`, move it to this folder.
7. Commit changes to a private repository in your account.
8. Create a new app on Heroku.
9. Go to Deploy, then link your GitHub and connect your repository.
10. Select and deploy `main` branch.
