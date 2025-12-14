import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { EditionType } from "../types/types";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaBook, FaRegEdit } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { GoKebabHorizontal } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import BookList from "./Lists/BookList";
import { AuthorListCard } from "./Lists/AuthorList";

// TODO: sort authors by last_name
// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function BookCard() {
  const { rows } = useLoaderData<{ rows: EditionType[] }>();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [pathName, setPathName] = useState("my-shelf");

  const [currentBook, setCurrentBook] = useState<EditionType>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [previousId, setPreviousId] = useState("");
  const [nextId, setNextId] = useState("");

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  // TODO: loader data is automatically revalidated after...
  // -route params change
  // -URL search params change
  // -an action is called (and returns non-error status code)
  // So, are these dependencies necessary to include?
  // ⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄
  useEffect(() => {
    setCurrentBook(
      rows.find((book) => book.key.replace("/books/", "") === params.key),
    );

    setCurrentIndex(
      rows.findIndex((book) => book.key.replace("/books/", "") === params.key),
    );
  }, [rows, params]);

  useEffect(() => {
    if (
      rows.find((book) => book.key.replace("/books/", "") === params.key) ==
      undefined
    ) {
      navigate(
        `/${pathName}/books/${rows[0].key.replace("/books/", "")}?${searchParams.toString()}`,
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentIndex > 0) {
      setPreviousId(rows[currentIndex - 1].key.replace("/books/", ""));
    }

    if (currentIndex < rows.length - 1) {
      setNextId(rows[currentIndex + 1].key.replace("/books/", ""));
    }
  }, [rows, currentIndex]);

  function backOneBook() {
    if (currentIndex > 0) {
      navigate(`/${pathName}/books/${previousId}?${searchParams.toString()}`);
    }
  }

  function forwardOneBook() {
    if (currentIndex < rows.length - 1) {
      navigate(`/${pathName}/books/${nextId}?${searchParams.toString()}`);
    }
  }

  return (
    <div className="flex w-full gap-3">
      <div className="hidden sm:block sm:w-80">
        <BookList />
      </div>

      <div className="mx-0 w-full">
        <div className="mb-2 flex items-center justify-between sm:justify-end">
          <Link
            to={`/${pathName}/books?${searchParams.toString()}`}
            className="text-xl text-orange-400 sm:hidden"
          >
            <div className="flex items-center gap-1">
              <IoIosArrowBack />
              <p>Back to {pathName === "my-shelf" ? "Shelf" : "Wish List"}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div onClick={backOneBook}>
              <IoIosArrowBack
                className={`size-6 shrink-0 ${currentIndex === 0 ? "opacity-50" : "cursor-pointer"}`}
              />
            </div>

            <div className="w-16 text-center text-nowrap">
              {currentIndex + 1} of {rows.length}
            </div>

            <div onClick={forwardOneBook}>
              <IoIosArrowForward
                className={`size-6 shrink-0 ${currentIndex === rows.length - 1 ? "opacity-50" : "cursor-pointer"}`}
              />
            </div>
          </div>
        </div>

        {currentBook && (
          <div className="sticky top-0 h-fit w-full max-w-200 rounded-lg border border-orange-400/50 bg-orange-400/10 p-4">
            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                {currentBook.owned ? (
                  <p className="w-fit rounded-md border border-green-600 bg-green-400/25 px-2 text-green-600">
                    Owned
                  </p>
                ) : (
                  <p className="w-fit rounded-md border border-red-600 bg-red-400/25 px-2 text-red-600">
                    Not Owned
                  </p>
                )}
                {currentBook.read ? (
                  <p className="w-fit rounded-md border border-green-600 bg-green-400/25 px-2 text-green-600">
                    Read
                  </p>
                ) : (
                  <p className="w-fit rounded-md border border-red-600 bg-red-400/25 px-2 text-red-600">
                    Not Read
                  </p>
                )}
              </div>

              <Menu as={Fragment}>
                <MenuButton
                  className={
                    "absolute top-2 right-3 rounded-lg px-1 py-0.5 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-darkbrown/50 data-open:bg-darkbrown/66 data-open:inset-shadow-sm/25"
                  }
                >
                  <GoKebabHorizontal className="size-8" />
                </MenuButton>

                <MenuItems
                  anchor="bottom end"
                  transition
                  className={
                    "z-50 flex w-35 origin-top-right flex-col rounded-lg border border-orange-400/25 bg-amber-800/98 p-1 text-base/6 text-orange-200 shadow-md/25 transition-transform duration-200 ease-in [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-0 data-closed:opacity-0"
                  }
                >
                  <MenuItem>
                    <Link
                      to={`/${pathName}/books/${currentBook.key.replace("/books/", "")}/edit`}
                      className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-lg hover:bg-orange-400/15 hover:text-amber-300 hover:inset-shadow-xs data-focus:bg-orange-400/33 data-focus:text-orange-100"
                    >
                      <p>Edit</p>
                      <FaRegEdit />
                    </Link>
                  </MenuItem>

                  <MenuSeparator className="my-1 h-px bg-orange-300/20" />

                  <MenuItem>
                    <Link
                      to={`/${pathName}/books/${currentBook.key.replace("/books/", "")}/delete`}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-lg hover:bg-red-950/25 hover:text-red-500 hover:inset-shadow-xs"
                    >
                      <p>Delete</p>
                      <FaTrashCan />
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <div className="flex gap-3 border-b border-b-orange-600/50 pb-3">
              <div className="h-full w-fit shrink-0">
                {(!imageLoaded || !currentBook.coverUrl) && (
                  <FaBook className="size-30 shrink-0 rounded-md bg-darkbrown/33 py-2 text-orange-800/90 inset-shadow-xs/25" />
                )}

                {currentBook.coverUrl && (
                  <img
                    src={currentBook.coverUrl}
                    className={`h-full w-30 rounded-sm shadow-sm/50 ${!imageLoaded ? "hidden" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
              </div>

              <div className="flex grow flex-col gap-1">
                <h1 className="text-2xl leading-7 font-semibold text-amber-500">
                  {currentBook.title}
                </h1>
                <h2 className="text-xl leading-6 text-amber-600 italic">
                  {currentBook.subtitle}
                </h2>

                {currentBook.publish_date && (
                  <p className="leading-5 text-orange-400 text-shadow-sm/50">
                    Published:
                    <span className="text-orange-300">
                      {` ${currentBook.publish_date}`}
                    </span>
                    {currentBook.publishers &&
                      currentBook.publishers.length > 0 && (
                        <span className="text-orange-300">
                          <span className="text-orange-400">{` by `}</span>
                          {`${currentBook.publishers.map((publisher) => publisher.name).join(", ")}`}
                        </span>
                      )}
                  </p>
                )}

                {currentBook.description && (
                  <div className="leading-5">
                    <p>
                      Description:{" "}
                      <span className="text-orange-300">
                        {typeof currentBook.description === "string"
                          ? currentBook.description
                          : currentBook.description.value}
                      </span>
                    </p>
                  </div>
                )}

                {currentBook.isbn_10 && (
                  <div className="leading-5">
                    <p>
                      ISBN-10:{" "}
                      <span className="text-orange-300">
                        {currentBook.isbn_10}
                      </span>
                    </p>
                  </div>
                )}

                {currentBook.isbn_13 && (
                  <div className="leading-5">
                    <p>
                      ISBN-13:{" "}
                      <span className="text-orange-300">
                        {currentBook.isbn_13}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-2 text-2xl text-amber-500">Authors:</p>

            {currentBook.authors && (
              <ul>
                {currentBook.authors.map((author) => (
                  <AuthorListCard key={author.key} author={author} />
                ))}
              </ul>
            )}

            {/* <div className="my-3 flex flex-col gap-1">
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 text-orange-500">
                  {currentBook.authors && (
                    <div className="leading-5">
                      Author{currentBook.authors!.length > 1 && "s"}:{" "}
                      {currentBook.authors.map((author, index) => (
                        <Link
                          key={index}
                          to={`/${pathName}/authors/${author.key.replace("/authors/", "")}`}
                          className="text-orange-300"
                        >
                          {author.name}
                          {index !== currentBook.authors!.length - 1
                            ? ", "
                            : ""}
                        </Link>
                      ))}
                    </div>
                  )}

                  
                </div>
              </div>
            </div> */}

            <p className="text-center text-sm text-amber-700/70">
              book key: {currentBook.key}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
