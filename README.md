React Splicer
====================

A React.js component for suggesting and inserting Facebook-like "mentions" in
a user input element.

Example use cases include:
- Inserting mentions
- Tagging

Installation
--------------------
```sh
npm install react-splicer
```

This library is written as ES6 modules. You'll need to use
Browserify or Webpack to consume it like any other modules from npm.

To run the example
--------------------

Run `npm install` followed by `gulp webserver`. Open your browser and visit
`http://localhost:8080`.

Tests
--------------------

To run the tests `npm test`.

Note that tests are breaking on Node v0.12.0 and IO.js v1.5.0. To run the tests,
you will have to switch to v0.10.x

This is a [known issue with Jest](https://github.com/facebook/jest/issues/267).

How does it work?
--------------------

```js
let transformFn = function(text) {
  return `:${text}:`;
};

class App extends React.Component {
  constructor() {
    this.state = { result: null };
    this._callback = this._callback.bind(this);
  }

  render() {
    let data = ['Apple', 'Orange', 'Banana', 'Pineapple'],
        result = this.state.result;

    return (
      <div className="container">
        <Splicer
          charCount={2}
          data={data}
          transformFn={transformFn}
          callback={this._callback} />

        <div className="result">The result of the callback is:&nbsp;
          <span className="content">{result}</span>
        </div>
      </div>
    );
  }

  _callback(text) {
    return this.setState({ result: text });
  }
};
```

The `<Splicer />` component requires the following propTypes:

`charCount`: The number of characters that needs to be entered before triggering
a search for possible matches.

`data`: An array of strings containing all possible matches

`transformFn`: The function to run when a suggestion is selected. For example,
transform the selected item into a <span> element before inserting it.

`callback`: The function that will be fired with the contents of the user input
element when the enter key is pressed.

TODO
--------------------

- Cross browser compatibility
- Trigger keys
- Accepting style options
- Better test suite for logic involving cursor movements
