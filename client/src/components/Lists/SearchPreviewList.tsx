import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
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

    let submitSearchFetcher = useFetcher({ key: "submit-search-fetcher" });

    const location = useLocation();

    const [locationOnLoad, _setLocationOnLoad] = useState(location);

    useEffect(() => {
        if (location !== locationOnLoad) {
            setOpen(false);
        }
    }, [location]);
    
    return (
        <div
            className="absolute top-10 right-1/20 left-1/15 z-50 mx-2 flex h-fit w-full max-w-80 min-w-fit flex-col rounded-sm bg-orange-200/85 outline outline-orange-100 drop-shadow-xl/90 xs:left-34 xs:max-w-110 xs:justify-self-start"
        >
            {children}

            {searchResults &&
                <submitSearchFetcher.Form
                    method="post"
                    action="/search"
                    onSubmit={() => {
                        setSearchTerm("");
                    }}
                    className="w-full p-3 text-lg text-orange-900 text-center"
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

                    <button type="submit" className="w-full cursor-pointer">
                        See all...
                    </button>
                </submitSearchFetcher.Form>
            } 
        </div> 
    );
}