exports.Food = class Food
  constructor: (@name) ->
  taste: => '?'

exports.Fruit = class Fruit extends Food
  taste: => 'good'

exports.Junk = class Junk extends Food
  taste: => 'bad'

eat = (food) =>
  console.log "tasting \#{food.name}"
  console.log '-chomp' if food.taste() isnt 'bad'
  console.log '-blech' if food.taste() isnt 'good'

bowl =
  color: 'blue'
  contents: [
    new Fruit 'apple'
    new Fruit 'banana'
    new Junk  'donut'
    new Food  'brains']
eat food for food in bowl.contents
