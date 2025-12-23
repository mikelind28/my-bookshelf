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

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");
    const page = params.get("page");

    try {
      const response = await fetch(`/api/open-library/search?q=${searchTerm}&page=${page}`, {
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
        numberOfResults: result.numFound
      };
    } catch (error) {
      console.error("error from allSearchLoader():", error);
    }
  }
}

export async function bookSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");
    const page = params.get("page");

    try {
      const response = await fetch(
        `/api/open-library/search/titles?q=${searchTerm}&page=${page}`,
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
        numberOfResults: result.numFound
      };
    } catch (error) {
      console.error("error from bookSearchLoader():", error);
    }
  }
}

export async function authorSearchLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;

  if (params.size === 0) {
    return redirect("/");
  } else {
    const searchTerm = params.get("q");
    const page = params.get("page");

    try {
      const response = await fetch(
        `/api/open-library/search/authors?q=${searchTerm}&page=${page}`,
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
        numberOfResults: result.numFound
      };
    } catch (error) {
      console.error("error from authorSearchLoader():", error);
    }
  }
}

export async function isbnSearchLoader({ params }: LoaderFunctionArgs) {
  const isbn = params.isbn;

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

export async function workLoader({ request, params }: LoaderFunctionArgs) {
  const workKey = params.key;

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = searchParams.get("page");

  const response = await fetch(`/api/open-library/search/work/${workKey}?page=${page}`);

  const { workInfo, workInfoAuthors, workEditions, numberOfEditions } = await response.json();

  return { workInfo, workInfoAuthors, workEditions, numberOfEditions };
}

export async function authorLoader({ request, params }: LoaderFunctionArgs) {
  const authorKey = params.key;

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = searchParams.get("page");

  const response = await fetch(`/api/open-library/search/author/${authorKey}?page=${page}`, {
    headers: {
      "Content-type": "application/json",
    },
  });

  const { authorInfo, authorWorksInfo } = await response.json();

  return { authorInfo, authorWorksInfo };
}
