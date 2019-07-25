(function (window) {
	window.__env = window.__env || {};
	if (window.location.hostname.indexOf("app.carepoynt.com") != -1) {
		window.__env.gaID = 'UA-101939205-1';
	}
	else if(window.location.hostname.indexOf("stg.carepoynt.com") != -1) {
		window.__env.gaID = 'UA-101939205-4';
	}
	else if(window.location.hostname.indexOf("test.carepoynt.com") != -1) {
		window.__env.gaID = 'UA-101939205-3';
	}
	else {//localhost or dev
		window.__env.gaID = 'UA-101939205-2';
	}
}(this));