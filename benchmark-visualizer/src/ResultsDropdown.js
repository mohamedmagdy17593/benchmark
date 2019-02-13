import React from "react";
import { useResults } from "./ResultsProvider";

function ResultsDropdown() {
  const { fileNames, fileName, setFileName } = useResults();
  return (
    <div>
      <label>
        Select results fileName
        <select
          data-testid="results-dropdown"
          value={fileName || ""}
          onChange={e => setFileName(e.target.value)}
          className="custom-select"
        >
          <option value="" disabled>
            Choose here
          </option>
          {fileNames.map((fileName, i) => (
            <option key={i} value={fileName} data-testid="results">
              {fileName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ResultsDropdown;
