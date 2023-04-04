import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_ALL_BOOKS } from "../queries";

const Books = ({ show, userInfo, allBooksGenre, setAllBooksGenre }) => {
    const [selectedGenre, setSelectedGenre] = useState("all");

    const userFavouriteGenre =
        userInfo !== null ? userInfo.favouriteGenre : "all";

    const {
        data: result,
        isFetching,
        status,
        error,
        refetch,
    } = useQuery(GET_ALL_BOOKS, {
        variables: { genre: selectedGenre },
    });

    useEffect(() => {
        //Update the latest list of genres from db
        if (selectedGenre === "all" && result !== undefined) {
            const updatedGenres = Array.from(
                new Set(result.allBooks.map((bk) => bk.genres).flat(1))
            );
            setAllBooksGenre(updatedGenres);
        }
    }, [result]);

    if (result === undefined) {
        return <div>Getting a list of books...</div>;
    }
    console.log(result);
    const books = result.allBooks;

    if (!show) {
        return null;
    }

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
                            refetch({ genre: selectedGenre });
                        }}
                    >
                        All
                    </button>
                    <button
                        key="recommend"
                        onClick={() => {
                            setSelectedGenre(userFavouriteGenre);
                            refetch({ genre: selectedGenre });
                        }}
                    >
                        Recommended
                    </button>
                    {allBooksGenre.map((gen) => {
                        return (
                            <button
                                key={gen}
                                onClick={() => {
                                    setSelectedGenre(gen);
                                    refetch({ genre: selectedGenre });
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
                    {books.map((a) => (
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
