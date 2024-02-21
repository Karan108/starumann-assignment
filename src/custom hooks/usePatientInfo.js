import { useState, useEffect } from "react";

const usePatientInfo = (ageRange) => {
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        // Make API call to fetch all patient information
        const response = await fetch(
          `https://hapi.fhir.org/baseR4/Patient?_pretty=true`
        );
        const data = await response.json();
        // Filter patient information based on the given age range
        const filteredPatientInfo = data.entry.filter((patient) => {
          const birthDate = new Date(patient.resource.birthDate);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();

          return age >= ageRange[0] && age <= ageRange[1];
        });
        console.log("karan after", filteredPatientInfo);

        // Update state with the filtered patient information
        setPatientInfo(filteredPatientInfo);
      } catch (error) {
        // Handle errors
        setError(error);
      } finally {
        // Set loading to false after fetching data
        setLoading(false);
      }
    };

    // Call the function to fetch and filter patient information
    fetchPatientInfo();
  }, [ageRange]);

  return { patientInfo, loading, error };
};

export default usePatientInfo;
