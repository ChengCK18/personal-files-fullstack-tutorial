import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_BOOKS } from "../queries";

const Books = ({ show, userInfo }) => {
    const result = useQuery(GET_ALL_BOOKS);

    const userFavouriteGenre =
        userInfo !== null ? userInfo.favouriteGenre : "all";

    const [selectedGenre, setSelectedGenre] = useState("all");
    if (!show) {
        return null;
    }
    if (result.loading) {
        return <div>Getting a list of books...</div>;
    }

    const books = result.data.allBooks;
    let filterByGenreBooks = books;
    if (selectedGenre !== "all") {
        filterByGenreBooks = filterByGenreBooks.filter((bk) =>
            bk.genres.includes(selectedGenre)
        );
    }

    let genres = Array.from(new Set(books.map((bk) => bk.genres).flat(1)));

    return (
        <div>
            <h2>books</h2>
            <div>
                <span>
                    Genres &nbsp;
                    <button
                        key="all"
                        onClick={() => {
                            setSelectedGenre("all");
                        }}
                    >
                        All
                    </button>
                    <button
                        key="recommend"
                        onClick={() => {
                            setSelectedGenre(userFavouriteGenre);
                        }}
                    >
                        Recommended
                    </button>
                    {genres.map((gen) => {
                        return (
                            <button
                                key={gen}
                                onClick={() => {
                                    setSelectedGenre(gen);
                                }}
                            >
                                {gen}
                            </button>
                        );
                    })}
                </span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filterByGenreBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>

                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
