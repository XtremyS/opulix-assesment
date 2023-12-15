import React, { useState } from "react";
import LoadingButton from "@/Main Common Components/Loading Button/loading_button";

const Table = ({ tableType, data = [], columns, onActionClick }) => {
  const [IsLoading, setIsLoading] = useState(false);

  const RenderTableCell = (row, col) => {
    const value = row[col.key];

    if (typeof value === "object" && value !== null) {
      if (col.nestedKey) {
        // If nestedKey is specified, render the specific value from the nested object
        return value[col.nestedKey];
      } else {
        // If no nestedKey is specified, join all values from the nested object
        return Object.values(value).join(", ");
      }
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full min-w-max">
        <div className="flex w-full min-w-fit bg-primary rounded-md">
          {columns.map((column, index) => {
            return (
              <div key={index} className="flex-1 p-4 text-white">
                {column.title}
              </div>
            );
          })}
          {/* //! HEADER OF TABLE */}
          {/*//! DOCTOR SECTION CONDITIONS  */}
          {/* ALL APPOINTMENTS TABLE */}
          {tableType === "all appointments" && (
            <div className="flex-1 p-4 text-white">Actions</div>
          )}

          {/* UPCOMING APPOINTMENTS TABLE */}
          {tableType === "upcoming appointments" && (
            <div className="flex-1 p-4 text-white">Actions</div>
          )}

          {/*//! PATIENT SECTION CONDITIONS  */}
          {/* MY FAMILY TABLE */}
          {tableType === "my-family" && (
            <div className="flex-1 p-4 text-white">View Report</div>
          )}

          {tableType === "my-family" && (
            <div className="flex-1 p-4 text-white">Delete</div>
          )}

          {/* UPLOADED FILE  TABLE */}
          {tableType === "uploaded-file" && (
            <div className="flex-1 p-4 text-white">Download</div>
          )}
          {tableType === "uploaded-file" && (
            <div className="flex-1 p-4 text-white">Delete</div>
          )}

          {/* UPLOADED PRESCRIPTION  TABLE */}
          {tableType === "uploaded-prescriptions" && (
            <div className="flex-1 p-4 text-white">Download</div>
          )}
          {tableType === "uploaded-prescriptions" && (
            <div className="flex-1 p-4 text-white">Delete</div>
          )}

          {/* SELECTED DOCTOR SCHEDULE TABLE */}
          {tableType === "schedule slots" && (
            <div className="flex-1 p-4 text-white">Remove Slot</div>
          )}
        </div>
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center bg-white border border-[#E9EFF4] my-3 rounded-lg"
          >
            {columns.map((col) => (
              <div key={col.key} className="flex-1 p-4 text-[#828282]">
                {RenderTableCell(row, col)}
              </div>
            ))}
            {/* //! ROWS OF TABLE */}

            {/*//! DOCTOR SECTION CONDITIONS  */}
            {/* ALL APPOINTMENTS TABLE */}
            {tableType === "all appointments" && (
              <div className="flex flex-[1.1]">
                {/* <div className="flex-1 p-2">
                  <div className="bg-[#28A745] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={() => onActionClick(row)}
                      className="shadow text-[#28A745] px-4 py-2 rounded-lg hover:bg-[#28A745] hover:text-white transition-all duration-[0.3s]"
                    >
                      Confirm
                    </button>
                  </div>
                </div> */}

                <div className="flex-1 p-3">
                  <div className="bg-[#F8A000] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onActionClick(row, "re-schedule");
                      }}
                      className="shadow w-max text-[#F8A000] px-4 py-2 rounded-lg hover:bg-[#F8A000] hover:text-white transition-all duration-[0.3s]"
                    >
                      Re schedule
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-3">
                  <span
                    className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg"
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "cancel");
                    }}
                  >
                    <LoadingButton
                      key={rowIndex}
                      style="shadow w-max text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                      text="Cancel"
                      spinnerWidth="25"
                      spinnerHeight="25"
                      loading={false}
                    />
                  </span>
                  {/* <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={() => onActionClick(row)}
                      className="shadow w-max text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                    >
                      Cancel
                    </button>
                  </div> */}
                </div>
              </div>
            )}

            {/* UPCOMING APPOINTMENTS TABLE */}
            {tableType === "upcoming appointments" && (
              <div className="flex flex-[1.1]">
                {/* <div className="flex-1 p-2">
                  <div className="bg-[#28A745] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={() => onActionClick(row)}
                      className="shadow text-[#28A745] px-4 py-2 rounded-lg hover:bg-[#28A745] hover:text-white transition-all duration-[0.3s]"
                    >
                      Confirm
                    </button>
                  </div>
                </div> */}

                <div className="flex-1 p-3">
                  <div className="bg-[#F8A000] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onActionClick(row, "re-schedule");
                      }}
                      className="shadow w-max text-[#F8A000] px-4 py-2 rounded-lg hover:bg-[#F8A000] hover:text-white transition-all duration-[0.3s]"
                    >
                      Re schedule
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-3">
                  <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onActionClick(row, "cancel");
                      }}
                      className="shadow w-max text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SELECTED DOCTOR SCHEDULE TABLE */}
            {tableType === "schedule slots" && (
              <div className="flex-1 p-4">
                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "delete");
                    }}
                    className="text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/*//! PATIENT SECTION CONDITIONS  */}
            {/* UPLOADED FILE TABLE */}
            {tableType === "uploaded-file" && (
              <div className="flex-1 p-4">
                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "delete");
                    }}
                    className="text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {tableType === "uploaded-file" && (
              <div className="flex-1 p-4">
                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "delete");
                    }}
                    className="text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* UPLOADED PRESCRIPTION TABLE */}
            {tableType === "uploaded-prescriptions" && (
              <div className="flex-1 p-4">
                <div className="bg-primary inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "download");
                    }}
                    className="text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-[0.3s]"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}

            {tableType === "uploaded-prescriptions" && (
              <div className="flex-1 p-4">
                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "download");
                    }}
                    className="text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* MY FAMILY TABLE */}
            {tableType === "my-family" && (
              <div className="flex-1 p-4">
                <div className="bg-primary inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "view-details");
                    }}
                    className="text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-[0.3s]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
            {tableType === "my-family" && (
              <div className="flex-1 p-4">
                <div className="bg-[#FF0000] bg-opacity-[5%] inline-block rounded-lg">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      onActionClick(row, "delete");
                    }}
                    className="text-[#FF0000] px-4 py-2 rounded-lg hover:bg-[#FF0000] hover:text-white transition-all duration-[0.3s]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
