# react-justified-layout
> reactjs wrapper for flickr justified-layout module

## Getting started
Download and save the module to your project dependencies:
```bash
npm install react-justified-layout
```
Import the module in your application:
```bash
import JustifiedLayout from 'react-justified-layout';
```
Now you are ready to use the __JustifiedLayout__ component in your app.

---

## How does it work?
You can use the component in multiple ways, first is the basic usage, where you use the component and pass to it an array of measures:
```html
<JustifiedLayout items={[0.8, 0.5, 1.8, 1]}></JustifiedLayout>
```
You can pass to it an array of rateo values or an array of objects that __MUST__ have a __width__ and __height__ properties.

---

## Development
Clone the project to your computer, than install all dependencies by typing:
```bash
npm install
```
When you are ready you can start the grunt development server by typing:
```bash
grunt serve
```
When you finished editing, stop the development server and run the final build:
```bash
grunt build
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
