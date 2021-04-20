# StripeCord - Message Cardholder on Failed Payment

Cardholder will receive a direct message and get notified when it happens.

### Prerequisites

* Discord bot token, make sure to add the bot to your server.
* Discord channel for logging purposes.
* [Hyper](https://hyper.co) account and secret key.
* Heroku application.
* Stripe webhook and signing secret. Use <https://your-app.herokuapp.com> as endpoint URL.

### Setup

1. Clone this repository.
2. Run `cp .env.sample .env` to create your `.env` file.
3. Input your Discord bot token, Stripe secret key and webhook signing secret in the new `.env` file.
4. Commit changes to a private repository in your account.
5. Create a new app on Heroku.
6. Go to Deploy, then link your GitHub and connect your repository.
7. Select and deploy `main` branch.
