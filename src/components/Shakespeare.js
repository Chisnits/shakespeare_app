import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js'
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import { Link } from 'react-router-dom'
import _ from 'underscore';
import 'datejs';

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
                        <h4 style={Styles.item}>Rating:<br/> {item.rating}</h4>
                    </Link>    
                </div>
        ))
        return (
            <StyleRoot>
            <div style={Styles.wrapper}>
            <select id="rating-filter">
                <option value="HighestRating">Ascending</option>
                <option value="LowestRating">Descending</option>
            </select>
                <Coverflow
                    width={960}
                    height={480}
                    displayQuantityOfSide={2}
                    navigation={true}
                    enableHeading={false}
                    startPosition={1}
                    media={{
                        '@media (max-width: 900px)': {
                            width: '600px',
                            height: '300px'
                        },
                        '@media (min-width: 900px)': {
                            width: '960px',
                            height: '600px'
                        }
                    }}
                >
                    {data}
                </Coverflow>
            </div>
            </StyleRoot>
        );
    }
}
const Styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    container: {
        height: '20vh',
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
    }

}

export default (Shakespeare);
