# QUEST LOG

Quest log is a simple task tracker app built using Next.js, supabase, and tailwind.css

The app is inspired by video game quest systems. Every user can create a list of new "quests" to undertake. Users can create an account, and then create unique lists with as many quests as the like.



## Current Features:
- ### Account creation and user authentication using email.
- ### Create a list of quests, and have that list of quests displayed so that other people can see them.
- ### Create additional lists of quests.
- ### View the quests of other users of the App.
- ### A home page that shows the first quest list of the three most recent user.
- ### User's may edit their own lists, marking quests as complete, and adding new quests.
- ### Simple UI which is navegable, if a bit ugly.

## Upcoming Features:
- ### Reorder Quests:
  There is currently functionality to change the order of quests, but the function is not consistent, and does not always work.
- ### Delete Lists and Quests:
  Add the ability to delete individual quests and lists when they are no longer needed.
- ### Better Logout:
  When logging out and not on home page, there may be errors as certain pages require a user to be logged in. I plan to add automatic routing to home page when signing out.
- ### Remove Blank Quests:
  When creating a list, you can add blank quests. I plan to remove the ability to add quests that are blank.
- ### Display Most Recent List:
  Home page currently displays a user's first ever list. I want to change it to display the most recent list. It is a simple fix, but also low priority, and will be fixed in my next push.
- ### UI Improvements:
  Improve the UI to be more aesthetically appealing, but this is at the lower end of priority, as adding functions is more pressing.






  ## Routes:
  - ### /
    Root Directory. Displays home page with three most recent users and their quests.
  - ### /create
    Create new list of quests. Only accessible if logged in.
  - ### /login
    Login
  - ### /register
    Register for an account
  - ### /user/[username]
    View a user's profile and see their lists. If user is logged in, and viewing their profile, they can mark quests as complete.
  - ### /user/[username]/list/[id]
    View an individual list. If user is logged in and viewing one of their lists, they will be rerouted to /user/[username]/list/[id]/edit
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
https://quest-log-lhom-72syay8re-akolari.vercel.app/
