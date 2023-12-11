export const enrollmentDetails = [
  {
    Header: "Mentee Name",
    accessor: (row) => `${row?.menteeId?.firstName} ${row?.menteeId?.lastName}`,
  },
  {
    Header: "Subscription Status",
    accessor: (row) => `${row?.isEnrollmentActive ? "Active" : "Expired"}`,
  },
  {
    Header: "Subscription Ends on",
    accessor: "expiresOn",
    Cell: ({ value }) => {
      const dateObj = new Date(value); // Parse the date string
      const options = { year: "numeric", month: "long", day: "numeric" };

      const formattedDate = dateObj.toLocaleDateString(undefined, options);
      return formattedDate;
    },
  },
  {
    Header: "Lives ",
    accessor: "",
  },
];
