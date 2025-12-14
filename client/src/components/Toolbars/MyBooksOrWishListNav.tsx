// import { NavLink, useLocation, useSearchParams } from "react-router";

// type NavItemType = {
//     pathName: string;
//     textContent: string;
// }

// function NavItem({ pathName, textContent }: NavItemType) {
//     return (
//         <NavLink
//             to={pathName}
//             className={({ isActive }) =>
//                 `px-4 py-2 text-xl rounded-t-md border-1 transition-all duration-500
//                 ${
//                     isActive
//                     ? 'flex-3/5 bg-orange-400/66 text-orange-100 font-semibold border-orange-300 border-b-amber-400 cursor-default'
//                     : 'flex-2/5 bg-amber-900 text-orange-300 font-light border-amber-800 cursor-pointer'
//                 }`
//             }
//         >
//             {textContent}
//         </NavLink>
//     );
// }

// export default function MyBooksOrWishListNav() {
//     let location = useLocation();
//     let [searchParams] = useSearchParams();

//     return (
//         <nav className="max-w-120 md:w-126 md:sticky md:top-0">
//             <div className="flex flex-row mx-3 mb-2 pt-5">
//                 <NavItem
//                     pathName={`${location.pathname.includes('/my-books') ? `${location.pathname}?${searchParams.toString()}` : '/my-books'}`}
//                     textContent="My Books"
//                 />

//                 <NavItem
//                     pathName={`${location.pathname.includes('/wish-list') ? `${location.pathname}?${searchParams.toString()}` : '/wish-list'}`}
//                     textContent="Wish List"
//                 />
//             </div>
//         </nav>
//     )
// }
