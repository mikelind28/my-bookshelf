import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { SetSearchTermContext } from "../Header/Header";
import { useFetcher, useLocation } from "react-router";

export default function SearchPreviewList({
  searchResults,
  setOpen,
  children
}: {
  searchResults: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
    const {searchTerm, searchType, setSearchTerm} = useContext(SetSearchTermContext);

    const previewListRef = useRef<HTMLDivElement>(null);

    let submitSearchFetcher = useFetcher({ key: "submit-search-fetcher" });

    const location = useLocation();

    const [locationOnLoad, _setLocationOnLoad] = useState(location);

    useEffect(() => {
        if (location !== locationOnLoad) {
            setOpen(false);
        }
    }, [location]);

    useEffect(() => {
        if (!searchResults) {
            setOpen(false);
        }
    }, [searchType, searchResults]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                previewListRef.current &&
                !previewListRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (previewListRef) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <div
            ref={previewListRef}
            className="absolute top-10 right-1/20 left-1/15 z-50 mx-2 flex h-fit w-full max-w-80 min-w-fit flex-col rounded-sm bg-amber-900/95 outline outline-amber-600 drop-shadow-xl/90 xs:left-34 xs:max-w-110 xs:justify-self-start"
        >
            {children}

            {searchResults &&
                <submitSearchFetcher.Form
                    method="post"
                    action="/search"
                    onSubmit={() => {
                        setSearchTerm("");
                    }}
                    className="group w-full p-3"
                >
                    <input
                        type="hidden"
                        id="search-term"
                        name="search-term"
                        value={searchTerm}
                    />

                    <input
                        type="hidden"
                        id="search-type"
                        name="search-type"
                        value={searchType}
                    />

                    <button type="submit" className="w-full cursor-pointer text-lg text-orange-500 font-light text-center group-hover:text-amber-500 group-hover:underline">
                        See all...
                    </button>
                </submitSearchFetcher.Form>
            } 
        </div> 
    );
}