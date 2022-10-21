import React from 'react'
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS, BOOK_SUBSCRIPTION } from "../queries";

const Books = (props) => {
  const [books, setBooks] = useState([])
  const client = useApolloClient()
  const [filter, setFilter] = useState("");
  useSubscription(BOOK_SUBSCRIPTION, {onData: ({data}) => setBooks(books.concat(data.data.bookAdded))});
  const allBooks = useQuery(ALL_BOOKS);
  const selectedBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter
    }
  });
  
  useEffect(() => {
    if (!selectedBooks.loading) setBooks(selectedBooks.data.allBooks);
  }, [selectedBooks.data])

  if (!props.show) {
    return null;
  }

  if (selectedBooks.loading) {
    return <p>loading...</p>;
  }
  
  const genres = new Set()
  allBooks.data.allBooks.forEach(b => b.genres.forEach(g => genres.add(g)))
  
  const handleClick = async (g) => {
    setFilter(g)
    await client.refetchQueries({
      include: [ALL_BOOKS]
    })
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{filter}</b></p> 
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...genres].map(g => <button key={g} onClick={() => handleClick(g)}>{g}</button>)}
      </div>
    </div>
  );
};

export default Books;
