import React from "react";
import { Formik, Form } from "formik";

const SearchBoxComponent = ({ searchName }) => {
  return (
    <div className=" sticky top-0 z-0 ">
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
                placeholder="Search Conversations"
                className="bg-red-50 w-[40vh] px-3 text-center font-extralight rounded-lg justify-center my-3 shadow-inner"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SearchBoxComponent;
