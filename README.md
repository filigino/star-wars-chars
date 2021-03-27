# Star Wars Character List
React app that displays list of Star Wars characters pulled from ([SWAPI](https://swapi.dev/))

## Features

- Built with React (using create-react-app) and uses React Hooks and Fetch API
- Utilizes React Router, Bootstrap, and React-JSS
- Uses pagination

## How It Works

- Character list is stored using reducer since it is complex (objects with many sub-values) and next state depends on current state (i.e., when appending more characters to list)
- Character list is built up as user scrolls through pages
  - New fetch request made for each page (since SWAPI returns character data in discrete pages)
  - But if user has already loaded that page, data is just retrieved from state
  - This was done to prevent refetching data that has already been retrieved
- On Character page, fetch request is made for that character using id in URL
  - Some character data is returned as other SWAPI links so more fetch requests are made to these links in parallel to minimize waiting time
  - New fetch request made on Character page instead of using data from state to allow user to navigate directly to Character page using URL
- When Back button from Character page is clicked, corresponding page number is passed so Character List page starts at correct page
- Whether app is loading or not (fetching data) is tracked with boolean state that is flipped on/off when requests are made and completed

## Next Steps

- Add links to Character List page to navigate directly to each page (e.g., links for '1 2 3 4 5 6 7 8 9' in between next/prev buttons)
- If Character page is navigated to from Character List page, use character data from state instead of making new fetch request
  - But if Character page is opened directly using URL, make fetch request (this is how it currently works)
- More interesting styling for character page
