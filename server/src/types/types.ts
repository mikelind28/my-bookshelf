export type AuthorType = {
    key: string,
    name: string | undefined,
    bio: string | undefined,
    birth_date: string | undefined,
    death_date: string | undefined;
}

export type WorkInfoType = {
	key: string;
	title: string;
	subtitle: string;
	authors: { 
		author: {
			key: string,
		} 
	}[];
	publish_date: string;
	publishers: string[];
	covers: number[];
	isbn_13: string[];
	isbn_10: string[];
	number_of_pages: number;
}

export type EditionType = {
	key: string;
	title: string;
	subtitle: string;
	authors: {
		key: string
	}[];
	isbn_13: string[];
	isbn_10: string[];
	languages: {
		key: string
	}[];
	publish_date: string;
	publishers: string[];
	number_of_pages: number;
	covers: number[];
}
