import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { Form, useLoaderData, useLocation, useNavigate } from "react-router";
import { Author } from "../types/types";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

// TODO: instead of useNavigate(), use redirect() in loader/action function, when possible...
export default function DeleteAuthorDialog() {
  const author = useLoaderData<Author>();

  const navigate = useNavigate();

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
    <Dialog
      open={true}
      onClose={() =>
        navigate(`/${pathName}/authors/${author.key.replace("/authors/", "")}`)
      }
      className="relative z-50 max-w-screen overflow-y-scroll"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-full max-w-125 justify-self-center overflow-y-scroll p-4">
        <DialogPanel className="h-fit w-full rounded-sm border border-red-400/33 bg-red-950/90 p-4 text-orange-200 shadow-xl/50">
          <div className="flex justify-between">
            <DialogTitle className="text-2xl font-semibold text-orange-500">
              Are you sure you want to delete this author?
            </DialogTitle>

            <IoClose
              onClick={() =>
                navigate(
                  `/${pathName}/authors/${author.key.replace("/authors/", "")}`,
                )
              }
              className="size-8 shrink-0"
            />
          </div>

          <hr className="my-2 text-orange-500" />

          <Form
            action={`/${pathName}/authors/${author.key.replace("/authors/", "")}/delete`}
            method="post"
            className="flex flex-col gap-2"
          >
            <div className="flex gap-3 border-b border-b-orange-600/50 pb-3">
              <div className="h-full shrink-0">
                {(!imageLoaded || !author.image_url) && (
                  <FaUser className="size-30 shrink-0 text-orange-800/90" />
                )}

                {author.image_url && (
                  <img
                    src={author.image_url}
                    className={`h-full w-30 rounded-sm shadow-sm/50 ${!imageLoaded ? "hidden" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
              </div>

              <div className="flex flex-col gap-2 text-orange-500">
                <h1 className="text-2xl leading-7 font-semibold text-amber-500">
                  {author.name}
                </h1>

                {author.birth_date && (
                  <p className="leading-5 text-shadow-sm/50">
                    Born:
                    <span className="text-orange-300">
                      {` ${author.birth_date}`}
                    </span>
                  </p>
                )}

                {author.death_date && (
                  <p className="leading-5 text-shadow-sm/50">
                    Died:
                    <span className="text-orange-300">
                      {` ${author.death_date}`}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="my-2 flex flex-col gap-1">
              <div className="flex flex-col gap-2 text-orange-500">
                {author.bio && (
                  <div className="leading-5">
                    <p>
                      Bio: <span className="text-orange-300">{author.bio}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-amber-700/70">
              author key: {author.key}
            </p>

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-red-500 py-2 text-xl text-red-950 shadow-sm/25 hover:bg-red-600 hover:font-semibold hover:text-darkbrown active:bg-amber-700 active:text-darkbrown active:inset-shadow-xs/33"
            >
              Delete
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
