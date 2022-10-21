import React from 'react'
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ME, ALL_BOOKS } from "../queries";

const Recommendation = (props) => {
  const user = useQuery(ME);
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (user.data) {
      getBooks({ variables: { genre: user.data.me.favouriteGenre } });
    }
  }, [user, getBooks]);

  if (!props.show || user.loading || loading) {
    return null;
  }

  const books = data && data.allBooks;
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{user.data.me.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
