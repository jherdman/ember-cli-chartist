# Chartist.js for Ember-CLI Projects

[![Build Status](https://travis-ci.org/tylergaw/ember-cli-chartist.svg)](https://travis-ci.org/tylergaw/ember-cli-chartist)

This is an ember-cli wrapper for [Chartist](https://github.com/gionkunz/chartist-js).
It allows you to render Chartist charts in your templates using components.

## Setup

In an existing ember-cli project. Install with:

```
npm install ember-cli-chartist --save-dev
```

In the template where you want the chart to appear:

```
{{chartist-chart data=model.chartData}}
```

The `data` attribute is the only required attribute. Its value should be an object. Check the [Chartist docs](http://gionkunz.github.io/chartist-js/getting-started.html#as-simple-as-it-can-get) for expected data structure.

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

*/app/templates/application.hbs*
```
{{chartist-chart type="bar" data=model.chartData}}
```

### Responsive scaling

Chartist charts scale up and down in size. They do so at specified ratios. You can change the ratio using the `ratio` attribute.

*/app/templates/application.hbs*
```
{{chartist-chart ratio="ct-golden-section" data=model.chartData}}
```

See [Chartist docs](http://gionkunz.github.io/chartist-js/getting-started.html#creating-a-chart-using-aspect-ratios) for the full list of ratios and info on how to create your own.

### Chart configuration

Chartist charts have a whole bunch of cool configuration options. You can pass those to the `chartist-chart` components with the `options` attribute. You'll need to create the options object in a similar way as you do for the `data` attribute object.

*/app/templates/application.hbs*
```
{{chartist-chart options=chartOptions data=model.chartData}}
```

*/app/controllers/application.js*
```javascript
import Ember from 'ember';

export default Ember.ObjectController.extend({
  chartOptions: {
    showArea: true,
    lineSmooth: false,

    axisX: {
      showGrid: false
    }
  }
});
```

See the [Chartist docs](http://gionkunz.github.io/chartist-js/api-documentation.html) for all available config options. There's bunch of good-uns!

#### Responsive config

You can also configure your charts based on media queries. The same
configuration options are available, but you provide them via the `responsiveOptions`
attribute. They can be used in tandem with standard `options`.

```
{{chartist-chart responsiveOptions=chartResOptions data=model.chartData}}
```

*/app/controllers/application.js*
```javascript
import Ember from 'ember';

export default Ember.ObjectController.extend({
  chartResOptions: [
    ['screen and (min-width: 640px)', {
      showArea: true,
      lineSmooth: false,

      axisX: {
        showLabel: false
      }
    }]
  ]
});
```

#### Other configuration

There are other ways to configure chartist-chart components that are specific to the addon.

**updateOnData**: By default, when the data associated with a chartist-chart is changed, the chart will be updated to reflect the data. That can be turned off by setting updateOnData to false. Note: If you use this option, you will have to manually draw and redraw the chart using Chartist methods.

```
{{chartist-chart updateOnData=false}}
```

### Custom CSS

By default, the compiled `chartist.css` will be included in your app's `vendor.css`. If you want to use custom CSS you can tell the addon to not include the compiled version

In your app's `Brocfile.js`:

```javascript
var app = new EmberApp({
  'ember-cli-chartist': {
    'useCustomCSS': true
  }
});
```

If you use custom CSS, you'll likely want to import the Chartist Scss into your app's scss, you will need to install
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

## Extending `chartist-chart`

If you have needs that go beyond the standard component, or if you need to create a
component of your own that uses `ChartistChart` as a base, you're in luck. Say you want
to create a chart that shows Fish eaten over time. You don't want this chart
tied to a specific controller, route, or model in your app. You can create a
new component that extends `chartist-chart` like so:

*/app/components/chart-fish-over-time.js*
```javascript
import ChartistChart from './chartist-chart';

export default ChartistChart.extend({
  init: function () {
    getAsyncDataThatReturnsPromise().then(function (data) {
      this.set('data', data);
    });

    this._super();
  },

  ratio: 'ct-minor-seventh',
  options: {
    showPoint: false,
    axisY: {
      offset: 0,
      showGrid: true,
    },
    axisX: {
      showGrid: false,
    }
  },

  responsiveOptions: [
    ['screen and (min-width: 640px)', {
      showPoint: true,
      axisY: {
        offset: 50,
        showLabel: true
      }
    }]
  ]
});
```

With that, you can display the Fish chart in any template. For example,

*/app/templates/all-about-fish.js*
```
{{chart-fish-over-time}}
```

## Live examples

There is an example app included in this repo in `/tests/dummy/`. It contains examples of most of the functionality described above. To view those
examples you'll need to clone this repo and start the Ember cli server.

```
git clone https://github.com/tylergaw/ember-cli-chartist.git
cd ember-cli-chartist
ember serve
```

The example app will be running at [http://localhost:4200](http://localhost:4200)


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
