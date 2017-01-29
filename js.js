var empty_object = {};
var add = function(a, b){
	return a+b;
};
//The Method Invocation Pattern
var myObject = {
    value:0,
    increment: function(inc){
    	this.value += typeof inc==='number'?inc:1;
	}
};
myObject.increment();
console.log(myObject.value);
myObject.increment(2);
console.log(myObject.value);
//The Function Invocation Pattern
var sum = add(3, 4);
myObject.dobule = function(){
	var that = this;
	var helper = function(){
		that.value = add(that.value, that.value);//When a function is invoked with this pattern, this is bound to the global object. This was a mistake in the design of the language.
	}
	helper();
};
myObject.dobule();
console.log(myObject.value);
//The Constructor Invocation Pattern
var Quo = function(string){
	this.status = string;
}
Quo.prototype.get_status = function() {
	return this.status;
};
var myQuo = new Quo("confused");
console.log(myQuo.get_status());
//The Apply invocation Pattern
var array = [3, 4];
var sum = add.apply(null,array);//cant understand
var statusObject = {
	status:'A-Ok'
};
var status = Quo.prototype.get_status.apply(statusObject);
//Arguments
var sum = function () {
	var i, sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
};
console.log(sum(4, 5, 6, 7, 8));
//Exceptions
var add = function(a, b){
	if(typeof a !=='number'||typeof b !=='number'){
		throw{
			name:'TypeError',
			message:'add nedds number'
		};
	}
	return a+b;
}
var try_it = function(){
	try{
		add("seven");
	}catch(e){
		console.log(e.name+':'+e.message);
	}
}
//Augmenting Types
Function.prototype.method = function(name, func){
	if(!this.prototype[name])
		this.prototype[name] = func;//cant understand
	return this;
};
//By augmenting Function.prototype with a "method" method, we can make a method available to all functions and no longer have to type the name of the "prototype" property.
Number.method('integer', function(){
	return Math[this<0?'ceil':'floor'](this);
});
console.log((-10/3).integer());
String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g,'');
});
console.log('"'+'neat'.trim()+'"');
//Recursion
var hanoi = function(disc, src, aux, dst){
	if (disc>0) {
		hanoi(disc-1, src, dst, aux);
		console.log('Move disc '+disc+' from '+src+' to '+dst);
		hanoi(disc-1, aux, src, dst);
	}
};
hanoi(3, 'A', 'B', 'C');
var walk_the_DOM = function walk(node, func){
	func(node);
	node = node.firstChild;
	while(node){
		walk(node, func);
		node = node.nextSibling;
	}
};
var getElementsByAttribute = function(att, value){
	var results = [];
	walk_the_DOM(document.body, function(node){
		var actual = node.nodeType ===1 &&node.getAttribute(att);
		if (typeof actual === 'string' &&(actual === value || typeof value !== 'string')) 
		{
			results.push(node);
		}
	});
	return results;
}
var factorial = function factorial(i, a) {
	a = a||1;
	if (i<2) {
		return a;
	}
	return factorial(i-1,a*i);
};
console.log(factorial(5));
//Scope
var foo = function(){
	var a = 3, b = 5;
	var bar = function(){
		var b = 7, c = 11;
		a += b+c;
	};
	bar();
};
//Closure
var myObject = (function(){
	var value = 0;
	return {
		increment: function(inc){
			value += typeof inc === 'number'? inc : 1;
		},
		getValue: function(){
			return value;
		}
	};
}())
var quo = function(status){
	return {
		get_status:function(){
			return status;
		}
	};
};
var myQuo = quo("amazed");
console.log(myQuo.get_status());
var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level<15) {
			level++;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};
fade(document.body);
var add_the_handlers = function(nodes){
	var i;
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onclick = function(e){
			console.log(i);
		};
	}
};
var add_the_handlers_new = function(nodes){
	var helper = function(i){
		return function(e){
			console.log(i);
		};
	};
	var i = 0;
	for (var i = 0; i < nodes.length; i++) {
		nodes[i].onclick = helper(i);//cant work
	}
};
//Callbacks
request = prepare_the_request();
response = send_request_synchronously(request);
display(response);0
request = prepare_the_request();
send_request_synchronously(request, function(response){
	display(response);
});
//Module
String.method('deentityify', function(){
	var entity = {
		quot: '"',
		lt: '<',
		gt:'>'
	};
	return function(){
		return this.replace(/&([^&;]+);/g,function(a, b){
			var r = entity[b];
			return typeof r === 'string' ?r:a;
		});
	};
}());
//str.replace( regexp | substr, newSubStr | function[, flags] ) 
//function replacer(match,p1,p2,offset,string){
	//codes
