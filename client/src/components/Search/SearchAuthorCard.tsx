import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";
import { AuthorWorkPreview } from "../../types/types";
import { FaBook } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import AddAuthorDialog from "./AddAuthorDialog";

// TODO: link to openLibrary site

function BookSearchResultItem({ book }: { book: AuthorWorkPreview }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/search/books/${book.key.replace("/works/", "")}`}
      className="relative flex gap-2 rounded-sm border-r-30 border-r-orange-800/50 bg-orange-800/50 px-3 py-2 font-semibold text-orange-950"
    >
      {(!loaded || !book.covers) && (
        <FaBook className="size-15 shrink-0 text-orange-800/90" />
      )}

      {book.covers && book.covers[0] !== -1 && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}
          className={`aspect-auto w-15 self-center rounded-sm drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="flex w-full rounded-md bg-orange-950/50 px-3 py-2 drop-shadow-sm/25">
        <div className="flex flex-col self-center">
          <p className="text-lg/6 text-amber-500 text-shadow-xs/100">
            {book.title}
          </p>

          {book.subtitle && (
            <p className="text-base/5 text-orange-500/90 text-shadow-xs/100">
              {book.subtitle}
            </p>
          )}
        </div>
      </div>

      <IoIosArrowForward className="absolute -right-7 size-6 self-center text-orange-200/85" />
    </Link>
  );
}

function BookSearchResultList({
  searchResults,
}: {
  searchResults: AuthorWorkPreview[];
}) {
  return (
    <>
      <div className="flex flex-col gap-1.5 rounded-sm">
        {searchResults.map((book, index) => (
          <BookSearchResultItem key={index} book={book} />
        ))}
      </div>
    </>
  );
}

export default function SearchAuthorCard() {
  const { authorInfo, authorWorksInfo } = useLoaderData();
  console.log(authorInfo);
  console.log(authorWorksInfo);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [displayFullText, setDisplayFullText] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      const url = `https://covers.openlibrary.org/a/id/${authorInfo.photos[0]}-L.jpg?default=false`;

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
    <div className="mx-3 max-w-125 rounded-sm bg-amber-950 p-3">
      <div className="gradient-underline pb-4">
        <div className="flex gap-3">
          {!loaded && !imgUrl && (
            <IoPerson className="size-20 self-center text-orange-800/90" />
          )}

          {imgUrl && (
            <img
              src={`https://covers.openlibrary.org/a/id/${authorInfo.photos[0]}-L.jpg`}
              className={`aspect-auto h-full w-25 self-center rounded-sm drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
              onLoad={() => setLoaded(true)}
            />
          )}

          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-orange-300 text-shadow-md/75">
              {authorInfo.name}
            </h2>

            {authorInfo.birth_date && (
              <p className="text-xl text-orange-500 text-shadow-xs/100">
                Born: {authorInfo.birth_date}
              </p>
            )}

            {authorInfo.death_date && (
              <p className="text-xl text-orange-500 text-shadow-xs/100">
                Died: {authorInfo.death_date}
              </p>
            )}
          </div>
        </div>

        {authorInfo.bio && (
          <p
            onClick={() => setDisplayFullText(!displayFullText)}
            className="mt-3 w-full cursor-pointer rounded-md bg-orange-800/50 px-4 py-3 leading-5 wrap-break-word text-orange-200/95 text-shadow-md/33"
          >
            {authorInfo.bio.value.substring(
              0,
              displayFullText ? authorInfo.bio.value.length : 275,
            )}

            <span
              className={`tracking-wider text-orange-400 hover:text-orange-500`}
            >
              {authorInfo.bio.value.length >= 275
                ? displayFullText
                  ? " show less"
                  : " ...show more"
                : null}
            </span>
          </p>
        )}

        <button
          onClick={() => {
            setDialogOpen(true);
          }}
          className="mt-3 w-full rounded-md bg-amber-700 py-2 text-lg font-semibold shadow-xs/25 text-shadow-xs/50"
        >
          Add Author...
        </button>
      </div>

      <p className="font-slight mt-2 text-2xl">Books:</p>

      <BookSearchResultList searchResults={authorWorksInfo.entries} />

      <AddAuthorDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        author={authorInfo}
      />
    </div>
  );
}
