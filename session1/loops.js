(function() {
  var i;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  for (i = 1; i <= 10; i++) {
    this.funcs.push = __bind(function(param) {
      return i + param;
    }, this);
  }
}).call(this);
