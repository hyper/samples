# Double License

Allow your users to have access to a second Hyper service and "link" their existing license to the new one (if their main one expires, the second one will to).

### Prerequisites

* [Hyper](https://hyper.co) primary and secondary account with SECRET api keys.
* [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) database.
* Heroku application.

### Setup

1. Clone this repository.
2. Run `cp .env.sample .env` to create your `.env` file.
3. Input the api keys in the new `.env` file.
4. Commit changes to a private repository in your account.
5. Create a new app on Heroku.
6. Go to Deploy, then link your GitHub and connect your repository.
7. Select and deploy `main` branch.
