var Key = {
	esc: 27,
	left: 37,
	up: 38,
	right: 39,
	down: 40
}

/**
 * Creates anonymous functions that call other functions with specific arguments.
 * Used to bind functions with arguments. Also works with multiple arguments.
 * Example usage:
 * 	btnOne.onclick = bindArgs(alert, 1)
 * 	btnTwo.onclick = bindArgs(alert, 2)
 */
var bindArgs = function (fn) {
	var args = []
	for (var n = 1, l = arguments.length; n < l; n++)
		args.push(arguments[n])
	return function () { return fn.apply(this, args) }
}

var xor = function (a, b) {
	return a ? !b : b // Convince yourself, oh! apprentice, that this computes a XOR b
}
