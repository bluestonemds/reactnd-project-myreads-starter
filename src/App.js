import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      showSearchPage: false,
      books:[],
      query:''
    }
  }

  componentDidMount () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  changeBookStatus  = (bookStatus) => {
    let books = this.state.books
    let newBooks = []
    var index

    for(var i=0;i<books.length;i++){
      if (books[i].id === bookStatus.book.id){
        books[i].shelf = bookStatus.shelf
        index = i
      } 
      newBooks.push(books[i])
    }
    BooksAPI.update(books[index],bookStatus.shelf).then(
      this.setState({
        books:newBooks
      })
    ) 
  }

  search = () => {
    this.setState({showSearchPage:!this.setState.showSearchPage})
  }

  updateQuery = (query) => {
      this.setState({
        query:query.trim()
      })
  }

  render() {
    let showingBooks
    let query = this.state.query
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = this.state.books.filter((book) => match.test(book.authors))
      if (showingBooks.length === 0){
        showingBooks = this.state.books.filter((book) => match.test(book.title))
      }
    } else {
      showingBooks = this.state.books
    }
    return (
      <Route path='/' render={({ history }) => (
      <div className="app">
      <Link
            to='/search'
            className='search'
            onClick={this.search}
          >Search books</Link>
      
      {this.state.showSearchPage && (
        <Route exact path='/search' render={() => (
          <div className="search-books">
                <div className="search-books-bar">
                <Link
                  to='/'
                  className='close-search'
                  onClick={this.search}
                ></Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div> 
        )}/>
      )}
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
                  books={showingBooks}
                  shelf="currentlyReading"
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks
                  onChangeBookStatus={this.changeBookStatus}
                  books={showingBooks}
                  shelf="wantToRead"
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks
                  onChangeBookStatus={this.changeBookStatus}
                  books={showingBooks}
                  shelf="read"
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      </div>
    )}/>
    )
  }
}

export default BooksApp
