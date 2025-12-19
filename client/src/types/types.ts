export type Author = {
  key: string;
  name?: string;
  bio?: string;
  birth_date?: string;
  death_date?: string;
  image_url?: string;
  books?: EditionType[];
  last_name?: string;
};

export type OpenLibAuthor = {
  key: string;
  name?: string;
  bio?: {
    type: string;
    value: string;
  };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
};

export type AuthorWorkPreview = {
  key: string;
  covers: number[];
  title: string;
  subtitle?: string;
};

export type WorkSeachPreview = {
  author_key?: string[];
  author_name?: string[];
  cover_edition_key?: string;
  cover_i?: number;
  first_publish_year?: number;
  key: string;
  title: string | null;
};

export type AuthorSeachPreview = {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
};

export type WorkInfoType = {
  authors?: {
    author: {
      key: string;
    };
    type: {
      key: string;
    };
  }[];
  covers?: number[];
  description?:
    | {
        type: string;
        value: string;
      }
    | string;
  first_publish_date?: string;
  key: string;
  links?: {
    title: string;
    url: string;
    type: {
      key: string;
    };
  }[];
  title: string;
};

export type WorksEditionsType = {
  entries: EditionType[];
  links: {
    self: string;
    work: string;
  };
  size: number;
};

export type OpenLibEditionType = {
  key: string;
  title?: string;
  subtitle?: string;
  isbn_13?: string;
  isbn_10?: string;
  languages?: {
    key: string;
  }[];
  publish_date?: string;
  description?:
    | {
        type: string;
        value: string;
      }
    | string;
  coverUrl?: string;
  covers: number[];
  owned: boolean;
  read: boolean;
  publishers: string[];
  authors: Author[];
};

export type EditionType = {
  key: string;
  title?: string;
  subtitle?: string;
  isbn_13?: string;
  isbn_10?: string;
  languages?: {
    key: string;
  }[];
  publish_date?: string;
  description?:
    | {
        type: string;
        value: string;
      }
    | string;
  coverUrl?: string;
  owned: boolean;
  read: boolean;
  publishers?: {
    key: string;
    name: string;
  }[];
  authors?: Author[];
};

export type EditionContextType = { books: EditionType[] };
