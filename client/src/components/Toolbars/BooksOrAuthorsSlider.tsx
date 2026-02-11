import { useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router";

type SliderOptionType = {
  pathName: string;
  booksOrAuthors: "books" | "authors";
  searchParams: URLSearchParams;
  textContent: string;
};

// pathName is conditionally either 'my-books' or 'wish-list', depending on which page the user is on. this allows the slider to work on either layout.
function SliderOption({
  pathName,
  booksOrAuthors,
  searchParams,
  textContent,
}: SliderOptionType) {
  return (
    <NavLink
      to={`/${pathName}/${booksOrAuthors}?${searchParams.toString()}`}
      className={({ isActive }) =>
        `flex w-full items-center justify-center rounded-md text-xl ${
          isActive ? "cursor-default text-orange-50" : "bg-none"
        }`
      }
    >
      {textContent}
    </NavLink>
  );
}

export default function BooksOrAuthorsSlider() {
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
    <>
      {!location.pathname.includes("/delete") &&
        !location.pathname.includes("/edit") &&
        !location.pathname.includes("/add-new") && (
          <div className="relative w-full mb-1 mx-auto flex h-10 rounded-md bg-amber-700/95 px-1 py-1 shadow-sm/25">
            <div
              className={`absolute h-[85%] w-1/2 self-center rounded-md bg-orange-100/33 shadow-xs/25 transition-all duration-500 ${
                location.pathname.includes("/books")
                  ? "translate-x-0"
                  : location.pathname.includes("/authors")
                    ? "translate-x-[calc(100%-(--spacing(2)))]"
                    : ""
              } `}
            ></div>

            <SliderOption
              pathName={pathName}
              booksOrAuthors="books"
              searchParams={searchParams}
              textContent="Books"
            />

            <SliderOption
              pathName={pathName}
              booksOrAuthors="authors"
              searchParams={searchParams}
              textContent="Authors"
            />
          </div>
        )}
    </>
  );
}
