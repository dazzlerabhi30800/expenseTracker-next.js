# Expense Tracker in Next.js
This app helps you keep track of your expeneses based on the budget you set.

## Tech Stack

- Clerk :- for Authentication
- TailwindCSS :- for CSS
- Neon Database :- for database to user info
- Drizzle ORM :- to create query & store data in neon database
- Shadcn :- UI Library
- moment :- for date & time format
- Recharts :- for bar chart

## How to run Locally

1. First fork or clone the repo then inside root folder run `npm install` to install the dependencies.

2. Then make a .env.local file in root dir & initialize variables.
   - NEXT_PUBLIC_DRIZZLE_DATABASE_URL :- get it from neon website after registering.
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY :- get it from clerk website
   - CLERK_SECRET_KEY :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_IN_URL :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_UP_URL :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL :- get it from clerk website

3. You are done & ready to run inside the root folder run the command `npm run dev`.

**You can view the live site _[Expense Tracker Live](https://expense-tracker-next-js-one.vercel.app/)_**

### Expense Tracker UI

### Home Page

![Home Page](/public/images/home.png)

### Dashboard Page

![Dashboard Page](/public/images/dashboard.png)

### Expense Page

![Video Preview](/public/images/expense.png)

### Budget Page

![Video Preview](/public/images/budget.png)


### SignIn Page

![Video Preview](/public/images/signin.png)
