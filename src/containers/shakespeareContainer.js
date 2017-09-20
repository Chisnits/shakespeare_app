import React, { Component } from 'react';
import { getShakespeareData } from '../reducers/shakespeareReducer';
import {SHAKESPEARE_AUTH_TOKEN} from '../config.js'
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';

class shakespeareContainer extends Component {
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
        console.log(this.state.shakespeareData)
        var data = this.state.shakespeareData.map( (item,i) => (    
                <div key={i} style={Styles.container}>    
                    <div style={Styles.author}>{item.author}</div>
                    <div style={Styles.date}>{item.publish_date}</div>
                    <div style={Styles.rating}>{item.rating}</div>
                </div>
        ))
        return (
            <StyleRoot>
            <div style={Styles.wrapper}>
                {/* <Coverflow
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
                > */}
                    {data}
                {/* </Coverflow> */}
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
    }

}

function mapStateToProps(state) {
    return {
      data: state.shakespeareReducer.getData,
      loading: state.shakespeareReducer.loading,
    }
  }

export default connect(mapStateToProps, {getShakespeareData})(shakespeareContainer);
