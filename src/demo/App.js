import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import JustifiedLayout from '../lib';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topBoxes: [1, 0.5, 0.5, 1, 2, 1, 0.5, 0.5, 1, 2],
      topBoxesOptions: {
        containerPadding: 0,
        targetRowHeightTolerance: 0,
        targetRowHeight: 120,
        maxNumRows: 1
      },
      images: [0.5, 1, 0.5, 1, 2, 0.5, 0.5],
			options: {
				containerPadding: 0,
				boxSpacing: 5,
	      targetRowHeight: 150
			}
    };

    this.removeImage = this.removeImage.bind(this);
    this.randomImages = this.randomImages.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  removeImage(index) {
    this.state.images.splice(index, 1);
    this.setState({
      images: this.state.images
    });
  }

  randomImages() {
    this.setState({
      images: this.randomize()
    });
  }

  randomize(number) {
    number = !number ? (Math.random() * (20 - 6) + 6) : number;
    let result = [];

    for (var i = 0; i < number; i++) {

      let rateo = (Math.random() * (2 - 0.5) + 0.5).toFixed(2);
      let width = Math.round(Math.random() * (1200 - 340) + 340);
      let height = Math.round(rateo * width);

      result.push({
        width: width,
        height: height
      });

    }

    return result;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        images: this.randomize(8)
      });
    }, 4000);
  }

  render() {
    const customBoxes = (array) => {
			return array.map(
				(item, index) => {
					return(
						<div className="custom-box" key={index} style={item.style} onClick={() => this.removeImage(index)}>
							<img src={item.url} alt="" />
						</div>
					);
				}
			);
		};

    return (
      <div className="App">
        <header className="App-header">
          <div className="container d-flex align-items-center">
            <img className="App-logo" src={logo} alt="react-justified-layout" />
            <div className="App-name">
              <h1 className="App-title">react-justified-layout</h1>
              <h2 className="App-subtitle">quickstart for your react components</h2>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="section">
            <h2>What it is?</h2>
            <p className="lead">
              It's the simplest way to integrate <a href="#!">Flickr</a> justified-layout inside your <b>React</b> applications or websites.
              It's easy for developers to use, it fits in any kind of container, supports pagination and infinite scroll and supports layouts other than justified, like square thumbnails and grid layout with native aspect ratio.
              If you want more informations about how the justified-layout algorithm works you can read <a href="http://code.flickr.net/2015/03/24/much-photos/">this</a> article from the script creator.
            </p>
            <div className="panel fixed-boxes">
    					<JustifiedLayout items={this.state.topBoxes} options={this.state.topBoxesOptions} />
    				</div>
          </div>

          <div className="section">
            <h2>How it works?</h2>
            <p className="lead">
              It’s really easy to use. No configuration is required. Just pass in an array of aspect ratios representing the photos/boxes you’d like to lay out or an array of objects.
              It will automagically listen for items change and reload the <b>justified-layout geometry</b> that produces this awesome grid.
            </p>
          </div>

  				<div className="panel custom-boxes">
  					<JustifiedLayout items={this.state.images} options={this.state.options}>
  						{(items) => customBoxes(items)}
  					</JustifiedLayout>
  				</div>
        </div>
        <footer className="App-footer">
          <div className="container text-center">
            Made with &hearts; by <a href="https://github.com/codekraft-studio">codekraft-studio</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
