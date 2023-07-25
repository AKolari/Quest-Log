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
-Discovered some more bugs after deployment. Completing a quest is inconsistent, and needs to be retooled. Additionally, in the vercel version, it seems that you can only view a users profile if you are logged in. This does not happen on our local version. I will have to research this further.

-User cannot view profile if not logged in. This is because I have a check to see if the user viewing the profile is the profile owner. Unfortunately, I forgot to include an if statement to see if the user was logged in or not. Must fix this issue in the future.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

##Vercel Deployment
Check out the Vercel deployment here:
https://quest-log-lhom.vercel.app/
