import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router";
import EditionCard from "./IsbnSearchResult";
import AuthorSearchResultList from "./AuthorSearchResults";
import BookSearchResultList from "./BookSearchResults";
import {
  WorkSeachPreview,
  AuthorSeachPreview,
  OpenLibEditionType,
} from "../../types/types";

// const testData = [
//   {
//     "author_key": [
//       "OL27695A"
//     ],
//     "author_name": [
//       "Agatha Christie"
//     ],
//     "cover_i": 12852588,
//     "first_publish_year": 1959,
//     "key": "/works/OL471641W",
//     "title": "Cat Among the Pigeons"
//   },
//   {
//     "author_key": [
//       "OL2622837A",
//       "OL384898A"
//     ],
//     "author_name": [
//       "Dr. Seuss",
//       "Simon Mugford"
//     ],
//     "cover_i": 11342,
//     "first_publish_year": 1957,
//     "key": "/works/OL1898309W",
//     "title": "The Cat in the Hat"
//   },
//   {
//     "author_key": [
//       "OL215689A"
//     ],
//     "author_name": [
//       "G. A. Henty"
//     ],
//     "first_publish_year": 1888,
//     "key": "/works/OL1794662W",
//     "subtitle": "a tale of ancient Egypt",
//     "title": "The Cat of Bubastes"
//   },
//   {
//     "author_key": [
//       "OL20187A"
//     ],
//     "author_name": [
//       "Kurt Vonnegut"
//     ],
//     "cover_i": 12709654,
//     "first_publish_year": 1963,
//     "key": "/works/OL98454W",
//     "title": "Cat's Cradle"
//   },
//   {
//     "author_key": [
//       "OL52922A"
//     ],
//     "author_name": [
//       "Margaret Atwood"
//     ],
//     "cover_i": 12506526,
//     "first_publish_year": 1988,
//     "key": "/works/OL675713W",
//     "title": "Cat's Eye"
//   },
//   {
//     "author_key": [
//       "OL199285A"
//     ],
//     "author_name": [
//       "Juan Rulfo"
//     ],
//     "cover_i": 5419076,
//     "first_publish_year": 1955,
//     "key": "/works/OL1731119W",
//     "title": "Pedro Páramo"
//   },
//   {
//     "author_key": [
//       "OL20187A"
//     ],
//     "author_name": [
//       "Kurt Vonnegut"
//     ],
//     "cover_i": 12727001,
//     "first_publish_year": 1968,
//     "key": "/works/OL98459W",
//     "title": "Slaughterhouse-Five"
//   },
//   {
//     "author_key": [
//       "OL25930A"
//     ],
//     "author_name": [
//       "Charles Perrault"
//     ],
//     "cover_i": 308893,
//     "first_publish_year": 1675,
//     "key": "/works/OL23869W",
//     "title": "Les Contes de ma mère l'Oye"
//   },
//   {
//     "author_key": [
//       "OL23082A"
//     ],
//     "author_name": [
//       "George MacDonald"
//     ],
//     "cover_i": 14358814,
//     "first_publish_year": 1850,
//     "key": "/works/OL15450W",
//     "title": "Phantastes"
//   },
//   {
//     "author_key": [
//       "OL34330A"
//     ],
//     "author_name": [
//       "Eric Carle"
//     ],
//     "cover_i": 7835968,
//     "first_publish_year": 1969,
//     "key": "/works/OL52987W",
//     "title": "The Very Hungry Caterpillar"
//   }
// ]


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
        numberOfResults: number;
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
          <p className="mx-3 mt-3 mb-1 leading-5 text-amber-500">
            Searched for "{loaderData.searchTerm}" in {loaderData.searchType}.
            Found {loaderData.numberOfResults} result
            {loaderData.numberOfResults > 1 ? "s" : ""}:
          </p>

          {/* {loaderData.searchType === "All" && (
            <BookSearchResultList
              searchResults={loaderData.searchResults as WorkSeachPreview[]} numberOfResults={loaderData.numberOfResults}
            />
          )}

          {loaderData.searchType === "Books" && (
            <BookSearchResultList
              searchResults={loaderData.searchResults as WorkSeachPreview[]} 
              numberOfResults={loaderData.numberOfResults}
            />
          )} */}

          {/* {loaderData.searchType === "Authors" && (
            <AuthorSearchResultList
              searchResults={loaderData.searchResults as AuthorSeachPreview[]}
              numberOfResults={loaderData.numberOfResults}
            />
          )} */}

          {/* {loaderData.searchType === "ISBN" && (
            <EditionCard
              edition={loaderData.searchResults[0] as OpenLibEditionType}
            />
          )} */}
        </div>
      )}

      <Outlet />
    </>
  );
}
