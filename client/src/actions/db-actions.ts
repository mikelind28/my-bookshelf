import { ActionFunctionArgs, redirect } from "react-router";
import { Author, EditionType } from "../types/types";

export async function addNewBook({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("edition-title");
  const subtitle = formData.get("edition-subtitle");
  const publication_date = formData.get("edition-publish-date");
  const description = formData.get("edition-description");
  const coverUrl = formData.get("edition-cover-url");
  const owned = formData.get("edition-owned");
  const read = formData.get("edition-read");
  const authorKeys = formData.getAll("edition-author-keys");
  const publishers = formData.getAll("edition-publishers");
  const isbn_10 = formData.get("edition-isbn-10");
  const isbn_13 = formData.get("edition-isbn-13");
  const key = formData.get("edition-key");

  let ownedAsString: string;
  if (owned === null) {
    ownedAsString = "false";
  } else {
    ownedAsString = "true";
  }

  let readAsString: string;
  if (read === null) {
    readAsString = "false";
  } else {
    readAsString = "true";
  }

  let dataToSend = {
    title: title,
    subtitle: subtitle,
    publication_date: publication_date,
    owned: ownedAsString,
    read: readAsString,
    authorKeys: authorKeys,
    description: description,
    coverUrl: coverUrl,
    publishers: publishers,
    isbn_10: isbn_10 === "" ? null : isbn_10,
    isbn_13: isbn_13 === "" ? null : isbn_10,
    key: key,
  };

  try {
    // console.log('dataToSend:', dataToSend);
    const response = await fetch("/api/db/books", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("could not post to /api/db/books, check network tab");
    }
  } catch (error) {
    console.error("error from route-actions.ts addNewBook:", error);
  }
}

export async function createNewBook({ request }: { request: Request }) {
  // const url = new URL(request.url);

  // let pathName = 'my-shelf';

  // if (url.pathname.includes('/my-shelf')) {
  //     pathName = 'my-shelf';
  // }

  // if (url.pathname.includes('/wish-list')) {
  //     pathName = 'wish-list';
  // }

  const formData = await request.formData();
  const title = formData.get("edition-title");
  const subtitle = formData.get("edition-subtitle");
  const publication_date = formData.get("edition-publish-date");
  const description = formData.get("edition-description");
  const coverUrl = formData.get("edition-cover-url");
  const owned = formData.get("edition-owned");
  const read = formData.get("edition-read");
  const authorKeys = formData.getAll("edition-author-keys");
  const publishers = formData.getAll("edition-publishers");
  const isbn_10 = formData.get("edition-isbn-10");
  const isbn_13 = formData.get("edition-isbn-13");

  let ownedAsString: string;
  if (owned === null) {
    ownedAsString = "false";
  } else {
    ownedAsString = "true";
  }

  let readAsString: string;
  if (read === null) {
    readAsString = "false";
  } else {
    readAsString = "true";
  }

  let dataToSend = {
    title: title,
    subtitle: subtitle,
    publication_date: publication_date,
    owned: ownedAsString,
    read: readAsString,
    authorKeys: authorKeys,
    description: description,
    coverUrl: coverUrl,
    publishers: publishers,
    isbn_10: isbn_10 === "" ? null : isbn_10,
    isbn_13: isbn_13 === "" ? null : isbn_10,
  };

  try {
    // console.log('dataToSend:', dataToSend);
    const response = await fetch("/api/db/books/new", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("could not post to /api/db/books, check network tab");
    }

    const book = await response.json();

    console.log(book);

    if (book.owned) {
      return redirect(`/my-shelf${book.key}`);
    }

    if (!book.owned) {
      return redirect(`/wish-list${book.key}`);
    }
  } catch (error) {
    console.error("error from route-actions.ts createNewBook:", error);
  }
}

export async function addNewAuthor({ request }: { request: Request }) {
  const formData = await request.formData();

  const name = formData.get("author-name");
  const birthDate = formData.get("author-birth-date");
  const deathDate = formData.get("author-death-date");
  const bio = formData.get("author-bio");
  const imageUrl = formData.get("author-image-url");
  const key = formData.get("author-key");

  let dataToSend = {
    name: name,
    birthDate: birthDate,
    deathDate: deathDate,
    bio: bio,
    imageUrl: imageUrl,
    key: key,
  };

  try {
    // console.log('dataToSend:', dataToSend);
    const response = await fetch("/api/db/authors", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("could not post to /api/db/authors, check network tab");
    }
  } catch (error) {
    console.error("error from route-actions.ts addNewAuthor:", error);
  }
}

export async function createNewAuthor({ request }: { request: Request }) {
  // const url = new URL(request.url);

  // let pathName = 'my-shelf';

  // if (url.pathname.includes('/my-shelf')) {
  //     pathName = 'my-shelf';
  // }

  // if (url.pathname.includes('/wish-list')) {
  //     pathName = 'wish-list';
  // }

  const formData = await request.formData();

  // TODO: ADD UUID AUTO CREATE TO AUTHOR MODEL
  const first_name = formData.get("author-first-name");
  const middle_name = formData.get("author-middle-name");
  const last_name = formData.get("author-last-name");
  const bio = formData.get("author-bio");
  const birth_date = formData.get("author-birth-date");
  const death_date = formData.get("author-death-date");
  const image_url = formData.get("author-image-url");
  const bookKeys = formData.getAll("author-book-keys");

  let dataToSend = {
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    bio: bio,
    birth_date: birth_date,
    death_date: death_date,
    image_url: image_url,
    bookKeys: bookKeys,
  };

  try {
    // console.log('dataToSend:', dataToSend);
    const response = await fetch("/api/db/authors/new", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("could not post to /api/db/authors, check network tab");
    }

    const author: Author = await response.json();

    console.log(author);

    if (author.books && author.books.some((book: EditionType) => book.owned)) {
      return redirect(`/my-shelf${author.key}`);
    } else {
      return redirect(`/wish-list${author.key}`);
    }
    // redirect to /my-shelf or /wish-list, depending on if the author owns any books...
  } catch (error) {
    console.error("error from route-actions.ts createNewBook:", error);
  }
}

export async function editBookAction({ request, params }: ActionFunctionArgs) {
  let formData = await request.formData();
  let key = params.key;

  let dataToReturn = {
    key: key,
    title: formData.get("edition-title"),
    subtitle: formData.get("edition-subtitle"),
    publish_date: formData.get("edition-publish-date"),
    description: formData.get("edition-description"),
    coverUrl: formData.get("edition-cover-url"),
    isbn_10: formData.get("edition-isbn-10"),
    isbn_13: formData.get("edition-isbn-13"),
    owned: formData.get("edition-owned"),
    read: formData.get("edition-read"),
    authorKeys: formData.getAll("edition-author-keys"),
    publishers: formData.getAll("edition-publishers"),
  };

  try {
    const response = await fetch("/api/db/books", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToReturn),
    });

    if (!response.ok) {
      throw new Error("Invalid response, check network tab.");
    }

    return redirect(`/my-shelf/books/${key?.replace("/books", "")}`);
  } catch (error) {
    console.error("error from editBookAction:", error);
  }
}

