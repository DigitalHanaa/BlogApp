import React, { Component } from 'react';
import axios from 'axios';
import Author from './Author';
import AuthorNewForm from './AuthorNewForm';
import AuthorEditForm from './AuthorEditForm';

export default class AuthorList extends Component {
    // #1 constru, then
    // #2 render() 
    // #3 componentDidMount
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            isEdit: false,
            clickedAuthorId: '',
            isAdd: false
        }
    }

    // if you want to display something in all pages without any interactions
    componentDidMount() {
        this.loadAuthorList();
    }

    // load author lists
    loadAuthorList = () => {
        axios.get("/blogapp/author/index")
            .then(response => {
                this.setState({
                    authors: response.data,
                })
            })
            .catch(error => {
                console.log("Error retreiving Authors !!");
                console.log(error);
            })
    }

    loadArticles =(author) => {

        if(author.articles.length){
            console.log(author.name , ", Have this articles")
            console.log(author.articles.length)
              
            return (<ul>
                    {author.articles.map((item, index) => {
                      return <li>{item.description}</li> 
                    })}
            </ul>)
        }
    }

    addAuthor = (author) => {
        // post -> html method for posting data
        // have posted author from "/blogapp/author/add" route
        // this author object just came from AuthorNewForm "onSUBMIT"
        // if the response entered 'then' block, the author is added 
        // 'then' block indecates that the calling to the controller is 200, 
        //controller will return author into the response object
        axios.post("/blogapp/author/add", author, {
            headers: {
                // should be the same name as JwtRequestFilter class => final String requestTokenHeader = request.getHeader("Authorization");
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                /*
                The HTTP 415 Unsupported Media Type client error response code indicates that the server 
                refuses to accept the request because the payload format is in an unsupported format.
                in order to solve this, you may write @JsonIgnore on both models that have relations
                */
                console.log("Added!!")
                console.log("stateeee =", this.state.authors)
                console.log([...this.state.authors])
                const updatedAuthorsList = [...this.state.authors]
                updatedAuthorsList.push(response.data)
                this.setState({
                    authors: updatedAuthorsList
                })
            })
            .catch(error => {
                console.log("Error Adding Author");
                console.log(error)
            })
    }

    deleteAuthor = (id) => {
        axios.delete(`/blogapp/author/delete?id=${id}`, {
            // params:{id:id},
            headers: {
                // should be the same name as JwtRequestFilter class => final String requestTokenHeader = request.getHeader("Authorization");
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("deleted!", response)
                // const updatedAuthorsList = [...this.state.authors]
                // const index = updatedAuthorsList.findIndex(x=> x.id === id) 

                // if(index !== -1){
                //     updatedAuthorsList.splice(index,1);
                //     this.setState({
                //         authors: updatedAuthorsList
                //     })
                // }

                this.loadAuthorList();
            })
            .catch(error => {
                console.log("error deleteing ", error)
            })
    }

    editView = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
            clickedAuthorId: id
        })
    }

    editAuthor = (author) => {
        axios.put("/blogapp/author/edit", author, {
            headers: {
                // should be the same name as JwtRequestFilter class => final String requestTokenHeader = request.getHeader("Authorization");
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log("edited. ")
                console.log(response)
                // recently1
                this.setState({
                    isEdit: false,
                    clickedAuthorId: ''
                })
                this.loadAuthorList();
            })
            .catch(error => {
                console.log("error, can't edit author =", error)
            })
    }

    render() {
        return (
            <div>
                
                {/* display add form when no edit needed */}
                {(!this.state.isEdit) ? <AuthorNewForm addAuthor={this.addAuthor} /> : null}
                <h1>Authors List</h1>
                <ul>
                    {this.state.authors.map((author, index) =>
                        <div key={index}>
                            {/* spread operator "..." allows an iterable such as an array expression or string to be expanded */}
                            <Author {...author} deleteAuthor={this.deleteAuthor} editView={this.editView} />

                            {(this.state.isEdit && this.state.clickedAuthorId === author.id) ?
                                <AuthorEditForm author={author} editAuthor={this.editAuthor} /> : null}
                            <p>HELLO</p>
                            
                            {this.loadArticles(author)}
                        </div>)}
                      
                </ul>
            </div>
        )
    }
}