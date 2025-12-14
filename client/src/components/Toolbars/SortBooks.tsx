// import { useEffect, useRef } from "react";
// import { useSearchParams } from "react-router";
// import { IoIosCloseCircle } from "react-icons/io";

// interface SortBooksProps {
//     sortPopoverOn: boolean,
//     setSortPopoverOn: React.Dispatch<React.SetStateAction<boolean>>,
//     sortButtonRef: React.RefObject<HTMLButtonElement | null>
// }

// // TODO: add ability to sort by author from the 'books' tab
// export default function SortBooks({ sortPopoverOn, setSortPopoverOn, sortButtonRef }: SortBooksProps) {
//     const [searchParams, setSearchParams] = useSearchParams();

//     // get a reference to the sortPopover element so that you can close it by clicking outside of it, like a modal dialog or popover.
//     const sortPopoverRef = useRef<HTMLDivElement>(null);

//     // close the sort popover on outside click.
//     useEffect(() => {
//         // function that runs any time a mousedown event occurs in the document.
//         function handleClickOutside(event: MouseEvent) {
//             if (
//                 sortPopoverRef.current &&
//                 !sortPopoverRef.current.contains(event.target as Node) &&
//                 !sortButtonRef.current?.contains(event.target as Node)
//             ) {
//                 setSortPopoverOn(false);
//             }
//         }

//         // add event listeners to the entire document when this element mounts. upon click, as long as the sort popover or its button are not the target, the the popover will close. remove the event listener when sort popover is off.
//         if (sortPopoverOn) {
//             document.addEventListener("mousedown", handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [sortPopoverOn, setSortPopoverOn]);

//     return (
//         sortPopoverOn &&
//         <div ref={sortPopoverRef} className="w-50 h-fit top-9 right-0 absolute flex flex-col items-start gap-4 p-4 bg-amber-800 inset-shadow-xs inset-shadow-black/25 border border-orange-300 rounded-md shadow-md shadow-black/25">
//             <IoIosCloseCircle
//                 className="absolute right-2 top-2 size-8 cursor-pointer hover:text-amber-100 active:text-amber-950/66"
//                 onClick={() => setSortPopoverOn(!sortPopoverOn)}
//             />
//             <fieldset className="flex flex-col gap-1">
//                 <p className="text-xl">Sort by:</p>

//                 <div className="flex items-center gap-1">
//                     <input
//                         type="radio"
//                         id="sort-by-title"
//                         name="sort-by"
//                         value="title"
//                         className="appearance-none size-5 mr-1 cursor-pointer bg-orange-100 rounded-full checked:cursor-default checked:bg-orange-900 checked:inset-ring-4 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-900"
//                         checked={searchParams.get("sort") === "title" || searchParams.get('sort') == undefined}
//                         onChange={(e) => {
//                             const newParams = new URLSearchParams(searchParams);
//                             if (e.target.value) {
//                                 newParams.set("sort", e.target.value);
//                             } else {
//                                 newParams.delete("sort");
//                             }
//                             setSearchParams(newParams);
//                         }}
//                     />
//                     <label htmlFor="sort-by-title" className="text-lg">
//                         Title
//                     </label>
//                 </div>

//                 <div className="flex items-center gap-1">
//                     <input
//                         type="radio"
//                         id="sort-by-publication-year"
//                         name="sort-by"
//                         value="publication_year"
//                         className="appearance-none size-5 mr-1 cursor-pointer bg-orange-100 rounded-full checked:cursor-default checked:bg-orange-900 checked:inset-ring-4 checked:inset-ring-orange-100 checked:outline-1 checked:outline-orange-900"
//                         checked={searchParams.get("sort") === "publication_year"}
//                         onChange={(e) => {
//                             const newParams = new URLSearchParams(searchParams);
//                             if (e.target.value) {
//                                 newParams.set("sort", e.target.value);
//                             } else {
//                                 newParams.delete("sort");
//                             }
//                             setSearchParams(newParams);
//                         }}
//                     />
//                     <label htmlFor="sort-by-publication-year" className="text-lg">
//                         Publication Year
//                     </label>
//                 </div>
//             </fieldset>
//         </div>
//     );
// }
