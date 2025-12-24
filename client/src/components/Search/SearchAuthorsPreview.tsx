import {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router";
import { AuthorSeachPreview } from "../../types/types";
import { SetSearchTermContext } from "../Header/Header";
import SearchPreviewList from "./SearchPreviewList";

function SearchAuthorPreviewItem({ author, index }: { author: AuthorSeachPreview, index: number }) {
  const [loaded, setLoaded] = useState(false);

  const { setSearchTerm } = useContext(SetSearchTermContext);

  return (
    <Link
      to={`/search/authors/${author.key}`}
      onClick={() => setSearchTerm("")}
      className="group relative flex w-full max-w-140 border-b border-b-amber-500 font-semibold"
    >
      <div className="m-3 flex w-full gap-2">
        {(!loaded || !author.imgUrl) && (
          <IoPerson className="size-20 self-center text-orange-700/90" />
        )}

        {author.imgUrl && (
          <img
            src={`https://covers.openlibrary.org/a/olid/${author.key}-L.jpg`}
            className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}

        <div className="flex w-full flex-col gap-0.5 rounded-md bg-orange-200 p-3 drop-shadow-sm/25 group-hover:drop-shadow-md/33 group-hover:scale-102">
          <p className="text-lg leading-5 font-medium text-orange-950">
            {author.name}
          </p>

          {author.birth_date && (
            <p className="text-sm font-normal text-orange-900">
              <span className="font-bold">Born:</span> {author.birth_date}
            </p>
          )}

          {author.death_date && (
            <p className="text-sm font-normal text-orange-900">
              <span className="font-bold">Died:</span> {author.death_date}
            </p>
          )}

          {author.work_count && (
            <p className="text-sm font-normal text-orange-800">
              <span className="font-bold">Work count:</span> {author.work_count}
            </p>
          )}
        </div>
      </div>

      <span className={`flex place-items-center self-end right-0 h-full w-8 bg-amber-600 group-hover:bg-amber-500 ${index === 0 ? 'rounded-tr-sm' : ''}`}>
        <IoIosArrowForward className="size-6 shrink-0 text-darkbrown/80" />
      </span>
    </Link>
  );
}

export function SearchAuthorsPreviewList({
  searchResults,
  setOpen,
}: {
  searchResults: AuthorSeachPreview[] | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <SearchPreviewList searchResults={searchResults} setOpen={setOpen}>
      {searchResults?.map((author, index) => (
        <SearchAuthorPreviewItem key={index} author={author} index={index} />
      ))}
    </SearchPreviewList>
  );
}
