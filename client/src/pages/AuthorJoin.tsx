// import { Author } from "../types/types";
// import { useEffect, useState } from "react";

// interface AuthorsProps {
//     onChange: (ids: string[] | undefined) => void,
// }

// export default function AuthorJoin({ onChange }: AuthorsProps) {
//     const [authors, setAuthors] = useState<Author[]>([]);
//     const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[] | undefined>(undefined);

//     async function fetchAuthors() {
//         try {
//             const response = await fetch(
//                 '/api/join',
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );
//             const jsonResponse = await response.json();

//             if (!response.ok) {
//                 throw new Error('Invalid response, check network tab.');
//             }

//             return jsonResponse;
//         } catch (error) {
//             console.error('Error from fetchAuthors():', error);
//             return;
//         }
//     }

//     async function getAuthors() {
//         try {
//             const data = await fetchAuthors();
//             setAuthors(data.authors);
//         } catch (error) {
//             console.error('Error from getAuthors():', error);
//         }
//     }

//     function handleSelectionChange(author: Author) {
//         if (!selectedAuthorIds || selectedAuthorIds.length === 0) {
//             const newArray = [author.author_id];
//             setSelectedAuthorIds(newArray);
//         } else {
//             if (selectedAuthorIds.includes(author.author_id)) {
//                 const filteredArray = selectedAuthorIds.filter(id => id !== author.author_id);
//                 setSelectedAuthorIds(filteredArray);
//             } else {
//                 const newArray = [...selectedAuthorIds, author.author_id];
//                 setSelectedAuthorIds(newArray);
//             }
//         }
//     }

//     useEffect(() => {
//         getAuthors();
//     }, []);

//     useEffect(() => {
//         if (selectedAuthorIds) {
//             onChange(selectedAuthorIds)
//         };
//     }, [selectedAuthorIds]);

//     return (
//         <div className="m-5">
//             <h1>authors</h1>
//             <ul>
//                 {authors?.map((author) => {
//                     return (
//                         <li
//                             key={author.author_id}
//                         >
//                             <input
//                                 type="checkbox"
//                                 name="authors"
//                                 value={author.author_id}
//                                 onChange={() => handleSelectionChange(author)}
//                             />
//                             <label
//                                 htmlFor={author.author_id}
//                             >
//                                 {author.first_name! + ' ' + author.last_name!}
//                             </label>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// }
