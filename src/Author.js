import React, { Component } from 'react'

export default class Author extends Component {

    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //         articles:this.props.articles
    //     }
    // }
    

    // loadArticles =(author) => {

    //     if(author.articles.length){
    //         console.log(author.name , ", Have this articles")
    //         console.log(author.articles.length)
    //         author.articles.map((item, index) => {
    //            return <p>{`Title:  ${item.title},  -- Desc:  ${item.description}`}</p>
    //         // console.log("inside map articles ")
    //         })
    //     }
    // }


    render() {
        return (
            <li>
                {this.props.name}
                {/* {this.props.articles[0].title} */}

                <button onClick={()=>{this.props.deleteAuthor(this.props.id)}}>Delete</button>
                <button onClick={()=>{this.props.editView(this.props.id)}}>Edit</button>
                <hr />
            </li>
        )
    }
}