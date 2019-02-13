import React from "react";
import Benchmark from "benchmark-react";

function App() {
  return (
    <div>
      <Benchmark testCaseName="test case name here">
        <p>Hi</p>
      </Benchmark>
    </div>
  );
}

export default App;
