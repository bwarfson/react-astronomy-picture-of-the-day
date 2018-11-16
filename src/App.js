import React, { Component } from 'react';
import DateInput from "./components/DateInput";
import Photo from "./components/Photo.js";
import './App.css';
import moment from "moment";
import momentRandom from "moment-random";

//nasa info
//LEs3ME71yBClhmlHqxtAn3zEtJ6BEH3g2JzH3pzF
//https://api.nasa.gov/planetary/apod?api_key=LEs3ME71yBClhmlHqxtAn3zEtJ6BEH3g2JzH3pzF

class App extends Component {
  state = {
    date: moment(),
    photo:""
  };

  changeDate = dateFromInput => {
    this.setState({ date: dateFromInput });
    this.getPhoto(this.formatDate(dateFromInput));
  };

  getPhoto = date => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=LEs3ME71yBClhmlHqxtAn3zEtJ6BEH3g2JzH3pzF`)
      .then(response => response.json())
      .then(photoData => this.setState({ photo: photoData }));
  };

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=LEs3ME71yBClhmlHqxtAn3zEtJ6BEH3g2JzH3pzF`)
      .then(response => response.json())
      .then(json => this.setState({photo: json}));
  };

  formatDate = moment => {
    let year = moment.year();
    let month = moment.month() + 1;
    let day = moment.date();
    return `${year}-${month}-${day}`;
  };

  handleClick = () => {
    let randomDate = momentRandom(moment(), moment("06-16-1995", "MM-DD-YYYY"));
    this.setState({ date: randomDate });
    this.getPhoto(this.formatDate(randomDate));
  };

  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <header className="header">
            <div className="header__search">Search...</div>
            <div className="header__avatar">Your face</div>
          </header>

          <aside className="sidenav">
            <ul className="sidenav__list">
              <li className="sidenav__list-item">Item One</li>
              <li className="sidenav__list-item">Item Two</li>
              <li className="sidenav__list-item">Item Three</li>
              <li className="sidenav__list-item">Item Four</li>
              <li className="sidenav__list-item">Item Five</li>
            </ul>
          </aside>

          <main className="main">
            <div className="main-header">
              <div className="main-header__heading">
                <h1>NASA's Astronomy Picture of the Day</h1>
              </div>
              <div className="main-header__updates">
                <DateInput 
                  changeDate={this.changeDate} 
                  date={this.state.date}
                  handleClick={this.handleClick}
                />
              </div>
            </div>

            <div className="main-overview">
              
            </div>

            <div className="main-cards">
              <Photo photo={this.state.photo} />
            </div>
          </main>

          <footer className="footer">
            <div className="footer__copyright">&copy; 2018 MTH</div>
            <div className="footer__signature">Made with love by pure genius</div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
