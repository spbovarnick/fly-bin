# FlyBin

## Technologies Used
This MEN-stack web app is built with MongoDB, Node.js, express.js, Embedded JavaScript, vanilla JavaScript, and SCSS. 

## Installation Instructions
No installation required! All you need is the URL and an internet connection. The app is mobile-ready so you can use it on the go.

## User Stories
As a compulsive fly tier with a deeper catalogue than I can keep track of in my head, I want a handy app to track what flies I have on hand and what fly boxes they're in.

My father is a luddite and fly hoarder. I want to help him organize his mason jars of flies.

## Wireframes 
You can look at the initial wireframes [here](https://www.figma.com/file/hZ3i1xII59wLvwZaZqIHSO/Fly-Box?node-id=0-1&t=oh2OlBKVNuP1d2EH-0). Granted, the final product looks a bit different.

## Unsolved Problems and Major Hurdles
The biggest hurdle I experienced was implementing a fully functional search bar and route. I wanted search functionality that would return partial matches, and I found the MongoDB `$regex` evaluation query operator would be the driest way to accomplish my goal. However, one of the fields I wanted to search has a `Number` datatype, which meant that running it using a `$regex` operator on it crashed my server. With the help of Scott, I found that I could use the `$expr` operator to use aggregation expressions within my query language. Most importantly, `$expr` allowed me to use the `$toString` aggregation pipeline operator to convert my `Number` datatype field to a `String` datatype and keep my server running!

If time and resources were less finite, there is lots more that I'd love to implement with this app:
    - Drag-and-drop image upload on the add flies form, or at least image file upload via [multer](https://www.npmjs.com/package/multer).
    - A location field within notes that uses the Google Maps Platform to allow users to geo-tag notes
    - OAuth