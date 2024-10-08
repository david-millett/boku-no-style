# boku-no-style


day 1
Started work on the project
First step is to create a functioning website
created a server and landing page
next created a brands controller to define the brands routes
created a navbar
created the two main models I need - user model and brand model
no huge stumbling blocks - there are some parts I will come back to later after setting up basic functionality, like adding pictures to the brands model


day 2
sorted CRUD for the brands
made sign up and sign in forms


day 3
biggest issue was migraine...
no huge issues to begin with - problem solving of errors was just minor syntax mistakes with sign in form
signing in and creating a session went fine - I tried to integrate too many features simultaneously, so had to break down the steps and add functionality in set stages to enable all the things I needed to do
That's one thing I learned from this project = there are many steps and it helps if you are clear on a set order - and be ok with the fact that you may rebuild parts later. It's important to check the steps are working correctly before implementing more complex parts.
after completing the brands and auth controllers, things seem less straightforward - requires more thinking about next steps. Decided to create a seeds while adding an 'addedBy' section to the brand model. This gives me a clean slate of data to test with, and allows me to ensure only users who created certain brands have the rights to edit or delete them.
Made it so that only the person who added the brand to the website has the ability to edit

day 4
today's plan is MVP
ability to add favourites
ability to upload images
then error handling
then comments
these are the most important things for it to work
First priority was to add the ability to 'like' brands, as this is a core feature of the website. Managed to implement this by implementing a many-to-many relationship between brands and users, the most complex part of the project so far, which required reading around how to implement this. Created a virtual field on the user model to allow users to access a list of all the brands they like on their profile.
Implemented some basic styling - in hindsight I would have done this sooner just for piece of mind, as a little goes a long way to making the product feel more complete.
had an issue with vulnerabilities in dependencies - forced update and broke the app. learned the hard way that these are general issues and ones specific to my app that actually need addressing. ended up solving by deleting the lines that had my dependencies in package.json, removing node_modules and package-lock.json and re-installing them all
