import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import EditionCard from "./EditionCard";
import AuthorSearchResultList from "./AuthorSearchResultList";
import BookSearchResultList from "./BookSearchResultList";
import {
  WorkSeachPreview,
  AuthorSeachPreview,
  OpenLibEditionType,
} from "../../types/types";


// TODO: add general search (see Insomnia)
// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
// SearchResults can show a list of book results or author results, depending on the search type from the search bar options.
export default function SearchResults() {
  let loaderData = useLoaderData<
    | {
        searchTerm: string;
        searchType: string;
        searchResults:
          | WorkSeachPreview[]
          | AuthorSeachPreview[]
          | OpenLibEditionType[];
      }
    | undefined
  >();

  let navigate = useNavigate();

  useEffect(() => {
    if (!loaderData) {
      navigate("/");
    }
  }, [loaderData]);

  return (
    <>
      {loaderData && (
        <div className="flex w-full flex-col items-center">
          <p className="mx-3 mt-3 mb-1 leading-5">
            Searched for "{loaderData.searchTerm}" in {loaderData.searchType}.
            Found {loaderData.searchResults.length} result
            {loaderData.searchResults.length > 1 ? "s" : ""}:
          </p>

          {loaderData.searchType === "All" && (
            <BookSearchResultList
              searchResults={loaderData.searchResults as WorkSeachPreview[]}
            />
          )}

          {loaderData.searchType === "Books" && (
            <BookSearchResultList
              searchResults={loaderData.searchResults as WorkSeachPreview[]}
            />
          )}

          {loaderData.searchType === "Authors" && (
            <AuthorSearchResultList
              searchResults={loaderData.searchResults as AuthorSeachPreview[]}
            />
          )}

          {loaderData.searchType === "ISBN" && (
            <EditionCard
              edition={loaderData.searchResults[0] as OpenLibEditionType}
            />
          )}
        </div>
      )}

      <Outlet />
    </>
  );
}
