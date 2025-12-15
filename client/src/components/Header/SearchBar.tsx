import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useFetcher } from "react-router";

function SearchOptions({
  setPlaceholderText,
  searchType,
  setSearchType,
}: {
  setPlaceholderText: Dispatch<SetStateAction<string>>;
  searchType: string;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}) {
  return (
    <Menu>
      <MenuButton className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-2 py-0.5 focus:not-data-focus:outline-none data-hover:bg-amber-600/75 data-open:bg-amber-600/75">
        <FaChevronDown className="size-4 shrink-0 text-orange-300/90" />

        <p className="hidden xs:block">
          {searchType === "all"
            ? "All"
            : searchType === "authors"
              ? "Authors"
              : searchType === "books"
                ? "Books"
                : searchType === "isbn"
                  ? "ISBN"
                  : null}
        </p>
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom start", gap: 8, offset: -5 }}
        className="z-50 w-40 flex flex-col gap-0.5 origin-top-right rounded-lg border border-orange-400/25 bg-amber-800/98 p-1 text-base/6 text-orange-200 shadow-md/25 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        <MenuItem>
          <button
            onClick={() => {
              setPlaceholderText("Search...");
              setSearchType("all");
            }}
            className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-orange-400/33 data-focus:text-orange-100 ${searchType === 'all' ? 'bg-orange-400/33 font-semibold text-orange-50' : ''}`}
          >
            All
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => {
              setPlaceholderText("Books...");
              setSearchType("books");
            }}
            className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-orange-400/33 data-focus:text-orange-100 ${searchType === 'books' ? 'bg-orange-400/33 font-semibold text-orange-50' : ''}`}
          >
            Books
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => {
              setPlaceholderText("Authors...");
              setSearchType("authors");
            }}
            className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-orange-400/33 data-focus:text-orange-100 ${searchType === 'authors' ? 'bg-orange-400/33 font-semibold text-orange-50' : ''}`}
          >
            Authors
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => {
              setPlaceholderText("ISBN...");
              setSearchType("isbn");
            }}
            className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-orange-400/33 data-focus:text-orange-100 ${searchType === 'isbn' ? 'bg-orange-400/33 font-semibold text-orange-50' : ''}`}
          >
            ISBN
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export type SearchType = "books" | "authors" | "isbn" | "all";

type SearchBarType = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
}: SearchBarType) {
  const [placeholderText, setPlaceholderText] = useState("Search...");

  // previewSearchFetcher gets data from open library every time a keystroke is entered in the search bar, to display a preview of the results.
  let previewSearchFetcher = useFetcher({ key: "preview-search-fetcher" });

  // submitSearchFetcher only fetches data from open library when the search is 'submitted' from the search bar—upon pressing return or the search button
  let submitSearchFetcher = useFetcher({ key: "submit-search-fetcher" });

  // debounce adds a small delay so that the preview fetcher doesn't run excessively
  const debounceRef = useRef<number | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      formData.set("search-term", searchTerm);
      formData.set("search-type", searchType);

      if (searchType !== "isbn") {
        if (debounceRef.current) {
          window.clearTimeout(debounceRef.current);
        }

        debounceRef.current = window.setTimeout(() => {
          if (searchTerm !== "") {
            previewSearchFetcher.submit(formData, {
              method: "post",
              action: "/",
            });
          }
        }, 500);
      }

      if (searchType === "isbn") {
        if (searchTerm.length === 10 || searchTerm.length === 13) {
          console.log("searchType:", searchType);
          console.log("searchTerm:", searchTerm);

          previewSearchFetcher.submit(formData, {
            method: "post",
            action: "/",
          });
        }
      }
    }
  }, [searchType, searchTerm]);

  function submitFormData(form: HTMLFormElement, currentValue: string) {
    const formData = new FormData(form);

    // override with the latest input value (safe & avoids setState race)
    formData.set("search-term", currentValue);
    formData.set("search-type", searchType);

    previewSearchFetcher.submit(formData, { method: "post", action: "/" });
  }

  return (
    <div className="relative flex h-full w-full grow flex-col">
      <div className="relative flex h-full w-full items-center rounded-md border border-orange-300/66 bg-amber-700/80 px-1 has-focus:outline-2 has-focus:outline-orange-500">
        <SearchOptions
          setPlaceholderText={setPlaceholderText}
          searchType={searchType}
          setSearchType={setSearchType}
        />

        <submitSearchFetcher.Form
          ref={formRef}
          method="post"
          action="/search"
          onSubmit={() => {
            setSearchTerm("");
          }}
          className="flex w-full items-center"
        >
          <input
            type="text"
            id="search-term"
            name="search-term"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={(e) => {
              const input = e.currentTarget;
              const form = input.form!;

              setSearchTerm(input.value);

              // debounce so you're not firing on every keystroke immediately
              if (searchType !== "isbn") {
                if (debounceRef.current) {
                  window.clearTimeout(debounceRef.current);
                }

                debounceRef.current = window.setTimeout(() => {
                  if (input.value !== "") {
                    submitFormData(form, input.value);
                  }
                }, 500);
              }

              if (searchType === "isbn") {
                if (input.value.length === 10 || input.value.length === 13) {
                  submitFormData(form, input.value);
                }
              }
            }}
            className="h-full w-full pl-2 text-xl placeholder:text-lg focus:outline-0"
          />

          <input
            type="hidden"
            id="search-type"
            name="search-type"
            value={searchType}
          />

          <button
            type="submit"
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md p-1 hover:bg-amber-600/75"
          >
            <IoSearch className="size-4 text-orange-300/90" />
          </button>
        </submitSearchFetcher.Form>
      </div>
    </div>
  );
}
