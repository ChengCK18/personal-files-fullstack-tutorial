import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

export const updateCache = (cache, query, addedBook) => {
    if (addedBook === undefined) {
        return;
    }
    // helper that is used to eliminate saving same person twice
    const uniqByTitle = (a) => {
        let seen = new Set();
        return a.filter((item) => {
            let k = item.title;
            return seen.has(k) ? false : seen.add(k);
        });
    };

    cache.updateQuery(query, ({ allBooks }) => {
        return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
        };
    });
};

const App = () => {
    const [token, setToken] = useState(null);
    const [allBooksGenre, setAllBooksGenre] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [notifMsg, setNotifMsg] = useState(null);
    const [page, setPage] = useState("authors");
    const client = useApolloClient();

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded;
            notify(`${addedBook.title} has been added to list of books `);
            console.log(client.cache);
            updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
            // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
            //     return {
            //         allBooks: allBooks.concat(addedBook),
            //     };
            // });
        },
    });

    const notify = (message) => {
        setNotifMsg(message);
        setTimeout(() => {
            setNotifMsg(null);
        }, 10000);
    };

    const handleLogout = () => {
        localStorage.clear();
        client.resetStore(); //clear cache of fetched data
        setToken(null);
    };

    useEffect(() => {
        const localToken = localStorage.getItem("user-token");
        if (localToken !== undefined) {
            // Vulnerability, can just define user-token and bypass, BUT every call to server need valid token
            setToken(localToken);
        }
    }, []);

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token && (
                    <button onClick={() => setPage("add")}>add book</button>
                )}
                {!token && (
                    <button onClick={() => setPage("login")}>login</button>
                )}
                {token && <button onClick={handleLogout}>logout</button>}
            </div>
            <Notification notifMsg={notifMsg} />
            <Authors show={page === "authors"} />

            <Books
                show={page === "books"}
                userInfo={userInfo}
                allBooksGenre={allBooksGenre}
                setAllBooksGenre={setAllBooksGenre}
            />

            <NewBook show={page === "add"} />

            <LoginForm
                show={page === "login"}
                setToken={setToken}
                setUserInfo={setUserInfo}
                notify={notify}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
