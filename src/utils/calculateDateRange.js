export const calculateDateRange = (age) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};
