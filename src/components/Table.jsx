import { PropTypes } from "prop-types";
import DOMPurify from "dompurify";

function Table({ patientInfo, error, loading }) {
  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // return (
  //   <>
  //     {patientInfo ? (
  //       <table style={{ color: "black" }}>
  //         <thead>
  //           <tr>
  //             <th>Id</th>
  //             <th>Name</th>
  //             <th>Gender</th>
  //             <th>BirthDate</th>
  //             <th>Address</th>
  //             <th>Phone</th>
  //             <th></th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {patientInfo?.entry.map((patient) => (
  //             <tr key={patient?.resource?.id} className="mb-1 bg-white">
  //               <td>{patient?.resource?.id}</td>
  //               <td>{patient?.resource?.name?.[0]?.given?.join(" ")}</td>
  //               <td>
  //                 {/* {new Date(
  //                   patient?.resource?.meta?.lastUpdated
  //                 ).toLocaleTimeString("en-US", {
  //                   hour: "numeric",
  //                   minute: "numeric",
  //                   hour12: true,
  //                 })} */}
  //                 {patient?.resource?.gender || "-"}
  //               </td>
  //               <td>
  //                 {new Date(patient?.resource?.birthDate).toLocaleDateString(
  //                   "en-US",
  //                   {
  //                     day: "numeric",
  //                     month: "long",
  //                     year: "numeric",
  //                   }
  //                 )}
  //               </td>
  //               <td
  //                 dangerouslySetInnerHTML={{
  //                   __html: DOMPurify.sanitize(patient?.resource?.text?.div),
  //                 }}
  //               />
  //               <td>{patient?.resource?.telecom?.[0]?.value}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     ) : (
  //       <p>No patient information available</p>
  //     )}
  //   </>
  // );
  return (
    <>
      {patientInfo ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Id</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">BirthDate</th>
                <th className="px-4 py-2 border-b">Address</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {patientInfo?.map((patient) => (
                <tr key={patient?.resource?.id} className="mb-1">
                  <td className="px-4 py-2 border-b">
                    {patient?.resource?.id}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {patient?.resource?.name?.[0]?.given?.join(" ")}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {patient?.resource?.gender || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {patient?.resource?.birthDate
                      ? new Date(
                          patient?.resource?.birthDate
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td
                    className="px-4 py-2 border-b"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(patient?.resource?.text?.div),
                    }}
                  />
                  <td className="px-4 py-2 border-b">
                    {patient?.resource?.telecom?.[0]?.value}
                  </td>
                  <td className="px-4 py-2 border-b"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No patient information available</p>
      )}
    </>
  );
}

Table.propTypes = {
  patientInfo: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default Table;

// import React from "react";
// import PropTypes from "prop-types";
// import DOMPurify from "dompurify";

// function calculateAge(birthdate) {
//   const today = new Date();
//   const birthDate = new Date(birthdate);
//   let age = today.getFullYear() - birthDate.getFullYear();

//   if (
//     today.getMonth() < birthDate.getMonth() ||
//     (today.getMonth() === birthDate.getMonth() &&
//       today.getDate() < birthDate.getDate())
//   ) {
//     age--;
//   }

//   return age;
// }

// function Table({ patientData, error, loading }) {
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
//   console.log("karan", patientData);
//   return (
//     <>
//       {patientData?.entry?.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border-b">Id</th>
//                 <th className="px-4 py-2 border-b">Name</th>
//                 <th className="px-4 py-2 border-b">Gender</th>
//                 <th className="px-4 py-2 border-b">BirthDate</th>
//                 <th className="px-4 py-2 border-b">Address</th>
//                 <th className="px-4 py-2 border-b">Phone</th>
//                 <th className="px-4 py-2 border-b">Age</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patientData.entry.map((patient) => (
//                 <tr key={patient?.resource?.id} className="mb-1">
//                   <td className="px-4 py-2 border-b">
//                     {patient?.resource?.id}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {patient?.resource?.name?.[0]?.given?.join(" ")}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {patient?.resource?.gender || "-"}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {new Date(patient?.resource?.birthDate).toLocaleDateString(
//                       "en-US",
//                       {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       }
//                     )}
//                   </td>
//                   <td
//                     className="px-4 py-2 border-b"
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(patient?.resource?.text?.div),
//                     }}
//                   />
//                   <td className="px-4 py-2 border-b">
//                     {patient?.resource?.telecom?.[0]?.value || "-"}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {calculateAge(patient?.resource?.birthDate)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No patient information available</p>
//       )}
//     </>
//   );
// }

// Table.propTypes = {
//   patientData: PropTypes.array,
//   error: PropTypes.object,
//   loading: PropTypes.bool,
// };

// export default Table;
