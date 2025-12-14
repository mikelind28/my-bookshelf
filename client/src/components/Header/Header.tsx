import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useFetcher } from "react-router";

import { FaUser } from "react-icons/fa";

import {
  AuthorSeachPreview,
  OpenLibEditionType,
  WorkSeachPreview,
} from "../../types/types";

import Logo from "./Logo";
import SearchBar, { SearchType } from "./SearchBar";
import {
  SearchBooksPreviewList,
  SearchAuthorsPreviewList,
  SearchIsbnPreviewList,
} from "./SearchPreviewLists";

export const SetSearchTermContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => "");

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [previewResultsOpen, setPreviewResultsOpen] = useState(true);
  // const [allSearchResults, setAllSearchResults] = useState();
  const [bookSearchResults, setBookSearchResults] = useState<
    WorkSeachPreview[]
  >([]);
  const [authorSearchResults, setAuthorSearchResults] = useState<
    AuthorSeachPreview[]
  >([]);
  const [isbnSearchResult, setIsbnSearchResult] =
    useState<OpenLibEditionType>();

  let previewSearchFetcher = useFetcher({ key: "preview-search-fetcher" });

  useEffect(() => {
    if (
      bookSearchResults.length > 0 ||
      authorSearchResults.length > 0 ||
      isbnSearchResult
    ) {
      setPreviewResultsOpen(true);
    } else {
      setPreviewResultsOpen(false);
    }

    if (searchTerm === "") {
      setPreviewResultsOpen(false);
    } else {
      setPreviewResultsOpen(true);
    }
  }, [bookSearchResults, authorSearchResults, searchTerm]);

  useEffect(() => {
    const fetcherData = previewSearchFetcher.data;
    if (fetcherData && (searchType === "books" || searchType === "all")) {
      const bookSearchResults: WorkSeachPreview[] = fetcherData.docs;
      setBookSearchResults(bookSearchResults);
    }

    if (fetcherData && searchType === "authors") {
      const authorSearchResults: AuthorSeachPreview[] = fetcherData.docs;
      setAuthorSearchResults(authorSearchResults);
    }

    if (fetcherData && searchType === "isbn") {
      const result: OpenLibEditionType = fetcherData;

      console.log("fetcherData:", result);
      setIsbnSearchResult(result);
    }
  }, [previewSearchFetcher]);

  return (
    <header className="relative my-2 flex h-9 w-full max-w-140 items-stretch justify-between gap-2 px-3">
      <div className="flex h-full items-center rounded-md border border-orange-300/25 bg-amber-700/25 px-2">
        <Logo />
      </div>

      <div className="w-full grow justify-self-end">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
        />
      </div>

      <FaUser className="size-9 shrink-0 rounded-md bg-amber-700/80 p-2 text-orange-300" />

      <SetSearchTermContext value={setSearchTerm}>
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
