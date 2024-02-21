import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { calculateDateRange } from "../utils/calculateDateRange";

export const usePatientInfo = ([minAge, maxAge]) => {
  const [patientInfo, setPatientInfo] = useState([]);
  const [filteredPatientInfo, setFilteredPatientInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedMinAge = useDebounce(minAge, 500);
  const debouncedMaxAge = useDebounce(maxAge, 500);

  const startDate = calculateDateRange(debouncedMaxAge + 1);
  const endDate = calculateDateRange(debouncedMinAge - 1);

  function filterBySearch(searchTerm) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) {
      setFilteredPatientInfo(patientInfo);
    }

    const filteredPatients = patientInfo.filter((patient) => {
      if (patient.name && patient.name.length > 0) {
        return patient.name.some((name) => {
          const fullNameGiven = name.given
            ? name.given.join(" ").toLowerCase()
            : "";
          const fullNameText = name.text ? name.text.toLowerCase() : "";
          return (
            fullNameGiven.includes(normalizedSearchTerm) ||
            fullNameText.includes(normalizedSearchTerm)
          );
        });
      }
      return true;
    });
    setFilteredPatientInfo(filteredPatients);
  }

  const fetchPatientInfo = async () => {
    setLoading(true);
    try {
      const url = `http://hapi.fhir.org/baseR4/Patient?birthdate=ge${startDate}&birthdate=le${endDate}&_pretty=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.entry) {
        const filteredPatientInfo = data.entry.map(({ resource }) => resource);
        setPatientInfo(filteredPatientInfo);
        setFilteredPatientInfo(filteredPatientInfo);
      } else {
        setFilteredPatientInfo([]);
        setPatientInfo([]);
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientInfo();
  }, [debouncedMinAge, debouncedMaxAge, startDate, endDate]);

  return { filteredPatientInfo, loading, error, filterBySearch };
};