export async function deleteBook({ request, params }: ActionFunctionArgs) {
  let key = params.key;

  const url = new URL(request.url);

  let pathName;

  if (url.pathname.includes("/my-shelf")) {
    pathName = "my-shelf";
  } else if (url.pathname.includes("/wish-list")) {
    pathName = "wish-list";
  } else {
    pathName = "my-shelf";
  }

  try {
    const response = await fetch(`/api/db/books/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid response, check network tab.");
    }

    return redirect(`/${pathName}/books/${key?.replace("/books", "")}`);
  } catch (error) {
    console.error("error from deleteBook:", error);
  }
}

export async function editAuthorAction({
  request,
  params,
}: ActionFunctionArgs) {
  let formData = await request.formData();
  let key = params.key;
  let url = request.url;
  let pathName = "my-shelf";

  if (url.includes("/my-shelf")) {
    pathName = "my-shelf";
  }

  if (url.includes("/wish-list")) {
    pathName = "wish-list";
  }

  let dataToReturn = {
    key: key,
    name: formData.get("author-name"),
    birth_date: formData.get("author-birth-date"),
    death_date: formData.get("author-death-date"),
    bio: formData.get("author-bio"),
    image_url: formData.get("author-image-url"),
    bookKeys: formData.getAll("author-book-keys"),
  };

  try {
    const response = await fetch("/api/db/authors", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToReturn),
    });

    if (!response.ok) {
      throw new Error("Invalid response, check network tab.");
    }

    return redirect(`/${pathName}/authors/${key}`);
  } catch (error) {
    console.error("error from editAuthorAction:", error);
  }
}

export async function deleteAuthor({ request, params }: ActionFunctionArgs) {
  let key = params.key;

  const url = new URL(request.url);

  let pathName;

  if (url.pathname.includes("/my-shelf")) {
    pathName = "my-shelf";
  } else if (url.pathname.includes("/wish-list")) {
    pathName = "wish-list";
  } else {
    pathName = "my-shelf";
  }

  try {
    const response = await fetch(`/api/db/authors/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid response, check network tab.");
    }

    return redirect(`/${pathName}/authors/${key?.replace("/authors", "")}`);
  } catch (error) {
    console.error("error from deleteAuthor:", error);
  }
}
