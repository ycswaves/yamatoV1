CommonHelper = {
	'isInteger': function(n){
		n = parseInt(n);
			return n === +n && n === (n|0);
	}
}