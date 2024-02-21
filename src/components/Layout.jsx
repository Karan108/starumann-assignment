import { Slider } from "@mui/material";
import Table from "./Table";
import { useState } from "react";
import usePatientInfo from "../custom hooks/usePatientInfo";

function Layout() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [birthdate, setBirthdate] = useState(""); // You should bind this to your input or use a date picker component
  // const [birthdate] = useState(""); // You should bind this to your input or use a date picker component

  // Use the custom hook
  const { patientInfo, loading, error } = usePatientInfo(value);

  return (
    <div
      className={`flex ${loading ? "w-screen h-screen" : ""}`}
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div style={{ backgroundColor: "#003366" }} className="w-5pe"></div>
      <div className="w-95pe">
        <div
          className="w-full p-5 mb-1"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="flex items-center gap-2.5"
            style={{
              color: "#BDBDBD",
            }}
          >
            <span>
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
            <div> Search for anything</div>
          </div>
        </div>
        <div
          className="w-full p-5 mb-1"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <div
            className="flex items-center gap-2.5"
            style={{
              color: "#BDBDBD",
            }}
          >
            <span>
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
            <div> Search for anything</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-11">
          <div className="flex items-center w-full">
            <div>Filter by age</div>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              // getAriaValueText={value}
            />
          </div>
          <div className="flex items-center justify-center">
            <Table patientInfo={patientInfo} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
