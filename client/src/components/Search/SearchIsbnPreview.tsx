import {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { OpenLibEditionType } from "../../types/types";
import { SetSearchTermContext } from "../Header/Header";
import SearchPreviewList from "./SearchPreviewList";

function SearchIsbnPreviewItem({
  edition,
  isbn,
}: {
  edition: OpenLibEditionType;
  isbn: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const { setSearchTerm } = useContext(SetSearchTermContext);
  console.log(edition);
  return (
    <Link
      to={`/search/isbn/${isbn}`}
      onClick={() => setSearchTerm("")}
      className="group relative flex w-full max-w-140 border-b border-b-amber-500 font-semibold"
    >
      <div className="m-3 flex w-full gap-2">
        {(!loaded || !edition.covers) && (
          <FaBook className="size-20 self-center text-orange-700/90" />
        )}

        {edition.covers && (
          <img
            src={`https://covers.openlibrary.org/b/id/${edition.covers[0]}-M.jpg`}
            className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}

        <div className="flex w-full flex-col gap-0.5 rounded-md bg-orange-200 p-3 drop-shadow-sm/25 group-hover:drop-shadow-md/33 group-hover:scale-102">
          <p className="text-lg leading-5 font-medium text-orange-950">
            {edition.title}
          </p>

          <p className="text-sm font-normal text-orange-900">
            {edition.publish_date}
          </p>

          {edition.authors && (
            <p className="text-sm font-normal text-orange-800">
              <span className="text-orange-950">by</span>{" "}
              {edition.authors.map((author) => author.name).join(", ")}
            </p>
          )}
        </div>
      </div>

      <span className={`flex place-items-center self-end right-0 h-full w-8 bg-amber-600 group-hover:bg-amber-500 rounded-tr-sm`}>
        <IoIosArrowForward className="size-6 shrink-0 text-darkbrown/80" />
      </span>
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
    <SearchPreviewList searchResults={searchResult} setOpen={setOpen}>
      <SearchIsbnPreviewItem edition={searchResult} isbn={isbn} />
    </SearchPreviewList>
  );
}
