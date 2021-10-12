import React from 'react'
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <nav class="navbar navbar-expand-md navbar-light bg-light">
          <div class="container-fluid">
            <Link class="navbar-brand" to="/"><strong>LIBRARY</strong></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link class="nav-link" to='/'>Авторы</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/books/'>Книги</Link>
                </li>
                <li class="nav-item">
                    {this.is_authenticated() ? <button class="btn btn-link nav-link" onClick={() => this.logout()}>Logout</button> : <Link class="nav-link" to='/login/'>Login</Link>}
                </li>
                <li class="nav-item">
                <a class="nav-link" href="http://127.0.0.1:8000/admin/login">Админка</a>
                </li>
            </ul>
          </div>
          </div>
        </nav>
    )
}

export default Header;
