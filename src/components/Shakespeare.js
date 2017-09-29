import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import _ from 'underscore';
import 'datejs';
import Rating from 'react-rating';
import Radium from 'radium';

import '../styles/shakespeare.css'

class Shakespeare extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          originalData: [],
          shakespeareData: [],
          ratingSelectValue: "",
          searchValue: "",
        }
        this.handleRatingSelect = this.handleRatingSelect.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //make http request in componentDidMount so not to slow the render of the component.
        const BASE_URL = "http://shakespeare.podium.co/api/reviews"
          return fetch(BASE_URL, {
            headers: {
              Authorization : SHAKESPEARE_AUTH_TOKEN
            }
            //set authorization header to obtain data
          }).then(response => {
            response.json()
            .then(body => {
                //resolves the promise with the result of parsting the body text as JSON
                body.data.map((item,i) => {
                    var myDate = Date.parse(item.publish_date)
                    var dateResults = myDate.toString('dddd, MMM yyyy')
                    //convert the Date from the request into desired format
                    Object.keys(item).forEach(key => {
                        if(key === 'publish_date'){
                            item[key] = dateResults
                        }
                    })
                })
              this.setState({
                  //setting original data so that i have unaltered data to restore state to
                  originalData: body.data,
                  shakespeareData: body.data
              })
            })
          }).catch(err => {
            console.log(err)
          })
    }
    handleRatingSelect(event) {
        //set the state of rating select value to the value selected
            this.setState({
                ratingSelectValue: event.target.value
            })
      }
    // handleSearch(event) {
    //     this.setState({
    //         searchValue: event.target.value
    //     })
    // }
    handleSubmit(event) {
        //event.preventDefault to prevent the component from rerendering on click
        event.preventDefault();
        //check state to see which data you want to be displayed
        //default is the original data
        if (this.state.ratingSelectValue === 'original'){
            this.setState({
              shakespeareData: this.state.originalData
            })
        }
        else if (this.state.ratingSelectValue === 'ascending'){
            //used Underscore.js
            //return the data from highest to lowest values based on rating
            this.setState({
                shakespeareData: _.sortBy(this.state.shakespeareData, 'rating').reverse() 
                })
                //used Underscore.js
                //return the data from lowest to highest values based on rating
        } else if (this.state.ratingSelectValue === 'descending'){
            this.setState({
                shakespeareData: _.sortBy(this.state.shakespeareData, 'rating') 
                })
        }
    }
    
    render() {
        //map over shakespeare data to return jsx to be rendered below.
        //Used Link to route the user to a new route with the specific id selected.
        //imported Rating to display the rating as stars instead of numbers.
        //react-rating allows for fractional stars
        var data = this.state.shakespeareData.map((item,i) => (
                <section key={i} style={Styles.container}>
                    <div style={Styles.border} key={i}>
                        <Link style={Styles.link} id="results-link" to={`/shakespeare/${item.id}`}>
                            <h2 style={{...Styles.item, ...Styles.author}}>Author:<br/> {item.author}</h2>
                            <h3 style={{...Styles.item, ...Styles.date}}>Publish Date:<br/> {item.publish_date} </h3>
                            <h4 style={{...Styles.item, ...Styles.rating}}>Rating: {item.rating}</h4>
                                <Rating
                                    initialRate={item.rating}
                                    empty="fa fa-star-o fa-2x"
                                    full="fa fa-star fa-2x"
                                    readonly
                                    style={Styles.stars}
                                />
                        </Link>
                    </div>
                </section>
        ))
        //settings to be applied to slick-slider`
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            className: 'slides'
          };
        //   if(this.state.animate === true){
        //       Styles.animateActive = {
        //         animationDuration: '3s',
        //         animationName: 'slideInLeft'
        //       }
        //   }
        console.log(this.refs.slider)
        return (
            <div style={Styles.wrapper}>
                <div style={Styles.headerContainer}>
                    <div style={{ ...Styles.headerTitle, ...Styles.animateActive }}><h1 style={Styles.headerText}>Shakespeare Reviews</h1></div>
                </div>
                <section style={Styles.formContainer}>
                    <h1 style={Styles.ratingTitle}>Rating:</h1>
                    <select style={Styles.select} value={this.state.ratingSelectValue} onChange={this.handleRatingSelect}>
                            <option value="original">Original</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                    </select>
                    <form onSubmit={this.handleSubmit}>
                        {/* <input type="input" value={this.state.searchValue} onChange={this.handleSearch}/> */}
                        <input style={Styles.submit} key="submit" className="submit" type="submit"/>
                    </form>
                </section>    
                <Slider ref="slider" {...settings}>
                    {data}
                </Slider>
            </div>
        );
    }
}

//styles object used for inline styling.
const Styles = {    
    wrapper: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${require("../assets/Shakespeare.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#ffffe6',
        height: '275px',
        width: '400px',
        overflow: 'auto',
        minWidth: '230px',
        maxHeight: '265px',
        ':hover' : {
            backgroundColor: '#d1d1c4',
            cursor: 'pointer',
        }
    },
    item: {
        color: 'black',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '1.5em',
    },
    author: {
        lineHeight: '40px'
    },
    date: {
        lineHeight: '40px'
    },
    rating: {
        lineHeight: '40px'
    },
    link: {
        textDecoration: 'none'
    },
    stars: {
        color: '#FFD700',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    headerTitle: {
        marginTop: '15px',
        height: '10vh',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffe6',
        borderRadius: '20px',
        whiteSpace: 'nowrap',
        minWidth: '310px'
    },
    headerText: {
        fontSize: '2em'
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '10vh'
    },
    ratingTitle: {
        marginTop: '10px',
        fontSize: '2em'
    },
    select: {
        marginTop: '20px',
        height: '3vh',
        width: '10vw',
        backgroundColor: '#ffffe6',
        minWidth: '70px'
    },
    submit: {
        height: '3vh',
        width: '7vw',
        borderRadius: '20px',
        backgroundColor: '#ffffe6',
        fontDecoration: 'none',
        textDecoration: 'none',
        minWidth: '70px',
        ':hover' : {
            backgroundColor: '#d1d1c4',
            cursor: 'pointer',
            fontDecoration: 'none',
            textDecoration: 'none',
        }
    },
}
//imported Radium to allow for pseudo-selectors in Styles object
const StyledShakespeare = Radium(Shakespeare)

export default (StyledShakespeare);
