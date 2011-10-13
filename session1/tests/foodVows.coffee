vows                = require 'vows'
assert              = require 'assert'
{Food, Fruit, Junk} = require '../food'

suite = vows.describe 'Food Test Suite'
suite.addBatch
  'when eating fruit':
    topic: -> new Fruit 'apple'
    'it tastes good': (topic) ->
      assert.equal topic.taste(), 'good'
  'when eating junk':
    topic: -> new Junk 'donut'
    'it tastes bad': (topic) ->
      assert.equal topic.taste(), 'bad'
  'when eating brains':
    topic: -> new Food 'brains'
    'i have no idea': (topic) ->
      assert.equal topic.taste(), '?'

suite.run()
