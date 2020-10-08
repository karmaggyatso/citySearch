import React, { Component } from 'react';
import './App.css';


function ZipCode(props) {
  return (<div>
    <p>{props.zipCode}</p>
  </div>);
}

function CitySearchField(props) {

  return (<div>
    City Search: 
    <input onChange = {props.handlEvent} value = {props.city} />
  </div>);
}


class App extends Component {

  state = {
    items: [],
    city: '',
    zipCode: [],
  }

  zipApi () {


    const zipCodeElement = [];

    for (let i = 0; i<this.state.items.length; i++) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zipCodeElement[i]}`)
      .then(res => res.json) 
      .then(data => 
        this.setState ({
          zipCode: data,
        })
      )
      .catch(err => 
          console.log("error")
        )
    }
  } 
  onChangeHandle(event) {
    const query = (event.target.value).toUpperCase();
    const url = `http://ctp-zip-api.herokuapp.com/city/${query}`;
    fetch(url)
    .then(res => res.json() )
    .then(data => {
      this.setState({
        items: data,
      })

      // console.log(this.zipApi());
    })
    .then(
      this.zipApi()
      )
    .catch(err => {
      this.setState({
        items: [],
      })
    })
  }

  render() {
    console.log(this.state.zipCode)
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Zip Code Search</h2>
        </div>
        <CitySearchField handlEvent = {(e) => this.onChangeHandle(e)} dataArray = {this.items}/>
        <div>
          {
            this.state.items.map((item, index) =>{
              return <ZipCode zipCode = {item} key = {index} />
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
