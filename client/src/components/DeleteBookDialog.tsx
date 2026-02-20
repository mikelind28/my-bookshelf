import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import {
  Form,
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import { EditionType } from "../types/types";
import { IoClose } from "react-icons/io5";
import { FaBook } from "react-icons/fa";

// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function DeleteBookDialog() {
  const book = useLoaderData<EditionType>();

  const navigate = useNavigate();

  const location = useLocation();

  const [pathName, setPathName] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate(`/${pathName}/books/${book.key.replace("/books/", "")}`)
      }
      className="relative z-50 max-w-screen overflow-y-scroll"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-full max-w-125 justify-self-center overflow-y-scroll p-4">
        <DialogPanel className="h-fit w-full overflow-y-auto rounded-sm border border-red-400/33 bg-red-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex justify-between">
            <DialogTitle className="text-2xl font-semibold text-orange-500">
              Are you sure you want to delete this book?
            </DialogTitle>

            <button
              type='button'
              onClick={() =>
                navigate(
                  `/${pathName}/books/${book.key.replace("/books/", "")}`,
                )
              }
            >
              <IoClose
                className="size-8 shrink-0"
              />
            </button>
          </div>

          <hr className="my-2 text-orange-500" />

          <Form
            action={`/${pathName}/books/${book.key.replace("/books/", "")}/delete`}
            method="post"
            className="flex flex-col gap-2"
          >
            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                {book.owned ? (
                  <p className="w-fit rounded-md border border-green-600 bg-green-400/25 px-2 text-green-600">
                    Owned
                  </p>
                ) : (
                  <p className="w-fit rounded-md border border-red-600 bg-red-400/25 px-2 text-red-600">
                    Not Owned
                  </p>
                )}
                {book.read ? (
                  <p className="w-fit rounded-md border border-green-600 bg-green-400/25 px-2 text-green-600">
                    Read
                  </p>
                ) : (
                  <p className="w-fit rounded-md border border-red-600 bg-red-400/25 px-2 text-red-600">
                    Not Read
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 border-b border-b-orange-600/50 pb-3">
              <div className="h-full shrink-0">
                {(!imageLoaded || !book.coverUrl) && (
                  <FaBook className="size-30 shrink-0 text-orange-800/90" />
                )}

                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    className={`h-full w-30 rounded-sm shadow-sm/50 ${!imageLoaded ? "hidden" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                    alt='image of the book cover'
                  />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-2xl leading-7 font-semibold text-amber-500">
                  {book.title}
                </h1>
                <h2 className="text-xl leading-6 text-amber-600 italic">
                  {book.subtitle}
                </h2>
              </div>
            </div>

            <div className="my-3 flex flex-col gap-1">
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 text-orange-500">
                  {book.authors && (
                    <div className="leading-5">
                      Author{book.authors!.length > 1 && "s"}:{" "}
                      {book.authors.map((author, index) => (
                        <Link
                          key={index}
                          to={`/${pathName}/authors/${author.key.replace("/authors/", "")}`}
                          className="text-orange-300"
                        >
                          {author.name}
                          {index !== book.authors!.length - 1 ? ", " : ""}
                        </Link>
                      ))}
                    </div>
                  )}

                  {book.publish_date && (
                    <p className="leading-5 text-shadow-sm/50">
                      Published:
                      <span className="text-orange-300">
                        {` ${book.publish_date}`}
                      </span>
                      {book.publishers && book.publishers.length > 0 && (
                        <span className="text-orange-300">
                          <span className="text-orange-400">{` by `}</span>
                          {`${book.publishers.map((publisher) => publisher.name).join(", ")}`}
                        </span>
                      )}
                    </p>
                  )}

                  {book.description && (
                    <div className="leading-5">
                      <p>
                        Description:{" "}
                        <span className="text-orange-300">
                          {typeof book.description === "string"
                            ? book.description
                            : book.description.value}
                        </span>
                      </p>
                    </div>
                  )}

                  {book.isbn_10 && (
                    <div className="leading-5">
                      <p>
                        ISBN-10:{" "}
                        <span className="text-orange-300">{book.isbn_10}</span>
                      </p>
                    </div>
                  )}

                  {book.isbn_13 && (
                    <div className="leading-5">
                      <p>
                        ISBN-13:{" "}
                        <span className="text-orange-300">{book.isbn_13}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-amber-700/70">
              book key: {book.key}
            </p>

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-red-500 py-2 text-xl text-red-950 shadow-sm/25 hover:bg-red-600 hover:font-semibold hover:text-darkbrown active:bg-amber-700 active:text-darkbrown active:inset-shadow-xs/33"
            >
              Delete
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
