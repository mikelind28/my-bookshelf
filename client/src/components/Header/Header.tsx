import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFetcher, useLocation } from "react-router";

import { FaUser } from "react-icons/fa";

import {
  AuthorSeachPreview,
  OpenLibEditionType,
  WorkSeachPreview,
} from "../../types/types";

import Logo from "./Logo";
import SearchBar, { SearchType } from "./SearchBar";
import { SearchBooksPreviewList } from "../Search/SearchBooksPreview";
import { SearchAuthorsPreviewList } from "../Search/SearchAuthorsPreview";
import { SearchIsbnPreviewList } from "../Search/SearchIsbnPreview";

export const SetSearchTermContext = createContext<
  {
    searchTerm: string;
    searchType: SearchType;
    setSearchTerm: Dispatch<SetStateAction<string>>
  }
>({searchTerm: "", searchType: "all", setSearchTerm: () => ""});

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [previewResultsOpen, setPreviewResultsOpen] = useState(true);
  const [bookSearchResults, setBookSearchResults] = useState<WorkSeachPreview[]>();
  const [authorSearchResults, setAuthorSearchResults] = useState<AuthorSeachPreview[]>();
  const [isbnSearchResult, setIsbnSearchResult] = useState<OpenLibEditionType>();

  const location = useLocation();

  let previewSearchFetcher = useFetcher({ key: "preview-search-fetcher" });

  // clear the search results when the location changes.
  useEffect(() => {
    setBookSearchResults(undefined);
    setAuthorSearchResults(undefined);
    setIsbnSearchResult(undefined);
  }, [location]);

  useEffect(() => {
    const fetcherData = previewSearchFetcher.data;

    if (searchTerm === "" || !fetcherData) {
      setPreviewResultsOpen(false);
      setBookSearchResults(undefined);
      setAuthorSearchResults(undefined);
      setIsbnSearchResult(undefined);
    } else {
      if (searchType === 'books' || searchType === 'all') {
        const bookSearchResults: WorkSeachPreview[] = fetcherData.docs;
        setBookSearchResults(bookSearchResults);
        setPreviewResultsOpen(true);
      }

      if (searchType === 'authors') {
        const authorSearchResults: AuthorSeachPreview[] = fetcherData.docs;
        setAuthorSearchResults(authorSearchResults);
        setPreviewResultsOpen(true);
      }

      if (searchType === 'isbn') {
        const result: OpenLibEditionType = fetcherData;
        setIsbnSearchResult(result);
        setPreviewResultsOpen(true);
      }
    }
  }, [previewSearchFetcher, searchTerm, searchType, bookSearchResults, authorSearchResults, isbnSearchResult]);

  return (
    <header className="relative my-2 flex h-9 w-full max-w-180 items-stretch justify-between gap-2 px-3">
      <div className="flex h-full items-center rounded-md border border-orange-300/25 bg-amber-700/25 px-2">
        <Logo />
      </div>

      <div className="w-full grow justify-self-end">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
          setIsbnSearchResult={setIsbnSearchResult}
        />
      </div>

      <FaUser className="size-9 shrink-0 rounded-md bg-amber-700/80 p-2 text-orange-300" />

      <SetSearchTermContext 
        value={{
          searchTerm: searchTerm, 
          searchType: searchType, 
          setSearchTerm: setSearchTerm
        }}
      >
        {previewResultsOpen && searchType === "all" && (
          <SearchBooksPreviewList
            searchResults={bookSearchResults}
            setOpen={setPreviewResultsOpen}
          />
        )}

        {previewResultsOpen && searchType === "books" && (
          <SearchBooksPreviewList
            searchResults={bookSearchResults}
            setOpen={setPreviewResultsOpen}
          />
        )}

        {previewResultsOpen && searchType === "authors" && (
          <SearchAuthorsPreviewList
            searchResults={authorSearchResults}
            setOpen={setPreviewResultsOpen}
          />
        )}

        {previewResultsOpen && searchType === "isbn" && isbnSearchResult && (
          <SearchIsbnPreviewList
            searchResult={isbnSearchResult}
            setOpen={setPreviewResultsOpen}
            isbn={searchTerm}
          />
        )}
      </SetSearchTermContext>
    </header>
  );
}
