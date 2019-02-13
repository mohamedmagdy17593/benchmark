import React from "react";

export function ShowTable({ data = [], omit = [] }) {
  if (!data || data.length === 0) {
    return (
      <p>
        no data then no table{" "}
        <span role="img" aria-label="smile face">
          😃
        </span>
      </p>
    );
  }
  const heads = Object.entries(data[0])
    .reduce(
      (acc, [key, value]) => [...acc, typeof value !== "object" && key],
      []
    )
    .filter(Boolean)
    .filter(k => !omit.includes(k));
  console.log({ heads });
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          {heads.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            {heads.map((h, i) => (
              <th key={i}>{d[h]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
