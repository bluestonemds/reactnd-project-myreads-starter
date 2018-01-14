import React, { Component } from 'react';
import ChangeShelf from './ChangeShelf';

function Books(props) {
      let books
      if (props.books.length){
          books = props.books.filter((book) => (book.shelf === props.shelf)) 
      } else {
          books = []
      }

      if (props.shelf ==='searchResult'){
        books = props.books
      }
        return (
        <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book,i)=>(
                    <li key={i}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <ChangeShelf 
                            onChangeShelf={props.onChangeBookStatus}
                            book={book}
                            shelf={props.shelf}
                            /> 
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
              ))}
            </ol>
        </div>
        )
}

export default Books