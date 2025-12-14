import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "react-router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { OpenLibAuthor, Author } from "../../types/types";
import { IoClose } from "react-icons/io5";

type AddAuthorDialogType = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  author: OpenLibAuthor;
};

// dialog to add a new author to user's shelf. shows when user clicks 'add author' button from SearchAuthorCard > EditionsList > EditionCard
export default function AddAuthorDialog({
  dialogOpen,
  setDialogOpen,
  author,
}: AddAuthorDialogType) {
  const [authorInfo, setAuthorInfo] = useState<Author>({
    key: author.key,
    name: author.name,
    bio: author.bio?.value,
    birth_date: author.birth_date,
    death_date: author.death_date,
    image_url: author.photos
      ? `https://covers.openlibrary.org/a/id/${author.photos[0]}-L.jpg`
      : "",
  });

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative m-4 max-h-[95vh] w-full max-w-125 overflow-y-auto rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 drop-shadow-md/25">
          <DialogTitle className="text-2xl font-semibold text-amber-500">
            Add Author
          </DialogTitle>

          <Description className="leading-5 text-orange-300">
            You can edit any fields here, if needed.
          </Description>

          <IoClose
            onClick={() => setDialogOpen(false)}
            className="absolute top-2 right-2 size-8 shrink-0 cursor-pointer"
          />

          <hr className="my-2" />

          <Form action="/search/authors" method="post">
            <label
              htmlFor="author-name"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Name:
            </label>
            <input
              type="text"
              id="author-name"
              name="author-name"
              value={authorInfo.name}
              onChange={(e) => {
                setAuthorInfo((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              placeholder="Name..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="author-birth-date"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Birth date:
            </label>
            <input
              type="text"
              id="author-birth-date"
              name="author-birth-date"
              value={authorInfo.birth_date}
              onChange={(e) => {
                setAuthorInfo((prev) => ({
                  ...prev,
                  birth_date: e.target.value,
                }));
              }}
              placeholder="Birth date..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="author-death-date"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Death date:
            </label>
            <input
              type="text"
              id="author-death-date"
              name="author-death-date"
              value={authorInfo.death_date}
              onChange={(e) => {
                setAuthorInfo((prev) => ({
                  ...prev,
                  death_date: e.target.value,
                }));
              }}
              placeholder="Death date..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="author-bio"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Bio:
            </label>
            <textarea
              id="author-bio"
              name="author-bio"
              value={authorInfo.bio}
              onChange={(e) => {
                setAuthorInfo((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
              placeholder="Bio..."
              rows={4}
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="author-image-url"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Image URL:
            </label>
            <input
              type="text"
              id={`author-image-url`}
              name={`author-image-url`}
              value={authorInfo.image_url}
              onChange={(e) => {
                setAuthorInfo((prev) => ({
                  ...prev,
                  image_url: e.target.value,
                }));
              }}
              placeholder="Image URL..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <input
              type="hidden"
              id="author-key"
              name="author-key"
              value={author.key}
            />

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-orange-400 py-2 text-xl text-orange-950 shadow-sm/25 hover:bg-amber-400"
            >
              Add Author!
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
