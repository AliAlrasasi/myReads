import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';


export default class Search extends React.Component{
    state = {
        query: '',
        book: []
        
    }

    bookUpdate(book,shelf){
        BooksAPI.update(book,shelf)
        .then(() => {
            
            this.props.bookLoad()
            
        })
        }

        onSearchText = (event) => 
        {
        if(event.target.value) {
        BooksAPI.search(event.target.value)
        .then((query) => {
          
            if(query && !query.error){
              this.mappingShelf(query)
            }
            
            else{
              this.setState({book:[]})
            }
        })
        }
        else{
          this.setState({book:[]})
        }   
      } 

      mappingShelf = (result) => {
        const mapped = result.map(book => {
        const sameBook = this.props.books.find(b => b.id === book.id);
        if(sameBook){
          book.shelf = sameBook.shelf;
        }
          return book;
        });

        this.setState({book:mapped})
      }
    
render(){
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"
                onChange={this.onSearchText}
                
/>
                

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              <ListBooks
              books={this.state.book}
              reload={this.props.reload}
              />

              </ol>
            </div>
          </div>
    )
}

}
