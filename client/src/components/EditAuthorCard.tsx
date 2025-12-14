// import { Author, Book } from "../types/types";
// import { useEffect, useState } from "react";
// import { Form, Link, useLoaderData, useSearchParams, useLocation } from "react-router";

// // component at '/authors/:author_id/edit'.
// export default function EditAuthorCard() {
//     // fetchAuthorById() loader function provides author based on the author_id param in the URL.
//     let authorAndAllBooks = useLoaderData();
//     let author: Author = authorAndAllBooks.author;
//     let allBooks: Book[] = authorAndAllBooks.allBooks;

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

//     // put this specific author's books into state. if a user selects another book from the <select> element, it adds that book to state, so all selected books can be displayed and then sent to the server in order to edit this author's books.
//     const [books, setBooks] = useState(author.books);
//     const [bookIds, setBookIds] = useState<string[]>([]);

//     // put all selected books' ids into its own state for easier submission to server.
//     useEffect(() => {
//         const bookIds = [];
//         for (const book of books) {
//             bookIds.push(book.book_id);
//         }
//         setBookIds(bookIds);
//     }, [books]);

//     return (
//         <div className="m-2 p-4 min-w-50 w-full max-w-200 h-fit sticky top-0 text-orange-950 bg-orange-200 border-1 border-amber-700 rounded-lg">
//             <Form
//                 // sends formData to the editAuthorAction() function.
//                 action={`/${pathName}/authors/${author.author_id}?${searchParams.toString()}`}
//                 method="post"
//             >
//                 {/* form fields */}
//                 <div className="flex flex-col gap-2 w-full pb-2 border-b-1 border-b-orange-800/40">

//                     {/* author name fields */}
//                     <div className="flex flex-col">
//                         <label
//                             htmlFor="first-name"
//                             className="text-lg font-semibold"
//                         >
//                             First name:
//                         </label>
//                         <input
//                             type="text"
//                             name="first_name"
//                             id="first-name"
//                             defaultValue={author.first_name}
//                             placeholder="First name"
//                             className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                         />

//                         <label
//                             htmlFor="middle-name"
//                             className="text-lg font-semibold"
//                         >
//                             Middle name:
//                         </label>
//                         <input
//                             type="text"
//                             name="middle_name"
//                             id="middle-name"
//                             defaultValue={author.middle_name}
//                             placeholder="Middle name"
//                             className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                         />

//                         <label
//                             htmlFor="last-name"
//                             className="text-lg font-semibold"
//                         >
//                             Last name:
//                         </label>
//                         <input
//                             type="text"
//                             name="last_name"
//                             id="last-name"
//                             defaultValue={author.last_name}
//                             placeholder="Last name"
//                             className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs inset-shadow-black/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                         />
//                         <input
//                             type="hidden"
//                             name="author_id"
//                             defaultValue={author.author_id}
//                         />
//                     </div>

//                     {/* books */}
//                     <div className="flex flex-col">
//                         <p className="text-lg font-semibold">Book{books.length! > 1 && 's'}:</p>

//                         <div
//                             className="flex flex-row flex-wrap gap-2 mb-2"
//                         >
//                             {books.map((book) => {
//                                 return (
//                                     <div
//                                         key={book.book_id}
//                                         className="flex flex-row gap-1 items-center w-fit pl-3 pr-2 py-1 bg-orange-700/75 rounded-xl leading-5 hover:bg-orange-700/90"
//                                     >
//                                         <p>
//                                         {book.title}
//                                         </p>
//                                         <p
//                                             className="ml-1 text-2xl text-amber-950/75 cursor-pointer hover:text-amber-950"
//                                             onClick={() => {
//                                                 setBooks(books.filter((b) => b.book_id !== book.book_id))
//                                             }}
//                                         >
//                                             🅧
//                                         </p>
//                                     </div>
//                                 )
//                             })}
//                         </div>

//                         <div className="flex flex-col gap-1 w-full mt-1 mb-2 pl-3 border-l-2 border-l-orange-800">
//                             <label htmlFor="book-select">Add a book:</label>
//                             <select
//                                 name="book-select"
//                                 id="book-select"
//                                 className="bg-orange-100 rounded-md h-8 focus:outline-2 focus:outline-orange-600"
//                                 onChange={(e) => {
//                                     const selectedBook = allBooks.find((b) => b.book_id === e.target.value);
//                                     if (selectedBook) {
//                                         setBooks([...books, selectedBook])
//                                     }
//                                 }}
//                             >
//                                 <option value=''>--Select a Book--</option>
//                                 {allBooks.filter((b) => !bookIds.includes(b.book_id)).map((book: Book) => {
//                                     return (
//                                         <option
//                                             value={book.book_id}
//                                             key={book.book_id}
//                                         >
//                                             {book.title}
//                                         </option>
//                                     );
//                                 })}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 <input
//                     type='hidden'
//                     name='bookIds'
//                     value={bookIds}
//                 />

//                 <div className="w-full flex flex-row gap-2 items-stretch mt-4 text-lg">
//                     <Link
//                         to={`/${pathName}/authors/${author.author_id}?${searchParams.toString()}`}
//                         className="w-full h-12 text-center content-center px-2 rounded-md cursor-pointer hover:bg-orange-800/25 hover:inset-shadow-xs active:bg-orange-800/50 active:inset-shadow-sm/30"
//                     >
//                         Cancel
//                     </Link>
//                     <Link
//                         to={`/${pathName}/authors/${author.author_id}/delete?${searchParams.toString()}`}
//                         className="w-full h-12 text-center content-center p-2 leading-4 cursor-pointer rounded-md bg-rose-300 border-1 border-rose-700 text-rose-950 hover:bg-rose-400/90 hover:text-darkbrown active:bg-rose-600/70 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     >
//                         Delete Author
//                     </Link>
//                     <button
//                         type="submit"
//                         className="w-full h-12 text-center content-center p-2 leading-4 cursor-pointer rounded-md bg-orange-100 border-1 border-orange-700 text-orange-950 hover:bg-orange-50 hover:text-darkbrown active:bg-orange-700/50 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     >
//                         Confirm Changes
//                     </button>
//                 </div>
//             </Form>
//         </div>
//     );
// }
