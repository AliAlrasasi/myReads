import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Link, Route } from 'react-router-dom'
import Search from './Search'

class App extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false,
    book: [],
    shelf: ['CurrentlyReading', 'WantToRead', 'Read']
  }

  bookLoad = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books: books
      })

      this.bookFilter();
    
    })
  }

  componentDidMount() {
   this.bookLoad()
  } 

  bookFilter  = () => {
    const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading") 
    const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead")  
    const read = this.state.books.filter(book => book.shelf === "read")

    this.setState({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      read: read
    })
  }


  render() {
    return (

      <div className="app">
       
        
           <Route path="/" exact component={() => (
              <div className="list-books">
               <div className="list-books-title">
                 <h1>MyReads</h1>
               </div>
                  <div className="list-books-content">
                        <div>
                            <ListBooks
                            key='currentlyReading'
                            books={this.state.currentlyReading} 
                            titleSection='Currently Reading'
                            reload={this.bookLoad}
                            />
                        </div>
                        <div>
                            <ListBooks
                            key='wantToRead'
                            books={this.state.wantToRead} 
                            titleSection='Want To Read'
                            reload={this.bookLoad}
                            />
                        </div>
                      <div>
                            <ListBooks
                            key='read'
                            books={this.state.read} 
                            titleSection='Read'
                            reload = {this.bookLoad}
                            />
                      </div>
                </div>
              </div>
        
        )}
        />
           
            <Route 
            path="/search"
            component={() => (
              <Search 
              reload = {this.bookLoad}
              books = {this.state.books}
              />
            )}
            />
              <div className="open-search">
                <Link to='search'>
                  
                  <button className='fa fa-search'></button>
                </Link>
              </div>

     </div>

      
    )
  }
}


export default App

