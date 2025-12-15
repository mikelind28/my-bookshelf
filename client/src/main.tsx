// react, react-router imports.
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

// css (tailwind).
import "./index.css";

// pages and components.
import App from "./App.tsx";
import AuthorCard from "./components/AuthorCard.tsx";
import AuthorList from "./components/Lists/AuthorList.tsx";
import BookCard from "./components/BookCard.tsx";
import BookList from "./components/Lists/BookList.tsx";
import CreateNewAuthorDialog from "./components/CreateNewAuthorDialog.tsx";
import CreateNewBookDialog from "./components/CreateNewBookDialog.tsx";
import DeleteAuthorDialog from "./components/DeleteAuthorDialog.tsx";
import DeleteBookDialog from "./components/DeleteBookDialog.tsx";
import EditAuthorDialog from "./components/EditAuthorDialog.tsx";
import EditBookDialog from "./components/EditBookDialog.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import MyShelfOutlet from "./pages/MyShelfOutlet.tsx";
import SearchAuthorCard from "./components/Search/SearchAuthorCard.tsx";
import SearchResults from "./components/Search/SearchResults.tsx";
import SearchWorkCard from "./components/Search/SearchWorkCard.tsx";
import WishListOutlet from "./pages/WishListOutlet.tsx";

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
} from "./loaders/db-loaders.ts";

import {
  allSearchLoader,
  authorLoader,
  authorSearchLoader,
  bookSearchLoader,
  isbnSearchLoader,
  redirectSearch,
  workLoader,
} from "./loaders/open-lib-loaders.ts";

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
} from "./actions/db-actions.ts";

import {
  searchPreviewAction,
  searchSubmitAction,
} from "./actions/open-lib-actions.ts";


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
                Component: SearchResults,
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
                Component: SearchResults,
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
            element: <Outlet />,
            children: [
              {
                index: true,
                loader: authorSearchLoader,
                Component: SearchResults,
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
            Component: SearchResults,
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
