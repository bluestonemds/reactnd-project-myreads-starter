import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookList from './BookList';
import SearchResult from './SearchResult';
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            book:[],
            query:''
        }
      }

      updateQuery = (query) => {
        this.setState({
            query:query.trim()
          }
        )
          BooksAPI.search(this.state.query).then((books)=>
          this.props.onSearch(
              books
          )
        )
      }

    render () {
        let books
        if (this.props.books){
            let books = this.props.books
        } else {
            books = []
        }
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                        to='/'
                        className='close-search'
                        onClick={this.props.onRefresh}
                        ></Link>
                        <div className="search-books-input-wrapper">
                        <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid"></ol>
                    </div>
                </div> 
                <SearchResult
                    books={this.props.books}
                    onBookShelfChange={this.props.onBookShelfChange}
                />
            </div>
        )
    }
}

export default SearchPage