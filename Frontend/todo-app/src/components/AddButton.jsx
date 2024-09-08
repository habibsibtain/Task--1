import React from "react";
import { Link } from "react-router-dom";

export default function AddButton() {
  return (
    <>
      <Link
        to="/addtodo"
        className="flex w-full h-full pt-2.5 justify-center align-middle text-center rounded-full bg-orange-300  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
      >
        ADD
      </Link>
    </>
  );
}
