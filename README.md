# Chartist.js for Ember-CLI Projects

This is an ember-cli wrapper for [Chartist](https://github.com/gionkunz/chartist-js).
It allows you to render Chartist charts in your templates using components.

## Setup

In an existing ember-cli project. Install with:

```
npm install --save ember-cli-chartist
```

In the template where you want the chart to appear:

```
{{chartist-chart data=model.chartData}}
```

The `data` attribute is the only required attribute. It's value should be an object. Check the [Chartist docs](http://gionkunz.github.io/chartist-js/getting-started.html#as-simple-as-it-can-get) for expected data structure.

### Where does the data come from?

The data can be specified in an Ember route or controller. In the example above it's coming from the model which is defined in the route.

*/app/routes/application.js*
```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      chartData: {
        labels: ['Day1', 'Day2', 'Day3'],
        series: [
          [5, 4, 8],
          [10, 2, 7],
          [8, 3, 6]
        ]
      }
    }
  }
});
```

### Chart types

There are three types of charts; line, bar, and pie. The default is line. You can change the chart type using the `type` attribute.

```
{{chartist-chart type="bar" data=model.chartData}}
```

### Responsive scaling

Chartist charts scale up and down in size. They do so at specified ratios. You can change the ratio using the `ratio` attribute.

```
{{chartist-chart ratio="ct-golden-section" data=model.chartData}}
```

See [Chartist docs](http://gionkunz.github.io/chartist-js/getting-started.html#creating-a-chart-using-aspect-ratios) for the full list of ratios and info on how to create your own.

### Custom CSS

By default, the compiled `chartist.css` will be included in your app's `vendor.css`. If you want to use custom CSS you can tell the addon to not include the compiled version

In your app's `Brocfile.js`:

```javascript
var app = new EmberAddon({
  'ember-cli-chartist': {
    'useCustomCSS': true
  }
});
```

If you want to import the Chartist scss into your app's scss, you will need to install
[ember-cli-sass](https://www.npmjs.com/package/ember-cli-sass). You can then import the Chartist scss with:

In `app.scss`
```scss
@import "chartist";
```

you can also import the Chartist settings scss:

```scss
@import "chartist-settings";
```

For more on custom styles see the [Chartist docs](http://gionkunz.github.io/chartist-js/getting-started.html#the-sass-way)

## Development

If you'd like to contribute to this project, that would be swell. Here are some details on doing that.

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`
