/*
*
*   This library is based on "Javascript: the Good Parts" by Douglas Crockford
*
 */


// this is helpful! http://javascriptweblog.wordpress.com/2010/06/07/understanding-javascript-prototypes/
// TODO: Watch this: http://ejohn.org/apps/learn/#2
// John Resig's Javascript ninjitsu assert function
function assert( value, desc ) {
    var li = document.createElement('li');
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
}


// By augmenting Function.prototype, we can make a method available to all functions
// js Good parts p. 36
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};
// Example
Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
})
// console.log((-3.6).integer());     yeilds -3


// Deentityify
String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    return function () {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    }
}());



// Currying allows you to create a new function by adding arguments into an old function
// js Good parts pg. 43
/*
 function add() {
 var sum = 0;
 for (var i = 0; i < arguments.length; i++) {
 sum += arguments[i];
 }
 return sum;
 }
 var add1 = add.curry(1);
 console.log(add1(4));
 */
Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});


// TODO: Add the memoizer function



// Mixins  I DON"T LIKE THIS FUNCTION
// http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
function extend(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
    return destination;
}
// This approach seems to be working better
// TODO: functions and objects inheriting from this keep displaying the "extends" method
// TODO: make this inherit from something other than object literals
/*
Object.method("extends", function (source) {
    var that = this;
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            that.prototype[k] = source[k];
        }
    }
    return that;
});
*/



// From "Secrets of the Javascript Ninja"
// This enables you to do a foreach loop, but just stick the function in the second argument
function forEach(list, callback) {
    for (var n = 0; n < list.length; n++) {
        callback.call(list[n],n);
    }
}