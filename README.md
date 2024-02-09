# QUEST LOG 2.0

Quest log was a simple task tracker app built using Next.js, supabase, and tailwind.css, developed as the final project for my modern web development class in Spring 2023. I recently decided to revisit this project, as I believed I could do better and make a more interesting, more engaging experience.

The app is inspired by video game quest systems. Every user can create a list of new "quests" to undertake. Users can create an account, and then create unique lists with as many quests as the like.
Initially, the UI was inspired by classic Final Fantasy. For 2.0, I decided to pivot, and wanted to develop a UI inspired by Skyrim



## Initial Features:
- ### Account creation and user authentication using email.
- ### Create a list of quests, and have that list of quests displayed so that other people can see them.
- ### Create additional lists of quests.
- ### View the quests of other users of the App.
- ### A home page that shows the first quest list of the three most recent user.
- ### User's may edit their own lists, marking quests as complete, and adding new quests.
- ### Simple UI

## 2.0 Features:
- ### UI Improvements:
  Refreshed the UI. It is now inspired by the UI of Skyrim, and is much more user friendly and aesthetically pleasing
- ### Better Logout:
  When logging out and not on home page, there may be errors as certain pages require a user to be logged in. I plan to add automatic routing to home page when signing out.
- ### Form Protection:
  Added new protections to ensure users can't submit empty forms.
- ### Display Most Recent List:
  By default, the player's profile will first display their most recent list. Not their first.
- ### Streamlined Routes:
  Multiple old routes, such as /create, /register, /user/[username]/list/[id] have been removed, with their functionality being moved to other routes.
- ### Responsive Design:
  The New UI will be functional at multiple breakpoints, inlcuding on mobile.
- ### Quality of Life Improvements:
  New Loading Screen while data loads, improved loading times and performance.





  ## Routes:
  - ### /
    Root Directory. Displays A home page inspired by Skyrim's main menu. Initially displays a feed of 16 user profiles, and their most recently created quests, which the user can click on to be taken to          that account page. When Not logged in, the user can switch to a login or register component as well. When logged in, they can switch to view the default feed again, a form which lets them create a new 
    list, or be routed to their own profile.
  - ### /login
    Empty route which routes you back to the default page.
  - ### /user/[username]
    View a user's profile and see their lists. If user is logged in, and viewing their profile, they can mark quests as complete.
  - ### /user/[username]/list/[id]/edit
    Allows user to edit their own list. Only accesible if logged into the specific account.


  
  
















## Data Model:

### Profile:
#### A table containing the profile information of each user. Linked to authentication
- id: uuid of user
- name: name of user
- username: username of user
- created_at: date user account was created

### List:
#### A table containing the list information of each list.
- id: id of list
- title: name of list
- description: description of list
- user_id: foreign key linking to user
- created_at: date list was created

### Quests:
#### A table containing quest information
- id: Quest id
- name: name of quest
- description: quest description
- list_id: id of list
- created_at: date created
- order: order of list
- completion_status: true or false bool for if it was completed







This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Vercel Deployment:
Check out the Vercel deployment here:
https://quest-log-lhom.vercel.app/
