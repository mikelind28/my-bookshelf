import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useSearchParams } from "react-router";
import { WorkSeachPreview } from "../../types/types";

function BookSearchResultItem({ book, index }: { book: WorkSeachPreview, index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/search/books/${book.key.replace("/works/", "")}`}
      className="group relative flex items-stretch w-full max-w-140 font-semibold"
    >
      <div className="m-3 flex items-center w-full gap-2">
        {(!loaded || (!book.cover_edition_key && !book.cover_i)) && (
          <FaBook className="size-15 shrink-0 rounded-md bg-darkbrown/33 py-2 text-orange-800/90 inset-shadow-xs/25" />
        )}

        {book.cover_edition_key && (
          <img
            src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
            className={`aspect-auto  w-15 rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}

        {book.cover_i && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            className={`aspect-auto  w-15 rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}

        <div className="flex h-full w-full flex-col gap-0.5 rounded-md bg-orange-200 p-3 drop-shadow-sm/25 group-hover:drop-shadow-md/33 group-hover:scale-102">
          <p className="text-lg leading-5 font-medium text-orange-950">{book.title}</p>

          {book.first_publish_year &&
            <p className="text-sm font-normal text-orange-900">
              {book.first_publish_year}
            </p>
          }

          {book.author_name && (
            <div className="text-sm font-normal text-orange-800">
              <span className="text-orange-950">by</span>{" "}
              {book.author_name
                .filter((_element, index) => index < 10)
                .join(", ")}
              {book.author_name.length > 10 && " ..."}
            </div>
          )}
        </div>
      </div>

      <span className={`flex items-center w-8 bg-amber-600 border-b border-b-amber-900 group-hover:bg-amber-500 ${index === 0 ? 'rounded-tr-sm' : index === 9 ? 'rounded-br-sm border-b-0' : ''}`}>
        <IoIosArrowForward className="size-6 shrink-0 text-darkbrown/80" />
      </span>
    </Link>
  );
}

export default function BookSearchResultList({
  searchResults,
  numberOfResults
}: {
  searchResults: WorkSeachPreview[];
  numberOfResults: number;
}) {
  const [currentPage, setCurrentPage] = useState(17935);
  const [totalPages, setTotalPages] = useState(Math.ceil(numberOfResults/10));

  const [searchParams, setSearchParams] = useSearchParams({ page: currentPage.toString() });

  useEffect(() => {
    setTotalPages(Math.ceil(numberOfResults/10));
  }, [searchResults]);

  return (
    <div className="m-3 flex flex-col max-w-125 bg-amber-900/95 outline outline-amber-600 divide-y divide-amber-600 drop-shadow-xl/90 rounded-sm">
      {searchResults.map((book, index) => (
        <BookSearchResultItem key={index} book={book} index={index} />
      ))}

      <div className="flex gap-3 justify-center items-center h-15 w-full max-w-140">
        <div className="flex gap-1">
          <div
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(1);
                setSearchParams((searchParams) => {
                  searchParams.set("page", "1");
                  return searchParams;
                });
              }
            }}
            className={`flex p-1 rounded-md ${currentPage <= 1 ? 'bg-orange-100 text-neutral-500' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
          >
            <IoIosArrowBack className="size-6 shrink-0 -mr-2" />
            <IoIosArrowBack className="size-6 shrink-0 -ml-2" />
          </div>

        <IoIosArrowBack
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              setSearchParams((searchParams) => {
                searchParams.set("page", (currentPage - 1).toString());
                return searchParams;
              });
            }
          }}
          className={`size-8 shrink-0 p-1 rounded-md ${currentPage <= 1 ? 'bg-orange-100 text-neutral-500' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
          />
        </div>

        <p>
          {`page ${currentPage} of ${totalPages}`}
        </p>

        <div className="flex gap-1">
          <IoIosArrowForward
            onClick={() => {
              if (currentPage < Math.ceil(numberOfResults/10)) {
                setCurrentPage(currentPage + 1);
                setSearchParams((searchParams) => {
                  searchParams.set("page", (currentPage + 1).toString());
                  return searchParams;
                });
              }
            }}
            className={`size-8 shrink-0 p-1 rounded-md ${currentPage >= Math.ceil(numberOfResults/10) ? 'bg-orange-100 text-neutral-500' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
          />

          <div
            onClick={() => {
              if (currentPage < Math.ceil(numberOfResults/10)) {
                setCurrentPage(Math.ceil(numberOfResults/10));
                setSearchParams((searchParams) => {
                  searchParams.set("page", (Math.ceil(numberOfResults/10)).toString());
                  return searchParams;
                });
              }
            }}
            className={`flex p-1 rounded-md ${currentPage >= Math.ceil(numberOfResults/10) ? 'bg-orange-100 text-neutral-500' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
          >
            <IoIosArrowForward className="size-6 shrink-0 -mr-2" />
            <IoIosArrowForward className="size-6 shrink-0 -ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
