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

// TODO: update 'owned' and 'read' radio inputs to look like the green/red tags.
// TODO: add a 'book updated' card after successful update. return data from action, access it with useActionData(). display with {actionData && ...}.
// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function EditBookDialog() {
  const { book, allAuthors } = useLoaderData<{
    book: EditionType;
    allAuthors: Author[];
  }>();

  const navigate = useNavigate();

  const [editionInfo, setEditionInfo] = useState<EditionType>(book);

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

  // put this specific book's authors into state. if a user selects another author from the <select> element, it adds that author to state, so all selected authors can be displayed and then sent to the server in order to edit this book's authors.
  const [authors, setAuthors] = useState(book.authors ? book.authors : []);
  const [authorKeys, setAuthorKeys] = useState<string[]>([]);

  // put all selected authors' keys into its own state for easier submission to server.
  useEffect(() => {
    const authorKeys = [];

    for (const author of authors) {
      authorKeys.push(author.key);
    }

    setAuthorKeys(authorKeys);
  }, [authors]);

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
        <DialogPanel className="h-fit w-full rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-amber-500">
              Edit Book
            </DialogTitle>

            <IoClose
              onClick={() =>
                navigate(
                  `/${pathName}/books/${book.key.replace("/books/", "")}`,
                )
              }
              className="size-8 shrink-0 cursor-pointer"
            />
          </div>

          <hr className="my-2" />

          <Form
            action={`/${pathName}/books/${book.key.replace("/books/", "")}/edit`}
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
                Author{authors.length > 1 && "s"}:
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
              Submit Changes
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

// import type { Author, Book } from "../types/types";
// import { useEffect, useState } from "react";
// import { Form, Link, useLoaderData, useLocation, useSearchParams } from "react-router";

// // this is the component at '/my-books/books/:book_id/edit'.
// export default function EditBookCard() {
//     // fetch the specific book from BookCard, and all existing authors, using fetchBookByIdAndAllAuthors() loader function.
//     let bookAndAllAuthors = useLoaderData();
//     let book: Book = bookAndAllAuthors.book;
//     let allAuthors: Author[] = bookAndAllAuthors.allAuthors;

//     const [searchParams] = useSearchParams();
//     const location = useLocation();
//     const [pathName, setPathName] = useState('');

//     useEffect(() => {
//         if (location.pathname.includes('/my-books')) {
//             setPathName('my-books');
//         }

//         if (location.pathname.includes('/wish-list')) {
//             setPathName('wish-list');
//         }
//     }, [location]);

//     // put this specific book's authors into state. if a user selects another author from the <select> element, it adds that author to state, so all selected authors can be displayed and then sent to the server in order to edit this book's authors.
//     const [authors, setAuthors] = useState(book.authors);
//     const [authorIds, setAuthorIds] = useState<string[]>([]);

//     const [owned, setOwned] = useState(book.owned);

//     // put all selected authors' ids into its own state for easier submission to server.
//     useEffect(() => {
//         const authorIds = [];
//         for (const author of authors) {
//             authorIds.push(author.author_id);
//         }
//         setAuthorIds(authorIds);
//     }, [authors]);

//     return (
//         <div className="m-2 p-4 w-full max-w-200 h-fit sticky top-0 text-orange-950 bg-orange-200 border-1 border-amber-700 rounded-lg">
//             <Form
//                 // submit all formData to the editBookAction at '/my-books/books/:book_id'.
//                 action={`/${owned ? 'my-books' : 'wish-list'}/books/${book.book_id}?${searchParams.toString()}`}
//                 method="post"
//             >
//                 {/* form fields */}
//                 <div className="flex flex-col gap-2 w-full pb-2 border-b-1 border-b-orange-800/40">

//                     {/* book title */}
//                     <div className="flex flex-col">
//                         <label
//                             htmlFor="title"
//                             className="text-lg font-semibold"
//                         >
//                             Title:
//                         </label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             defaultValue={book.title}
//                             className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                         />
//                     </div>

//                     {/* book subtitle */}
//                     <div className="flex flex-col">
//                         <label htmlFor="subtitle" className="text-lg font-semibold">Subtitle:</label>
//                         <input
//                             type="text"
//                             name="subtitle"
//                             id="subtitle"
//                             defaultValue={book.subtitle}
//                             className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-xl italic text-orange-900 border-1 border-orange-950/50 focus:outline-2 focus:outline-orange-600 rounded-md"
//                         />
//                     </div>

//                     {/* authors */}
//                     <div className="flex flex-col">
//                         <p className="text-lg font-semibold">Author{authors.length! > 1 && 's'}:</p>

//                         <div
//                             className="flex flex-row flex-wrap gap-2 mb-2"
//                         >
//                             {authors.map((author) => {
//                                 return (
//                                     <div
//                                         key={author.author_id}
//                                         className="flex flex-row gap-1 flex-wrap items-center w-fit pl-3 pr-2 py-0 bg-orange-700/75 rounded-xl hover:bg-orange-700/90"
//                                     >
//                                         <p>
//                                         {author.first_name} {author.middle_name} {author.last_name}
//                                         </p>
//                                         <p
//                                             className="ml-1 text-2xl text-amber-950/75 cursor-pointer hover:text-amber-950"
//                                             onClick={() => {
//                                                 setAuthors(authors.filter((a) => a.author_id !== author.author_id))
//                                             }}
//                                         >
//                                             🅧
//                                         </p>
//                                     </div>
//                                 )
//                             })}
//                         </div>

