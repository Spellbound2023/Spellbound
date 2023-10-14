# Spellbound

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setup the repository for development
1. Clone the repository.
2. Run `npm install` from the root directory of the repository to install all the dependencies.
3. Set up the database

### Setting up the database
We currently use SQLite as the database, with Prisma as the ORM.

Change the directory to back-end/ before running the commands below.
```bash
 cd back-end/
```

First, we need to create the database tables:

```bash
npx prisma migrate dev --name init
```

This command should also cause the database seeding (creation of required records such as roles and privileges) to occur.

In case the database was not seeded, or we want to seed manually, we need to seed the database :

```bash
npx prisma db seed
```

We can then use Prisma Studio to explore and manipulate the data in the database:

```bash
npx prisma studio
```
Prisma Studio will be available on http://localhost:5555


### Deployment
To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

To build and run the production server:

```bash
npm run build
npm run start
```

## Folder structure

```
Spellbound
|            
+---app         # pages and page-specific React components
+---components  # reusable React components
+---public      # static files
+---styles      # CSS styles
\---utils       # utility functions
