import { Outlet, useLoaderData } from "react-router";
import BooksOrAuthorsSlider from "../components/Toolbars/BooksOrAuthorsSlider";
import Toolbar from "../components/Toolbars/Toolbar";
import { EditionType } from "../types/types";

export default function WishListOutlet() {
  const { rows } = useLoaderData<{ rows: EditionType[] }>();

  return (
    <main className="flex w-full flex-col px-4">
      <div className="gradient-underline w-full">
        <div className="flex items-end justify-between gap-2 pb-1">
          <h2 className="text-2xl font-semibold text-orange-400">
            <span className="bg-linear-to-r from-orange-300 to-amber-600 bg-clip-text font-light text-transparent">
              my
            </span>
            WishList
          </h2>

          <Toolbar />
        </div>
      </div>

      <div className="my-2 w-full max-w-160 mx-auto md:my-4">
        <BooksOrAuthorsSlider />
      </div>

      <Outlet context={{ rows }} />
    </main>
  );
}