//                         <div className="flex flex-col gap-1 w-full mt-1 mb-2 pl-3 border-l-2 border-l-orange-800">
//                             <label htmlFor="author-select">Add an author:</label>
//                             <select
//                                 name="author-select"
//                                 id="author-select"
//                                 className="bg-orange-100 rounded-md h-8 focus:outline-2 focus:outline-orange-600"
//                                 onChange={(e) => {
//                                     const selectedAuthor = allAuthors.find((a) => a.author_id === e.target.value);
//                                     if (selectedAuthor) {
//                                         setAuthors([...authors, selectedAuthor])
//                                     }
//                                 }}
//                             >
//                                 <option value=''>--Select an author--</option>
//                                 {allAuthors.filter((a) => !authorIds.includes(a.author_id)).map((author: Author) => {
//                                     return (
//                                         <option
//                                             value={author.author_id}
//                                             key={author.author_id}
//                                         >
//                                             {author.first_name} {author.middle_name} {author.last_name}
//                                         </option>
//                                     );
//                                 })}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="flex flex-col">
//                         <label htmlFor="publication_year" className="text-lg font-semibold">
//                             Published:
//                         </label>
//                         <input
//                             type="text"
//                             name="publication_year"
//                             id="publication_year"
//                             defaultValue={book?.publication_year}
//                             className="w-fit mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs inset-shadow-black/25 text-orange-900 border-1 border-orange-950/50 focus:outline-2 focus:outline-orange-600 rounded-md"
//                         />
//                     </div>

//                     <fieldset className="flex flex-col mb-2">
//                         <legend className="text-lg font-semibold">Owned?</legend>
//                         <div className="flex flex-row gap-2 items-center">
//                             <input
//                                 type="radio"
//                                 name="owned"
//                                 id="owned"
//                                 value="true"
//                                 defaultChecked={book.owned === true}
//                                 onChange={() => setOwned(true)}
//                                 className="appearance-none size-4 bg-orange-100 rounded-full cursor-pointer checked:cursor-default checked:bg-orange-700 checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
//                             />
//                             <label htmlFor="owned">
//                                 Yes!
//                             </label>
//                         </div>
//                         <div className="flex flex-row gap-2 items-center">
//                             <input
//                                 type="radio"
//                                 name="owned"
//                                 id="not-owned"
//                                 value="false"
//                                 defaultChecked={book.owned === false}
//                                 onChange={() => setOwned(false)}
//                                 className="appearance-none size-4 bg-orange-100 rounded-full cursor-pointer checked:cursor-default checked:bg-orange-700  checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
//                             />
//                             <label htmlFor="not-owned">
//                                 Not yet...
//                             </label>
//                         </div>
//                     </fieldset>

//                     <fieldset className="flex flex-col mb-2">
//                         <legend className="text-lg font-semibold">Read?</legend>
//                         <div className="flex flex-row gap-2 items-center">
//                             <input
//                                 type="radio"
//                                 name="read"
//                                 id="read"
//                                 value="true"
//                                 defaultChecked={book.read === true}
//                                 className="appearance-none size-4 bg-orange-100 rounded-full cursor-pointer checked:cursor-default checked:bg-orange-700 checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
//                             />
//                             <label htmlFor="read">
//                                 Yes!
//                             </label>
//                         </div>
//                         <div className="flex flex-row gap-2 items-center">
//                             <input
//                                 type="radio"
//                                 name="read"
//                                 id="not-read"
//                                 value="false"
//                                 defaultChecked={book.read === false}
//                                 className="appearance-none size-4 bg-orange-100 rounded-full cursor-pointer checked:cursor-default checked:bg-orange-700  checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
//                             />
//                             <label htmlFor="not-read">
//                                 Not yet...
//                             </label>
//                         </div>
//                     </fieldset>
//                 </div>

//                 <input
//                     type="hidden"
//                     name="book_id"
//                     defaultValue={book.book_id}
//                 />

//                 <input
//                     type="hidden"
//                     name="authorIds"
//                     value={authorIds}
//                 />

//                 <div className="w-full flex flex-row gap-2 items-stretch mt-4 text-lg">
//                     <Link
//                         to={`/${pathName}/books/${book.book_id}?${searchParams.toString()}`}
//                         className="w-full h-12 text-center content-center px-2 rounded-md cursor-pointer hover:bg-orange-800/25 hover:inset-shadow-xs active:bg-orange-800/50 active:inset-shadow-sm/30"
//                     >
//                         Cancel
//                     </Link>
//                     <Link
//                         to={`/${pathName}/books/${book.book_id}/delete?${searchParams.toString()}`}
//                         className="w-full h-12 p-2 content-center leading-4 text-center cursor-pointer rounded-md bg-rose-300 border-1 border-rose-700 text-rose-950 hover:bg-rose-400/90 hover:text-darkbrown active:bg-rose-600/70 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     >
//                         Delete Book
//                     </Link>
//                     <button
//                         type="submit"
//                         className="w-full h-12 p-2 leading-4 text-center content-center cursor-pointer rounded-md bg-orange-100 border-1 border-orange-700 text-orange-950 hover:bg-orange-50 hover:text-darkbrown active:bg-orange-700/50 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     >
//                         Confirm Changes
//                     </button>
//                 </div>
//             </Form>
//         </div>
//     );
// }
