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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', window.__env.gaID, 'auto');