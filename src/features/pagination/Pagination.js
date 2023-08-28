import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
function Pagination({ handlePagination, totalItems, pageArr }) {
  const totalPages = Math.ceil(totalItems / pageArr[1]._limit);

  return (
    <div className="flex flex-col items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center w-full sm:hidden">
        {/* Display page number and total items */}
        <p className="text-sm px-2 text-gray-700">
          Showing{" "}
          {pageArr[0]._page === 1
            ? 1
            : (pageArr[0]._page - 1) * pageArr[1]._limit + 1}
          -{Math.min(pageArr[0]._page * pageArr[1]._limit, totalItems)} of{" "}
          {totalItems} results
        </p>
        <button
          onClick={() =>
            handlePagination(pageArr[0]._page - 1, pageArr[1]._limit)
          }
          disabled={pageArr[0]._page === 1}
          className="py-1 px-2 text-gray-500 border-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() =>
            handlePagination(pageArr[0]._page + 1, pageArr[1]._limit)
          }
          disabled={pageArr[0]._page === totalPages}
          className="py-1 px-2 text-gray-500 border-2  rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
        <p className="text-sm text-gray-700">
          Showing{" "}
          {pageArr[0]._page === 1
            ? 1
            : (pageArr[0]._page - 1) * pageArr[1]._limit + 1}
          -{Math.min(pageArr[0]._page * pageArr[1]._limit, totalItems)} of{" "}
          {totalItems} results
        </p>

        <div className="flex flex-row">
          <p className="text-sm text-gray-700 py-1">Items per page?</p>
          <input
            className="border border-gray-400 mx-2 py-1 text-sm rounded-md w-1/4"
            type="number"
            min="10"
            defaultValue={pageArr[1]._limit}
            pattern="[1-9][0-9]*"
            onChange={(e) => handlePagination(1, e.target.value)}
          ></input>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() =>
              handlePagination(pageArr[0]._page - 1, +pageArr[1]._limit)
            }
            disabled={pageArr[0]._page === 1}
            className="px-2 py-1 text-gray-500 border-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="text-sm py-1 text-gray-700">
            Page {pageArr[0]._page} of {totalPages}
          </p>
          <button
            onClick={() =>
              handlePagination(pageArr[0]._page + 1, +pageArr[1]._limit)
            }
            disabled={pageArr[0]._page === totalPages}
            className="px-2 py-1 text-gray-500 border-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
