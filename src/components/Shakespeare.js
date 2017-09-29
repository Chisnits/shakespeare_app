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
            //hid auth token in config folder
          }).then(response => {
            response.json()
            .then(body => {
                //resolves the promise with the result of parsing the body text as JSON
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
    handleSubmit(event) {
        //event.preventDefault to prevent the component from rerendering on click
        event.preventDefault();
        //attached a ref to the slider
        //Whenever the submit button is clicked to change the data being displayed,
        //the slider will be reset to the 0th index
        this.refs.slider.slickGoTo(0)
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
                <section key={i} style={Styles.itemContainer}>
                    <div style={Styles.itemBorder} key={i}>
                        <Link style={Styles.itemLink} id="results-link" to={`/shakespeare/${item.id}`}>
                            <h2 style={{...Styles.item, ...Styles.sliderLineSpacing}}>Author:<br/> {item.author}</h2>
                            <h3 style={{...Styles.item, ...Styles.sliderLineSpacing}}>Publish Date:<br/> {item.publish_date} </h3>
                            <h4 style={{...Styles.item, ...Styles.sliderLineSpacing}}>Rating: {item.rating}</h4>
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
            className: 'slides',
          };
            console.log(this.refs.slider)
        return (
            <div style={Styles.wallpaper}>
                <div style={Styles.headerContainer}>
                    <div style={Styles.headerTitle}><h1 style={Styles.headerText}>Shakespeare Reviews</h1></div>
                </div>
                <section style={Styles.formContainer}>
                    <section style={Styles.formRatingContainer}>
                        <h1 style={Styles.ratingTitle}>Rating:</h1>
                        <select style={Styles.select} value={this.state.ratingSelectValue} onChange={this.handleRatingSelect}>
                            <option value="original">Original</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                        <form onSubmit={this.handleSubmit}>
                            <input style={Styles.submit} key="submit" className="submit" type="submit"/>
                        </form>
                    </section>
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
    wallpaper: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${require("../assets/Shakespeare.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBorder: {
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#ffffe6',
        height: '275px',
        width: '400px',
        overflow: 'auto',
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
        fontSize: '1.5em'
    },
    sliderLineSpacing: {
        lineHeight: '40px'
    },
    itemLink: {
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
        minWidth: '385px'
    },
    headerText: {
        fontSize: '2.5em'
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '10vh'
    },
    formRatingContainer: {
        backgroundColor: '#ffffe6',
        marginTop: '10px',
        borderRadius: '20px',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingTitle: {
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
    }
}
//imported Radium to allow for pseudo-selectors in Styles object
const StyledShakespeare = Radium(Shakespeare)

export default (StyledShakespeare);
