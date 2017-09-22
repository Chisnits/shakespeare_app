import React, { Component } from 'react';
import { SHAKESPEARE_AUTH_TOKEN } from '../config'

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
                        var updateDate = body.data.map((item,i) => {
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
        console.log(this.state)
        return (
            <section style={Styles.wrapper}>
                <div style={Styles.container}>
                    <div>Author:<br/>{this.state.shakespeareItem.author}</div>
                    <div>Publish Date:<br/> {this.state.shakespeareItem.publish_date}</div>
                    <div>Rating:<br/> {this.state.shakespeareItem.rating}</div>
                </div>
            </section>
        );
    }
}
const Styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: '20vh',
        width: '25vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '20px',
        textAlign: 'center'
    }

}

export default ItemById;