import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config.js'
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import { Link } from 'react-router-dom'
import _ from 'underscore'

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
              this.setState({
                  shakespeareData: body.data
              })
            })
          }).catch(err => {
            console.log(err)
          })
    }
    render() {
        var HighestRating = _.sortBy(this.state.shakespeareData, 'rating').reverse();
        var LowestRating = _.sortBy(this.state.shakespeareData, 'rating').reverse();
        console.log(HighestRating)
        console.log(this.state.shakespeareData)
        var data = this.state.shakespeareData.map( (item,i) => (    
                <div key={i} style={Styles.container}>
                    <Link id="results-link" to={`/shakespeare/${item.id}`}>    
                        <div style={Styles.author}>Author: {item.author}</div>
                        <div style={Styles.date}>Publish Date: {item.publish_date}</div>
                        <div style={Styles.rating}>Rating: {item.rating}</div>
                    </Link>    
                </div>
        ))
        return (
            <StyleRoot>
            <div style={Styles.wrapper}>
            <select name="cars">
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
    }

}

export default (Shakespeare);