import { useState } from "react";
import { Slider } from "@mui/material";
import { usePatientInfo } from "../apis/usePatientInfo";
import Table from "../components/Table";
import { formatAddresses } from "../utils/addressFormatter";
import Input from "../components/Input";
// import Table from "./Table";

function PatientsList() {
  const [value, setValue] = useState([21, 50]);

  // Use the custom hook
  const {
    filteredPatientInfo: patientInfo,
    loading,
    filterBySearch,
  } = usePatientInfo(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderPatientRow = (record) => {
    return (
      <tr key={record?.id} className="mb-1">
        <td className="px-4 py-2 border-b">{record?.id}</td>
        <td className="px-4 py-2 border-b">
          {record?.name?.[0]?.given?.join(" ")}
        </td>
        <td className="px-4 py-2 border-b">{record?.gender || "-"}</td>
        <td className="px-4 py-2 border-b">
          {record?.birthDate
            ? new Date(record?.birthDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "-"}
        </td>
        <td className="px-4 py-2 border-b">
          {record?.address ? formatAddresses(record?.address)[0] : "-"}
        </td>
        <td className="px-4 py-2 border-b">{record?.telecom?.[0]?.value}</td>
      </tr>
    );
  };

  return (
    <div
      className={`flex ${loading ? "w-screen h-screen" : ""}`}
      style={{
        // create tailwind variable
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ backgroundColor: "#003366" }} className="w-5pe"></div>
      <div className="w-95pe">
        <div
          className="w-full p-5 mb-1"
          style={{
            // create tailwind variable
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="flex items-center gap-2.5"
            style={{
              // create tailwind variable
              color: "#BDBDBD",
            }}
          >
            <span>
              {/* extract into component */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="20px"
                height="20px"
                fill="#BDBDBD"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
            </span>
            {/* add styles */}
            <Input
              onChange={(e) => filterBySearch(e.target.value)}
              placeholder
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-11">
          <div className="flex items-center w-full">
            <div className="w-1/5">Filter by age</div>
            <div className="w-4/5">
              {/* use rc slider */}
              <Slider
                getAriaLabel={() => "Age Range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Table
              data={patientInfo}
              loading={loading}
              headers={[
                "Id",
                "Name",
                "Gender",
                "BirthDate",
                "Address",
                "Phone",
              ]}
              rowRender={renderPatientRow}
            />
            {/* <Table patientInfo={patientInfo} loading={loading} error={error} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsList;
