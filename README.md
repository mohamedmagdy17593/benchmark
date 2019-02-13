# Benchmark for React apps
React benchmark with express server to catch data and simple visualization.

## Getting Started

Clone the project and run the setup script

```
git clone https://github.com/mohamedmagdy17593/benchmark.git
cd ./benchmark
npm run setup
```
It must be noted that the setup script installs the needed dependencies and runs numerous scripts, one of them is [npm link](https://docs.npmjs.com/cli/link.html)
which might need special persmissions. It's similar to installing a package globally.

The directory structure looks like this:

    ├── server                    # JSON creating and serving
    ├── benchmark-react           # Core code
    ├── benchmark-visualizer      # visualisation playground
    └── example                   # Example for a simple use case.


### Starting the server

The server is responsible for writing and saving the json file that is later used for visualizng the benchmark results. 

```
cd ./server
npm run start
```

### Running the example

```
cd ./example
npm run start
```

This will run the basic example for the bench mark in a tabular view. It also give the ability to save the json file to be visulaized later.

### Running the visualizer

```
cd ./benchmark-visualizer 
npm run start
```

When the visualizer run, choose the test file you want from the drop down menu at the top left.

## Usage in an external project


**Make sure that all 3 environments are running**, then go to your other project root directory

```
npm link benchmark-react
```

You should be able to import the library into your project and wrap any component you want. 

```jsx
import React from 'react';
import CustomComponent from './component/CustomComponent'
import Benchmark from 'benchmark-react';

export default function App () {
  return (
    <Benchmark
      componentsCount={100}, // default
      reRendersCount={10}, // default
      reRenderInterval={1000}, // default
      testCaseName="some name"
    >
      <CustomComponent />
    </Benchmark>
  )
}
```


