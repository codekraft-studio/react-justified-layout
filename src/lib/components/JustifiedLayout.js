import React, { Component } from 'react';
import PropTypes from 'prop-types';
import justifiedLayout from 'justified-layout';

class JustifiedLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {},
      items: []
    };

    // Bind context to component functions
    this.getBoxesGeometry = this.getBoxesGeometry.bind(this);
    this.getBoxes = this.getBoxes.bind(this);
  }

  addPixels(string) {
    return `${string}px`;
  }

  componentDidMount() {
    // Once the component is ready init the view since it depends on element width
    this.getBoxesGeometry();

    // Add the window resize event listener to re-render
    window.addEventListener('resize', this.getBoxesGeometry);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getBoxesGeometry);
  }

  componentWillReceiveProps(nextProps) {
    if( this.props === nextProps ) {
      return;
    }

    // Ensure props are updated
    this.props = nextProps;

    // Get new geometry
    this.getBoxesGeometry();
  }

  getBoxesGeometry() {
    // update options container width with element inner width
    this.props.options.containerWidth = this.refs.container.offsetWidth || this.refs.container.clientWidth;

    // get boxes geometry
    this.geometry = justifiedLayout(this.props.items, this.props.options);

    // update the state variables
    this.setState({
      items: this.getBoxes(),
      containerStyle: {
        position: 'relative',
        height: this.addPixels(this.geometry.containerHeight)
      }
    });
  }

  getBoxes() {
    return this.geometry.boxes.map((b, i) => {
      let obj = typeof this.props.items[i] === 'object' ? this.props.items[i] : {}
        return Object.assign(obj, {
          style: {
            height: `${b.height}px`,
            width: `${b.width}px`,
            top: `${b.top}px`,
            left: `${b.left}px`,
            position: 'absolute'
          }
        });
    });
  }

  render() {

    // Default rendering function
    const renderBoxes = () => {

			// if is a function execute it passing state items
			if( typeof this.props.children === 'function' ) {
				return this.props.children(this.state.items);
			}

			// if no template children map items with default template
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

			// Use child template for create items
			return React.Children.map(this.props.children, (child) => {
	      // TODO: check if a self running function is seen as a valid element to avoid using extra components
	      if( !child || child === null ) { return child; }
	      return React.cloneElement(child, { items: this.state.items });
	    });

    };

    return (
      <div ref="container" className="justified-layout-container" style={this.state.containerStyle}>
        { renderBoxes() }
      </div>
    );

  }

}

JustifiedLayout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.func,
	]),
  items: PropTypes.array.isRequired,
  options: PropTypes.object,
};

JustifiedLayout.defaultProps = {
  options: {},
	children: null,
  items: []
};

export default JustifiedLayout;
