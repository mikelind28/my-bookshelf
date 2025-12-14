// import { Book } from "../types/types";
// import { useState, useEffect } from "react";
// import { Form, Link, useLoaderData, useSearchParams, useLocation } from "react-router";

// // component at '/books/:book_id/delete'.
// export default function DeleteBookCard() {
//     // book fetched from fetchBookById() loader.
//     let book: Book = useLoaderData();

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

//     return (
//         <div className="m-2 p-4 w-full max-w-200 h-fit sticky top-0 text-rose-950 bg-rose-200 border-2 border-rose-800 rounded-md">
//             { book ?
//                 <div>
//                     <div className="flex flex-row justify-between pb-2 border-b-1 border-b-rose-950/30">
//                         <div>
//                             <h1 className="text-2xl font-semibold">{book.title}</h1>
//                             <h2 className="text-xl text-rose-900/75 italic leading-6">{book.subtitle}</h2>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-1 my-3">
//                         <div className="flex flex-row gap-2 mt-1 mb-2">
//                             {
//                                 book.owned ?
//                                 <p className="w-fit bg-green-400/50 px-2 text-green-700 border-1 border-green-600 rounded-md">
//                                     Owned
//                                 </p>
//                                 :
//                                 <p className="w-fit bg-red-400/50 px-2 text-red-700 border-1 border-red-600 rounded-md">
//                                     Not Owned
//                                 </p>
//                             }
//                             {
//                                 book.read ?
//                                 <p className="w-fit bg-green-400/50 px-2 text-green-700 border-1 border-green-600 rounded-md">
//                                     Read
//                                 </p>
//                                 :
//                                 <p className="w-fit bg-red-400/50 px-2 text-red-700 border-1 border-red-600 rounded-md">
//                                     Not Read
//                                 </p>
//                             }
//                         </div>
//                         <p>Author{book.authors.length > 1 && 's'}:{' '}
//                             {book.authors.map((author) => {
//                                 const comma = (book.authors.indexOf(author) !== (book.authors.length - 1) ? ', ' : '');
//                                 return (
//                                     <span key={author.author_id}>
//                                         {`${author.first_name ? author.first_name : ''} ${author.middle_name ? author.middle_name : ''} ${author.last_name}`}
//                                         {comma}
//                                     </span>
//                                 )
//                             })}
//                         </p>
//                         <p>Published: {book.publication_year}</p>
//                     </div>

//                     <p className="my-4 text-center text-sm text-neutral-400">book id: {book.book_id}</p>

//                     <Form action={`/${pathName}/books?${searchParams.toString()}`} method="post" className="flex flex-col mt-4 p-4 bg-rose-100 border-1 border-rose-500 rounded-sm shadow-sm">
//                         <b className="text-rose-900 text-center">Are you sure you want to delete this book?</b>

//                         <div className="flex flex-row gap-4 justify-center items-stretch text-lg mt-2">
//                             <Link
//                                 to={`/${pathName}/books/${book.book_id}/edit?${searchParams.toString()}`}
//                                 className="w-full px-2 py-1 text-center cursor-pointer bg-rose-50 rounded-md border border-rose-900/50 hover:bg-white active:bg-neutral-200 active:inset-shadow-sm/25"
//                             >
//                                 Cancel
//                             </Link>
//                             <input
//                                 type="submit"
//                                 value="Delete Book"
//                                 className="w-full px-2 py-1 text-center cursor-pointer rounded-md bg-rose-300 border-1 border-rose-700 text-rose-950 hover:bg-rose-400/90 hover:text-darkbrown active:bg-rose-600/70 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                             />
//                         </div>

//                         <input
//                             type="hidden"
//                             name="book_id"
//                             value={book.book_id}
//                         />
//                     </Form>
//                 </div>
//                 :
//                 <p>this book was not found</p>
//             }

//         </div>
//     );
// }
