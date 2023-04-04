import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        bookCount
        id
    }
`;

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
            born
            bookCount
            id
        }
        published
        genres
    }
`;
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS2 = gql`
    query allBooks($genre: String!) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ALL_BOOKS = gql`
    query allBooks {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
    mutation addBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
            loggedInUser {
                username
                favouriteGenre
            }
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;
