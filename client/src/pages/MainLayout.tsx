// import { useState } from "react";
// import { Outlet } from "react-router";
// import Toolbar from "../components/Toolbars/Toolbar";
// import MyBooksOrWishListNav from "../components/Toolbars/MyBooksOrWishListNav";
// import ActiveParams from "../components/Toolbars/ActiveParams";
// import BooksOrAuthorsSlider from "../components/Toolbars/BooksOrAuthorsSlider";

// export default function MainLayout() {
//     const [searchTerm, setSearchTerm] = useState('');

//     return (
//         <>
//             <div className="md:self-start md:ml-4 relative flex flex-col w-full max-w-120 md:max-w-170">
//                 <MyBooksOrWishListNav />

//                 <div className="z-50 flex flex-col gap-1 sticky top-2 md:top-18">
//                     <BooksOrAuthorsSlider />
//                     <Toolbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//                     <ActiveParams />
//                 </div>

//                 <div className="z-0 relative flex max-w-screen">
//                     <Outlet context={[searchTerm, setSearchTerm]} />
//                 </div>
//             </div>
//         </>
//     );
// }
