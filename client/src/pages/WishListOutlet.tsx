import { Outlet, useLoaderData } from "react-router";
import BooksOrAuthorsSlider from "../components/Toolbars/BooksOrAuthorsSlider";
import Toolbar from "../components/Toolbars/Toolbar";
import { EditionType } from "../types/types";

export default function WishListOutlet() {
  const { rows } = useLoaderData<{ rows: EditionType[] }>();

  return (
    <div className="mx-4 flex flex-col">
      <div className="gradient-underline flex items-center justify-between gap-2 pb-1">
        <h2 className="text-2xl font-semibold text-orange-400">
          <span className="bg-linear-to-r from-orange-300 to-amber-600 bg-clip-text font-light text-transparent">
            my
          </span>
          WishList
        </h2>

        <Toolbar />
      </div>

      <div className="my-3">
        <BooksOrAuthorsSlider />
      </div>

      <Outlet context={{ rows }} />
    </div>
  );
}
