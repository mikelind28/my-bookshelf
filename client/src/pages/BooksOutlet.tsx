// import { Book } from "../types/types";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { Outlet, useActionData, useLoaderData, useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router";
// import BookDeleted from "../components/BookDeleted";
// // import BookList from "../components/Lists/BookList";

// // TODO: add rankings for 'want to read' books?

// export default function BooksOutlet() {
//     // the loader provides an array of all books returned from the server.
//     let books: Book[] = useLoaderData();

//     let deletedBook = useActionData();

//     // deletedBook for style testing:
//     // let deletedBook = {
//     //     message: 'test',
//     //     book_id: 'string',
//     //     title: 'string',
//     //     subtitle: 'string',
//     // }

//     const [searchTerm, setSearchTerm] = useOutletContext<[ searchTerm: string, setSearchTerm: Dispatch<SetStateAction<string>>]>();

//     // track the existing URL search params to enable filtering.
//     const [searchParams] = useSearchParams();

//     const params = useParams();
//     const navigate = useNavigate();

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

//     // any time there's a change in 'books' from the loader, the book_id from the URL, the search params from the URL, or a navigation, run this effect.
//     useEffect(() => {
//         if (params.book_id) {
//             if (books.length > 0) {
//                 if (books.find((b) => b.book_id === params.book_id) === undefined) {
//                     navigate(`/${pathName}/books/${books[0].book_id}?${searchParams.toString()}`);
//                 }
//             }
//         }
//     }, [books, searchParams]);

//     return (
//         <>
//             <div className="relative w-full">
//                 <div className="z-0 relative flex w-full max-w-screen">
//                     <Outlet context={{
//                         books: books,
//                         deletedBook: deletedBook,
//                         searchTerm: searchTerm,
//                         setSearchTerm: setSearchTerm
//                     }}/>
//                 </div>
//             </div>
//             {
//                 deletedBook &&
//                 <div className="absolute flex justify-center w-full">
//                     <BookDeleted deletedBook={deletedBook} />
//                 </div>
//             }
//         </>
//     );
// }
