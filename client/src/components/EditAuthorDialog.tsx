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
