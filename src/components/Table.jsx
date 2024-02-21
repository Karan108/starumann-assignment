import { PropTypes } from "prop-types";

// accessibility
// styling
function Table({
  headers,
  rowRender,
  // loading,
  data,
}) {
  if ((!headers && !headers.length) || !data.length) {
    return;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {headers?.map((header) => (
                <th className="px-4 py-2 border-b" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map(rowRender)}</tbody>
        </table>
      </div>
    </>
  );
}

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  rowRender: PropTypes.function,
  loading: PropTypes.bool,
};

export default Table;
