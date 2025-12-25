import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { Author } from "../types/types";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSeparator,
} from "@headlessui/react";
import { GoKebabHorizontal } from "react-icons/go";
import AuthorList from "./Lists/AuthorList";
import { BookListCard } from "./Lists/BookList";


// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...

// TODO: add breadcrumbs back to search results?
export default function AuthorCard() {
  const { rows } = useLoaderData<{ rows: Author[] }>();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [pathName, setPathName] = useState("my-shelf");

  const [currentAuthor, setCurrentAuthor] = useState<Author>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [previousId, setPreviousId] = useState("");
  const [nextId, setNextId] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  useEffect(() => {
    setCurrentAuthor(
      rows.find((author) => author.key.replace("/authors/", "") === params.key),
    );

    setCurrentIndex(
      rows.findIndex(
        (author) => author.key.replace("/authors/", "") === params.key,
      ),
    );
  }, [rows, params]);

  useEffect(() => {
    if (
      rows.find(
        (author) => author.key.replace("/authors/", "") === params.key,
      ) == undefined
    ) {
      navigate(
        `/${pathName}/authors/${rows[0].key.replace("/authors/", "")}?${searchParams.toString()}`,
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentIndex > 0) {
      setPreviousId(rows[currentIndex - 1].key.replace("/authors/", ""));
    }

    if (currentIndex < rows.length - 1) {
      setNextId(rows[currentIndex + 1].key.replace("/authors/", ""));
    }
  }, [rows, currentIndex]);

  function backOneAuthor() {
    if (currentIndex > 0) {
      navigate(`/${pathName}/authors/${previousId}?${searchParams.toString()}`);
    }
  }

  function forwardOneAuthor() {
    if (currentIndex < rows.length - 1) {
      navigate(`/${pathName}/authors/${nextId}?${searchParams.toString()}`);
    }
  }

  return (
    <div className="flex w-full gap-3">
      <div className="hidden sm:block sm:w-80">
        <AuthorList />
      </div>

      <div className="mx-0 w-full">
        <div className="mb-2 flex items-center justify-between sm:justify-end">
          <Link
            to={`/${pathName}/authors?${searchParams.toString()}`}
            className="text-xl text-orange-400 sm:hidden"
          >
            <div className="flex items-center gap-1">
              <IoIosArrowBack />
              <p>Back to {pathName === "my-shelf" ? "Shelf" : "Wish List"}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div onClick={backOneAuthor}>
              <IoIosArrowBack
                className={`size-6 shrink-0 ${currentIndex === 0 ? "opacity-50" : "cursor-pointer"}`}
              />
            </div>

            <div className="w-16 text-center text-nowrap">
              {currentIndex + 1} of {rows.length}
            </div>

            <div onClick={forwardOneAuthor}>
              <IoIosArrowForward
                className={`size-6 shrink-0 ${currentIndex === rows.length - 1 ? "opacity-50" : "cursor-pointer"}`}
              />
            </div>
          </div>
        </div>

        {currentAuthor && (
          <div className="sticky top-0 h-fit w-full max-w-200 rounded-lg border border-orange-400/50 bg-orange-400/10 p-4">
            <div className="flex flex-col gap-3 border-b border-b-orange-600/50 pb-3">
              <div className="flex items-start gap-3">
                {currentAuthor.image_url && (
                  <img
                    src={currentAuthor.image_url}
                    className={`float-left h-full w-30 shrink-0 rounded-sm shadow-sm/50 ${!imageLoaded ? "hidden" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}

                <div className="flex grow flex-col gap-1">
                  <h3 className="text-2xl leading-7 font-semibold text-amber-500">
                    {currentAuthor.name}
                  </h3>

                  {currentAuthor.birth_date && (
                    <p className="leading-5 text-orange-500 text-shadow-sm/50">
                      Born:
                      <span className="text-orange-300">
                        {` ${currentAuthor.birth_date}`}
                      </span>
                    </p>
                  )}

                  {currentAuthor.death_date && (
                    <p className="leading-5 text-orange-500 text-shadow-sm/50">
                      Died:
                      <span className="text-orange-300">
                        {` ${currentAuthor.death_date}`}
                      </span>
                    </p>
                  )}
                </div>

                <Menu as={Fragment}>
                  <MenuButton
                    className={
                      "-translate-y-2 rounded-lg px-1 py-0.5 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-darkbrown/50 data-open:bg-darkbrown/66 data-open:inset-shadow-sm/25"
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
                        to={`/${pathName}/authors/${currentAuthor.key.replace("/authors/", "")}/edit`}
                        className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-lg hover:bg-orange-400/15 hover:text-amber-300 hover:inset-shadow-xs data-focus:bg-orange-400/33 data-focus:text-orange-100"
                      >
                        <p>Edit</p>
                        <FaRegEdit />
                      </Link>
                    </MenuItem>

                    <MenuSeparator className="my-1 h-px bg-orange-300/20" />

                    <MenuItem>
                      <Link
                        to={`/${pathName}/authors/${currentAuthor.key.replace("/authors/", "")}/delete`}
                        className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-lg hover:bg-red-950/25 hover:text-red-500 hover:inset-shadow-xs"
                      >
                        <p>Delete</p>
                        <FaTrashCan />
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>

              {currentAuthor.bio && (
                <p className="text-orange-300 text-shadow-sm/33  rounded-md bg-orange-800/50 px-4 py-3 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-line:tracking-widest first-line:uppercase">
                  {currentAuthor.bio}
                </p>
              )}
            </div>

            <p className="mt-2 text-2xl text-amber-500">Books:</p>

            {currentAuthor.books && (
              <ul>
                {currentAuthor.books.sort((a, b) => {
                  const nameA = a.title?.toUpperCase();
                  const nameB = b.title?.toUpperCase();

                  if (nameA && nameB) {
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  }
                  return 0;
                }).map((book) => (
                  <BookListCard key={book.key} book={book} />
                ))}
              </ul>
            )}

            <p className="text-center text-sm text-amber-700/70">
              author key: {currentAuthor.key}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