//}
//match表示第一个参数(整个正则表达式)匹配的字符串
//p1至pn表示第1..n个括号匹配的字符串,如果没有括号则不存在该项
//offset表示匹配的起点在原字符串中的偏移
//string表示原字符串
console.log('&lt;&quot;&gt;'.deentityify());
var serial_maker = function(){
	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function(p){
			prefix = String(p);
		},
		set_seq: function(s){
			seq = s;
		},
		gensym: function(){
			var results = prefix + seq;
			seq++;
			return results;
		}
	};
};
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
//Cascade
getElement('myBoxDiv').move(350, 150).width(100).height(100).color('red').border('10px outset').padding('4px').appendText("Please stand by").on('mousedown', function(){
	this
		.color('yellow')
		.setHTML("What hath God wraught?")
		.slide(400, 40, 200, 200);
})
.tip('This box is resizeable');
//Curry
var add1 = add.curry(1);
console.log(add1(6));
Function.method('curry', function(){
	var slice = Array.prototype.slice,
		args = arguments, 
		that = this;
	return function(){
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});
//Memoization
var fibonacci = function(n){
	return n<2?n:fibonacci(n-1)+fibonacci(n-2);
};
for (var i = 0; i < 10; i++) {
	console.log(i+':'+fibonacci(i));
}
var fibonacci = function(){
	var memo = [0, 1];
	var fib = function(n){
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n-1)+fib(n-2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();
var memozier = function(memo, formula){
	var recur = function(n){
		if (typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	};
	return recur;
};
var fibonacci = memozier([0, 1], function(recur, n){
	return recur(n-1)+recur(n-2);
});
var factorial = memozier([1, 1], function(recur, n){
	return n*recur(n-1);
});
//Inheritance
//pseudoclassical
if (typeof Object.beget !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
//The Object.create() method creates a new object with the specified prototype object and properties.
Function.method('new', function(){
	var that = Object.create(this.prototype);
	var other = this.apply(that, arguments);
	return (typeof other === 'object' && other)||that;
});
var Mammal = function (name) {
	this.name = name;
};
Mammal.prototype.get_name = function () {
	return this.name;
};
Mammal.prototype.says = function () {
	return this.saying || '';
};
var myMammal = new Mammal("herb the Mammal");
var name = myMammal.get_name();
var Cat = function (name) {
	this.name = name;
	this.saying = 'meow';
};
Cat.prototype = new Mammal();
Cat.prototype.purr = function(n) {
	var i, s = '';
	for (var i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
Cat.prototype.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};
var myCat = new Cat("Henrietta");
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();
Function.method('inherits', function (Parent){
	this.prototype = new Parent();
	return this;
});
var Cat = function (name) {
	this.name = name;
	this.saying = 'meow';
}
.inherits(Mammal)
.method('purr', function (n) {
	var i, s = '';
	for (var i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
})
.method('get_name', function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
});
//Object Specifiers
var myObject = maker({
	first:f,
	middle:m,
	last:l,
	state:s,
	city:c
});
//prototypal
var myMammal = {
	name: 'herb the Mammal',
	get_name: function () {
		return this.name;
	},
	says: function(){
		return this.saying || '';
	} 
};
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
	var i, s = '';
	for (var i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};
myCat.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};
var block = function () {
	var oldScope = scope;
	scope = Object.create(scope);
	advance('{');
	parse(scope);
	advance('}');
	scope = oldScope;
}
//Functional
//pseudocode template
var constructor = function (spec, my) {
	var that, other private instance variables;
	my = my||{};
	//Add shared variables and functions to my
	that = a new object;
	//Add privileged methods to that
	return that;
};
var mammal = function (spec) {
	var that = {};
	that.get_name = function () {
		return spec.name;
	};
	that.says = function () {
		return spec.saying || '';
	};
	return that;
};
var myMammal = mammal({name:'herb'});
var cat = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function (n) {
		var i, s = '';
		for (var i = 0; i < n; i++) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function() {
		return this.says() + ' ' + this.name + ' ' + this.says();
	};
	return that;
};
var myCat = cat({name:'Henrietta'});
Object.method('superior', function (name) {
	var that = this, 
	method = that[name];
	return function () {
		return method.apply(that, arguments);
	};
});
var coolcat = function (spec) {
	var that = cat(spec),
		super_get_name = that.superior('get_name');
	that.get_name = function (n) {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};
var myCoolCat = coolcat({name:'Bix'});
var name = myCoolCat.get_name();
var eventuality = function (that) {
	var registry = {};
	that.fire = function (event) {
		var array, func, handler, i, type = typeof event ==='string' ? event : event.type;
		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for (var i = 0; i < array.length; i++) {
				handler = array[i];
				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				}
				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};
	that.on = function (type, method, parameters) {
		var handler = {
			method: method,
			parameters:parameters
		};
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		}else {
			registry[type] = [handler];
		}
		return this;
	};
	return that;
};
//Array
var empty = [];
var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
console.log(empty[1]);
console.log(numbers[1]);
console.log(empty.length);
console.log(numbers.length);
var numbers_object = {
	'0': 'zero', 
	'1': 'one', 
	'2': 'two', 
	'3': 'three', 
	'4': 'four', 
	'5': 'five', 
	'6': 'six', 
	'7': 'seven', 
	'8': 'eight', 
	'9': 'nine'
};//number_object does not get the mysterious length property
var misc = ['string', 96, true, false, null, undefined, ['nested', 'array'], {object:true}, NaN, Infinity];
console.log(misc.length);
var myArray = [];
console.log(myArray.length);
myArray[1000] = true;
console.log(myArray.length);
numbers.length = 3;
numbers[numbers.length] = 'shi';
numbers.push('go');
delete numbers[2];
numbers.splice(2, 1);
for (var i = 0; i < myArray.length; i++) {
	console.log(myArray[i]);
}
var is_array = function (value) {
	return value && typeof value === 'object' && value.constructor === Array;
};
var is_array = function (value) {
	return Object.prototype.toString.apply(value) === '[Object Array]';
};
//Methods
Array.method('reduce', function (f, value){
	for (var i = 0; i < this.length; i++) {
		value = f(this[i], value);
	}
	return value;
});
var data = [4, 8, 15, 16, 23, 42];
var add = function (a, b) {
	return a+b;//bug:Not check the type of a, b
};
var mult = function (a, b) {
	return a*b;
};
var sum = data.reduce(add, 0);
var product = data.reduce(mult, 1);
data.total = function () {
	return this.reduce(add, 0);
};
var total = data.total();
//Dimensions
Array.dim = function (dimension, initial) {
	var a = [], i;
	for (var i = 0; i < dimension; i++) {
		a[i] = initial;
	}
	return a;
};
var myArray = Array.dim(10, 0);
var matrix = [
	[0, 1, 2], 
	[3, 4, 5], 
	[6, 7, 8]
];
console.log(matrix[2][1]);
for (var i = 0; i < n; i++) {
	my_array[i] = [];
}
Array.matrix = function (m, n, initial) {
	var a, i, j, mat = {};
	for (var i = 0; i < m; i++) {
		a = [];
		for (var j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
}
var myMatrix = Array.matrix(4, 4, 0);
console.log(myMatrix[3][3]);
Array.identity = function (n) {
	var i, mat = Array.matrix(n, n, 0);
	for (var i = 0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
};
myMatrix = Array.identity(4);
console.log(myMatrix[3][3]);
//Regular Expressions
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.ora.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);
var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = '          ';
var i;
for (var i = 0; i < names.length; i++) {
	console.log(names[i]+':'+blanks.substring(names[i].length), result[i]);//ensure that 
}
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
var test = function (num) {
	console.log(num+" is a number:"+parse_number.test(num));
};
test('1');
test('number');
test('98.6');
test('132.12.86.100');
test('123.45E-37');
test('123.45D-37');
var my_regexp = /"(?:\\.|[^\\\"])*"/g;
var my_regexp = new RegExp("\"(?:\\\\.|[^\\\\\\\"])*\"", 'g');
function make_a_matcher() {
	return /a/gi;
}
var x = make_a_matcher();
var y = make_a_matcher();
x.lastIndex = 10;
console.log(y.lastIndex);//Beware: x and y are the same object! But in my computer y is equal to 0;
console.log("into".match(/in|int/));
var double_words = /([A-Za-z\u00C0-\u1FFF\u2800-\uFFFD]+)\s+\1/gi;
var vowel = /(?:a|e|i|o|u)/g;
var vowel = /[aeiou]/;
//Methods
//Array
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);
console.log(c);
var a = ['a', 'b', 'c'];
a.push('d');
var c = a.join('');
console.log(c);
var a = ['a', 'b', 'c'];
var c = a.pop();
console.log(c);
Array.method('pop', function (){
	return this.splice(this.length-1, 1)[0];
});
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.push(b, true);
console.log(c);
Array.method('push', function () {
	this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});
var a = ['a', 'b', 'c'];
var b = a.reverse();
console.log(b);
var a = ['a', 'b', 'c'];
var c = a.shift();
console.log(c);
Array.method('shift', function() {
	return this.splice(0, 1)[0];
});
var a = ['a', 'b', 'c'];
var b = a.slice(0, 1);
var c = a.slice(1);
var d = a.slice(1, 2);
console.log(b);
console.log(c);
console.log(d);
var a = ['a', 'b', 'c'];
var b = a.splice(0, 1);
var c = a.splice(1);
var d = a.splice(1, 2);
console.log(b);
console.log(c);
console.log(d);
var n = [4, 8, 15, 16, 23, 42];
console.log(n.sort());
console.log(n.sort(function (a, b) {
	return a - b;
}));
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
console.log(m.sort(function(a, b){
	if (a===b) {
		return 0;
	}
	if (typeof a === typeof b) {
		return a < b ? -1 : 1;
	}
	return typeof a < typeof b ? -1 : 1;
}));
var by = function (name) {
	return function(o, p) {
		var a, b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'Error, writed by boyden',
				message: 'Expected an object when sorting by ' + name
			};
		}
	};
};
var s = [
	{first: 'Joe', last: 'Besser'},
	{first: 'Moe', last: 'Howard'},
	{first: 'Joe', last: 'DeRita'},
	{first: 'Shemp', last: 'Howard'},
	{first: 'Larry', last: 'Fine'},
	{first: 'Curly', last: 'Howard'}
];
console.log(s.sort(by('first')));
console.log(s.sort(function (a, b) {
	if (a.first === b.first) {
		return 0;
	}
	return a < b ? -1 : 1;
}));
var by = function (name, minor) {
	return function(o, p) {
		var a, b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'Error, writed by boyden',
				message: 'Expected an object when sorting by ' + name
			};
		}
	};
};
console.log(s.sort(by('last', by('first'))));
var a = ['a', 'b', 'c'];
var r = a.splice(1, 1, 'ache', 'bug');
Array.method('splice', function (start, deleteCount) {
	var max = Math.max, min = Math.min, delta, element, insertCount = max(arguments.length - 2, 0), k = 0, len = this.length, new_len, result = [], shift_count;
	start = start || 0;
	if (start < 0) {
		start += len;
	}
	start = max(min(start, len), 0);
	deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
	delta = insertCount - deleteCount;
	new_len = len + delta;
	while (k < deleteCount) {
		element = this[start + k];
		if (element !== undefined) {
			result[k] = element;
		}
		k += 1;
	}
	shift_count = len - start - deleteCount;
	if (delta < 0) {
		k = start + insertCount;
		while (shift_count) {
			this[k] = this[k - delta]; //left shift elements
			k += 1;
			shift_count -= 1;
		}
		this.length = new_len;
	} else if (delta > 0) {
		k = 1;
		while (shift_count) {
			this[new_len - k] = this[len - k];//right shift elements
			k += 1;
			shift_count -= 1;
		}
		this.length = new_len;
	}
	for (k = 0; k < insertCount; k += 1) {
		this[start + k] = arguments[k + 2];
	}
	return result;
});
//Previously I find there is a bug in the codes. if delta < 0, then this[k](k >= len) still own a value that is not "undefined". But I find that I'm wrong since this.length is changed, which means that if k >= this.length, this[k] will be set to "undefined";
var a = ['a', 'b', 'c'];
var r = a.unshift('?', '@');
console.log(a, r);
Array.method('unshift', function () {
	this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
});
Function.method('bind', function (that) {
	var method = this, slice = Array.prototype.slice, args = slice.apply(arguments, [1]);
	return function () {
		return method.apply(that, args.concat(slice.apply(arguments, [0])));
	};
});//"method" is bound to "that" object, puzzled by these content!!!, especially in what's the "this" imply!!!
//Or
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || this,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
var x = function (a, b) {
	return this.value + a + b;
}.bind({value: 666}, 3);
console.log(x(4));
//Number
//number.toExponential(fractionDigits)
//the fractionDigits should be 0-20, defaults to as many digits as necessary to specify the number.
console.log(Math.PI.toExponential(0));
console.log(Math.PI.toExponential(2));
console.log(Math.PI.toExponential(7));
console.log(Math.PI.toExponential(16));
console.log(Math.PI.toExponential());
//number.toFixed(fractionDigits)
//the fractionDigits should be 0-20, defaults to 0.
console.log(Math.PI.toFixed(0));
console.log(Math.PI.toFixed(2));
console.log(Math.PI.toFixed(7));
console.log(Math.PI.toFixed(16));
console.log(Math.PI.toFixed());
//number.toPrecision(precision)
//the precision should be 0-21, defaults to as many digits as necessary to specify the number.
console.log(Math.PI.toPrecision(2));
console.log(Math.PI.toPrecision(7));
console.log(Math.PI.toPrecision(16));
console.log(Math.PI.toPrecision());
//number.toString(radix)
//the radix should be 2-36, defaults to 10.
console.log(Math.PI.toString(2));
console.log(Math.PI.toString(8));
console.log(Math.PI.toString(16));
console.log(Math.PI.toString());
//Object
var a = {member: true};
var b = Object.create(a);
console.log(a.hasOwnProperty('member'));
console.log(b.hasOwnProperty('member'));
console.log(b.member);
var text = '<html><body bgcolor=linen><p>' + 'This is <b>bold</b>!</p></body></html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;
while ((a = tags.exec(text))) {
	for (i = 0; i < a.length; i++) {
		console.log(('//[' + i + '] '+a[i]).entityify());
	}
}
var b = /&.+;/.test('frank &amp; beans');
RegExp.method('test', function (string) {
	return this.exec(string) !== null;
});
//String
var name = 'Curly';
var initial = name.charAt(0);
console.log(initial);
String.method('charAt', function (pos) {
	return this.slice(pos, pos + 1);
});
var name = 'Curly';
var initial = name.charAt(0);
console.log(initial);
var s = 'C'.concat('a', 't');
var text = 'Mississippi';
var p = text.indexOf('ss');
var p = text.indexOf('ss',3);
var p = text.indexOf('ss',6);
var text = 'Mississippi';
var p = text.lastIndexOf('ss');
var p = text.lastIndexOf('ss',3);
var p = text.lastIndexOf('ss',6);
var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
m.sort(function (a, b) {
	return a.localeCompare(b);
});
var text = '<html><body bgcolor=linen><p>' + 'This is <b>bold</b>!</p></body></html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;
a = text.match(tags);
for (i = 0; i < a.length; i++) {
	console.log(('// [' + ']' + a[i]).entityify());
}
var result = 'mother_in_law'.replace('_', '-');//It replaces only the first occurrence of the searchValue;
var oldareacode = /\((\d{3})\)/g; 
var p = '(555)666-1212'.replace(oldareacode, '$1-');
String.method('entityify', function () {
	var character = {
		'<': '&lt;', 
		'>': '&gt;', 
		'&': '&amp;', 
		'"': '&quot'
	};
	return function () {
		return this.replace(/[<>&"]/g, function (c) {
			return character[c];
		});
	};
}());
console.log('<&>'.entityify());
var text = 'and in it he says "Any damn fool could';
var pos = text.search(/["'"]/);
var text = 'and in it he says "Any damn fool could';
var a = text.slice(18);
var b = text.slice(0, 3);
var c = text.slice(-5);
var d = text.slice(19, 32);
var digits = '0123456789';
var a = digits.split('', 5);// The "g" flag is ignored; 
var ip = '192.168.1.0';
var b = ip.split(".");
var c = '|a|b|c|'.split('|');
var text = 'last, first , middle';
var d = text.split(/\s*,\s*/);
var e = text.split(/\s*(,)\s*/);
//Some other String methods
//string.substring(start, end); please use "slice" instead.
//string.toLocaleLowerCase(); This is primarily for the benefit of Turkish because in that language 'I' converts to '1', not 'i'.
//string.toLocaleUpperCase(); This is primarily for the benefit of Turkish because in that language 'i' converts to 'İ', not 'I'.
//For some locales, such as Turkish, whose case mappings do not follow the default case mappings in Unicode, there may be a different result.(from Mozilla)
//string.toLowerCase();
//string.toUpperCase();
//string.fromCharCode(char...);
//A JSON Parser
var json_parse = function () {
	var at, 
		ch, 
		escape = {
			'"':'"',
			'\\': '\\', 
			'/':'/', 
			b: 'b', 
			f: '\f', 
			n: '\n', 
			r: '\r', 
			t: '\t'
		}, 
		text, 
		error = function (m) {
			throw {
				name: 'SyntaxError', 
				message: m,
				at: at,
				text: text
			};
		},
		next = function (c) {
			if (c && c !== ch) {
				error("Expected '" + c + "' instead of '" + ch + "'");
			}
			ch = text.charAt(at);
			a += 1;
			return ch;
		}, 
		number = function () {
			var number, 
				string = '', 
			if (ch === '-') {
				string = '-';
				next('-');
			}
			while (ch >= '0' && ch <= '9') {
				string += ch;
				next();
			}
			if (ch === '.') {
				string += '.';
				while (next() && ch >= '0' && ch <= '9') {
					string += ch;
				}
			}
			if (ch === 'e' || ch === 'E') {
				string += ch;
				next();
				if (ch === '-' || ch === '+') {
					string += ch;
					next();
				}
				while (ch >= '0' && ch <= '9') {
					string += ch;
					next();
				}
			}
			number = +string;
			if (isNaN(number)) {
				error("Bad number");
			} else {
				return number;
			}

		},
		string = function () {
			var hex,
				i, 
				string = '', 
				uffff,
			if (ch === '"') {
				while (next()) {
					if (ch === '"') {
						next();
						return string;
					} else if (ch === '\\') {
						next();
						if (ch === 'u') {
							uffff = 0;
							for (i = 0; i < 4; i++) {
								hex = parseInt(next(), 16);
								if (!isFinite(hex)) {
									break;
								}
								uffff = uffff * 16 + hex;
							}
							string += String.fromCharCode(uffff);
						} else if (typeof escape[ch] === 'string') {
							string += escape[ch];
						} else {
							break;
						}
					} else {
						string += ch;
					}
				}
			}
			error("Bad string");
		},
		white = function () {
			while (ch && ch <= ' ') {
				next();
			}
		},
		word = function () {
			switch (ch) {
				case 't':
					next('t');
					next('r');
					next('u');
					next('e');
					return true;
				case 'f':
					next('f');
					next('a');
					next('l');
					next('s');
					next('e');
					return false;
				case 'n':
					next('n');
					next('u');
					next('l');
					next('l');
					return null;				
			}
			error("Unexpected '" + ch + "'");
		},
		value, 
		array = function () {
			var array = [];
			if (ch === '[') {
				next('[');
				white();
				if (ch === ']') {
					next(']');
					return array;
				}
				while (ch) {
					array.push(value());
					white();
					if (ch === ']') {
						next(']');
						return array;
					}
					next(',');
					white();
				}
			}
			error("Bad array");
		},
		object = function () {
			var key, 
				object = {};
			if (ch === '{') {
				next('{');
				white();
				next(":");
				object[key] = value();
				white();
				if (ch === '}') {
					next('}');
					return object;
				}
				while (ch) {
					key = string();
					white();
					next(':');
					object[key] = value();
					white();
					if (ch === '}') {
						next('}');
						return object;
					}
					next(',');
					white();
				}
			}
			error("Bad object");
		};
		value = function () {
			white();
			switch (ch) {
				case '{':
					return object();
				case '[':
					return array();
				case '"':
					return string();
				case '-':
					return number();
				default:
					return ch >= '0' && ch <= '9' ? number() : word();
			}
		};
		return function (source, reviver) {
			var result;
			text = source;
			at = 0;
			ch = ' ';
			result = value();
			white();
			if (ch) {
				error("Syntax error");
			}
			return typeof reviver === 'function' ? function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}({'': result}, '') : result;
		};
}();
