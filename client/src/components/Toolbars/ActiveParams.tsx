import { useSearchParams } from "react-router";

export default function ActiveParams() {
  const [searchParams] = useSearchParams();

  const readParam = searchParams.get("read");

  return (
    <>
      {readParam && (
        <div>
          {readParam === "read" && (
            <p className="flex h-full w-fit items-center rounded-md border border-green-400 bg-green-400/30 px-2 text-green-400">
              Read
            </p>
          )}
          {readParam === "not-read" && (
            <p className="flex h-full w-fit items-center rounded-md border border-red-400 bg-red-400/30 px-2 text-red-400">
              Not Read
            </p>
          )}
        </div>
      )}
    </>
  );
}
