// import { Author } from "../types/types";
// import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
// import { Form, useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router";

// type CheckboxType = {
//     ref: RefObject<HTMLInputElement | null>;
//     name: string;
//     setState: Dispatch<SetStateAction<boolean>>;
//     label: string;
// }

// function Checkbox({ ref, name, setState, label }: CheckboxType) {
//     return (
//         <div className="relative flex flex-row gap-2 items-center">
//             <input
//                 ref={ref}
//                 type='checkbox'
//                 name={name}
//                 id={name}
//                 onChange={(e) => setState(e.target.checked)}
//                 className="appearance-none size-4 bg-orange-50 rounded-sm outline outline-orange-900/75 cursor-pointer checked:bg-orange-700 checked:after:content-['✓'] checked:after:absolute checked:after:text-2xl checked:after:-top-1.5 checked:inset-ring-3 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-800"
//             />
//             <label htmlFor={name} className="text-xl cursor-pointer">{label}</label>
//         </div>
//     );
// }

// // component at '/my-books/books/add-new'.
// export default function AddNewBook() {
//     // fetches all authors from fetchAllAuthors() loader.
//     const authors: Author[] = useLoaderData();

//     const [searchParams] = useSearchParams();

//     const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
//     const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);

//     const ownedRef = useRef(null);
//     const readRef = useRef(null);

//     const [owned, setOwned] = useState(false);
//     const [_read, setRead] = useState(false);

//     // navigate function allows users to go back 1 page in the history stack by clicking 'Cancel'.
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

//     return (
//         <div className="m-2 p-4 w-full text-orange-950 bg-orange-200 border-1 border-amber-700 rounded-lg">
//             <h1 className="text-2xl font-semibold mb-2 pb-1 border-b-1 border-b-orange-900/25">
//                 Add New Book
//             </h1>
//             <Form
//                 // submits to the addNewBook() action function.
//                 action={`/${owned ? 'my-books' : 'wish-list'}/books/add-new?${searchParams.toString()}`}
//                 method="post"
//                 className="flex flex-col"
//             >
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />
//                 <input
//                     type="text"
//                     name="subtitle"
//                     placeholder="Subtitle"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 font-semibold border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />
//                 <input
//                     type="text"
//                     name="publication_year"
//                     placeholder="Publication Year"
//                     className="w-full mb-2 px-2 py-1 bg-orange-100 inset-shadow-xs/25 text-2xl text-orange-900 border-1 border-orange-950/50 rounded-md focus:outline-2 focus:outline-orange-600"
//                 />

//                 <Checkbox
//                     name='owned'
//                     label='Owned?'
//                     setState={setOwned}
//                     ref={ownedRef}
//                 />

//                 <Checkbox
//                     name='read'
//                     label='Read?'
//                     setState={setRead}
//                     ref={readRef}
//                 />

//                 <p className="my-2 text-xl font-semibold">Author(s):</p>
//                 <div
//                     className="flex flex-row flex-wrap gap-2 mb-2"
//                 >
//                     {selectedAuthors.map((selectedAuthor) => {
//                         return (
//                             <div
//                                 key={selectedAuthor.author_id}
//                                 className="flex flex-row gap-1 flex-wrap items-center w-fit pl-3 pr-2 py-0 bg-orange-700/75 rounded-xl hover:bg-orange-700/90"
//                             >
//                                 <p>
//                                 {selectedAuthor.first_name ?? ''} {selectedAuthor.middle_name ?? ''} {selectedAuthor.last_name ?? ''}
//                                 </p>
//                                 <p
//                                     className="ml-1 text-2xl text-amber-950/75 cursor-pointer hover:text-amber-950"
//                                     onClick={() => {
//                                         setSelectedAuthors(selectedAuthors.filter((a) => a.author_id !== selectedAuthor.author_id));
//                                         setSelectedAuthorIds(selectedAuthorIds.filter((aId) => aId !== selectedAuthor.author_id));
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
//                     name='selectedAuthorIds'
//                     value={selectedAuthorIds}
//                 />

//                 <div className="flex flex-col gap-1 w-full mt-1 mb-2 pl-3 border-l-2 border-l-orange-800">
//                     <label htmlFor="authors">Add an author:</label>
//                     <select
//                         name="authors"
//                         id="authors"
//                         className="w-full bg-orange-100 rounded-md h-8 focus:outline-2 focus:outline-orange-600"
//                         onChange={(e) => {
//                             setSelectedAuthorIds([...selectedAuthorIds, e.target.value]);
//                             const author = authors.find((author) => author.author_id === e.target.value);
//                             if (author) {
//                                 setSelectedAuthors([...selectedAuthors, author]);
//                             }
//                         }}
//                     >
//                         <option value="">--Select an author--</option>
//                         {authors.filter((a) => !selectedAuthorIds.includes(a.author_id)).map((author) => {
//                             return (
//                                 <option key={author.author_id} value={author.author_id}>
//                                     {author.first_name ? author.first_name : ''} {author.middle_name ? author.middle_name : ''} {author.last_name ? author.last_name : ''}
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>

//                 <div className="w-full flex flex-row gap-2 items-stretch mt-4 text-lg">
//                     <button
//                         type="button"
//                         className="w-full h-12 content-center px-2 rounded-md cursor-pointer hover:bg-orange-800/25 hover:inset-shadow-xs active:bg-orange-800/50 active:inset-shadow-sm/30"
//                         onClick={() => {
//                             navigate(`/${pathName}/books`);
//                         }}
//                     >
//                         Cancel
//                     </button>
//                     <input
//                         type="submit"
//                         value="Add Book"
//                         className="w-full h-12 p-2 leading-4 text-center cursor-pointer rounded-md bg-orange-100 border-1 border-orange-700 text-orange-950 hover:bg-orange-50 hover:text-darkbrown active:bg-orange-700/50 active:inset-shadow-sm/70 active:inset-shadow-black/70 active:shadow-none"
//                     />
//                 </div>
//             </Form>
//         </div>
//     );
// }
