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
problem = realised that after adding createdBy fiedl and adding it in my seeds to help populate the websitre and reset after testing. Duritnf testing found that I had forgotten to associated the session's user as createdBy when adding new brands
initially wanted to upload two separate images in diff fields, but this didnt work as I intended

day 5
today's plan is styling and giving each page an identity and populating the website with more initial info to make it more useful and interesting
carousel?
error handling
wanted the app to work on mobile screens as well as desktop
avoiding errors on show page required time and effort - to make sure that certain info only showed when the relevant user was logged in.
With mobile and desktop views in mind, have to strive to create a design that looks good across two different viewpoints. Some, like the brands index and profile pages, immediately scaled well between the two views. The show page was one I found most difficult to get right - I liked the way it looked on mobile view but not as a bigger screen
the positioning of the cards...
position took a bit of gettin my head around. getting the text to sit in the centre of the brand cards required the card to be relativelypositioned. These would then scroll over the nav header whenever I tried to set it to be `sticky` at the top of the page. After some research, I discovered that setting a z-value could help with this.
show page - looked good on small screen style, but scales to full width badly. This is something I want to research further as I believe it's really important.

day 6
error handling
X add gallery pics
X check his image changes
homepage
X remove references to logo
X delete dead code
check requirements
X some responsive bits
deploy

decided against location... given my timeframe, gathering the information would have been too time consuming. it was also replicating the reverse virtual populate of the profile page and wanted to prioritise diff functionality for the purposes of this app
uploading images to a gallery went quite smoothly
used bootstrap to make a carousel - adding the new stylesheet to do this broke some of my previous styling so had to check throuhg everything with a fine-toothed comb
this really stressed me - ended up being the line height that was set wrongly and messed up my logo. Couldnt add to every page as it broke everything each time. Glad I found the culprit by investigating intensively on inspect