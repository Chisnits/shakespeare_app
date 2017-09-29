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
        const BASE_URL = "http://shakespeare.podium.co/api/reviews"
          return fetch(BASE_URL, {
            headers: {
              Authorization : SHAKESPEARE_AUTH_TOKEN
            }
          }).then(response => {
            response.json()
            .then(body => {
                body.data.map(item => {
                    if(item.id === this.props.match.params.id){
                        body.data.map((item,i) => {
                            var myDate = Date.parse(item.publish_date)
                            var dateResults = myDate.toString('dddd MMM yyyy')
                            Object.keys(item).forEach(key => {
                                if(key === 'publish_date'){
                                    return item[key] = dateResults
                                }
                            })
                        })
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
        return (
            <section style={Styles.wallpaper}>
                <div style={Styles.headerContainer}>
                    <Link to="/" style={Styles.link}>
                        <h1 style={Styles.header}>Home</h1>
                    </Link>
                </div>
                <div style={Styles.wrapper}>
                    <div style={Styles.container}>
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
                </div>
            </section>
        );
    }
}
const Styles = {
    wallpaper: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${require("../assets/Shakespeare.jpg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    headerContainer: {
        
        
    },
    header: {
        fontSize: '2em',
        color: 'black'
    },
    link: {
        textDecoration: 'none'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '25vw',
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
        fontSize: '2em',
        lineHeight: '40px'
    },
    stars: {
        color: '#FFD700',
    },

}
export default ItemById;