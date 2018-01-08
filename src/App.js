import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      showSearchPage: false,
      books:[]
    }
    this.changeBookStatus = this.changeBookStatus.bind(this)
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  changeBookStatus (bookStatus) {
    let books = this.state.books
    let newBooks = []
    for(var i=0;i<books.length;i++){
      console.log(books[i],bookStatus.id)
      if (books[i].id === bookStatus.book.id){
        books[i].shelf = bookStatus.shelf
        //invoked changeAPI function
        BooksAPI.update(books[i],bookStatus.shelf)
      } 
      newBooks.push(books[i])
    }
//    newBooks = books.map((book)=>(book.id === bookStatus.book.id?book.shelf=bookStatus.shelf:""))
    this.setState({
      books:newBooks
    })
  }

  render() {
    return (
      <div className="app">
      {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks
                  onChangeBookStatus={this.changeBookStatus}
                  books={this.state.books}
                  shelf="currentlyReading"
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks
                  onChangeBookStatus={this.changeBookStatus}
                  books={this.state.books}
                  shelf="wantToRead"
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks
                  onChangeBookStatus={this.changeBookStatus}
                  books={this.state.books}
                  shelf="read"
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
