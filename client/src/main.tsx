// react, react-router imports.
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

// css (tailwind).
import "./index.css";

// pages and components.
import App from "./App";
import AuthorCard from "./components/AuthorCard";
import AuthorList from "./components/Lists/AuthorList";
import BookCard from "./components/BookCard";
import BookList from "./components/Lists/BookList";
import CreateNewAuthorDialog from "./components/CreateNewAuthorDialog";
import CreateNewBookDialog from "./components/CreateNewBookDialog";
import DeleteAuthorDialog from "./components/DeleteAuthorDialog";
import DeleteBookDialog from "./components/DeleteBookDialog";
import EditAuthorDialog from "./components/EditAuthorDialog";
import EditBookDialog from "./components/EditBookDialog";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import MyShelfOutlet from "./pages/MyShelfOutlet";
import SearchAuthorCard from "./components/Search/SearchAuthorCard";
// import SearchResults from "./components/Search/SearchResults";
import SearchWorkCard from "./components/Search/SearchWorkCard";
import WishListOutlet from "./pages/WishListOutlet";

// route loaders.
import {
  fetchAllAuthors,
  fetchAllBooks,
  fetchAuthorAndAllBooks,
  fetchBookAndAllAuthors,
  fetchOwnedAuthors,
  fetchOwnedBooks,
  fetchWishListAuthors,
  fetchWishListBooks,
  getAuthorByKey,
  getBookByKey,
  homeLoader,
  redirectMyShelf,
  redirectWishList,
} from "./loaders/db-loaders";

import {
  allSearchLoader,
  authorLoader,
  authorSearchLoader,
  bookSearchLoader,
  isbnSearchLoader,
  redirectSearch,
  workLoader,
} from "./loaders/open-lib-loaders";

// route actions.
import {
  addNewAuthor,
  addNewBook,
  createNewAuthor,
  createNewBook,
  deleteAuthor,
  deleteBook,
  editAuthorAction,
  editBookAction,
} from "./actions/db-actions";

import {
  searchPreviewAction,
  searchSubmitAction,
} from "./actions/open-lib-actions";
import BookSearchResults from "./components/Search/BookSearchResults";
import AuthorSearchResults from "./components/Search/AuthorSearchResults";
import IsbnSearchResult from "./components/Search/IsbnSearchResult";

// TODO: improve error handling...
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    action: searchPreviewAction,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home,
      },
      {
        path: "/search",
        action: searchSubmitAction,
        loader: redirectSearch,
        children: [
          {
            path: "/search/all",
            action: addNewBook,
            children: [
              {
                index: true,
                loader: allSearchLoader,
                Component: BookSearchResults,
              },
              {
                path: "/search/all/:key",
                action: editBookAction,
                loader: workLoader,
                Component: SearchWorkCard,
              },
            ],
          },
          {
            path: "/search/books",
            action: addNewBook,
            children: [
              {
                index: true,
                loader: bookSearchLoader,
                Component: BookSearchResults,
              },
              {
                path: "/search/books/:key",
                action: editBookAction,
                loader: workLoader,
                Component: SearchWorkCard,
              },
            ],
          },
          {
            path: "/search/authors",
            action: addNewAuthor,
            children: [
              {
                index: true,
                loader: authorSearchLoader,
                Component: AuthorSearchResults,
              },
              {
                path: "/search/authors/:key",
                loader: authorLoader,
                Component: SearchAuthorCard,
              },
            ],
          },
          {
            path: "/search/isbn/:isbn",
            loader: isbnSearchLoader,
            Component: IsbnSearchResult,
          },
        ],
      },
      {
        path: "/my-shelf",
        loader: redirectMyShelf,
        children: [
          {
            path: "/my-shelf/books",
            loader: fetchOwnedBooks,
            Component: MyShelfOutlet,
            children: [
              {
                index: true,
                loader: fetchOwnedBooks,
                Component: BookList,
              },
              {
                path: "/my-shelf/books/:key",
                children: [
                  {
                    index: true,
                    loader: fetchOwnedBooks,
                    Component: BookCard,
                  },
                  {
                    path: "/my-shelf/books/:key/edit",
                    action: editBookAction,
                    loader: fetchBookAndAllAuthors,
                    Component: EditBookDialog,
                  },
                  {
                    path: "/my-shelf/books/:key/delete",
                    loader: getBookByKey,
                    action: deleteBook,
                    Component: DeleteBookDialog,
                  },
                ],
              },
              {
                path: "/my-shelf/books/add-new",
                loader: fetchAllAuthors,
                action: createNewBook,
                Component: CreateNewBookDialog,
              },
            ],
          },
          {
            path: "/my-shelf/authors",
            loader: fetchOwnedAuthors,
            Component: MyShelfOutlet,
            children: [
              {
                index: true,
                loader: fetchOwnedAuthors,
                Component: AuthorList,
              },
              {
                path: "/my-shelf/authors/:key",
                children: [
                  {
                    index: true,
                    loader: fetchOwnedAuthors,
                    Component: AuthorCard,
                  },
                  {
                    path: "/my-shelf/authors/:key/edit",
                    action: editAuthorAction,
                    loader: fetchAuthorAndAllBooks,
                    Component: EditAuthorDialog,
                  },
                  {
                    path: "/my-shelf/authors/:key/delete",
                    loader: getAuthorByKey,
                    action: deleteAuthor,
                    Component: DeleteAuthorDialog,
                  },
                ],
              },
              {
                path: "/my-shelf/authors/add-new",
                loader: fetchAllBooks,
                action: createNewAuthor,
                Component: CreateNewAuthorDialog,
              },
            ],
          },
        ],
      },
      {
        path: "/wish-list",
        loader: redirectWishList,
        children: [
          {
            path: "/wish-list/books",
            loader: fetchWishListBooks,
            Component: WishListOutlet,
            children: [
              {
                index: true,
                loader: fetchWishListBooks,
                Component: BookList,
              },
              {
                path: "/wish-list/books/:key",
                children: [
                  {
                    index: true,
                    loader: fetchWishListBooks,
                    Component: BookCard,
                  },
                  {
                    path: "/wish-list/books/:key/edit",
                    action: editBookAction,
                    loader: fetchBookAndAllAuthors,
                    Component: EditBookDialog,
                  },
                  {
                    path: "/wish-list/books/:key/delete",
                    loader: getBookByKey,
                    action: deleteBook,
                    Component: DeleteBookDialog,
                  },
                ],
              },
              {
                path: "/wish-list/books/add-new",
                loader: fetchAllAuthors,
                action: createNewBook,
                Component: CreateNewBookDialog,
              },
            ],
          },
          {
            path: "/wish-list/authors",
            loader: fetchWishListAuthors,
            Component: WishListOutlet,
            children: [
              {
                index: true,
                loader: fetchWishListAuthors,
                Component: AuthorList,
              },
              {
                path: "/wish-list/authors/:key",
                children: [
                  {
                    index: true,
                    loader: fetchWishListAuthors,
                    Component: AuthorCard,
                  },
                  {
                    path: "/wish-list/authors/:key/edit",
                    action: editAuthorAction,
                    loader: fetchAuthorAndAllBooks,
                    Component: EditAuthorDialog,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
