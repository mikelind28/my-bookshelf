import { NavLink, useLoaderData, useLocation, useParams } from "react-router";
import { Author } from "../../types/types";
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function AuthorListCard({ author }: { author: Author }) {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  const [pathName, setPathName] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/my-shelf")) {
      setPathName("my-shelf");
    }

    if (location.pathname.includes("/wish-list")) {
      setPathName("wish-list");
    }
  }, [location]);

  return (
    <li className="w-full">
      <NavLink to={`/${pathName}${author.key}${searchParams.toString()}`}>
        {({ isActive }) => (
          <div
            className={`group relative mt-1 mb-2 flex flex-row items-center gap-3 rounded-sm border p-2 pr-4 drop-shadow-lg/100 ${
              isActive
                ? "cursor-default border-orange-300 bg-orange-400/75"
                : "border-orange-400/33 bg-orange-400/15 hover:bg-amber-900 hover:text-shadow-xs/75"
            }`}
          >
            {(!imageLoaded || !author.image_url) && (
              <FaUser
                className={`size-15 shrink-0 rounded-md bg-darkbrown/33 p-2 text-orange-800/90 inset-shadow-xs/25 ${location.pathname.includes("/authors") && params.key ? "hidden" : ""} `}
              />
            )}

            {author.image_url && (
              <img
                src={author.image_url}
                className={`h-full w-15 rounded-sm shadow-sm/50 ${!imageLoaded ? "hidden" : ""} ${location.pathname.includes("/authors") && params.key ? "hidden" : ""} `}
                onLoad={() => setImageLoaded(true)}
              />
            )}

            <div className="mr-5 flex flex-col gap-0.5">
              <p
                className={`text-lg font-bold text-shadow-xs/90 sm:leading-6 ${
                  isActive
                    ? "text-orange-50 text-shadow-amber-950 text-shadow-xs"
                    : "text-amber-500"
                }`}
              >
                {author.name}
              </p>
            </div>

            <IoIosArrowForward className="absolute right-1 size-6 shrink-0 self-center" />

            <div
              className={`absolute top-0 right-0 h-full w-0 bg-orange-200/25 transition-all duration-300 ease-out ${
                isActive ? "group-hover:w-0" : "group-hover:w-8"
              } `}
            ></div>
          </div>
        )}
      </NavLink>
    </li>
  );
}

export default function AuthorList() {
  const { rows }: { rows: Author[] } = useLoaderData();

  return (
    <div className="w-full max-w-160 mx-auto">
      <nav className="relative w-full">
        <p className="mb-1 font-bold">
          {rows.length} author{rows.length > 1 && "s"} found:
        </p>
        <ul className="text-lg sm:h-[calc(100%-(--spacing(45)))] sm:overflow-y-auto">
          {rows.length > 0 ? (
            rows.map((author) => (
              <AuthorListCard key={author.key} author={author} />
            ))
          ) : (
            <p className="m-2">No authors found.</p>
          )}
        </ul>
      </nav>
    </div>
  );
}
