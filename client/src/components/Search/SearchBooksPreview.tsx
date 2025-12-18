import { useState, useContext, Dispatch, SetStateAction } from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { WorkSeachPreview } from "../../types/types";
import { SetSearchTermContext } from "../Header/Header";
import SearchPreviewList from "../Lists/SearchPreviewList";

function SearchBookPreviewItem({ book }: { book: WorkSeachPreview }) {
  const [loaded, setLoaded] = useState(false);
  const {setSearchTerm} = useContext(SetSearchTermContext);

  return (
    <Link
      to={`/search/books/${book.key.replace("/works/", "")}`}
      onClick={() => setSearchTerm("")}
      className="relative flex w-full max-w-140 gap-2 border-r-25 border-b border-r-orange-600/50 border-b-orange-100 p-3 font-semibold"
    >
      {(!loaded || (!book.cover_edition_key && !book.cover_i)) && (
        <FaBook className="size-20 self-center text-orange-800/90" />
      )}

      {book.cover_edition_key && (
        <img
          src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
          className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
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

      <div className="flex w-full flex-col gap-0.5 rounded-md bg-orange-50/85 p-3 drop-shadow-sm/25">
        <p className="text-lg leading-5 font-medium text-orange-950">
          {book.title}
        </p>

        <p className="text-sm font-normal text-orange-900">
          {book.first_publish_year}
        </p>

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

      <IoIosArrowForward className="absolute -right-6 size-6 shrink-0 self-center text-darkbrown/80" />
    </Link>
  );
}

export function SearchBooksPreviewList({
  searchResults,
  setOpen,
}: {
  searchResults: WorkSeachPreview[] | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <SearchPreviewList 
      searchResults={searchResults} 
      setOpen={setOpen} 
    >
      {searchResults?.map((book, index) => (
        <SearchBookPreviewItem key={index} book={book} />
      ))}
    </SearchPreviewList>
  );
}