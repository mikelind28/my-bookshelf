// import { Form, useLoaderData, useLocation, useNavigate } from "react-router";
// import { Book } from "../types/types";
// import { useEffect, useState } from "react";

// // component at '/my-books/authors/add-new'.
// export default function AddNewAuthor() {
//     // uses fetchAllBooks() loader so that user can select books to link to this new author.
//     const books: Book[] = useLoaderData();

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

//     const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
//     const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

//     // navigate function allows users to go back 1 page in the history stack by clicking 'Cancel'.
//     const navigate = useNavigate();

//     return (
//         <div className="m-2 p-4 w-full max-w-200 h-fit sticky top-0 text-orange-950 bg-orange-200 border border-amber-700 rounded-lg">
//             <h1 className="text-2xl font-semibold mb-2 pb-1 border-b border-b-orange-900/25">Add New Author</h1>
//             <Form
//                 // sends formData to addNewAuthor() action function.
//                 action={`/${pathName}/authors/add-new`}
//                 method="post"
//                 className="flex flex-col"
//             >
//                 <input
//                     type="text"
//                     name="first_name"
//                     placeholder="First Name"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />
//                 <input
//                     type="text"
//                     name="middle_name"
//                     placeholder="Middle Name"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />
//                 <input
//                     type="text"
//                     name="last_name"
//                     placeholder="Last Name"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />

//                 <p className="my-2 text-xl font-semibold">Book(s):</p>
//                 <div
//                     className="flex flex-row flex-wrap gap-2 mb-2"
//                 >
//                     {selectedBooks.map((selectedBook) => {
//                         return (
//                             <div
//                                 key={selectedBook.key}
//                                 className="flex flex-row gap-1 flex-wrap items-center w-fit pl-3 pr-2 py-0 bg-orange-700/75 rounded-xl hover:bg-orange-700/90"
//                             >
//                                 <p>
//                                 {selectedBook.title}
//                                 </p>
//                                 <p
//                                     className="ml-1 text-2xl text-amber-950/75 cursor-pointer hover:text-amber-950"
//                                     onClick={() => {
//                                         setSelectedBooks(selectedBooks.filter((b) => b.key !== selectedBook.key));
//                                         setSelectedBookIds(selectedBookIds.filter((bId) => bId !== selectedBook.key));
//                                     }}
//                                 >
//                                     🅧
//                                 </p>
//                             </div>
//                         )
//                     })}
//                 </div>

//                 <input
//                     type='hidden'
//                     name='selectedBookIds'
//                     value={selectedBookIds}
//                 />

//                 <div className="flex flex-col gap-1 w-full mt-1 mb-2 pl-3 border-l-2 border-l-orange-800">
//                     <label htmlFor="books">Add a book:</label>

//                     <select
//                         name="books"
//                         id="books"
//                         className="w-full bg-orange-100 rounded-md h-8 focus:outline-2 focus:outline-orange-600"
//                         onChange={(e) => {
//                             setSelectedBookIds([...selectedBookIds, e.target.value]);
//                             const book = books.find((book) => book.key === e.target.value);
//                             if (book) {
//                                 setSelectedBooks([...selectedBooks, book]);
//                             }
//                         }}
//                     >
//                         <option value="">--Select a book--</option>
//                         {books.filter((b) => !selectedBookIds.includes(b.key)).map((book) => {
//                             return (
//                                 <option key={book.key} value={book.key}>
//                                     {book.title}
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>

//                 <div className="w-full flex flex-row gap-2 items-stretch mt-4 text-lg">
//                     <button
//                         type='button'
//                         className="w-full h-12 content-center px-2 rounded-md cursor-pointer hover:bg-orange-800/25 hover:inset-shadow-xs active:bg-orange-800/50 active:inset-shadow-sm/30"
//                         onClick={() => navigate(`/${pathName}/authors`)}
//                     >
//                         Cancel
//                     </button>
//                     <input
//                         type="submit"
//                         value="Add Author"
//                         className="w-full h-12 p-2 leading-4 text-center cursor-pointer rounded-md bg-orange-100 border border-orange-700 text-orange-950 hover:bg-orange-50 hover:text-darkbrown active:bg-orange-700/50 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     />
//                 </div>
//             </Form>
//         </div>
//     );
// }
