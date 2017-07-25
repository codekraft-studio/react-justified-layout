var React = require('react');
var ReactDOM = require('react-dom');
var JustifiedLayout = require('react-justified-layout');

var App = React.createClass({
	
	getInitialState () {
    return {
      images: [0.5, 1, 0.5, 1, 2, 0.5, 0.5],
			options: {
				containerPadding: 0,
				boxSpacing: 5,
	      targetRowHeight: 200
			}
    };
  },

  addImage() {
    let rateo = (Math.random() * (2 - 0.5) + 0.5).toFixed(2);
    let width = Math.round(Math.random() * (1200 - 340) + 340);
    let height = Math.round(rateo * width);
      
    this.state.images.push({
      width: width, 
      height: height, 
      className: 'box'
    });
    this.setState({
      images: this.state.images
    });
  },
  
  removeImage() {
    this.state.images.shift();
    this.setState({
      images: this.state.images
    });
  },
  
  randomize() {
    
    let number = (Math.random() * (12 - 6) + 6);
    let result = [];
    
    for (var i = 0; i < number; i++) {
  
      let rateo = (Math.random() * (2 - 0.5) + 0.5).toFixed(2);
      let width = Math.round(Math.random() * (1200 - 340) + 340);
      let height = Math.round(rateo * width);
        
      result.push({
        width: width, 
        height: height, 
        className: 'box'
      });
      
    }
  
    this.setState({
      images: result
    });
    
  },
	
	render () {
		return (
			<div className="container">

				<div className="col-md-12 panel">
					<button className="bnt btn-default btn-lg" onClick={this.addImage}>ADD</button>
					<button className="bnt btn-default btn-lg" onClick={this.removeImage}>REMOVE</button>
					<button className="bnt btn-default btn-lg" onClick={this.randomize}>RANDOMIZE</button>
				</div>

				<JustifiedLayout items={this.state.images} options={this.state.options} />

			</div>
		);
	}
	
});

ReactDOM.render(<App />, document.getElementById('app'));
