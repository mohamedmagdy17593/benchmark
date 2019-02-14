import React from "react";
import ReactJson from "react-json-view";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { useResults } from "./ResultsProvider";
import { ShowTable } from "./ShowTable";

function ResultsDropdownFilter({ onChange, value }) {
  return (
    <label>
      Select avg filter prop
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="custom-select"
      >
        <option value="actualTime">actualTime</option>
        <option value="baseTime">baseTime</option>
        <option value="difference">difference</option>
      </select>
    </label>
  );
}

function getAvgFor(results, key) {
  return results.map(r => ({
    name: r.testCaseName,
    avg: (r.info.update || []).reduce(
      (avg, x, _, arr) => avg + x[key] / arr.length,
      0
    )
  }));
}

function ResultsShow() {
  const { results } = useResults();
  const [filterKey, setFilterKey] = React.useState("actualTime");
  const checkedResults = results
    .filter(r => r.checked)
    // to arrange object keys 😃
    .map(({ testCaseName, ...rest }) => ({ testCaseName, ...rest }));
  const avgCheckedResults = getAvgFor(checkedResults, filterKey);
  return (
    <div>
      <ResultsDropdownFilter onChange={setFilterKey} value={filterKey} />
      <hr />
      <section>
        <BarChart width={700} height={300} data={avgCheckedResults}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avg" fill="#007bff" />
        </BarChart>
      </section>
      <br />
      <section className="py-3">
        <ReactJson collapsed src={avgCheckedResults} />
        <ReactJson collapsed src={checkedResults} />
      </section>
      <ShowTable data={checkedResults} omit={["checked"]} />
    </div>
  );
}

export default ResultsShow;
