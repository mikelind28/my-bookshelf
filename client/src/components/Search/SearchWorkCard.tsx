import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { FaBook, FaExternalLinkAlt } from "react-icons/fa";
import { Author, OpenLibEditionType, WorkInfoType } from "../../types/types";
import AddBookDialog from "./AddBookDialog";
import PageNavigator from "./PageNavigator";
import { useSearchParams } from "react-router";

// TODO: link to openLibrary site

// the list of editions in SearchWorkCard is comprised of WorksEditionCards, which display specific edition info, and a button that allows users to add this edition to their collection.
function WorksEditionCard({ edition }: { edition: OpenLibEditionType }) {
  const [loaded, setLoaded] = useState(false);
  const [displayFullText, setDisplayFullText] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <li className="my-2 flex h-full flex-col gap-2 overflow-y-scroll rounded-sm border border-orange-400/33 bg-orange-400/15 p-2 shadow-md/25">
      <div className="flex gap-2">
        {(!loaded || !edition.coverUrl) && (
          <FaBook className="size-25 shrink-0 text-orange-800/90 drop-shadow-md/50" />
        )}

        {edition.coverUrl && (
          <img
            src={edition.coverUrl}
            className={`h-full w-25 rounded-sm drop-shadow-md/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
            alt='image of the book edition cover'
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
            <p className="leading-5">
              {edition.authors.map((author) => author.name).join(", ")}
            </p>
          )}

          {edition.publish_date && edition.publishers && (
            <p className="leading-5 text-orange-300 text-shadow-sm/50">
              <span className="text-orange-200">Published</span>
              {` ${edition.publish_date}`}
              <span className="text-orange-200">{` by `}</span>
              {`${edition.publishers.join(", ")}`}
            </p>
          )}

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
              <span className="tracking-wider text-orange-400 hover:text-orange-500">
                {displayFullText ? " < show less" : " ...show more >"}
              </span>
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
          type='button'
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

// SearchWorkCard contains this list of the book's specific editions.
function WorksEditionsList({ 
  editions, 
  numberOfEditions 
}: { 
  editions: OpenLibEditionType[]; 
  numberOfEditions: number 
}) {
  const [searchParams] = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") 
    ? parseInt(searchParams.get("page")!) 
    : 1
  );
  const [totalPages, setTotalPages] = useState(Math.ceil(numberOfEditions/10));

  useEffect(() => {
    setTotalPages(Math.ceil(numberOfEditions/10));
  }, [editions]);
  
  return (
    <div>
      <ul>
        {editions
          .filter((edition) =>
            edition.languages
              ? edition.languages[0].key === "/languages/eng"
              : edition,
          )
          .map((edition) => (
            <WorksEditionCard key={edition.key} edition={edition} />
          ))}
      </ul>

      <PageNavigator 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        numberOfResults={numberOfEditions} 
        totalPages={totalPages}        
      />
    </div>
  );
}

// SearchWorkCard shows book info, as well as a list of the book's editions, when a user searches for books from open library and then clicks on one of the list items.
export default function SearchWorkCard() {
  const { workInfo, workInfoAuthors, workEditions, numberOfEditions } = useLoaderData<{
    workInfo: WorkInfoType;
    workInfoAuthors: Author[];
    workEditions: OpenLibEditionType[];
    numberOfEditions: number;
  }>();

  const [displayFullText, setDisplayFullText] = useState(false);

  return (
    <div className="mx-3 max-w-135 rounded-sm bg-amber-950 p-3">
      <div className="gradient-underline pb-4">
        <h2 className="text-3xl font-semibold text-orange-300 text-shadow-md/75">
          {workInfo.title}
        </h2>

        <p className="text-xl text-orange-500 text-shadow-xs/100">
          {workInfo.first_publish_date}
        </p>

        <p className="text-xl text-orange-400 text-shadow-sm/66">
          <span className="text-amber-600">by</span>{" "}
          {workInfoAuthors.map((author) => author.name).join(", ")}
        </p>

        {(workInfo.description || workInfo.links) && <hr className="my-1.5" />}

        {workInfo.description && (
          <p
            onClick={() => setDisplayFullText(!displayFullText)}
            className="mt-3 w-full cursor-pointer rounded-md bg-orange-800/50 px-4 py-3 leading-5 wrap-break-word text-orange-200/95 text-shadow-md/33"
          >
            {typeof workInfo.description === "string"
              ? workInfo.description.substring(
                  0,
                  displayFullText ? workInfo.description.length : 275,
                )
              : workInfo.description.value.substring(
                  0,
                  displayFullText ? workInfo.description.value.length : 275,
                )}

            <span
              className={`tracking-wider text-orange-400 hover:text-orange-500 ${
                typeof workInfo.description === "string"
                  ? workInfo.description.length <= 275 && "hidden"
                  : workInfo.description.value.length <= 275 && "hidden"
              }`}
            >
              {displayFullText ? " show less" : " ...show more"}
            </span>
          </p>
        )}

        {workInfo.links && (
          <details className="mt-2">
            <summary className="text-lg transition-transform duration-1000">
              Links:
            </summary>
            <ul className="flex flex-col gap-2 py-2 pl-4">
              {workInfo.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 underline underline-offset-2"
                >
                  <li className="leading-5 text-shadow-xs/100">
                    {link.title}
                    <FaExternalLinkAlt className="ml-2 inline align-middle text-orange-400" />
                  </li>
                </a>
              ))}
            </ul>
          </details>
        )}
      </div>

      <p className="font-slight mt-2 text-2xl">Editions:</p>

      <WorksEditionsList editions={workEditions} numberOfEditions={numberOfEditions} />
    </div>
  );
}
