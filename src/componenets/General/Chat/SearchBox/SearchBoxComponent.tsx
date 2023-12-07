import React from "react";
import { Formik, Form } from "formik";

const SearchBoxComponent = ({ searchName }) => {
  return (
    <div className="relative sticky top-0 z-0 ">
      {" "}
      <div className="bg-white ">
        <h1 className="text-center text-black pt-3">Messages </h1>
        <div className="text-center">
          {" "}
          <Formik>
            <Form>
              <input
                onChange={(e) => searchName(e.target.value)}
                type="text"
                placeholder="Search Mentor"
                className="bg-white-300 w-[40vh] px-3 font-extralight rounded-full justify-center my-3 shadow-lg"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SearchBoxComponent;
