import { LoaderFunctionArgs, redirect } from "react-router";

// there is no component at '/search' path exactly, so redirect home
export function redirectSearch({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/search") {
    return redirect("/");
  }
}

export async function allSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  console.log(params.size);

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");

    try {
      const response = await fetch(`/api/open-library/search?q=${searchTerm}`, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "could not fetch /api/open-library/search, check network tab",
        );
      }

      const result = await response.json();

      return {
        searchTerm: searchTerm,
        searchType: "All",
        searchResults: result.docs,
      };
    } catch (error) {
      console.error("error from bookSearchLoader():", error);
    }
  }
}

export async function bookSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  console.log(params.size);

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");

    try {
      const response = await fetch(
        `/api/open-library/search/titles?q=${searchTerm}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          "could not fetch /api/open-library/search/titles, check network tab",
        );
      }

      const result = await response.json();

      return {
        searchTerm: searchTerm,
        searchType: "Books",
        searchResults: result.docs,
      };
    } catch (error) {
      console.error("error from bookSearchLoader():", error);
    }
  }
}

export async function authorSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  console.log(params.size);

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");
    try {
      const response = await fetch(
        `/api/open-library/search/authors?q=${searchTerm}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          "could not fetch /api/open-library/search/authors, check network tab",
        );
      }

      const result = await response.json();

      return {
        searchTerm: searchTerm,
        searchType: "Authors",
        searchResults: result.docs,
      };
    } catch (error) {
      console.error("error from authorSearchLoader():", error);
    }
  }
}

export async function isbnSearchLoader({ params }: LoaderFunctionArgs) {
  const isbn = params.isbn;

  console.log(isbn);

  if (!isbn) {
    return redirect("/");
  } else {
    try {
      const response = await fetch(`/api/open-library/search/isbn/${isbn}`, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "could not fetch /api/open-library/search/isbn, check network tab",
        );
      }

      const edition = await response.json();

      return { searchTerm: isbn, searchType: "ISBN", searchResults: [edition] };
    } catch (error) {
      console.error("error from isbnSearchLoader():", error);
    }
  }
}

export async function workLoader({ params }: LoaderFunctionArgs) {
  const workKey = params.key;

  const response = await fetch(`/api/open-library/search/work/${workKey}`);

  const { workInfo, workInfoAuthors, workEditions } = await response.json();

  return { workInfo, workInfoAuthors, workEditions };
}

export async function editionLoader({ params }: LoaderFunctionArgs) {
  const editionKey = params.editionKey;

  const response = await fetch(
    `/api/open-library/search/edition/${editionKey}`,
  );

  const editionInfo = await response.json();

  return editionInfo;
}

export async function authorLoader({ params }: LoaderFunctionArgs) {
  const authorKey = params.key;

  const response = await fetch(`/api/open-library/search/author/${authorKey}`);

  const { authorInfo, authorWorksInfo } = await response.json();

  return { authorInfo, authorWorksInfo };
}
