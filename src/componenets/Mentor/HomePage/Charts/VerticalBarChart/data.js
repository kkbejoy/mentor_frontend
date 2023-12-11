export const data = {
  labels: InputData.map((data) => data._id.day + "-" + data._id.month),
  datasets: [
    {
      label: "Mentees Gained",
      data: InputData?.map((data) => data?.count),
      borderColor: "green",
    },
  ],
};
