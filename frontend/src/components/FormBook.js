import React from 'react';


class BookForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            authors: []
        }
    }

    handleChange(event) {
        this.setState(
            {
               [event.target.name]: event.target.value
            }
        )
    }
    
    handleSubmit(event) {
        this.props.create_book(this.state.title, [this.state.authors]);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container my-5">
                <h3 className="font-italic text-center">Форма добавления книги в библиотеку</h3>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-9 my-5">
                        <form onSubmit={(event)=> this.handleSubmit(event)}>
                            <div className="from-group row mb-4">
                                <label className="col-3 col-sm-2 col-form-label">Название</label>
                                <input type="text" name="title" placeholder="название книги" 
                                className="form-control col-9 col-sm-7" value={this.state.title} 
                                onChange={(event)=>this.handleChange(event)}/>
                            </div>   
                            <div className="from-group row">
                            <label for="inputAuthor" className="col-3 col-sm-2 col-form-label">Автор</label>
                                <select id="inputAuthor" name="authors" className="form-control col-9 col-sm-7" onChange={(event) => this.handleChange(event)} >
                                    <option>--выберите автора--</option>
                                    {this.props.authors.map((item) => <option value={item.first_name}>{item.last_name} {item.first_name}</option>)}
                                </select>
                            </div>
                            <input type="submit" value="добавить книгу в библиотеку" className="btn btn-primary mt-5" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookForm;