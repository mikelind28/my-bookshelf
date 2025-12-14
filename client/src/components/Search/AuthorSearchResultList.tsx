import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router";
import { AuthorSeachPreview } from "../../types/types";

function AuthorSearchResultItem({ author }: { author: AuthorSeachPreview }) {
  const [loaded, setLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);

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
      className="relative flex gap-2 rounded-sm border-r-30 border-r-orange-800/75 bg-orange-200/90 px-3 py-2 font-semibold text-orange-950"
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

      <div className="flex w-full flex-col rounded-md bg-orange-50/85 px-3 py-2 drop-shadow-sm/25">
        <p className="leading-5">{author.name}</p>

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

      <IoIosArrowForward className="absolute -right-7 size-6 self-center text-orange-200/85" />
    </Link>
  );
}

export default function AuthorSearchResultList({
  searchResults,
}: {
  searchResults: AuthorSeachPreview[];
}) {
  return (
    <>
      <div className="m-2 flex max-w-125 flex-col gap-1.5 rounded-sm">
        {searchResults.map((author, index) => (
          <AuthorSearchResultItem key={index} author={author} />
        ))}
      </div>
    </>
  );
}
