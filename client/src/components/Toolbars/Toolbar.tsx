import { Link, useLocation, useSearchParams } from "react-router";
import FilterBooks from "./FilterBooks";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import ActiveParams from "./ActiveParams";

type PopoverButtonType = {
  ref: RefObject<HTMLButtonElement | null>;
  popoverOn: boolean;
  setPopoverOn: Dispatch<SetStateAction<boolean>>;
  icon: ReactNode;
  popover: ReactNode;
};

function PopoverButton({
  ref,
  popoverOn,
  setPopoverOn,
  icon,
  popover,
}: PopoverButtonType) {
  const [searchParams] = useSearchParams();

  return (
    <div className="relative">
      {searchParams.has("read", "read") && (
        <span className="absolute -top-1 -right-1 inline-flex size-3 rounded-full bg-green-400"></span>
      )}
      {searchParams.has("read", "not-read") && (
        <span className="absolute -top-1 -right-1 inline-flex size-3 rounded-full bg-red-500"></span>
      )}
      <button
        ref={ref}
        className={`h-full cursor-pointer rounded-lg px-4 py-1 ${popoverOn || searchParams.has("read") ? "bg-amber-900/50 inset-shadow-sm inset-shadow-black/25 hover:bg-amber-900/66" : "bg-orange-300/25 hover:bg-amber-900/50 hover:inset-shadow-sm hover:inset-shadow-black/25"}`}
        onClick={() => {
          setPopoverOn(!popoverOn);
        }}
      >
        {icon}
      </button>

      {popover}
    </div>
  );
}

// TODO: add sort options: 'title' or 'date added'

export default function Toolbar() {
  const [filterPopoverOn, setFilterPopoverOn] = useState(false);

  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  return (
    <div className="relative z-40 my-1 flex h-full max-w-258 items-stretch gap-2">
      <ActiveParams />

      <PopoverButton
        ref={filterButtonRef}
        popoverOn={filterPopoverOn}
        setPopoverOn={setFilterPopoverOn}
        icon={<CiFilter className="text-2xl" />}
        popover={
          <FilterBooks
            filterPopoverOn={filterPopoverOn}
            setFilterPopoverOn={setFilterPopoverOn}
            filterButtonRef={filterButtonRef}
          />
        }
      />

      <Link
        to={`/${pathName}/${location.pathname.includes("/books") ? "books" : "authors"}/add-new?${searchParams.toString()}`}
        onClick={() =>
          console.log(
            `/${pathName}/${location.pathname.includes("/books") ? "books" : "authors"}/add-new?${searchParams.toString()}`,
          )
        }
        className="flex cursor-pointer items-center rounded-md bg-orange-200/85 px-4 py-1 text-orange-900 outline-amber-950 hover:bg-orange-200 hover:text-orange-800 hover:shadow-xs/50 active:bg-orange-300/70 active:shadow-none active:inset-shadow-xs active:inset-shadow-black/70 active:inset-ring-amber-950"
      >
        <FaPlus className="text-lg" />
      </Link>
    </div>
  );
}
