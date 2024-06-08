# ames5925-tracker
 repository for my assigmnet

## Set up 
In terminal run “npm init”
Then in the terminal run “npm install express”
Finally start the server with “npm run start”
open the html.index file in your browser to start using the site. 

 The aim of this tracker is to provide a way for gym goers new and old to track their progress. Currently tracking apps are overly complicated and not intuitive to use. With my design i ensured a simple and straight forward UI approach. it uses local storage for data persistance. 

## Design
The design has not varried much from my web design assignment. It uses neon colors to invoke invigoration and motivation for people working out and using the tracker, presumably at a gym. The design is also inspired by a retro game aesethtic to add a element of nostalgia and playfulness to the tracker app.  

 ## Log tab 
 Here the user is met with three tabs. The log for logging , the history for viewing history and edit to edit previous logs. Originally in my previous assignment the form was to be split in two. after the user entered cardio or weight type the relevant form entries would then show up. Through coding i found this to be time consuming and not really necessary. If user doesnt find the input relevant they just wont enter it, there doesnt need to be a block preventing them. When a user presses submit on the form a confirmation pop iup is provided to give feedback that the submission was successful. 

## History tab 
The history tab shows a summary of each previously logged entries. If there is none they will be met with pop up stating "try logging something first". When a user clicks on a tab it will expand to show more info. To visually let the user know these are clickable all clickable tabs across the site are the colour purple, same as the submit button.

 ## Edit tab 
The edit tab makes a minus button appear next to each tab. This functionality is separated from the history tab to prevent any accidental deletions. When the user hovers the minus will turn into an x to further confirm and communicate to the user that it will delete the tab. The x is also larger on smaller screen sizes to prevent accidental clicking while scrolling.

## CSS
Css includes a range of dynamic responsive measurements including VW and %s to ensure content is suitable across devices. Media query is also used. 

## Github repository and version control
Unfortunately there was an error with my commits in github and a large portion were lost. On top of this github desktop was not connecting to my local repository with my previous pushes. i spoke to samuel about this and he said it would be fine as long as i had a working repository for the assignment submission. Here is the link https://github.com/Ames5925/ames5925Prototype 

## Acknowledgements 
-local storage content was inspired from https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js and https://blog.logrocket.com/localstorage-javascript-complete-guide/ and https://thecodingpie.medium.com/how-to-build-a-todo-list-app-with-javascript-and-local-storage-a884f4ea3ec

-Chat gpt 4-o

-handle form submission// inspired by week 10 tut example https://github.com/robdongas/deco2017-task-tracker/blob/solutions/public/script.js

-Pill navigation taken from bootstrap "customize components" https://getbootstrap.com -->

-Dumbell icon https://iconduck.com/icons/249530/dumbbell
