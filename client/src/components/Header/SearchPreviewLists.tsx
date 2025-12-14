import {
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useContext,
} from "react";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import {
  WorkSeachPreview,
  AuthorSeachPreview,
  OpenLibEditionType,
} from "../../types/types";
import { SetSearchTermContext } from "./Header";


// TODO: put these into separate files in the Search folder.

function SearchBookPreviewItem({ book }: { book: WorkSeachPreview }) {
  const [loaded, setLoaded] = useState(false);
  const setSearchTerm = useContext(SetSearchTermContext);

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
  searchResults: WorkSeachPreview[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const [locationOnLoad, _setLocationOnLoad] = useState(location);

  useEffect(() => {
    if (location !== locationOnLoad) {
      setOpen(false);
    }
  }, [location]);

  return (
    <div
      ref={popoverRef}
      className="absolute top-10 right-1/20 left-1/15 z-50 mx-2 flex h-fit w-full max-w-80 min-w-fit flex-col rounded-sm bg-orange-100/85 outline outline-orange-100 drop-shadow-xl/90 xs:left-34 xs:max-w-110 xs:justify-self-start"
    >
      {searchResults.map((book, index) => (
        <SearchBookPreviewItem key={index} book={book} />
      ))}
    </div>
  );
}

function SearchAuthorPreviewItem({ author }: { author: AuthorSeachPreview }) {
  const [loaded, setLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);

  const setSearchTerm = useContext(SetSearchTermContext);

  // TODO: handle this on the server instead
  useEffect(() => {
    async function fetchUrl() {
      const url = `https://covers.openlibrary.org/a/olid/${author.key}-L.jpg?default=false`;

      const res = await fetch(url);

      console.log(res);

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
  searchResults: AuthorSeachPreview[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const [locationOnLoad, _setLocationOnLoad] = useState(location);

  useEffect(() => {
    if (location !== locationOnLoad) {
      setOpen(false);
    }
  }, [location]);

  return (
    <div
      ref={popoverRef}
      className="absolute top-10 right-1/20 left-1/15 z-50 mx-2 flex h-fit w-full max-w-80 min-w-fit flex-col rounded-sm bg-orange-100/85 outline outline-orange-100 drop-shadow-xl/90 xs:left-34 xs:max-w-110 xs:justify-self-start"
    >
      {searchResults.map((author, index) => (
        <SearchAuthorPreviewItem key={index} author={author} />
      ))}
    </div>
  );
}

function SearchIsbnPreviewItem({
  edition,
  isbn,
}: {
  edition: OpenLibEditionType;
  isbn: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const setSearchTerm = useContext(SetSearchTermContext);

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
  const popoverRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const [locationOnLoad, _setLocationOnLoad] = useState(location);

  useEffect(() => {
    if (location !== locationOnLoad) {
      setOpen(false);
    }
  }, [location]);

  return (
    <div
      ref={popoverRef}
      className="absolute top-10 right-1/20 left-1/15 z-50 mx-2 flex h-fit w-full max-w-80 min-w-fit flex-col rounded-sm bg-orange-100/85 outline outline-orange-100 drop-shadow-xl/90 xs:left-34 xs:max-w-110 xs:justify-self-start"
    >
      <SearchIsbnPreviewItem edition={searchResult} isbn={isbn} />
    </div>
  );
}
