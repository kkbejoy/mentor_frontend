import React from "react";
import NavbarModerator from "../../componenets/Moderator/NavbarModerator";
import MenteeLists from "../../componenets/Moderator/Tables/MenteeLists";
import Table from "../../componenets/Moderator/Tables/Table Layout/MenteeTable";
import MentorApplicantsListsComponent from "../../componenets/Moderator/Tables/MentorApplicantsList";

const MentroApplicantsPage = () => {
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Age",
      accessor: "age",
    },
  ];

  const data = [
    {
      firstName: "app1",
      lastName: "Doe",
      age: 30,
    },
    {
      firstName: "app2",
      lastName: "Smith",
      age: 28,
    },
    // Fetch data through UseEffects
  ];
  return (
    <div>
      <NavbarModerator />
      <MentorApplicantsListsComponent />
    </div>
  );
};

export default MentroApplicantsPage;
