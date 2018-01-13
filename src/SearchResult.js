import React, { Component } from 'react';
import ChangeShelf from './ChangeShelf';
import Books from './Books';

function SearchResult(props){
        return( 
        <div className="list-books">
          <div className="list-books-title">
            <h1>search Result</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <Books
                onChangeBookStatus={props.onBookShelfChange}
                books={props.books}
                shelf="searchResult"
                />
              </div>
            </div>
          </div>
      </div>
    )
}

export default SearchResult