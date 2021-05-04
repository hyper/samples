# Discord bot to reset license metadata

Discord bot that allows only license owners to reset metadata.

### Prerequisites

* Discord bot token, make sure to add the bot to your server.
* [Hyper](https://hyper.co) account and publishable API key.
* Heroku application.

### Setup

1. Clone this repository.
2. Run `cp .env.sample .env` to create your `.env` file.
3. Input your Discord bot token, desired prefix (default is `!`) and Hyper publishable API key in the new `.env` file.
4. Commit changes to a private repository in your account.
5. Create a new app on Heroku.
6. Go to Deploy, then link your GitHub and connect your repository.
7. Select and deploy `main` branch.
