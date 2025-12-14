// import { Author } from "../types/types";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { Outlet, useActionData, useLoaderData, useNavigate, useOutletContext, useParams, useSearchParams, useLocation } from "react-router";
// import AuthorDeleted from "../components/AuthorDeleted";

// // component at '/my-books/authors'. contains AuthorToolbar, a list of authors, and an Outlet for AuthorCard, EditAuthorCard, AddNewAuthor, DeleteAuthorCard, and AuthorDeleted message.
// export default function AuthorsOutlet() {
//     // fetchAllAuthors() loader provides authors.
//     const authors: Author[] = useLoaderData();

//     let deletedAuthor = useActionData();

//     const [searchTerm, setSearchTerm] = useOutletContext<[ searchTerm: string, setSearchTerm: Dispatch<SetStateAction<string>>]>();

//     // track the existing URL search params to enable filtering.
//     const [searchParams, setSearchParams] = useSearchParams();

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

//     // on component load, remove any existing 'sort' searchParams, because authors only sorts by last name
//     useEffect(() => {
//         const newParams = new URLSearchParams(searchParams);
//         newParams.delete("sort");
//         setSearchParams(newParams);
//     }, []);

//     // any time there's a change in 'authors' from the loader, the author_id from the URL, the search params from the URL, or a navigation, run this effect.
//     useEffect(() => {
//         if (params.author_id) {
//             if (authors.length > 0) {
//                 if (authors.find((b) => b.author_id === params.author_id) === undefined) {
//                     navigate(`/${pathName}/authors/${authors[0].author_id}?${searchParams.toString()}`);
//                 }
//             }
//         }
//     }, [authors, searchParams]);

//     return (
//         <>
//             <div className="relative w-full">
//                 <div className="z-0 relative flex w-full max-w-screen">
//                     <Outlet
//                         context={{
//                             authors: authors,
//                             deletedAuthor: deletedAuthor,
//                             searchTerm: searchTerm,
//                             setSearchTerm: setSearchTerm
//                         }}
//                     />
//                 </div>
//             </div>
//             {
//                 deletedAuthor &&
//                 <div className="absolute flex justify-center w-full">
//                     <AuthorDeleted deletedAuthor={deletedAuthor} />
//                 </div>
//             }
//         </>
//     );
// }
