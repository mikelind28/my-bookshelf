import { Outlet, useLoaderData } from "react-router";
import BooksOrAuthorsSlider from "../components/Toolbars/BooksOrAuthorsSlider";
import Toolbar from "../components/Toolbars/Toolbar";

// MyShelfOutlet contains a header, a toolbar for sorting and filtering, a books/authors slider, and an outlet to show the list of books or authors.
export default function MyShelfOutlet() {
  const { rows } = useLoaderData();

  return (
    <div className="flex w-full flex-col px-4">
      <div className="gradient-underline flex flex-col">
        <div className="flex items-center justify-between gap-2 pb-1">
          <h2 className="text-2xl font-semibold text-orange-400">
            <span className="bg-linear-to-r from-orange-300 to-amber-600 bg-clip-text font-light text-transparent">
              my
            </span>
            Shelf
          </h2>

          <Toolbar />
        </div>
      </div>

      <div className="my-2">
        <BooksOrAuthorsSlider />
      </div>

      <Outlet context={{ rows }} />
    </div>
  );
}
