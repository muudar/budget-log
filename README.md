# Budget Log V1.0.0

## Demo

You can access the web app [here](https://budget-log.vercel.app/)

**Budget Log** is a personal finance application where users can manage their finances by logging spendings and earnings. Upon logging in or signing up (using [**Clerk**](https://clerk.com/) for authentication, including social auth), users are presented with a dashboard that has two main pages: Home and Transactions.

## Home Page

**Balance Card**: Users can either:

- Transfer money from their savings to their balance.
- Directly change their balance (e.g., set an initial balance).

**Savings Card**: Users can move money from their balance to savings, where it remains untouched.

**Spendings Card**: Users can log spendings by providing an amount, description, and category (e.g., "Food"). This decreases the balance by the logged amount.

**Earnings Card**: Users can log earnings by entering an amount, description, and category (e.g., "Work"). This increases the balance by the logged amount.

**Analysis Chart**: Users can check their spendings and earnings on each day of the last 7 days in order to compare.

**Recent Transactions**: Read/View last 8 transactions.

**Category Groupers**: All time money spent/earnt on each category created.

## Transactions Page

**Pie Charts**: Two pie charts are available: one for spendings and one for earnings. They display the distribution of the top six categories, with all other categories grouped under "Other."

A full **table** where users can:

- Read/view all transactions.
- Edit existing transactions.
- Delete existing transactions transactions.

## Tech Stack

- [**TypeScript**]

- [**Next.js**](https://nextjs.org/): Full-stack application using client and server components.

- [**TailWind**](https://tailwindcss.com/): for stylization.

- [**Vercel**](https://vercel.com/): Deployed on Vercel, using their Postgres database for storage (note: the free plan may have a connection limit).

- [**Prisma**](https://www.prisma.io/): ORM for managing database operations.

## Additional Notes

**Landing Page**: Currently very basic. Focus was on the dashboard to ensure core functionality before the deadline of August 25th, 2024. Plans to improve the landing page and add features like category deletion in future updates.

> **Database Limitations**: The application is deployed on Vercel's free storage database, which has connection limits that may cause issues if many operations are performed simultaneously. Users might encounter Prisma errors due to these limits. Screenshots of a fully populated account will be provided to illustrate the application’s functionality despite potential connection issues.
