import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import _ from 'underscore';
import 'datejs';
import Rating from 'react-rating'
import { Carousel } from 'react-responsive-carousel';

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
        var data = HighestRating.map((item,i) => (
                <div key={i} style={Styles.container}>
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
        ))
        return (
            <div style={Styles.wrapper}>
            <select id="rating-filter">
                <option value="HighestRating">Ascending</option>
                <option value="LowestRating">Descending</option>
            </select>
            <Slider>
                {data}
            </Slider>
            </div>
        );
    }
}
const Styles = {    
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center'
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
