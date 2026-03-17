# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bd8b995e-2a43-4b5f-a893-3261007c2ab4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bd8b995e-2a43-4b5f-a893-3261007c2ab4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Step 2: Set up environment variables
cp .env.example .env
# Then fill in the values in .env:
# - VITE_SUPABASE_URL: Your Supabase project URL
# - VITE_SUPABASE_PUBLISHABLE_KEY: Your Supabase anon/public key
# - VITE_SUPABASE_PROJECT_ID: Your Supabase project ID
# - VITE_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key (from https://dashboard.stripe.com/apikeys)

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

> **Note:** The `.env` file is auto-managed when using Lovable Cloud. For local development, copy `.env.example` and fill in your own credentials.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bd8b995e-2a43-4b5f-a893-3261007c2ab4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
