import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router";

type PageNavigatorProps = {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    numberOfResults: number;
    totalPages: number;
}

export default function PageNavigator({ currentPage, setCurrentPage, numberOfResults, totalPages }: PageNavigatorProps ) {
    const [_searchParams, setSearchParams] = useSearchParams({ page: currentPage.toString() });
    
    return (
        <div className="flex gap-3 justify-center items-center h-15 w-full max-w-140">
            <div className="flex gap-1">
                <div
                    onClick={() => {
                        if (currentPage > 1) {
                        setCurrentPage(1);
                        setSearchParams((searchParams) => {
                            searchParams.set("page", "1");
                            return searchParams;
                        });
                        }
                    }}
                    className={`flex p-1 rounded-md ${currentPage <= 1 ? 'bg-orange-100 text-neutral-300' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
                >
                    <IoIosArrowBack className="size-6 shrink-0 -mr-2" />
                    <IoIosArrowBack className="size-6 shrink-0 -ml-2" />
                </div>

            <IoIosArrowBack
                onClick={() => {
                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    setSearchParams((searchParams) => {
                    searchParams.set("page", (currentPage - 1).toString());
                    return searchParams;
                    });
                }
                }}
                className={`size-8 shrink-0 p-1 rounded-md ${currentPage <= 1 ? 'bg-orange-100 text-neutral-300' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
                />
            </div>

            <p>
                {`page ${currentPage} of ${totalPages}`}
            </p>

            <div className="flex gap-1">
                <IoIosArrowForward
                    onClick={() => {
                        if (currentPage < Math.ceil(numberOfResults/10)) {
                        setCurrentPage(currentPage + 1);
                        setSearchParams((searchParams) => {
                            searchParams.set("page", (currentPage + 1).toString());
                            return searchParams;
                        });
                        }
                    }}
                    className={`size-8 shrink-0 p-1 rounded-md ${currentPage >= Math.ceil(numberOfResults/10) ? 'bg-orange-100 text-neutral-300' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
                />

                <div
                    onClick={() => {
                        if (currentPage < Math.ceil(numberOfResults/10)) {
                        setCurrentPage(Math.ceil(numberOfResults/10));
                        setSearchParams((searchParams) => {
                            searchParams.set("page", (Math.ceil(numberOfResults/10)).toString());
                            return searchParams;
                        });
                        }
                    }}
                    className={`flex p-1 rounded-md ${currentPage >= Math.ceil(numberOfResults/10) ? 'bg-orange-100 text-neutral-300' : 'bg-orange-400 text-orange-950 cursor-pointer'}`}
                >
                    <IoIosArrowForward className="size-6 shrink-0 -mr-2" />
                    <IoIosArrowForward className="size-6 shrink-0 -ml-2" />
                </div>
            </div>
        </div>
    );
}