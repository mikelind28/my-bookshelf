import { LoaderFunctionArgs, redirect } from "react-router";

// fetches a preview of user's shelf and wish list
export async function homeLoader() {
  const response = await fetch("/api/db/home", {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error("Error from homeLoader() loader: could not fetch books", {
      status: response.status,
    });
    throw new Response(
      "Error from homeLoader() loader: could not fetch books",
      { status: response.status },
    );
  }

  const bookPreview = await response.json();

  return bookPreview;
}

// there is no component at '/my-shelf' path exactly, so redirect to '/my-shelf/books'
export function redirectMyShelf({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/my-shelf") {
    return redirect("/my-shelf/books");
  }
}

// there is no component at '/wish-list' path exactly, so redirect to '/wish-list/books'
export function redirectWishList({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/wish-list") {
    return redirect("/wish-list/books");
  }
}

export async function fetchOwnedBooks({ request }: LoaderFunctionArgs) {
  // get the URL of the incoming request to send any relevant searchParams to the server
  const url = new URL(request.url);

  const apiUrl = new URL("/api/db/books/owned", url.origin);

  // use the URL searchParams from the request to send the appropriate request to the server
  if (url.searchParams.get("read")) {
    apiUrl.searchParams.set("read", url.searchParams.get("read")!);
  }

  // make the request to the server.
  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      "Error from fetchOwnedBooks() loader: could not fetch books",
      { status: response.status },
    );
    throw new Response(
      "Error from fetchOwnedBooks() loader: could not fetch books",
      { status: response.status },
    );
  }

  const { bookCount, rows } = await response.json();

  return { bookCount, rows };
}

export async function fetchWishListBooks({ request }: LoaderFunctionArgs) {
  // get the URL of the incoming request to send any relevant searchParams to the server
  const url = new URL(request.url);

  const apiUrl = new URL("/api/db/books/wish-list", url.origin);

  // use the URL searchParams from the request to send the appropriate request to the server
  if (url.searchParams.get("read")) {
    apiUrl.searchParams.set("read", url.searchParams.get("read")!);
  }

  // make the request to the server.
  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      "Error from fetchWishListBooks() loader: could not fetch books",
      { status: response.status },
    );
    throw new Response(
      "Error from fetchWishListBooks() loader: could not fetch books",
      { status: response.status },
    );
  }

  const { bookCount, rows } = await response.json();

  return { bookCount, rows };
}

export async function fetchAllAuthors() {
  const response = await fetch(`/api/db/authors`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      `Error from fetchAllAuthors() loader: could not fetch authors`,
      { status: response.status },
    );
    throw new Response(
      `Error from fetchAllAuthors() loader: could not fetch authors`,
      { status: response.status },
    );
  }

  const allAuthors = await response.json();

  console.log("allAuthors:", allAuthors);

  return allAuthors;
}

export async function fetchAllBooks() {
  const response = await fetch(`/api/db/books`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(`Error from fetchAllBooks() loader: could not fetch books`, {
      status: response.status,
    });
    throw new Response(
      `Error from fetchAllBooks() loader: could not fetch books`,
      { status: response.status },
    );
  }

  const allBooks = await response.json();

  console.log("allBooks:", allBooks);

  return allBooks;
}

export async function fetchBookAndAllAuthors({ params }: LoaderFunctionArgs) {
  const key = params.key;

  const response = await fetch(`/api/db/books/${key}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      `Error from fetchBookByKey() loader: could not fetch book key ${key}`,
      { status: response.status },
    );
    throw new Response(
      `Error from fetchBookByKey() loader: could not fetch book key ${key}`,
      { status: response.status },
    );
  }

  const { book, allAuthors } = await response.json();

  return { book, allAuthors };
}

export async function fetchOwnedAuthors({ request }: LoaderFunctionArgs) {
  // get the URL of the incoming request to send any relevant searchParams to the server
  const url = new URL(request.url);

  const apiUrl = new URL("/api/db/authors/owned", url.origin);

  // use the URL searchParams from the request to send the appropriate request to the server
  if (url.searchParams.get("read")) {
    apiUrl.searchParams.set("read", url.searchParams.get("read")!);
  }

  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      "Error from fetchOwnedAuthors() loader: could not fetch authors",
      { status: response.status },
    );
    throw new Response(
      "Error from fetchOwnedAuthors() loader: could not fetch authors",
      { status: response.status },
    );
  }

  const { authorCount, rows } = await response.json();

  return { authorCount, rows };
}

export async function fetchWishListAuthors({ request }: LoaderFunctionArgs) {
  // get the URL of the incoming request to send any relevant searchParams to the server
  const url = new URL(request.url);

  const apiUrl = new URL("/api/db/authors/wish-list", url.origin);

  // use the URL searchParams from the request to send the appropriate request to the server
  if (url.searchParams.get("read")) {
    apiUrl.searchParams.set("read", url.searchParams.get("read")!);
  }

  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      "Error from fetchWishListAuthors() loader: could not fetch authors",
      { status: response.status },
    );
    throw new Response(
      "Error from fetchWishListAuthors() loader: could not fetch authors",
      { status: response.status },
    );
  }

  const { authorCount, rows } = await response.json();

  return { authorCount, rows };
}

export async function fetchAuthorAndAllBooks({ params }: LoaderFunctionArgs) {
  const key = params.key;

  const response = await fetch(`/api/db/authors/${key}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      `Error from fetchAuthorAndAllBooks() loader: could not fetch author key ${key}`,
      { status: response.status },
    );
    throw new Response(
      `Error from fetchAuthorAndAllBooks() loader: could not fetch author key ${key}`,
      { status: response.status },
    );
  }

  const { author, allBooks } = await response.json();

  return { author, allBooks };
}

export async function getBookByKey({ params }: LoaderFunctionArgs) {
  const key = params.key;

  const response = await fetch(`/api/db/books/${key}/delete`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      `Error from getBookByKey() loader: could not fetch book key ${key}`,
      { status: response.status },
    );
    throw new Response(
      `Error from getBookByKey() loader: could not fetch book key ${key}`,
      { status: response.status },
    );
  }

  const book = await response.json();

  console.log(book);

  return book;
}

export async function getAuthorByKey({ params }: LoaderFunctionArgs) {
  const key = params.key;

  const response = await fetch(`/api/db/authors/${key}/delete`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error(
      `Error from getAuthorByKey() loader: could not fetch author key ${key}`,
      { status: response.status },
    );
    throw new Response(
      `Error from getAuthorByKey() loader: could not fetch author key ${key}`,
      { status: response.status },
    );
  }

  const author = await response.json();

  console.log(author);

  return author;
}
