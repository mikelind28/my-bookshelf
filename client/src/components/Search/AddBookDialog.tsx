import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "react-router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { OpenLibEditionType } from "../../types/types";
import { IoClose } from "react-icons/io5";

type AddBookDialogType = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  edition: OpenLibEditionType;
};

// dialog to add a new book to user's shelf. shows when user clicks 'add book' button from WorkCard > EditionsList > EditionCard
export default function AddBookDialog({
  dialogOpen,
  setDialogOpen,
  edition,
}: AddBookDialogType) {
  const [editionInfo, setEditionInfo] = useState<OpenLibEditionType>(edition);

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative m-4 max-h-[95vh] w-full max-w-125 overflow-y-auto rounded-sm border border-orange-400/33 bg-orange-950/90 p-4 text-orange-200 shadow-xl/50">
          <DialogTitle className="text-2xl font-semibold text-amber-500">
            Add Book
          </DialogTitle>

          <Description className="leading-5 text-orange-300">
            You can edit any fields here, if needed.
          </Description>

          <IoClose
            onClick={() => setDialogOpen(false)}
            className="absolute top-2 right-2 size-8 shrink-0 cursor-pointer"
          />

          <hr className="my-2" />

          <Form action="/search/books" method="post">
            <label
              htmlFor="edition-title"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Title:
            </label>
            <input
              type="text"
              id="edition-title"
              name="edition-title"
              value={editionInfo.title}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              placeholder="Title..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-subtitle"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Subtitle:
            </label>
            <textarea
              id="edition-subtitle"
              name="edition-subtitle"
              value={editionInfo.subtitle}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }));
              }}
              placeholder="Subtitle..."
              rows={3}
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-publish-date"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Publish date:
            </label>
            <input
              type="text"
              id="edition-publish-date"
              name="edition-publish-date"
              value={editionInfo.publish_date}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  publish_date: e.target.value,
                }));
              }}
              placeholder="Publish date..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-description"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Description:
            </label>
            <textarea
              id="edition-description"
              name="edition-description"
              value={
                typeof editionInfo.description === "string"
                  ? editionInfo.description
                  : editionInfo.description?.value
              }
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              placeholder="Description..."
              rows={4}
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-cover-url"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Cover URL:
            </label>
            <input
              type="text"
              id={`edition-cover-url`}
              name={`edition-cover-url`}
              value={editionInfo.coverUrl}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  coverUrl: e.target.value,
                }));
              }}
              placeholder="Cover URL..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-isbn-10"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              ISBN-10:
            </label>
            <input
              type="text"
              id={`edition-isbn-10`}
              name={`edition-isbn-10`}
              value={editionInfo.isbn_10}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  isbn_10: e.target.value,
                }));
              }}
              placeholder="IBSN-10..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            <label
              htmlFor="edition-isbn-13"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              ISBN-13:
            </label>
            <input
              type="text"
              id={`edition-isbn-13`}
              name={`edition-isbn-13`}
              value={editionInfo.isbn_13}
              onChange={(e) => {
                setEditionInfo((prev) => ({
                  ...prev,
                  isbn_13: e.target.value,
                }));
              }}
              placeholder="IBSN-13..."
              className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
            />

            {/* TODO: allow user to add/remove publisher fields */}
            <label
              htmlFor="edition-publishers"
              className="text-lg font-semibold text-orange-400 text-shadow-xs/50"
            >
              Publishers:
            </label>
            {edition.publishers &&
              edition.publishers.map((_p, i) => (
                <input
                  key={i}
                  type="text"
                  id={`edition-publishers`}
                  name={`edition-publishers`}
                  value={editionInfo.publishers[i]}
                  onChange={(e) => {
                    setEditionInfo((prev) => ({
                      ...prev,
                      publishers: prev.publishers.map((publisher, index) =>
                        index === i ? e.target.value : publisher,
                      ),
                    }));
                  }}
                  className="mb-2 w-full rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
                />
              ))}

            <div className="flex w-25 items-center justify-between">
              <label
                htmlFor="edition-owned"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Owned?
              </label>
              <input
                type="checkbox"
                id="edition-owned"
                name="edition-owned"
                checked={editionInfo.owned}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    owned: e.target.checked,
                  }));
                }}
                className="size-5 rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            <div className="flex w-25 items-center justify-between">
              <label
                htmlFor="edition-read"
                className="w-20 text-lg font-semibold text-orange-400 text-shadow-xs/50"
              >
                Read?
              </label>
              <input
                type="checkbox"
                id="edition-read"
                name="edition-read"
                checked={editionInfo.read}
                onChange={(e) => {
                  setEditionInfo((prev) => ({
                    ...prev,
                    read: e.target.checked,
                  }));
                }}
                className="size-5 rounded-sm bg-orange-200 px-2 py-1 text-orange-950 inset-shadow-xs/50"
              />
            </div>

            {edition.authors &&
              edition.authors.map((author, index) => (
                <input
                  key={index}
                  type="hidden"
                  id={`edition-author-keys`}
                  name={`edition-author-keys`}
                  value={author.key}
                />
              ))}

            <input
              type="hidden"
              id="edition-isbn-10"
              name="edition-isbn-10"
              value={edition.isbn_10}
            />

            <input
              type="hidden"
              id="edition-isbn-13"
              name="edition-isbn-13"
              value={edition.isbn_13}
            />

            <input
              type="hidden"
              id="edition-key"
              name="edition-key"
              value={edition.key}
            />

            <button
              type="submit"
              className="my-2 w-full rounded-md bg-orange-400 py-2 text-xl text-orange-950 shadow-sm/25 hover:bg-amber-400"
            >
              Add Book!
            </button>
          </Form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
