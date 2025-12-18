import { useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { OpenLibEditionType } from "../../types/types";
import { SetSearchTermContext } from "../Header/Header";
import SearchPreviewList from "../Lists/SearchPreviewList";

function SearchIsbnPreviewItem({
  edition,
  isbn,
}: {
  edition: OpenLibEditionType;
  isbn: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const {setSearchTerm} = useContext(SetSearchTermContext);

  return (
    <Link
      to={`/search/isbn/${isbn}`}
      onClick={() => setSearchTerm("")}
      className="relative flex w-full max-w-140 gap-2 border-r-25 border-b border-r-orange-600/50 border-b-orange-100 p-3 font-semibold"
    >
      {(!loaded || !edition.covers) && (
        <FaBook className="size-20 self-center text-orange-800/90" />
      )}

      {edition.covers && (
        <img
          src={`https://covers.openlibrary.org/b/id/${edition.covers[0]}-M.jpg`}
          className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="flex w-full flex-col gap-0.5 rounded-md bg-orange-50/85 p-3 drop-shadow-sm/25">
        <p className="text-lg leading-5 font-medium text-orange-950">
          {edition.title}
        </p>

        <p className="text-sm font-normal text-orange-900">
          {edition.publish_date}
        </p>

        {edition.authors && (
          <p className="text-sm/5 font-semibold text-orange-800">
            {edition.authors.map((author) => author.name).join(", ")}
          </p>
        )}
      </div>

      <IoIosArrowForward className="absolute -right-6 size-6 shrink-0 self-center text-darkbrown/80" />
    </Link>
  );
}

export function SearchIsbnPreviewList({
  searchResult,
  setOpen,
  isbn,
}: {
  searchResult: OpenLibEditionType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isbn: string;
}) {
  useEffect(() => {
    if (!searchResult) {
      setOpen(false);
    }
  }, [searchResult]);

  return (
    <SearchPreviewList 
      searchResults={searchResult} 
      setOpen={setOpen} 
    >
      <SearchIsbnPreviewItem edition={searchResult} isbn={isbn} />
    </SearchPreviewList>
  );
}
