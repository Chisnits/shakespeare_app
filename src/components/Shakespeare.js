import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
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
          selectValue: ""
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const BASE_URL = "http://shakespeare.podium.co/api/reviews"
          return fetch(BASE_URL, {
            headers: {
              Authorization : SHAKESPEARE_AUTH_TOKEN
            }
          }).then(response => {
            response.json()
            .then(body => {
                var updateDate = body.data.map((item,i) => {
                    var myDate = Date.parse(item.publish_date)
                    var dateResults = myDate.toString('dddd, MMM yyyy')
                    Object.keys(item).forEach(key => {
                        if(key === 'publish_date'){
                            item[key] = dateResults
                        }
                    })
                })
              this.setState({
                  originalData: body.data,
                  shakespeareData: body.data
              })
            })
          }).catch(err => {
            console.log(err)
          })
    }
    handleSelect(event) {
        this.setState({
            selectValue: event.target.value
        })
      }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.selectValue === 'original'){
            this.setState({
              shakespeareData: this.state.originalData
            })
        }
        else if (this.state.selectValue === 'ascending'){
            this.setState({
                shakespeareData: _.sortBy(this.state.shakespeareData, 'rating').reverse() 
                })
        } else if (this.state.selectValue === 'descending'){
            this.setState({
                shakespeareData: _.sortBy(this.state.shakespeareData, 'rating') 
                })
        }
    }
    
    render() {
        var HighestRating = _.sortBy(this.state.shakespeareData, 'rating').reverse();
        var LowestRating = _.sortBy(this.state.shakespeareData, 'rating');

        var data = this.state.shakespeareData.map((item,i) => (
                <div key={i} style={Styles.container}>
                    <div style={Styles.border}>
                        <Link style={Styles.link} id="results-link" to={`/shakespeare/${item.id}`}>
                            <h2 style={Styles.item}>Author:<br/> {item.author}</h2>
                            <h3 style={Styles.item}>Publish Date:<br/> {item.publish_date} </h3>
                            <h4 style={Styles.item}>Rating: {item.rating}</h4>
                            <Rating
                                initialRate={item.rating}
                                empty="fa fa-star-o fa-2x"
                                full="fa fa-star fa-2x"
                                readonly
                                style={Styles.stars}
                            />
                        </Link>
                    </div>
                </div>
        ))
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            className: 'slides'
          };
        return (
            <div style={Styles.wrapper}>
                <div><h1>Title</h1></div>
                <section style={Styles.formContainer}>
                    <select style={Styles.select} value={this.state.selectValue} onChange={this.handleSelect}>
                            <option value="original">Original</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    <form onSubmit={this.handleSubmit}>
                        <input style={Styles.submit} className="submit" type="submit"/>
                    </form>
                </section>    
                <Slider {...settings}>
                    {data}
                </Slider>
            </div>
        );
    }
}
const Styles = {    
    wrapper: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${require("../assets/Shakespeare.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '50vw'
    },
    border: {
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#ffffe6'
    },
    item: {
        color: 'black',
        cursor: 'pointer',
        fontDecoration: 'none',
        textDecoration: 'none',
        fontSize: '2em',
    },
    link: {
        textDecoration: 'none'
    },
    stars: {
        color: '#FFD700',
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '10vh'
    },
    select: {
        marginTop: '20px',
        height: '3vh',
        width: '10vw',
        backgroundColor: '#ffffe6'
    },
    submit: {
        height: '3vh',
        width: '7vw',
        borderRadius: '20px',
        backgroundColor: '#ffffe6',
        ':hover' : {
            backgroundColor: '#99ddff',
            cursor: 'pointer'
        }
    }
}
const StyledShakespeare = Radium(Shakespeare)

export default (StyledShakespeare);
