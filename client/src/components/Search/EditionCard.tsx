import { useState } from "react";
import { FaBook } from "react-icons/fa";
import AddBookDialog from "./AddBookDialog";
import { Author, OpenLibEditionType } from "../../types/types";

export default function EditionCard({
  edition,
}: {
  edition: OpenLibEditionType;
}) {
  const [loaded, setLoaded] = useState(false);
  const [displayFullText, setDisplayFullText] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <li className="m-3 flex h-full max-w-125 flex-col gap-2 overflow-y-scroll rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 shadow-md/25">
      <div className="flex gap-2">
        {(!loaded || !edition.coverUrl) && (
          <FaBook className="size-25 shrink-0 text-orange-800/90 drop-shadow-md/50" />
        )}

        {edition.coverUrl && (
          <img
            src={edition.coverUrl}
            className={`h-full w-25 rounded-sm drop-shadow-md/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}
        <div className="flex h-full flex-col gap-2">
          <div>
            <h3 className="text-xl/6 font-semibold text-orange-400 text-shadow-sm/50">
              {edition.title}
            </h3>

            {edition.subtitle && (
              <h4 className="text-lg/5 text-orange-300 text-shadow-sm/50">
                {edition.subtitle}
              </h4>
            )}
          </div>

          {edition.authors && (
            <p className="leading-5 text-orange-500">
              <span className="text-orange-200">{`by `}</span>
              {edition.authors.map((author: Author) => author.name).join(", ")}
            </p>
          )}

          <div className="leading-5 text-orange-300 text-shadow-sm/50">
            {edition.publish_date && (
              <>
                <span className="text-orange-200">Published</span>
                {` ${edition.publish_date}`}
              </>
            )}

            {edition.publishers && (
              <>
                <span className="text-orange-200">{` by `}</span>
                {`${edition.publishers.join(", ")}`}
              </>
            )}
          </div>

          {edition.description && (
            <p
              className="w-full cursor-pointer leading-5 wrap-break-word text-orange-200/90 text-shadow-sm/50"
              onClick={() => setDisplayFullText(!displayFullText)}
            >
              {typeof edition.description === "string"
                ? edition.description.substring(
                    0,
                    displayFullText ? edition.description.length : 250,
                  )
                : edition.description.value.substring(
                    0,
                    displayFullText ? edition.description.value.length : 250,
                  )}

              {typeof edition.description === "string" &&
              edition.description.length >= 250 ? (
                <span className="tracking-wider text-orange-400 hover:text-orange-500">
                  {displayFullText ? " < show less" : " ...show more >"}
                </span>
              ) : typeof edition.description !== "string" &&
                edition.description.value.length >= 250 ? (
                <span className="tracking-wider text-orange-400 hover:text-orange-500">
                  {displayFullText ? " < show less" : " ...show more >"}
                </span>
              ) : null}
            </p>
          )}

          <div className="leading-5">
            {edition.isbn_10 && 
              <p className="">
                ISBN-10: {edition.isbn_10[0]}
              </p>
            }

            {edition.isbn_13 &&
              <p>
                ISBN-13: {edition.isbn_13[0]}
              </p>
            }
          </div>

          <p>{edition.key}</p>
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
        edition={edition}
      />
    </li>
  );
}
