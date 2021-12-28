# Cached Authentication API Example

This sample repository demonstrates how you can use your own Express
API combined with Redis to cache responses. This prevents sending excessive
requests to the Hyper API, and allows you to ping the API as frequently as 
you'd like. You can also add SSL pinning and other security features if so desired.

## Current functionality:
- Allows a license to be retrieved from the API
- Uses Redis to store license values
- Caches responses for 15 minutes, before invalidating the stored value


## How to run locally:
- `cp .env.example .env`
- Fill out the `.env` file accordingly — if you are running redis locally, you can leave the redis values empty. The only required field is `HYPER_SECRET_KEY`

If you'd like to run redis locally,
- `brew install redis`
- `brew services start redis`

Start the API:
- `yarn dev` in the root of `cached-auth-api`


## How to test:
- Send a request to http://localhost:7000/<LICENSE_KEY>
- The first request will not hit the cache, so the response time should be a few hundred milliseconds
- Send another request to http://localhost:7000/<LICENSE_KEY>
- This request should only take mere milliseconds — we're no longer fetching from the Hyper API, but Redis instead

## Need help?
- Email connor<i_hate_bots_remove_this>@hyper.co
- Message Connor on Discord — connorstevens#0001
