import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to={`/`}>
      <h1 className="group text-xl drop-shadow-lg/100 drop-shadow-black sm:text-2xl">
        <span className="bg-linear-to-r from-orange-300 to-amber-600 bg-clip-text text-transparent transition duration-200 group-hover:from-orange-200 group-hover:to-amber-500">
          my
        </span>

        <span className="gradient-underline font-extrabold text-amber-600 transition delay-100 duration-200 group-hover:text-amber-500">
          Book
        </span>

        <span className="bg-linear-to-r from-amber-600 to-orange-800 bg-clip-text text-transparent transition delay-200 duration-200 group-hover:from-amber-500 group-hover:to-orange-700">
          shelf
        </span>
      </h1>
    </Link>
  );
}
