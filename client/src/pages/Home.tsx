import { useState } from "react";
import { Link, useLoaderData } from "react-router";

import { IoIosArrowForward } from "react-icons/io";
import { FaBook } from "react-icons/fa";

import { EditionType } from "../types/types";

// TODO: create admin portal, and only allow adding/editing while logged in as admin

export function Header2({
  pathName,
  textContent,
}: {
  pathName: string;
  textContent: string;
}) {
  return (
    <Link
      to={pathName}
      className="group rounded-t-md hover:bg-amber-950"
    >
      <div className="gradient-underline flex items-center gap-2 p-1 pl-2">
        <h2 className="text-2xl font-semibold text-orange-400 group-hover:text-amber-500">
          <span className="bg-linear-to-r from-orange-400 from-40% to-amber-600 bg-clip-text font-light text-transparent group-hover:to-amber-500">
            my
          </span>
          {textContent}
        </h2>

        <div className="relative flex w-full items-center">
          <IoIosArrowForward className="absolute right-[calc((100%)-(--spacing(4)))] shrink-0 text-xl text-orange-500 transition-all duration-700 ease-out group-hover:right-0" />
        </div>
      </div>
    </Link>
  );
}

function EditionPreview({ edition }: { edition: EditionType }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/${edition.owned ? "my-shelf" : "wish-list"}/books/${edition.key?.replace("/books/", "")}`}
      className="group my-4 flex w-40 shrink-0 flex-col items-center justify-start gap-3 rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 drop-shadow-lg/100 hover:bg-orange-400/25"
    >
      {(!loaded || !edition.coverUrl) && (
        <div className="h-35 w-full rounded-md bg-darkbrown/33 p-4 inset-shadow-xs/25 xs:h-40 md:h-45">
          <FaBook className="size-full self-center text-orange-800/90 drop-shadow-md/25 transition-all duration-200 group-hover:scale-105 group-hover:drop-shadow-lg/25" />
        </div>
      )}

      {edition.coverUrl && (
        <img
          src={edition.coverUrl}
          className={`aspect-auto h-35 scale-100 rounded-xs drop-shadow-md/25 transition-all duration-200 group-hover:scale-105 group-hover:drop-shadow-lg/25 ${!loaded ? "hidden" : ""} xs:h-40 md:h-45`}
          onLoad={() => setLoaded(true)}
          alt='image of the book edition cover'
        />
      )}

      <div className="flex flex-col gap-1 text-center">
        <p className="text-base/4 font-semibold text-amber-500 text-shadow-xs/90">
          {edition.title}
        </p>

        {edition.authors && (
          <p className="text-sm/4 text-amber-700 text-shadow-2xs/75">
            {edition.authors &&
              Array.from(edition.authors?.map((author) => author.name))
                .filter((_a, i) => i < 3)
                .join(", ")}
            {edition.authors.length > 3 ? "..." : ""}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function Home() {
  const { myShelfPreview, myWishListPreview } = useLoaderData<{
    myShelfPreview: EditionType[];
    myWishListPreview: EditionType[];
  }>();

  return (
    <main className="flex w-full flex-col px-4">
      <Header2 pathName="/my-shelf/books" textContent="Shelf" />

      <div className="flex gap-2 overflow-x-scroll">
        {myShelfPreview.map((edition: EditionType) => {
          return <EditionPreview key={edition.key} edition={edition} />;
        })}
        <Link
          to={`/my-shelf/books`}
          className="group my-4 flex w-40 shrink-0 flex-col items-center justify-center gap-3 rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 drop-shadow-lg/100"
        >
          <IoIosArrowForward className="size-13 rounded-lg border border-orange-950 bg-amber-700/50 p-4 transition duration-300 group-hover:scale-105 group-hover:bg-amber-600/66" />
          <p className="text-amber-500 transition duration-300 text-shadow-xs/50 group-hover:text-orange-300 group-hover:text-shadow-sm/33">
            View All
          </p>
        </Link>
      </div>

      <Header2 pathName="/wish-list/books" textContent="WishList" />

      <div className="flex gap-2 overflow-x-scroll">
        {myWishListPreview.map((edition: EditionType) => {
          return <EditionPreview key={edition.key} edition={edition} />;
        })}
        <Link
          to={`/wish-list/books`}
          className="group my-4 flex w-40 shrink-0 flex-col items-center justify-center gap-3 rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 drop-shadow-lg/100"
        >
          <IoIosArrowForward className="size-13 rounded-lg border border-orange-950 bg-amber-700/50 p-4 transition duration-300 group-hover:scale-105 group-hover:bg-amber-600/66" />
          <p className="text-amber-500 transition duration-300 text-shadow-xs/50 group-hover:text-orange-300 group-hover:text-shadow-sm/33">
            View All
          </p>
        </Link>
      </div>
    </main>
  );
}
