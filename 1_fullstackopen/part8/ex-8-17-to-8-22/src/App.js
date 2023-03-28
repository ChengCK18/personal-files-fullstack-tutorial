import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
    const [token, setToken] = useState(null);
    const [notifMsg, setNotifMsg] = useState(null);
    const [page, setPage] = useState("authors");

    const notify = (message) => {
        setNotifMsg(message);
        setTimeout(() => {
            setNotifMsg(null);
        }, 10000);
    };
    console.log("Token here => ", localStorage.getItem("user-token"));
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
                {token && <button onClick={() => {}}>logout</button>}
            </div>
            <Notification notifMsg={notifMsg} />
            <Authors show={page === "authors"} />

            <Books show={page === "books"} />

            <NewBook show={page === "add"} />

            <LoginForm
                show={page === "login"}
                setToken={setToken}
                notify={notify}
                setPage={setPage}
            />
        </div>
    );
};

export default App;
