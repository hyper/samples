# Custom checkout flow example

This example uses:
  - [Next.js](https://nextjs.org)
  - [react-stripe-js](https://github.com/stripe/react-stripe-js) for [Stripe Elements](https://stripe.com/elements)
  - The Hyper API ([docs](https://docs.hyper.co))

## Deploy your own

Once you have access to [the environment variables you'll need](#required-configuration) from the [Hyper dashboard](https://dashboard.stripe.com/developers), deploy the example using [Vercel](https://vercel.com):

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/meta-labs/samples/tree/main/custom-checkout&project-name=hyper-custom-checkout&repository-name=hyper-custom-checkout&env=NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,NEXT_PUBLIC_HYPER_PUBLISHABLE_KEY,HYPER_SECRET_KEY&envDescription=Enter%20your%20Stripe%20and%20Hyper%20API%20keys&envLink=https://github.com/meta-labs/samples/tree/main/custom-checkout%23required-configuration)

## Included functionality

- Customizable interface using [Bootstrap](https://getbootstrap.com)
- Scalable purchase page that fetches the latest release with a given password from the Hyper API.
- Card input using [Stripe Elements](https://stripe.com/elements)
- Success, Out of Stock, and Password page templates

### Required configuration

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of this project:

```bash
cp .env.local.example .env.local
```

You will need a Hyper account ([register](https://hyper.co)) to run this sample. Once you have an account, go to the
[developer dashboard](https://hyper.co/developers) to retrieve your API keys. You'll also need your Stripe publishable key,
which you can find in the [Stripe dashboard](https://stripe.com/docs/development#api-keys). Once you have your API keys,
add them to the `.env.local` file.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-your-stripe-publishable-key>
NEXT_PUBLIC_HYPER_PUBLISHABLE_KEY=<replace-with-your-hyper-publishable-key>
HYPER_SECRET_KEY=<replace-with-your-hyper-secret-key>
```

Now install the dependencies and start the development server.

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Authors

- [@benbotvinick](https://twitter.com/benbotvinick)
