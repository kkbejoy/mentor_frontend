import React, { useEffect, useState } from "react";
import NavbarMentee from "../../componenets/Mentee/NavbarMentee";
import FooterComponent from "../../componenets/General/Footer/FooterComponent";
import BookedSlotsListComponenet from "../../componenets/Mentee/BookedSlotsList/BookedSlotsList";
import { fetchBookedTimeSlots } from "../../slices/MenteeSlices/bookedTimeSlots";

import { useDispatch, useSelector } from "react-redux";
import HorizontalDivider from "../../componenets/General/HorizontalDivider/HorizontalDivider";
const BookedSlotsList = () => {
  const [pageRerender, setPageRender] = useState({});
  const dispatch = useDispatch();
  const bookedSlots = useSelector(
    (state) => state?.menteeBookedTime?.data?.responseFromDb
  );

  console.log("Booked Time slots", bookedSlots);
  useEffect(() => {
    dispatch(fetchBookedTimeSlots());
  }, [pageRerender]);

  return (
    <div>
      <NavbarMentee />
      <HorizontalDivider title={"Upcoming Sessions"} />
      <BookedSlotsListComponenet
        setPageRerender={setPageRender}
        pageRerenderState={pageRerender}
        BookeSotsList={bookedSlots}
      />
      <FooterComponent />
    </div>
  );
};

export default BookedSlotsList;
