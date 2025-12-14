import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { EditionType } from "../types/types";
import { IoClose } from "react-icons/io5";

// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function CreateNewAuthorDialog() {
  const allBooks = useLoaderData<EditionType[]>();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [authorInfo, setAuthorInfo] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    bio: "",
    birth_date: "",
    death_date: "",
    image_url: "",
    books: [],
  });

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

  const [books, setBooks] = useState<EditionType[]>([]);
  const [bookKeys, setBookKeys] = useState<string[]>([]);

  // put all selected books' keys into its own state for easier submission to server.
  useEffect(() => {
    const bookKeys = [];

    for (const book of books) {
      bookKeys.push(book.key);
    }

    setBookKeys(bookKeys);
  }, [books]);

  useEffect(() => {
    console.log(bookKeys);
  }, [bookKeys]);

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate(`/${pathName}/authors?${searchParams.toString()}`)
      }
      className="relative z-50 max-w-screen overflow-y-scroll"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-full max-w-125 justify-self-center overflow-y-scroll p-4">
        <DialogPanel className="h-fit w-full rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-amber-500">
              Create New Author
            </DialogTitle>

            <IoClose
              onClick={() =>
                navigate(`/${pathName}/authors?${searchParams.toString()}`)
              }
              className="size-8 shrink-0 cursor-pointer"
            />
          </div>

          <hr className="my-2" />

          <Form
            action={`/${pathName}/authors/add-new`}
            method="post"
            className="flex flex-col gap-2"
          >
            <div>
              <label
                htmlFor="author-first-name"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                First Name:
              </label>
              <input
                type="text"
                id="author-first-name"
                name="author-first-name"
                value={authorInfo.first_name}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }));
                }}
                placeholder="First name..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-middle-name"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Middle Name:
              </label>
              <input
                type="text"
                id="author-middle-name"
                name="author-middle-name"
                value={authorInfo.middle_name}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    middle_name: e.target.value,
                  }));
                }}
                placeholder="Middle name..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-last-name"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="author-last-name"
                name="author-last-name"
                value={authorInfo.last_name}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }));
                }}
                placeholder="Last name..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-bio"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Bio:
              </label>
              <textarea
                id="author-bio"
                name="author-bio"
                value={authorInfo.bio}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }));
                }}
                placeholder="Bio..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-birth-date"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Birth Date:
              </label>
              <input
                type="text"
                id="author-birth-date"
                name="author-birth-date"
                value={authorInfo.birth_date}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    birth_date: e.target.value,
                  }));
                }}
                placeholder="Birth date..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-death-date"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Death Date:
              </label>
              <input
                type="text"
                id="author-death-date"
                name="author-death-date"
                value={authorInfo.death_date}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    death_date: e.target.value,
                  }));
                }}
                placeholder="Death date..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-image-url"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Image URL:
              </label>
              <input
                type="text"
                id="author-image-url"
                name="author-image-url"
                value={authorInfo.image_url}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    image_url: e.target.value,
                  }));
                }}
                placeholder="Image URL..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            {/* books */}
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-orange-400">
                Book{bookKeys.length > 1 && "s"}:
              </p>

              <div className="mb-2 flex flex-row flex-wrap gap-2">
                {books.map((thisBook) => {
                  return (
                    <div
                      key={thisBook.key}
                      className="flex w-fit flex-row flex-wrap items-center gap-1 rounded-xl bg-orange-700/75 py-0 pr-2 pl-3 hover:bg-orange-700/90"
                    >
                      <p>{thisBook.title}</p>
                      <p
                        className="ml-1 cursor-pointer text-2xl text-amber-950/75 hover:text-amber-950"
                        onClick={() => {
                          setBooks(
                            books.filter((book) => book.key !== thisBook.key),
                          );
                        }}
                      >
                        🅧
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-1 mb-2 flex w-full flex-col gap-1 border-l-2 border-l-orange-800 pl-3">
                <label htmlFor="book-select">Add a book:</label>
                <select
                  name="book-select"
                  id="book-select"
                  className="h-8 rounded-md bg-linear-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-950 shadow-xs/50 focus:outline-2 focus:outline-offset-1 focus:outline-orange-600"
                  onChange={(e) => {
                    const selectedBook = allBooks.find(
                      (book) => book.key === e.target.value,
                    );
                    if (selectedBook) {
                      setBooks([...books, selectedBook]);
                    }
                  }}
                >
                  <option value="">--Select a book--</option>
                  {allBooks
                    .filter((book) => !bookKeys.includes(book.key))
                    .map((book: EditionType) => {
                      return (
                        <option value={book.key} key={book.key}>
                          {book.title}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {bookKeys.map((key) => (
              <input
                key={key}
                type="hidden"
                id="author-book-keys"
                name="author-book-keys"
                value={key}
              />
            ))}

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-orange-400 py-2 text-xl text-orange-950 shadow-sm/25 hover:bg-amber-500 hover:text-amber-950 active:bg-amber-700 active:text-darkbrown active:inset-shadow-xs/33"
            >
              Create New Author!
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
