// import { Author } from "../types/types";
// import { useState, useEffect } from "react";
// import { Form, Link, useLoaderData, useLocation, useSearchParams } from "react-router";

// // component at '/authors/:author_id/delete'.
// export default function DeleteAuthorCard() {
//     // gets author from fetchAuthorById() loader function.
//     let author: Author = useLoaderData();

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
//             { author ?
//                 <div>
//                     <div className="flex flex-row justify-between pb-2 border-b-1 border-b-rose-950/30">
//                         <div>
//                             <h1 className="text-2xl font-semibold">
//                                 {author.first_name ? author.first_name : ''} {author.middle_name ? author.middle_name : ''} {author.last_name ? author.last_name : ''}
//                             </h1>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-1 my-3">
//                         <p>Book{author.books.length > 1 && 's'}:{' '}
//                             {author.books.map((book) => {
//                                 const comma = (author.books.indexOf(book) !== (author.books.length - 1) ? ', ' : '');
//                                 return (
//                                     <span key={book.book_id}>
//                                         {`${book.title}`}
//                                         {comma}
//                                     </span>
//                                 )
//                             })}
//                         </p>
//                     </div>

//                     <p className="my-4 text-center text-sm text-neutral-400">author id: {author.author_id}</p>

//                     <Form action={`/${pathName}/authors?${searchParams.toString()}`} method="post" className="flex flex-col mt-4 p-4 bg-rose-100 border-1 border-rose-500 rounded-sm shadow-sm">
//                         <b className="text-rose-900 text-center">Are you sure you want to delete this author?</b>
//                         <input
//                             type="hidden"
//                             name="author_id"
//                             value={author.author_id}
//                         />
//                         <div className="flex flex-row gap-4 justify-center items-stretch text-lg mt-2">
//                             <Link
//                                 to={`/${pathName}/authors/${author.author_id}/edit?${searchParams.toString()}`}
//                                 className="w-full px-2 py-1 text-center cursor-pointer bg-rose-50 rounded-md border border-rose-900/50 hover:bg-white active:bg-neutral-200 active:inset-shadow-sm/25"
//                             >
//                                 Cancel
//                             </Link>
//                             <input
//                                 type="submit"
//                                 value="Delete Author"
//                                 className="w-full px-2 py-1 text-center cursor-pointer rounded-md bg-rose-300 border-1 border-rose-700 text-rose-950 hover:bg-rose-400/90 hover:text-darkbrown active:bg-rose-600/70 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                             />
//                         </div>
//                     </Form>
//                 </div>
//                 :
//                 <p>this author was not found</p>
//             }
//         </div>
//     );
// }
