import React from 'react';
import './App.css';
import AuthorList from './components/Author.js';
import BookList from './components/Book.js';
import AuthorBookList from './components/AuthorBook.js';
import AuthorItem from './components/Biography.js';
import LoginForm from './components/Auth.js';
import BookForm from './components/FormBook.js';
import './components/bootstrap.css';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import Cookies from 'universal-cookie';


const NotFound404 = ({location}) => {
  return(
    <div>
      <h1>Страница по адресу  "{location.pathname}" не найдена.</h1>
   
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'books': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {this.set_token(response.data['token'])}).catch(error => alert('incorect login or password'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/authors/', {headers})
    .then(response => {
      this.setState(
        {
          'authors': response.data
        }
      )
    }).catch(error => console.log(error))

    axios
    .get('http://127.0.0.1:8000/api/books/', {headers})
    .then(response => {
      const books = response.data
        this.setState(
          {
            'books': books
          }
        )
    })
    .catch(error => console.log(error))
  }

  delete_book(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/books/${id}`, {headers})
    .then(response => {
      this.setState({books: this.state.books.filter((book) => book.id !== id)})
    }).catch(error => {
      console.log(error);
      alert('Для удаления необходима авторизация.');
    })
  }

  create_book(title, authors) {
    const headers = this.get_headers()
    const data = {"title": title, "authors": authors}
    axios.post('http://127.0.0.1:8000/api/books/', data, {headers})
    .then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error);
      alert('Необходима авторизация. Введите правильный логин а пароль');
    })
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/"><strong>LIBRARY</strong></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link" to='/'>Авторы</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to='/books/'>Книги</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/books/create/">Добавить книгу</Link>
                  </li>
                  <li className="nav-item">
                      {this.is_authenticated() ? <button className="btn btn-link nav-link" onClick={() => this.logout()}>Logout</button> : <Link class="nav-link" to='/login/'>Login</Link>}
                  </li>
              </ul>
            </div>
            </div>
          </nav>
            <Switch>
              <Route exact path='/' component={() => <AuthorList items={this.state.authors} />} />
              <Route exact path='/books/' component={() => <BookList books={this.state.books} />} />
              <Route exact path='/login/' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
              <Route path='/author_books/:first_name/'>
                <AuthorBookList books={this.state.books} delete_book = {(id) => this.delete_book(id)} />
              </Route>
              <Route exact path='/author/biography/:id/' component = {() => <AuthorItem authors={this.state.authors} />} />
              <Route exact path='/books/create/' component = {() => <BookForm create_book = {(title, authors) => this.create_book(title, authors)} authors={this.state.authors} />} />
              <Route component={NotFound404} />
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
