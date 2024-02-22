import PropTypes from "prop-types";

function Table({ headers, rowRender, data, loading }) {
  if (!headers || !headers.length || !data.length) {
    return <p>No data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full bg-white border border-gray-300"
        aria-busy={loading}
      >
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-2 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map(rowRender)}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  rowRender: PropTypes.func,
  loading: PropTypes.bool,
};

export default Table;
