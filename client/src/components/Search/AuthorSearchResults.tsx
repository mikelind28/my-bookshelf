import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";
import { AuthorSeachPreview } from "../../types/types";
import PageNavigator from "./PageNavigator";

function AuthorSearchResultItem({ author, index }: { author: AuthorSeachPreview, index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/search/authors/${author.key}`}
      className="group relative flex items-stretch w-full max-w-140 font-semibold"
    >
      <div className="m-3 flex items-center w-full gap-2">
        {(!loaded || !author.imgUrl) && (
          <IoPerson className="size-15 shrink-0 rounded-md bg-darkbrown/33 py-2 text-orange-800/90 inset-shadow-xs/25" />
        )}

        {author.imgUrl && (
          <img
            src={author.imgUrl}
            className={`aspect-auto  w-15 rounded-xs drop-shadow-sm/50 ${!loaded ? "hidden" : ""}`}
            onLoad={() => setLoaded(true)}
            alt='image of the book cover'
          />
        )}

        <div className="flex h-full w-full flex-col gap-0.5 rounded-md bg-orange-200 p-3 drop-shadow-sm/25 group-hover:drop-shadow-md/33 group-hover:scale-102">
          <p className="text-lg leading-5 font-medium text-orange-950">{author.name}</p>

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
      </div>

      <span className={`flex items-center w-8 bg-amber-600 border-b border-b-amber-900 group-hover:bg-amber-500 ${index === 0 ? 'rounded-tr-sm' : index === 9 ? 'rounded-br-sm border-b-0' : ''}`}>
        <IoIosArrowForward className="size-6 shrink-0 text-darkbrown/80" />
      </span>
    </Link>
  );
}

export default function AuthorSearchResults() {
  let loaderData = useLoaderData<{
    searchTerm: string;
    searchType: string;
    searchResults: AuthorSeachPreview[]
    numberOfResults: number;
  }>();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(loaderData.numberOfResults/10));

  useEffect(() => {
    setTotalPages(Math.ceil(loaderData.numberOfResults/10));
  }, [loaderData.searchResults]);

  return (
    <div className="flex flex-col items-center">
      <p className="mx-3 mt-3 mb-1 leading-5 text-amber-500">
        Searched for "{loaderData.searchTerm}" in {loaderData.searchType}.
        Found {loaderData.numberOfResults} result
        {loaderData.numberOfResults > 1 ? "s" : ""}:
      </p>

      <div className="m-3 flex flex-col min-w-93 max-w-125 bg-amber-900/95 outline outline-amber-600 divide-y divide-amber-600 drop-shadow-xl/90 rounded-sm">
        {loaderData.searchResults.map((author, index) => (
          <AuthorSearchResultItem key={index} author={author} index={index} />
        ))}

        <PageNavigator 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          numberOfResults={loaderData.numberOfResults} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
}
