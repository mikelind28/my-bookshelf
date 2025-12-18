import { redirect } from "react-router";

// from the SearchBar component: anytime a keystroke is entered in the search bar, search open library and return the result preview
export async function searchPreviewAction({ request }: { request: Request }) {
  let formData = await request.formData();

  let searchTerm = formData.get("search-term");
  let searchType = formData.get("search-type");

  if (searchType === "all") {
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

      return result;
    } catch (error) {
      console.error("error from searchAction():", error);
      return undefined;
    }
  }

  if (searchType === "books") {
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

      return result;
    } catch (error) {
      console.error("error from searchAction():", error);
      return undefined;
    }
  }

  if (searchType === "authors") {
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

      return result;
    } catch (error) {
      console.error("error from searchAction():", error);
      return undefined;
    }
  }

  if (searchType === "isbn") {
    try {
      const response = await fetch(
        `/api/open-library/search/isbn/${searchTerm}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          "could not fetch /api/open-library/search/isbn, check network tab",
        );
      }

      const edition = await response.json();

      return edition;
    } catch (error) {
      console.error("error from searchAction():", error);
      return undefined;
    }
  }
}

// TODO: include 'offset' as a search param so a user can see more than 10 results on search submit

// from the SearchBar component: anytime the search from the search bar is submitted, redirect to the SearchResults page, where a loader will get data from open library
export async function searchSubmitAction({ request }: { request: Request }) {
  let formData = await request.formData();

  let searchTerm = formData.get("search-term");
  let searchType = formData.get("search-type");

  if (searchType === "all") {
    try {
      const params = new URLSearchParams();

      if (searchTerm) {
        params.set("q", searchTerm.toString());
      }

      if (searchType) {
        params.set("type", searchType.toString());
      }

      return redirect(`/search/all?${params}`);
    } catch (error) {
      console.error("error from searchSubmitAction():", error);
    }
  }

  if (searchType === "books") {
    try {
      const params = new URLSearchParams();

      if (searchTerm) {
        params.set("q", searchTerm.toString());
      }

      if (searchType) {
        params.set("type", searchType.toString());
      }

      return redirect(`/search/books?${params}`);
    } catch (error) {
      console.error("error from searchSubmitAction():", error);
    }
  }

  if (searchType === "authors") {
    try {
      const params = new URLSearchParams();

      if (searchTerm) {
        params.set("q", searchTerm.toString());
      }

      if (searchType) {
        params.set("type", searchType.toString());
      }

      return redirect(`/search/authors?${params}`);
    } catch (error) {
      console.error("error from searchSubmitAction():", error);
    }
  }

  if (searchType === "isbn") {
    try {
      return redirect(`/search/isbn/${searchTerm}`);
    } catch (error) {
      console.error("error from searchSubmitAction():", error);
    }
  }
}
