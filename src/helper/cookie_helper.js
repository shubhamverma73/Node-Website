exports.cookie = (req, res, name) => {
	var cookieArr = req.headers.cookie.split(";");
	var token = '';
	for (var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");
		if (name == cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}
}
