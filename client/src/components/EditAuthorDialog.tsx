import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { Form, useLoaderData, useLocation, useNavigate } from "react-router";
import { Author, EditionType } from "../types/types";
import { IoClose } from "react-icons/io5";

// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function EditAuthorDialog() {
  const { author, allBooks } = useLoaderData<{
    author: Author;
    allBooks: EditionType[];
  }>();

  const navigate = useNavigate();

  const [authorInfo, setAuthorInfo] = useState<Author>(author);

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

  // put this specific author's books into state. if a user selects another book from the <select> element, it adds that book to state, so all selected books can be displayed and then sent to the server in order to edit this author's books.
  const [books, setBooks] = useState(author.books ? author.books : []);
  const [bookKeys, setBookKeys] = useState<string[]>([]);

  // put all selected books' keys into its own state for easier submission to server.
  useEffect(() => {
    const bookKeys = [];

    for (const book of books) {
      bookKeys.push(book.key);
    }

    setBookKeys(bookKeys);
  }, [books]);

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate(`/${pathName}/authors/${author.key.replace("/authors/", "")}`)
      }
      className="relative z-50 max-w-screen overflow-y-scroll"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-full max-w-125 justify-self-center overflow-y-scroll p-4">
        <DialogPanel className="h-fit w-full rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-amber-500">
              Edit Author
            </DialogTitle>

            <IoClose
              onClick={() =>
                navigate(
                  `/${pathName}/authors/${author.key.replace("/authors/", "")}`,
                )
              }
              className="size-8 shrink-0 cursor-pointer"
            />
          </div>

          <hr className="my-2" />

          <Form
            action={`/${pathName}/authors/${author.key.replace("/authors/", "")}/edit`}
            method="post"
            className="flex flex-col gap-2"
          >
            <div>
              <label
                htmlFor="author-name"
                className="text-lg font-semibold text-orange-400"
              >
                Name:
              </label>
              <input
                type="text"
                id="author-name"
                name="author-name"
                value={authorInfo.name}
                onChange={(e) => {
                  setAuthorInfo((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                placeholder="Name..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-birth-date"
                className="text-lg font-semibold text-orange-400"
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
                placeholder="Birth Date..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-death-date"
                className="text-lg font-semibold text-orange-400"
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
                placeholder="Death Date..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-bio"
                className="text-lg font-semibold text-orange-400"
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
                rows={4}
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="author-image-url"
                className="text-lg font-semibold text-orange-400"
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
                Book{books.length > 1 && "s"}:
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
                          setBooks(books.filter((b) => b.key !== thisBook.key));
                        }}
                      >
                        🅧
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-1 mb-2 flex w-full flex-col gap-1 border-l-2 border-l-orange-800 pl-3">
                <label htmlFor="author-select">Add a book:</label>
                <select
                  name="book-select"
                  id="book-select"
                  className="h-8 rounded-md bg-linear-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-950 shadow-xs/50 focus:outline-2 focus:outline-offset-1 focus:outline-orange-600"
                  onChange={(e) => {
                    const selectedBook = allBooks.find(
                      (b) => b.key === e.target.value,
                    );
                    if (selectedBook) {
                      setBooks([...books, selectedBook]);
                    }
                  }}
                >
                  <option value="">--Select a book--</option>
                  {allBooks
                    .filter((b) => !bookKeys.includes(b.key))
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
              Submit Changes
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
