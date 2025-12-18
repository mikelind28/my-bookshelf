import { useState, useContext, useEffect, Dispatch, SetStateAction } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router";
import { AuthorSeachPreview } from "../../types/types";
import { SetSearchTermContext } from "../Header/Header";
import SearchPreviewList from "../Lists/SearchPreviewList";

function SearchAuthorPreviewItem({ author }: { author: AuthorSeachPreview }) {
  const [loaded, setLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);

  const {setSearchTerm} = useContext(SetSearchTermContext);

  // TODO: handle this on the server instead
  useEffect(() => {
    async function fetchUrl() {
      const url = `https://covers.openlibrary.org/a/olid/${author.key}-L.jpg?default=false`;

      const res = await fetch(url);

      if (!res.ok) {
        setImgUrl(false);
      } else {
        setImgUrl(true);
      }
    }

    fetchUrl();
  }, []);

  return (
    <Link
      to={`/search/authors/${author.key}`}
      onClick={() => setSearchTerm("")}
      className="relative flex w-full max-w-140 gap-2 border-r-25 border-b border-r-orange-600/50 border-b-orange-100 p-3 font-semibold"
    >
      {!loaded && !imgUrl && (
        <IoPerson className="size-20 self-center text-orange-800/90" />
      )}

      {imgUrl && (
        <img
          src={`https://covers.openlibrary.org/a/olid/${author.key}-L.jpg`}
          className={`aspect-auto max-h-30 w-15 self-center rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="flex w-full flex-col gap-0.5 rounded-md bg-orange-50/85 p-3 drop-shadow-sm/25">
        <p className="text-lg leading-5 font-medium text-orange-950">
          {author.name}
        </p>

        {author.birth_date && (
          <p className="text-sm font-normal text-orange-900">
            <span className="font-bold">Born:</span> {author.birth_date}
          </p>
        )}

        {author.work_count && (
          <p className="text-sm font-normal text-orange-800">
            <span className="font-bold">Work count:</span> {author.work_count}
          </p>
        )}
      </div>

      <IoIosArrowForward className="absolute -right-6 size-6 shrink-0 self-center text-darkbrown/80" />
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
    <SearchPreviewList 
      searchResults={searchResults} 
      setOpen={setOpen} 
    >
      {searchResults?.map((author, index) => (
        <SearchAuthorPreviewItem key={index} author={author} />
      ))}
    </SearchPreviewList>
  );
}