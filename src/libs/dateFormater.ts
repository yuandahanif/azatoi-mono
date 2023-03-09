const printToLocalDate = (date: Date) => {
  return date.toLocaleString("id-id", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default printToLocalDate;
