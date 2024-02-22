import { useState } from "react";
import { Slider } from "@mui/material";
import { usePatientInfo } from "../apis/usePatientInfo";
import Table from "../components/Table";
import { formatAddresses } from "../utils/addressFormatter";
import Input from "../components/Input";
import SearchIcon from "../assets/SearchIcon";
import LoadingSpinner from "../components/LoadingSpinner";

function PatientsList() {
  const [value, setValue] = useState([21, 50]);

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
      className={`flex bg-lightGrey ${loading ? " h-screen" : ""} min-h-screen`}
    >
      <div
        style={{ backgroundColor: "#003366" }}
        className="hidden w-5pe md:flex"
      ></div>
      <div className="w-95pe">
        <div className="w-full p-5 mb-1 bg-white">
          <div className="flex items-center gap-2.5 text-grey">
            <span>
              <SearchIcon />
            </span>
            <Input
              onChange={(e) => filterBySearch(e.target.value)}
              placeholder={"Search by name"}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 p-3 md:p-11">
          <div className="flex justify-center w-full gap-3">
            <div>Filter by age</div>
            <div className="w-4/5">
              <Slider
                getAriaLabel={() => "Age Range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <LoadingSpinner />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsList;
