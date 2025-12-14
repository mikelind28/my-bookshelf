import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { WorkSeachPreview } from "../../types/types";

function BookSearchResultItem({ book }: { book: WorkSeachPreview }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/search/books/${book.key.replace("/works/", "")}`}
      className="relative flex gap-2 rounded-sm border-r-30 border-r-orange-800/75 bg-orange-200/90 px-3 py-2 font-semibold text-orange-950"
    >
      {(!loaded || (!book.cover_edition_key && !book.cover_i)) && (
        <FaBook className="size-20 shrink-0 text-orange-800/90" />
      )}

      {book.cover_edition_key && (
        <img
          src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
          className={`aspect-auto w-20 self-center rounded-sm drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      {book.cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="flex w-full flex-col rounded-md bg-orange-50/85 px-3 py-2 drop-shadow-sm/25">
        <p className="leading-5">{book.title}</p>

        <p className="text-sm font-normal">{book.first_publish_year}</p>

        {book.author_name && (
          <div className="text-sm font-normal">
            by {book.author_name.join(", ")}
          </div>
        )}
      </div>

      <IoIosArrowForward className="absolute -right-7 size-6 self-center text-orange-200/85" />
    </Link>
  );
}

export default function BookSearchResultList({
  searchResults,
}: {
  searchResults: WorkSeachPreview[];
}) {
  return (
    <>
      <div className="m-2 flex flex-col gap-1.5 max-w-125 rounded-sm">
        {searchResults.map((book, index) => (
          <BookSearchResultItem key={index} book={book} />
        ))}
      </div>
    </>
  );
}
