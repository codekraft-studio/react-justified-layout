const justifiedLayout = require('justified-layout');
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class JustifiedLayout extends Component {
  
  constructor(props) {
    super(props);

    // set initial state properties
    this.state = {
      style: {},
      items: this.props.items
    };
      
    // Bind context to component functions
    this.getBoxesGeometry = this.getBoxesGeometry.bind(this);
    this.addItemsStyle = this.addItemsStyle.bind(this);
  }
    
  /**
   * Init the view and add event listeners
   */
  componentDidMount() {
    
    // Once the component is ready init the view
    // since it depends on element width
    this.getBoxesGeometry();
    
    // Add the window resize event listener to re-render
    window.addEventListener('resize', this.getBoxesGeometry);
    
  }
  
  /**
   * Render the boxes with the state values
   */
  render() {
			
    // Default rendering function
    const renderBoxes = () => {
			
			// if is a function execute it passing state items
			if( typeof this.props.children === 'function' ) {
				return this.props.children(this.state.items);
			}

			// Map items and return boxes with default template
			if( this.props.children === null ) {
	      return this.state.items.map( 
	        (item, index) => {
	          return (
	            <div key={index} style={item.style} className={item.className}>
	              <img src={item.src} alt={item.title}></img>
	            </div>    
	          );
	        }
	      );
			}
			
			// Default case map properties to children
			return React.Children.map(this.props.children, (child) => {
	      // TODO: check if a self running function is seen as a valid element to avoid using extra components
	      if( !child || child === null ) { return child; }
	      return React.cloneElement(child, { items: this.state.items });
	    });
  
    };

    return (
      <div ref="container" className="justified-layout-container" style={this.state.style}>
        { renderBoxes() }
      </div>
    );
    
  }
  
  /**
   * When props are updated reload the geometries
   */
  componentWillReceiveProps(nextProps) {
    
    // Exit if no changes
    if( this.props === nextProps ) {
      return;
    }
    
    // Ensure props are updated
    this.props = nextProps;
    
    // Get new geometry
    this.getBoxesGeometry();
    
  }
  
  /**
   * Remove the window resize event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.getBoxesGeometry);
  }
  
  /**
   * Append the pixel unit (px) to a given string or number
   */
  addPixels(string) {
    return `${string}px`;
  }
  
  /**
   * Get the boxes geometry and update the state variables to render the view
   */
  getBoxesGeometry() {
    
    // update options container width with element inner width
    this.props.options.containerWidth = this.refs.container.offsetWidth || this.refs.container.clientWidth;
    
    // get boxes geometry
    this.geometry = justifiedLayout(this.props.items, this.props.options);
  
    // update the state variables
    this.setState({
      items: this.addItemsStyle(),
      style: {
        position: 'relative',
        height: this.addPixels(this.geometry.containerHeight)
      }
    });
    
  }
  
  /**
   * For each item get the justified style and update a custom property
   */
  addItemsStyle() {
    
    let result = this.props.items.map((o, i) => {
      
      let box = this.geometry.boxes[i];

			// ensure item is a valid object
			o = (typeof o === 'object') ? o : {
				width: box.width,
				height: box.height
			};

      o.style = {
        width: this.addPixels(box.width),
        height: this.addPixels(box.height),
        top: this.addPixels(box.top),
        left: this.addPixels(box.left),
        position: 'absolute'
      };
  
      return o;
      
    });
    
    return result;
    
  }

}

JustifiedLayout.propTypes = {
	children: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(React.PropTypes.node),
		React.PropTypes.node,
		React.PropTypes.func,
	]),
  items: PropTypes.array.isRequired,
  options: PropTypes.object,
};

JustifiedLayout.defaultProps = {
  options: {},
	children: null
};

export default JustifiedLayout;
