import { useState } from "react";
import { FaBook } from "react-icons/fa";
import AddBookDialog from "./AddBookDialog";
import { Author, OpenLibEditionType } from "../../types/types";
import { useLoaderData } from "react-router";

export default function IsbnSearchResult() {
  let loaderData = useLoaderData<{
    searchTerm: string;
    searchType: string;
    searchResult: OpenLibEditionType;
  }>();

  const [loaded, setLoaded] = useState(false);
  const [displayFullText, setDisplayFullText] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mx-3 mt-3 mb-1 leading-5 text-amber-500">
        Searched for "{loaderData.searchTerm}" in {loaderData.searchType}:
      </p>

      <div className="m-3 flex h-full max-w-125 flex-col gap-2 overflow-y-scroll rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 shadow-md/25">
        <div className="flex gap-2">
          {(!loaded || !loaderData.searchResult.coverUrl) && (
            <FaBook className="size-25 shrink-0 text-orange-800/90 drop-shadow-md/50" />
          )}

          {loaderData.searchResult.coverUrl && (
            <img
              src={loaderData.searchResult.coverUrl}
              className={`h-full w-25 rounded-sm drop-shadow-md/50 ${!loaded ? "hidden" : ""}`}
              onLoad={() => setLoaded(true)}
            />
          )}
          <div className="flex h-full flex-col gap-2">
            <div>
              <h3 className="text-xl/6 font-semibold text-orange-400 text-shadow-sm/50">
                {loaderData.searchResult.title}
              </h3>

              {loaderData.searchResult.subtitle && (
                <h4 className="text-lg/5 text-orange-300 text-shadow-sm/50">
                  {loaderData.searchResult.subtitle}
                </h4>
              )}
            </div>

            {loaderData.searchResult.authors && (
              <p className="leading-5 text-orange-500">
                <span className="text-orange-200">{`by `}</span>
                {loaderData.searchResult.authors.map((author: Author) => author.name).join(", ")}
              </p>
            )}

            <div className="leading-5 text-orange-300 text-shadow-sm/50">
              {loaderData.searchResult.publish_date && (
                <>
                  <span className="text-orange-200">Published</span>
                  {` ${loaderData.searchResult.publish_date}`}
                </>
              )}

              {loaderData.searchResult.publishers && (
                <>
                  <span className="text-orange-200">{` by `}</span>
                  {`${loaderData.searchResult.publishers.join(", ")}`}
                </>
              )}
            </div>

            {loaderData.searchResult.description && (
              <p
                className="w-full cursor-pointer leading-5 wrap-break-word text-orange-200/90 text-shadow-sm/50"
                onClick={() => setDisplayFullText(!displayFullText)}
              >
                {typeof loaderData.searchResult.description === "string"
                  ? loaderData.searchResult.description.substring(
                      0,
                      displayFullText ? loaderData.searchResult.description.length : 250,
                    )
                  : loaderData.searchResult.description.value.substring(
                      0,
                      displayFullText ? loaderData.searchResult.description.value.length : 250,
                    )}

                {typeof loaderData.searchResult.description === "string" &&
                loaderData.searchResult.description.length >= 250 ? (
                  <span className="tracking-wider text-orange-400 hover:text-orange-500">
                    {displayFullText ? " < show less" : " ...show more >"}
                  </span>
                ) : typeof loaderData.searchResult.description !== "string" &&
                  loaderData.searchResult.description.value.length >= 250 ? (
                  <span className="tracking-wider text-orange-400 hover:text-orange-500">
                    {displayFullText ? " < show less" : " ...show more >"}
                  </span>
                ) : null}
              </p>
            )}

            <div className="leading-5">
              {loaderData.searchResult.isbn_10 && 
                <p className="">
                  ISBN-10: {loaderData.searchResult.isbn_10[0]}
                </p>
              }

              {loaderData.searchResult.isbn_13 &&
                <p>
                  ISBN-13: {loaderData.searchResult.isbn_13[0]}
                </p>
              }
            </div>

            <p>{loaderData.searchResult.key}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setDialogOpen(true);
            }}
            className="w-full rounded-md bg-amber-700 py-2 text-lg shadow-xs/25 text-shadow-xs/50"
          >
            Add Book
          </button>
        </div>

        <AddBookDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          edition={loaderData.searchResult}
        />
      </div>
    </div>
  );
}
