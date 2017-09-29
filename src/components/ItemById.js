import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';

class ItemById extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          shakespeareItem: {}
        }
    }
    componentDidMount(){
        //make http request in componentDidMount so not to slow the render of the component.
        const BASE_URL = "http://shakespeare.podium.co/api/reviews"
          return fetch(BASE_URL, {
            headers: {
              Authorization : SHAKESPEARE_AUTH_TOKEN
            }
            //set authorization header to obtain data
            //hid auth token in config folder
          }).then(response => {
            response.json()
            //resolves the promise with the result of parsing the body text as JSON
            .then(body => {
                body.data.map(item => {
                    if(item.id === this.props.match.params.id){
                        //checking to see if the params.id matches
                        //the id of a specific item 
                        body.data.map((item,i) => {
                            var myDate = Date.parse(item.publish_date)
                            var dateResults = myDate.toString('dddd MMM yyyy')
                            //convert the Date from the request into desired format
                            Object.keys(item).forEach(key => {
                                if(key === 'publish_date'){
                                    return item[key] = dateResults
                                }
                            })
                        })
                        //set state with item that matches the params.id
                        this.setState({
                            shakespeareItem: item
                        })
                    }
                })
            })
          }).catch(err => {
            console.log(err)
          })
    }

    
    render() {
        //imported Rating to display the rating as stars instead of numbers.
        //react-rating allows for fractional stars
        return (
            <section style={Styles.wallpaper}>
                <div style={Styles.headerContainer}>
                    <Link to="/" style={Styles.link}>
                        <h1 style={Styles.header}>Home</h1>
                    </Link>
                </div>
                <section style={Styles.itemWrapper}>
                    <div style={Styles.itemContainer}>
                    <h2 style={Styles.item}>Author:<br/> {this.state.shakespeareItem.author}</h2>
                    <h3 style={Styles.item}>Publish Date:<br/> {this.state.shakespeareItem.publish_date} </h3>
                    <h4 style={Styles.item}>Rating: {this.state.shakespeareItem.rating}</h4>
                        <Rating
                            initialRate={this.state.shakespeareItem.rating}
                            empty="fa fa-star-o fa-2x"
                            full="fa fa-star fa-2x"
                            readonly
                            style={Styles.stars}
                        />
                    </div>
                </section>
            </section>
        );
    }
}
//Styles object used for inline styling.
const Styles = {
    wallpaper: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${require("../assets/Shakespeare.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: '3em',
        color: 'black'
    },
    link: {
        textDecoration: 'none'
    },
    itemWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '75vh'
    },
    itemContainer: {
        width: '25vw',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center',
        backgroundColor: '#ffffe6'
    },
    item: {
        color: 'black',
        textDecoration: 'none',
        fontSize: '2.2em',
        lineHeight: '60px'
    },
    stars: {
        color: '#FFD700',
    },

}
export default ItemById;