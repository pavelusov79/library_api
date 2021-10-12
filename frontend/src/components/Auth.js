import React from 'react';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="container my-5">
                <h3 className="text-center font-italic mb-4">Авторизация</h3>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="form-group">
                                <label for="login">Enter login</label>
                                <input type="text" className="form-control" id="login" name="login" placeholder="Enter login" value={this.state.login} onChange={(event) => this.handleChange(event)} />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Enter password</label>
                                <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                            </div>
                            <input type="submit" value="войти" class="btn btn-primary mb-5 px-3" role="button" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
