import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`;

export const GET_ALL_BOOKS = gql`
    query {
        allBooks {
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
    }
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
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
            id
        }
    }
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
