import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { IoIosCloseCircle } from "react-icons/io";

interface FilterBooksProps {
  filterPopoverOn: boolean;
  setFilterPopoverOn: React.Dispatch<React.SetStateAction<boolean>>;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function FilterBooks({
  filterPopoverOn,
  setFilterPopoverOn,
  filterButtonRef,
}: FilterBooksProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterPopoverRef = useRef<HTMLDivElement>(null);

  // close on outside click.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterPopoverRef.current &&
        !filterPopoverRef.current.contains(event.target as Node) &&
        !filterButtonRef.current?.contains(event.target as Node)
      ) {
        setFilterPopoverOn(false);
      }
    }

    if (filterPopoverOn) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterPopoverOn, setFilterPopoverOn]);

  return (
    filterPopoverOn && (
      <div
        ref={filterPopoverRef}
        className="absolute top-9 right-0 flex h-fit w-50 flex-col gap-3 rounded-md border border-orange-300 bg-amber-800/98 p-4 text-lg/6 text-orange-200 shadow-md inset-shadow-xs shadow-black/25 inset-shadow-black/25 text-shadow-xs/33"
      >
        <button
          type='button'
          onClick={() => setFilterPopoverOn(!filterPopoverOn)}
          className="absolute top-2 right-2 focus:outline-2 focus:outline-blue-500"
        >
          <IoIosCloseCircle
            className="size-8 cursor-pointer hover:text-amber-100 active:text-amber-950/66"
          />
        </button>

        <p className="text-xl text-orange-300">Filter by:</p>
        {/* read toggle and options. */}
        <div className="flex flex-col items-stretch">
          <fieldset className="flex flex-col gap-2">
            <div className={`flex items-center gap-1`}>
              <input
                type="radio"
                name="all-my-books"
                id="all-my-books"
                value="all"
                className={`mr-1 size-5 cursor-pointer appearance-none rounded-full bg-orange-200 checked:cursor-default checked:bg-orange-900 checked:inset-ring-4 checked:inset-ring-orange-200 checked:outline-1 checked:outline-orange-900 focus:outline-2 focus:outline-blue-500`}
                checked={searchParams.get("read") == undefined}
                onChange={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("read");
                  setSearchParams(newParams);
                }}
              />
              <label htmlFor="all-my-books" className={`cursor-pointer`}>
                All
              </label>
            </div>

            <div className={`flex items-center gap-1`}>
              <input
                type="radio"
                name="read"
                id="read-filter"
                value="read"
                className={`mr-1 size-5 cursor-pointer appearance-none rounded-full bg-orange-200 checked:cursor-default checked:bg-orange-900 checked:inset-ring-4 checked:inset-ring-orange-200 checked:outline-1 checked:outline-orange-900 focus:outline-2 focus:outline-blue-500`}
                checked={searchParams.get("read") === "read"}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    newParams.set("read", e.target.value);
                  } else {
                    newParams.delete("read");
                  }
                  setSearchParams(newParams);
                }}
              />
              <label htmlFor="read-filter" className={`cursor-pointer`}>
                Read
              </label>
            </div>

            <div className={`flex items-center gap-1`}>
              <input
                type="radio"
                name="not-read"
                id="not-read-filter"
                value="not-read"
                className={`mr-1 size-5 cursor-pointer appearance-none rounded-full bg-orange-200 checked:cursor-default checked:bg-orange-900 checked:inset-ring-4 checked:inset-ring-orange-200 checked:outline-1 checked:outline-orange-900 focus:outline-2 focus:outline-blue-500`}
                checked={searchParams.get("read") === "not-read"}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    newParams.set("read", e.target.value);
                  } else {
                    newParams.delete("read");
                  }
                  setSearchParams(newParams);
                }}
              />
              <label htmlFor="not-read-filter" className={`cursor-pointer`}>
                Not Read
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    )
  );
}
