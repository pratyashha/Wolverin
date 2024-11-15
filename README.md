# WolverineAI

*WolverineAI* is a SaaS platform that combines multiple AI-powered tools into one easy-to-use solution. Whether you need to generate text, images, video, audio, or code, WolverineAI provides a comprehensive suite of tools under a single subscription with an optional Pro tier for enhanced features.

## Key Features

- *Text Generation*: Generate content, summaries, descriptions, and more with advanced AI language models.
- *Image Generation*: Create custom images using AI-driven technology with options for unique styles, effects, and details.
- *Video Generation*: Produce video content using AI, including animations, effects, and transitions.
- *Audio Generation*: Generate sound, music, and voiceovers for podcasts, videos, or digital storytelling.
- *Code Generation*: Use AI to write, debug, and understand code, simplifying complex programming tasks.

## Subscription Tiers

### Free Tier
- Limited to 3 generations per day.
- Access to basic functionality across all tools.
- Ideal for exploring the platform.

### Pro Tier
- Unlocks unlimited access to all generation tools.
- Full functionality with priority support.
- Perfect for professionals and creators who need reliable, powerful AI tools.

## Getting Started

1. *Sign Up*: Visit [WolverineAI](https://wolver.in) and create an account.
2. *Explore the Tools*: Select any tool (text, image, video, audio, or code generation) from the dashboard to start creating.
3. *Upgrade to Pro* (Optional): Access the full power of WolverineAI with a Pro subscription.

## Technology Stack

- *Frontend*: [Next.js](https://nextjs.org/) - A React-based framework that enables server-side rendering and optimized static site generation.
- *Backend*: Next.js API routes and serverless functions on Vercel.
- *Database*: [PlanetScale](https://planetscale.com/) - A scalable, serverless PostgreSQL-compatible database.
- *Hosting*: [Vercel](https://vercel.com/) - Vercel provides fast and scalable hosting with seamless Next.js integration.

## Installation (For Development)

To run WolverineAI locally for development purposes, follow these steps:

1. *Clone the Repository*:

   bash
   git clone https://github.com/your-username/WolverineAI.git
   

2. *Navigate to the Project Directory*:

   bash
   cd WolverineAI
   

3. *Install Dependencies*:

   bash
   npm install
   

4. *Set Up Environment Variables*:

   Create a .env.local file in the root directory and add the following environment variables:

   plaintext
   DATABASE_URL=<your_planetscale_database_url>
   NEXT_PUBLIC_API_KEY=<your_api_key_if_applicable>
   

5. *Run the Application*:

   bash
   npm run dev
   

6. *Visit the Local Server*:

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

WolverineAI is deployed on Vercel. For redeploying:

1. *Push Changes*: Commit and push your changes to the main branch.
2. *Vercel Deployment*: Vercel will automatically redeploy the latest version from your GitHub repository.

For database management, use PlanetScale's [CLI](https://planetscale.com/docs/cli) to interact with the PostgreSQL-compatible database.

## Usage

1. *Log in*: Access WolverineAI at [wolver.in](https://wolver.in) and log in with your account.
2. *Generate Content*: Choose from the available tools to start generating text, images, videos, audio, or code.
3. *Upgrade to Pro*: Unlock unlimited generations and advanced features by upgrading to the Pro plan.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or support:

- *Email*: pratyasha.616@gmail.com
- *GitHub Issues*: [Issues Page](https://github.com/pratyashha/Wolverin/issues)
