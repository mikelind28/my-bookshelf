import {
  NavLink,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router";
import { EditionType } from "../../types/types";
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";

export function BookListCard({ book }: { book: EditionType }) {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  const [pathName, setPathName] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  return (
    <li className="relative">
      <NavLink to={`/${pathName}${book.key}?${searchParams.toString()}`}>
        {({ isActive }) => (
          <div
            className={`group relative mt-1 mb-2 flex flex-row items-center gap-3 rounded-sm border p-4 drop-shadow-lg/100 ${
              isActive
                ? "cursor-default border-orange-300 bg-orange-400/75"
                : "border-orange-400/33 bg-orange-400/15 hover:bg-amber-900 hover:text-shadow-xs/75"
            }`}
          >
            {(!loaded || !book.coverUrl) && (
              <FaBook
                className={`h-30 w-20 shrink-0 rounded-md bg-darkbrown/33 p-2 text-orange-800/90 inset-shadow-xs/25 ${location.pathname.includes("/books") && params.key ? "hidden" : ""} `}
              />
            )}

            {book.coverUrl && (
              <img
                src={book.coverUrl}
                className={`h-full w-20 rounded-sm shadow-sm/50 ${!loaded ? "hidden" : ""} ${location.pathname.includes("/books") && params.key ? "hidden" : ""} `}
                onLoad={() => setLoaded(true)}
              />
            )}

            <div className="mr-5 flex flex-col gap-0.5 self-start">
              {book.title && (
                <p
                  className={`text-lg font-bold text-shadow-xs/90 sm:leading-6 ${
                    isActive
                      ? "text-orange-50 text-shadow-amber-950"
                      : "text-amber-500"
                  } `}
                >
                  {book.title}
                </p>
              )}

              {book.subtitle && (
                <p
                  className={`text-base leading-5 italic sm:leading-5 ${
                    isActive
                      ? "text-orange-200 text-shadow-2xs/75 text-shadow-amber-900"
                      : "text-orange-200"
                  } `}
                >
                  {book.subtitle}
                </p>
              )}

              {book.publish_date && (
                <p
                  className={`text-base leading-6 font-light ${
                    isActive ? "text-amber-950" : "text-amber-600"
                  } `}
                >
                  {book.publish_date}
                </p>
              )}

              {book.authors && (
                <p
                  className={`text-base leading-5 text-orange-500 ${
                    isActive ? "font-semibold text-orange-950" : ""
                  }`}
                >
                  {book.authors.map((author) => author.name).join(", ")}
                </p>
              )}
            </div>

            <IoIosArrowForward className="absolute right-1 size-6 shrink-0 self-center" />

            <div
              className={`absolute top-0 right-0 h-full w-0 bg-orange-200/25 transition-all duration-300 ease-out ${
                isActive ? "group-hover:w-0" : "group-hover:w-8"
              } `}
            ></div>
          </div>
        )}
      </NavLink>
    </li>
  );
}

export default function BookList() {
  const { rows } = useLoaderData<{ rows: EditionType[] }>();

  return (
    <div>
      <nav className="relative w-full">
        <p className="mx-0 mb-1 font-bold">
          {rows.length} book{(rows.length > 1 || rows.length === 0) && "s"}{" "}
          found:
        </p>
        <ul className="text-lg sm:h-[calc(100%-(--spacing(45)))] sm:overflow-y-auto">
          {rows.length ? (
            rows.map((book: EditionType) => (
              <BookListCard key={book.key} book={book} />
            ))
          ) : (
            <p className="m-2">No books found.</p>
          )}
        </ul>
      </nav>
    </div>
  );
}
