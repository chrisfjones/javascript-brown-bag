(function() {
  var Food, Fruit, Junk, assert, suite, vows, _ref;
  vows = require('vows');
  assert = require('assert');
  _ref = require('../food'), Food = _ref.Food, Fruit = _ref.Fruit, Junk = _ref.Junk;
  suite = vows.describe('Food Test Suite');
  suite.addBatch({
    'when eating fruit': {
      topic: function() {
        return new Fruit('apple');
      },
      'it tastes good': function(topic) {
        return assert.equal(topic.taste(), 'good');
      }
    },
    'when eating junk': {
      topic: function() {
        return new Junk('donut');
      },
      'it tastes bad': function(topic) {
        return assert.equal(topic.taste(), 'bad');
      }
    },
    'when eating brains': {
      topic: function() {
        return new Food('brains');
      },
      'i have no idea': function(topic) {
        return assert.equal(topic.taste(), '?');
      }
    }
  });
  suite.run();
}).call(this);
