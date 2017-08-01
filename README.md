# react-justified-layout
> reactjs wrapper for flickr justified-layout module

## Getting started
Install the module and save it to your project dependencies:
```bash
npm install @codekraft-studio/react-justified-layout
```
Import the module in your application:
```bash
import JustifiedLayout from '@codekraft-studio/react-justified-layout';
```
Now you are ready to use the __JustifiedLayout__ component in your app.

---

## How does it work?
The component will accept only two props:
* __items__: An array of items to evaluate.
* __options__: An object with the options for justified-layout script.

With this in mind you can start using the component in multiple ways.

### Basic usage
You can use the component with an array of elements and no options, in this example is used an array of rateo values:
```html
<JustifiedLayout items={[0.8, 0.5, 1.8, 1]}></JustifiedLayout>
```
If you want to use an array of objects, every object __MUST__ have a __width__ and __height__ properties, like in the example below:
```javascript
var boxes = [
	{ width: 450, height: 350 },
	{ width: 680, height: 420 },
	{ width: 980, height: 640 }
];
```
```html
<JustifiedLayout items={boxes}></JustifiedLayout>
```

### Custom options
As per the flickr justified layout module, you can pass various options to customize the rendering process, as in this example:
```javascript
var boxesOptions = {
	containerPadding: 5,
	boxSpacing: 5,
	targetRowHeight: 200
};
```
```html
<JustifiedLayout items={boxes} options={boxesOptions}></JustifiedLayout>
```

Here are listed some of the most used options, for a full reference please see [flickr justified layout](http://flickr.github.io/justified-layout/).

* __containerWidth__: The width that boxes will be contained within irrelevant of padding.
* __containerPadding__: Provide a single integer to apply padding to all sides or provide an object to apply individual values to each side.
* __boxSpacing__: Provide a single integer to apply spacing both horizontally and vertically or provide an object to apply individual values to each axis.
* __targetRowHeight__: The height of the single row, the algorithm will get as close to the target row height as it can.

### Custom template
You can use a custom template for rendering your boxes, to do this you must add one or more children to the component, than it will run with the evaluated items as only argument, it will contain the array that you passed in as props, with an extra __style__ property that hold all the style properties and values.

#### Using another component as child
Pass as child a react component or simple html element, you can than pass the items variable to your component and than iterate it.
```html
<JustifiedLayout items={this.state.images} options={this.state.options}>
	
	<!-- custom component to display images -->
	<ImagesList images={items} />

</JustifiedLayout>
```

#### Using a function as child
Pass as child a function that will accept __images__ as argument, than you can loop it and render your boxes with your template:
```html
<JustifiedLayout items={this.state.images} options={this.state.options}>
	{
		(items) => items.map(
			(item, index) => {
				return(
					<div className="custom-box" key={index} style={item.style}>
						<img src={item.url}></img>
					</div>
				);
			}
		)
	}
</JustifiedLayout>
```

---

## Development
Clone the project to your computer, than install all dependencies by typing:
```bash
npm install
```
When you are ready you can start the grunt development server by typing:
```bash
npm run start
```
When you finished editing, stop the development server and run the final build:
```bash
npm run build
```

---

## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/react-justified-layout/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Add some test for your new feature
7. Create a new Pull Request
