export interface OpenLibraryDocument {
  key: string;
  title: string;
  author_name: string[];
  subject: string[];
  cover_edition_key: string;
}

export interface OpenLibrarySearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: number | null;
  docs: OpenLibraryDocument[];
}

export async function searchBooksByTitle(title: string) {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&fields=author_name,title,subject,cover_edition_key,key`
  );

  if (response.status === 404) {
    return [];
  }

  const data: OpenLibrarySearchResult = await response.json();

  return data.docs
    .map((doc: OpenLibraryDocument) => doc)
    .filter((doc) => doc.title && doc.author_name && doc.cover_edition_key && doc.subject && doc.subject);
}

export async function searchBooksByAuthor(author: string) {
  const response = await fetch(
    `https://openlibrary.org/search.json?author=${encodeURIComponent(author)}&fields=author_name,title,subject,cover_edition_key,key`
  );

  if (response.status === 404) {
    return [];
  }

  const data: OpenLibrarySearchResult = await response.json();
  return data.docs
    .map((doc: OpenLibraryDocument) => doc)
    .filter((doc) => doc.title && doc.author_name && doc.cover_edition_key && doc.subject && doc.subject);
}

export async function searchBooksByGenre(genre: string) {
  const response = await fetch(
    `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}&fields=author_name,title,subject,cover_edition_key,key`
  );

  if (response.status === 404) {
    return [];
  }

  const data: OpenLibrarySearchResult = await response.json();
  return data.docs
    .map((doc: OpenLibraryDocument) => doc)
    .filter((doc) => doc.title && doc.author_name && doc.cover_edition_key && doc.subject && doc.subject);
}
