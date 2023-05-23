Quest log is a simple task tracker app built using Next.js, supabase, and tailwind.css

The app is themed around video game quests, where each task in the task tracker is a new "quest" for the user to complete.

Current Features:
-Uhhhhhhhh




Data Model:

Profile:
A table containing the profile information of each user. Linked to authentication
id: uuid of user
name: name of user
username: username of user
created_at: date user account was created

List:
A table containing the list information of each list.
id: id of list
title: name of list
description: description of list
user_id: foreign key linking to user
created_at: date list was created

Quests:
A table containing quest information
id: Quest id
name: name of quest
description: quest description
list_id: id of list
created_at: date created
order: order of list
completion_status: true or false bool for if it was completed


Notes:
Originally, our app was supposed to be much grander in vision. Unfortunately, we started too late. Most functionality is there, but we ran into some issues. We were unable to finish styling as we liked. We were going for a 90s video game theme, but it is incomplete. Users can fully access their accounts, create lists, etc. They can also update thier lists and add new information to them.




Updates:
Discovered some more bugs after deployment. Completing a quest is inconsistent, and needs to be retooled. Additionally, in the vercel version, it seems that you can only view a users profile if you are logged in. This does not happen on our local version. I will have to research this further.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
