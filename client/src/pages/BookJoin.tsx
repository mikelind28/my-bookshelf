// import { Book } from "../types/types";
// import { useEffect, useState } from "react";

// interface BooksProps {
//     onChange: (id: string) => void,
// }

// export default function BookJoin({ onChange }: BooksProps) {
//     const [books, setBooks] = useState<Book[]>([]);
//     const [selectedBookId, setSelectedBookId] = useState('');

//     async function fetchBooks() {
//         try {
//             const response = await fetch(
//                 '/api/join',
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error('Invalid response, check network tab.');
//             }

//             const jsonResponse = await response.json();

//             setBooks(jsonResponse.books);
//         } catch (error) {
//             console.error('Error from fetchBooks():', error);
//             return;
//         }
//     }

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     useEffect(() => {
//         onChange(selectedBookId);
//     }, [selectedBookId]);

//     return (
//         <div className="m-5">
//             <h1>books</h1>
//             <ul>
//                 {books?.map((book) => {
//                     return (
//                         <li
//                             key={book.book_id}
//                         >
//                             <input
//                                 type="radio"
//                                 name="books"
//                                 value={book.book_id}
//                                 onChange={() => {
//                                 setSelectedBookId(book.book_id);
//                                 }}
//                             />
//                             <label
//                                 htmlFor={book.book_id}
//                             >
//                                 {book.title}
//                             </label>

//                         </li>
//                     )
//                 })}
//             </ul>
//         </div>
//     );
// }
