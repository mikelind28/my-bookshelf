// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router";

// type DeletedAuthorType = {
//     message: 'deleted author';
//     author_id: string;
//     first_name: string;
//     middle_name: string;
//     last_name: string;
// }

// // display this message when an author is deleted.
// export default function AuthorDeleted( { deletedAuthor }: { deletedAuthor: DeletedAuthorType}) {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();

//     const [display, setDisplay] = useState(false);

//     useEffect(() => {
//         if (!deletedAuthor) {
//             navigate(`/my-books/authors?${searchParams.toString()}`)
//         }

//         if (deletedAuthor) {
//             setDisplay(true);
//             setTimeout(() => setDisplay(false), 5000)
//         }
//     }, [deletedAuthor]);

//     return (
//         <>
//             <div className={`fixed bottom-0 m-2 p-4 max-w-200 h-fit text-rose-950 bg-rose-200 border-2 border-rose-800 rounded-md transition-all duration-700 ${display ? 'opacity-100' : 'opacity-0'}`}>
//                 <p>Deleted author: {deletedAuthor?.first_name} {deletedAuthor?.middle_name} {deletedAuthor?.last_name}</p>
//             </div>
//         </>
//     );
// }
