// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router";

// type DeletedBookType = {
//     message: string;
//     book_id: string;
//     title: string;
//     subtitle: string;
// }

// // component at '/my-books/books/deleted'.
// export default function BookDeleted( { deletedBook }: { deletedBook: DeletedBookType}) {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();

//     const [display, setDisplay] = useState(true);

//     useEffect(() => {
//         if (!deletedBook) {
//             navigate(`/my-books/books?${searchParams.toString()}`)
//         }

//         if (deletedBook) {
//             setDisplay(true);
//             setTimeout(() => setDisplay(false), 5000);
//         }
//     }, [deletedBook]);

//     return (
//         <>
//             <div className={`fixed bottom-0 m-2 p-4 max-w-200 h-fit text-rose-950 bg-rose-200 border-2 border-rose-800 rounded-md transition-all duration-700 ${display ? 'opacity-100' : 'opacity-0'}`}>
//                 <p>Deleted book: {deletedBook.title}: {deletedBook.subtitle}</p>
//             </div>
//         </>
//     );
// }
