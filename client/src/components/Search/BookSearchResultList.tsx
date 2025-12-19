import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
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

      <span className={`flex items-center w-8 bg-amber-600 border-b border-b-amber-900 group-hover:bg-amber-500 ${index === 0 ? 'rounded-tr-md' : index === 9 ? 'rounded-br-md border-b-0' : ''}`}>
        <IoIosArrowForward className="size-6 shrink-0 text-darkbrown/80" />
      </span>
    </Link>
  );
}

export default function BookSearchResultList({
  searchResults,
}: {
  searchResults: WorkSeachPreview[];
}) {
  return (
    <div className="m-3 flex flex-col max-w-125 bg-amber-900/95 outline outline-amber-600 divide-y divide-amber-600 drop-shadow-xl/90 rounded-md">
      {searchResults.map((book, index) => (
        <BookSearchResultItem key={index} book={book} index={index} />
      ))}
    </div>
  );
}
