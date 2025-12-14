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
import { Author, EditionType } from "../types/types";
import { IoClose } from "react-icons/io5";

// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function CreateNewBookDialog() {
  const allAuthors = useLoaderData<Author[]>();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [editionInfo, setEditionInfo] = useState<EditionType>({
    key: "",
    title: undefined,
    subtitle: undefined,
    isbn_13: undefined,
    isbn_10: undefined,
    publish_date: undefined,
    description: undefined,
    coverUrl: undefined,
    owned: false,
    read: false,
    authors: [],
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

  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorKeys, setAuthorKeys] = useState<string[]>([]);

  // put all selected authors' keys into its own state for easier submission to server.
  useEffect(() => {
    const authorKeys = [];

    for (const author of authors) {
      authorKeys.push(author.key);
    }

    setAuthorKeys(authorKeys);
  }, [authors]);

  useEffect(() => {
    console.log(authorKeys);
  }, [authorKeys]);

  return (
    <Dialog
      open={true}
      onClose={() => navigate(`/${pathName}/books?${searchParams.toString()}`)}
      className="relative z-50 max-w-screen overflow-y-scroll"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-full max-w-125 justify-self-center overflow-y-scroll p-4">
        <DialogPanel className="h-fit w-full rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-amber-500">
              Create New Book
            </DialogTitle>

            <IoClose
              onClick={() =>
                navigate(`/${pathName}/books?${searchParams.toString()}`)
              }
              className="size-8 shrink-0 cursor-pointer"
            />
          </div>

          <hr className="my-2" />

          <Form
            action={`/${pathName}/books/add-new`}
            method="post"
            className="flex flex-col gap-2"
          >
            <div>
              <label
                htmlFor="edition-title"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Title:
              </label>
              <input
                type="text"
                id="edition-title"
                name="edition-title"
                value={editionInfo.title}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
                placeholder="Title..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="edition-subtitle"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Subtitle:
              </label>
              <textarea
                id="edition-subtitle"
                name="edition-subtitle"
                value={editionInfo.subtitle}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }));
                }}
                placeholder="Subtitle..."
                rows={3}
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            {/* authors */}
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-orange-400">
                Author{authorKeys.length > 1 && "s"}:
              </p>

              <div className="mb-2 flex flex-row flex-wrap gap-2">
                {authors.map((thisAuthor) => {
                  return (
                    <div
                      key={thisAuthor.key}
                      className="flex w-fit flex-row flex-wrap items-center gap-1 rounded-xl bg-orange-700/75 py-0 pr-2 pl-3 hover:bg-orange-700/90"
                    >
                      <p>{thisAuthor.name}</p>
                      <p
                        className="ml-1 cursor-pointer text-2xl text-amber-950/75 hover:text-amber-950"
                        onClick={() => {
                          setAuthors(
                            authors.filter((a) => a.key !== thisAuthor.key),
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
                <label htmlFor="author-select">Add an author:</label>
                <select
                  name="author-select"
                  id="author-select"
                  className="h-8 rounded-md bg-linear-to-b from-orange-100 via-orange-200 to-orange-300 text-orange-950 shadow-xs/50 focus:outline-2 focus:outline-offset-1 focus:outline-orange-600"
                  onChange={(e) => {
                    const selectedAuthor = allAuthors.find(
                      (a) => a.key === e.target.value,
                    );
                    if (selectedAuthor) {
                      setAuthors([...authors, selectedAuthor]);
                    }
                  }}
                >
                  <option value="">--Select an author--</option>
                  {allAuthors
                    .filter((a) => !authorKeys.includes(a.key))
                    .map((author: Author) => {
                      return (
                        <option value={author.key} key={author.key}>
                          {author.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {authorKeys.map((key) => (
              <input
                key={key}
                type="hidden"
                id="edition-author-keys"
                name="edition-author-keys"
                value={key}
              />
            ))}

            <div>
              <label
                htmlFor="edition-publish-date"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Publish date:
              </label>
              <input
                type="text"
                id="edition-publish-date"
                name="edition-publish-date"
                value={editionInfo.publish_date}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    publish_date: e.target.value,
                  }));
                }}
                placeholder="Publish date..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="edition-description"
                className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Description:
              </label>
              <textarea
                id="edition-description"
                name="edition-description"
                value={
                  typeof editionInfo.description === "string"
                    ? editionInfo.description
                    : editionInfo.description?.value
                }
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                placeholder="Description..."
                rows={4}
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div>
              <label
                htmlFor="edition-cover-url"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Cover URL:
              </label>
              <input
                type="text"
                id={`edition-cover-url`}
                name={`edition-cover-url`}
                value={editionInfo.coverUrl}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    coverUrl: e.target.value,
                  }));
                }}
                placeholder="Cover URL..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <label
              htmlFor="edition-isbn-10"
              className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              ISBN-10:
            </label>
            <input
              type="text"
              id={`edition-isbn-10`}
              name={`edition-isbn-10`}
              value={editionInfo.isbn_10}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  isbn_10: e.target.value,
                }));
              }}
              placeholder="ISBN-10..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <div>
              <label
                htmlFor="edition-isbn-13"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                ISBN-13:
              </label>
              <input
                type="text"
                id={`edition-isbn-13`}
                name={`edition-isbn-13`}
                value={editionInfo.isbn_13}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    isbn_13: e.target.value,
                  }));
                }}
                placeholder="ISBN-13..."
                className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div className="flex w-25 items-center justify-between">
              <label
                htmlFor="edition-owned"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Owned?
              </label>
              <input
                type="checkbox"
                id="edition-owned"
                name="edition-owned"
                checked={editionInfo.owned}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    owned: e.target.checked,
                  }));
                }}
                className="size-4 cursor-pointer appearance-none rounded-sm bg-orange-100 checked:cursor-default checked:bg-orange-700 checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
              />
            </div>

            <div className="flex w-25 items-center justify-between">
              <label
                htmlFor="edition-read"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Read?
              </label>
              <input
                type="checkbox"
                id="edition-read"
                name="edition-read"
                checked={editionInfo.read}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    read: e.target.checked,
                  }));
                }}
                className="size-4 cursor-pointer appearance-none rounded-sm bg-orange-100 checked:cursor-default checked:bg-orange-700 checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
              />
            </div>

            {/* 
                        {edition.publishers && 
                            edition.publishers.map((publisher, index) => (
                                <input
                                    key={index}
                                    type='hidden'
                                    id={`edition-publishers`}
                                    name={`edition-publishers`}
                                    value={publisher.name}
                                />
                            ))
                        } 
                        */}

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-orange-400 py-2 text-xl text-orange-950 shadow-sm/25 hover:bg-amber-500 hover:text-amber-950 active:bg-amber-700 active:text-darkbrown active:inset-shadow-xs/33"
            >
              Create New Book!
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
