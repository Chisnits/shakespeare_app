import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import _ from 'underscore';
import 'datejs';
import Rating from 'react-rating'

class Shakespeare extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          shakespeareData: []
        }
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
                    var dateResults = myDate.toString('dddd MMM yyyy')
                    Object.keys(item).forEach(key => {
                        if(key === 'publish_date'){
                            item[key] = dateResults
                        }
                    })
                })
              this.setState({
                  shakespeareData: body.data
              })
            })
          }).catch(err => {
            console.log(err)
          })
    }
    
    render() {
        console.log(this.state.shakespeareData)
        var HighestRating = _.sortBy(this.state.shakespeareData, 'rating').reverse();
        var LowestRating = _.sortBy(this.state.shakespeareData, 'rating');
        var data = this.state.shakespeareData.map((item,i) => (
                <div key={i} style={Styles.container}>
                    <div style={Styles.border}>
                        <Link style={Styles.link} id="results-link" to={`/shakespeare/${item.id}`}>
                            <h2 style={Styles.item}>Author:<br/> {item.author}</h2>
                            <h3 style={Styles.item}>Publish Date:<br/> {item.publish_date} </h3>
                            <span style={Styles.item}>Rating:</span><br/>
                            <span style={Styles.item}>{item.rating}</span><br/>
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
            centerMode: true,
            centerPadding: '60px',
          };
        return (
            <div style={Styles.wrapper}>
                <select id="rating-filter">
                    <option value="HighestRating">Ascending</option>
                    <option value="LowestRating">Descending</option>
                </select>
                <Slider {...settings}>
                    {data}
                </Slider>
            </div>
        );
    }
}
const Styles = {    
    wrapper: {
        // display: 'flex',
        // justifyContent: 'space-evenly',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    border: {
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center',
        padding: '15px'
    },
    item: {
        color: 'black',
        cursor: 'pointer',
        fontDecoration: 'none',
        textDecoration: 'none',
    },
    link: {
        textDecoration: 'none'
    },
    stars: {
        color: '#FFD700'
    }

}

export default (Shakespeare);
