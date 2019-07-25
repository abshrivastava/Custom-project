function vm_open() {
    if (void 0 === openthis && (openthis = "vm"), void 0 === width && (width = 580), "426" == client || window.location.href.search("usrfiles.com") > -1)"6173" == client ? (vm_ref = "http://blossomridge.net/", vm_loc = "http://blossomridge.net/") : (vm_ref = "http://swarminteractive.com/", vm_loc = "http://swarminteractive.com/"); else if ("490" == client)vm_ref = "http://libertymutual.com/", vm_loc = "http://libertymutual.com/"; else if ("6298" == client)vm_ref = "http://swarminteractive.com/", vm_loc = "http://swarminteractive.com/"; else try {
        vm_ref = window.location.href, vm_loc = top.location.href
    } catch (e) {
    }
    if (vm_loc.match(/#vm_(?:[A-Z*])_/i))try {
        var t = vm_loc.match(/#vm_(?:[A-Z*])_(?:[-a-zA-Z0-9]*)/i)[0];
        t = t.substring(4), document.getElementById(openthis).id = t, openthis = t, vm_ref = vm_ref.replace(/#vm_(?:[A-Z*])_(?:[-a-zA-Z0-9]*)/i, "")
    } catch (e) {
    }
    vm_reference = vm_ref, vm_ref = vm_ref.split("#"), vm_ref = vm_ref[0], function (e, t, i, n, o) {
        var s = new Object;
        _vm_unique++;
        for (var r = 0; r < vm_overrides.length; r++)void 0 !== window[vm_overrides[r]] && (s[vm_overrides[r]] = window[vm_overrides[r]]);
        return void 0 == client || 0 == client ? (_vm_show_error("0", t, openthis, {response: "3100"}, embedded_params), !1) : (window["_vm_" + _vm_unique] = new VM_PLAYER.Player({
            unique: _vm_unique,
            id: i,
            client: e,
            ref: t,
            embed: s,
            target: o
        }), window["_vm_" + _vm_unique].load(), window._vm_players.push(window["_vm_" + _vm_unique]), void(1 == window._vm_players.length && (window._vm = window["_vm_" + _vm_unique])))
    }(client, vm_ref, openthis, embedded_params, target_div)
}
function _vm_show_error(e, t, i, n, o) {
    var s = _vm_get_size("tablet", o.width);
    this.viewmedica = document.createElement("iframe"), this.viewmedica.setAttribute("height", s), this.viewmedica.setAttribute("width", o.width), this.viewmedica.setAttribute("frameborder", 0), this.viewmedica.setAttribute("webkitallowfullscreen", "always"), this.viewmedica.setAttribute("mozallowfullscreen", "always"), this.viewmedica.setAttribute("allowfullscreen", "always"), this.viewmedica.style.border = "1px solid #ccc", this.viewmedica.style.overflow = "hidden", this.viewmedica.style["max-width"] = "100%", this.viewmedica.setAttribute("src", "https://swarminteractive.com/vm/viewmedica/error/?client=" + e + "&errno=" + encodeURIComponent(n.response)), lite ? this.viewmedica.setAttribute("id", "viewmedica") : this.viewmedica.setAttribute("id", "viewmedica_" + i), document.getElementById(i).style["max-width"] = "100%", document.getElementById(i).appendChild(this.viewmedica)
}
function _vm_toggle_fs(e, t, i) {
    var n = t.substr(1);
    n = document.getElementById(n), vm_is_full_screen ? (window.onclick = null, window.removeEventListener("resize", _vm_handler), n.removeAttribute("style"), document.getElementById("viewmedica_" + i).removeAttribute("style"), document.getElementById("viewmedica_" + i).setAttribute("style", "border: 1px solid #ccc;max-width: 100%;box-sizing: border-box;"), document.getElementById("viewmedica_" + i).style.border = "1px solid #ccc", document.getElementById("viewmedica_" + i).style["max-width"] = "100%", document.getElementById("viewmedica_" + i).style["box-sizing"] = "border-box", (_vm_prefix_fs(document, "FullScreen") || _vm_prefix_fs(document, "IsFullScreen")) && _vm_prefix_fs(document, "CancelFullScreen")) : (_vm_fullscreen_resize(t, i), window.addEventListener("resize", _vm_handler = function (e) {
        _vm_fullscreen_resize(t, i)
    })), vm_is_full_screen = !vm_is_full_screen
}
function _vm_prefix_fs(e, t) {
    for (var i, n, o = ["webkit", "moz", "ms", "o", ""], s = 0; s < o.length && !e[i];) {
        if (i = t, "" == o[s] && (i = i.substr(0, 1).toLowerCase() + i.substr(1)), i = o[s] + i, n = typeof e[i], "undefined" != n)return o = [o[s]], "function" == n ? e[i]() : e[i];
        s++
    }
}
function _vm_fullscreen_resize(e, t) {
    var i = e.substr(1);
    i = document.getElementById(i);
    var n = window.innerWidth, o = window.innerHeight, s = document.getElementById("viewmedica_" + t), r = s.clientWidth, a = s.clientHeight, l = n / o, c = r / a;
    if (i.setAttribute("style", "width: " + n + "px;height: " + o + "px;background: #000000;position: fixed;top: 0;left: 0;z-index: 2147483647;margin-left: 0;margin-right: 0;margin-top: 0;margin-bottom: 0;border: 1px solid #ccc;"), i.style.width = n + "px", i.style.height = o + "px", i.style.background = "#000000", i.style.position = "fixed", i.style.top = "0px", i.style.left = "0px", i.style["z-index"] = "2147483647", i.style["margin-left"] = "0px", i.style["margin-right"] = "0px", i.style["margin-bottom"] = "0px", i.style["margin-top"] = "0px", i.style.border = "1px solid #ccc", l > c) {
        var d = o / (a + 2);
        s.setAttribute("style", "-moz-transform:scale(" + d + ");-moz-transform-origin: 0 0;-webkit-transform:scale(" + d + ");-webkit-transform-origin: 0 0;-o-transform:scale(" + d + ");-o-transform-origin: 0 0;-ms-transform:scale(" + d + ");-ms-transform-origin: 0 0;transform:scale(" + d + ");trasform-transform-origin: 0 0;position: absolute;top: 0;left: " + (n - r * d) / 2 + "px"), s.style["-moz-transform"] = "scale(" + d + ")", s.style["-webkit-transform"] = "scale(" + d + ")", s.style["-o-transform"] = "scale(" + d + ")", s.style["-ms-transform"] = "scale(" + d + ")", s.style.transform = "scale(" + d + ")", s.style["-moz-transform-origin"] = "0 0", s.style["-webkit-transform-origin"] = "0 0", s.style["-o-transform-origin"] = "0 0", s.style["-ms-transform-origin"] = "0 0", s.style["transform-origin"] = "0 0", s.style.position = "absolute", s.style.top = "0", s.style.margin = "0", s.style.left = (n - r * d) / 2 + "px"
    } else {
        var d = n / (r + 2);
        s.setAttribute("style", "-moz-transform:scale(" + d + ");-moz-transform-origin: 0 0;-webkit-transform:scale(" + d + ");-webkit-transform-origin: 0 0;-o-transform:scale(" + d + ");-o-transform-origin: 0 0;-ms-transform:scale(" + d + ");-ms-transform-origin: 0 0;transform:scale(" + d + ");trasform-transform-origin: 0 0;position: absolute;left: 0;top: " + (o - a * d) / 2 + "px"), s.style["-moz-transform"] = "scale(" + d + ")", s.style["-webkit-transform"] = "scale(" + d + ")", s.style["-o-transform"] = "scale(" + d + ")", s.style["-ms-transform"] = "scale(" + d + ")", s.style.transform = "scale(" + d + ")", s.style["-moz-transform-origin"] = "0 0", s.style["-webkit-transform-origin"] = "0 0", s.style["-o-transform-origin"] = "0 0", s.style["-ms-transform-origin"] = "0 0", s.style["transform-origin"] = "0 0", s.style.position = "absolute", s.style.left = "0", s.style.margin = "0", s.style.top = (o - a * d) / 2 + "px"
    }
}
function _vm_parse_status(e) {
    try {
        var t = e.split("|"), i = window["_vm_" + t[0]], n = t[1], o = t[2];
        if ("function" == typeof i)return i(o, "#" + n, n), !0;
        var i = _vm[t[0]];
        if ("function" == typeof i) {
            var s = t[1], r = JSON.parse(s);
            return i.call(_vm, r), !0
        }
    } catch (a) {
    }
}
function _vm_ga(e) {
    try {
        window.pageTracker ? pageTracker._trackPageview(e) : void 0 !== window._gaq ? _gaq.push(["_trackPageview", e]) : void 0 !== window.ga ? ga("send", "pageview", e) : console.log("ViewMedica error sending vm to Google Analytics. No analytics method present.")
    } catch (t) {
        console.log("ViewMedica error sending vm to Google Analytics\n" + t)
    }
}
function _vm_lang(e, t) {
    t = t.substring(1), document.getElementById(t).attr("id", e), document.getElementById("viewmedica_" + t).setAttribute("id", "viewmedica_" + e)
}
function _vm_get_size(e, t) {
    return "tablet" == e ? Math.ceil(326 * t / 580) + 60 : "raw" == e ? Math.ceil(326 * t / 580) : "flash" == e || "phone" == e ? Math.ceil(373 * t / 580) : void 0
}
try {
    new window.CustomEvent("?")
} catch (o_O) {
    window.CustomEvent = function (e, t) {
        function i(i, o) {
            var s = document.createEvent(e);
            if ("string" != typeof i)throw new Error("An event name must be provided");
            return "Event" == e && (s.initCustomEvent = n), null == o && (o = t), s.initCustomEvent(i, o.bubbles, o.cancelable, o.detail), s
        }

        function n(e, t, i, n) {
            this.initEvent(e, t, i), this.detail = n
        }

        return i
    }(window.CustomEvent ? "CustomEvent" : "Event", {bubbles: !1, cancelable: !1, detail: null})
}
void 0 === window.vm_modernizr && (window.vm_modernizr = function (e, t, i) {
    function n(e) {
        p.cssText = e
    }

    function o(e, t) {
        return n(f.join(e + ";") + (t || ""))
    }

    function s(e, t) {
        return typeof e === t
    }

    function r(e, t) {
        return !!~("" + e).indexOf(t)
    }

    var a, l, c, d = "2.8.3", m = {}, u = t.documentElement, h = "modernizr", v = t.createElement(h), p = v.style, f = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")), w = {svg: "http://www.w3.org/2000/svg"}, _ = {}, g = [], y = g.slice, b = function (e, i, n, o) {
        var s, r, a, l, c = t.createElement("div"), d = t.body, m = d || t.createElement("body");
        if (parseInt(n, 10))for (; n--;)a = t.createElement("div"), a.id = o ? o[n] : h + (n + 1), c.appendChild(a);
        return s = ["&#173;", '<style id="s', h, '">', e, "</style>"].join(""), c.id = h, (d ? c : m).innerHTML += s, m.appendChild(c), d || (m.style.background = "", m.style.overflow = "hidden", l = u.style.overflow, u.style.overflow = "hidden", u.appendChild(m)), r = i(c, e), d ? c.parentNode.removeChild(c) : (m.parentNode.removeChild(m), u.style.overflow = l), !!r
    }, E = function (t) {
        var i = e.matchMedia || e.msMatchMedia;
        if (i)return i(t) && i(t).matches || !1;
        var n;
        return b("@media " + t + " { #" + h + " { position: absolute; } }", function (t) {
            n = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
        }), n
    }, x = {}.hasOwnProperty;
    c = s(x, "undefined") || s(x.call, "undefined") ? function (e, t) {
        return t in e && s(e.constructor.prototype[t], "undefined")
    } : function (e, t) {
        return x.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if ("function" != typeof t)throw new TypeError;
        var i = y.call(arguments, 1), n = function () {
            if (this instanceof n) {
                var o = function () {
                };
                o.prototype = t.prototype;
                var s = new o, r = t.apply(s, i.concat(y.call(arguments)));
                return Object(r) === r ? r : s
            }
            return t.apply(e, i.concat(y.call(arguments)))
        };
        return n
    }), _.rgba = function () {
        return n("background-color:rgba(150,255,150,.5)"), r(p.backgroundColor, "rgba")
    }, _.opacity = function () {
        return o("opacity:.55"), /^0.55$/.test(p.opacity)
    }, _.fontface = function () {
        var e;
        return b('@font-face {font-family:"font";src:url("https://")}', function (i, n) {
            var o = t.getElementById("smodernizr"), s = o.sheet || o.styleSheet, r = s ? s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "" : "";
            e = /src/i.test(r) && 0 === r.indexOf(n.split(" ")[0])
        }), e
    }, _.video = function () {
        var e = t.createElement("video"), i = !1;
        try {
            (i = !!e.canPlayType) && (i = new Boolean(i), i.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), i.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), i.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (n) {
        }
        return i
    }, _.svg = function () {
        return !!t.createElementNS && !!t.createElementNS(w.svg, "svg").createSVGRect
    }, _.inlinesvg = function () {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == w.svg
    };
    for (var A in _)c(_, A) && (l = A.toLowerCase(), m[l] = _[A](), g.push((m[l] ? "" : "no-") + l));
    return m.addTest = function (e, t) {
        if ("object" == typeof e)for (var n in e)c(e, n) && m.addTest(n, e[n]); else {
            if (e = e.toLowerCase(), m[e] !== i)return m;
            t = "function" == typeof t ? t() : t, "undefined" != typeof enableClasses && enableClasses && (u.className += " " + (t ? "" : "no-") + e), m[e] = t
        }
        return m
    }, n(""), v = a = null, function (e, t) {
        function i(e, t) {
            var i = e.createElement("p"), n = e.getElementsByTagName("head")[0] || e.documentElement;
            return i.innerHTML = "x<style>" + t + "</style>", n.insertBefore(i.lastChild, n.firstChild)
        }

        function n() {
            var e = _.elements;
            return "string" == typeof e ? e.split(" ") : e
        }

        function o(e) {
            var t = w[e[p]];
            return t || (t = {}, f++, e[p] = f, w[f] = t), t
        }

        function s(e, i, n) {
            if (i || (i = t), d)return i.createElement(e);
            n || (n = o(i));
            var s;
            return s = n.cache[e] ? n.cache[e].cloneNode() : v.test(e) ? (n.cache[e] = n.createElem(e)).cloneNode() : n.createElem(e), !s.canHaveChildren || h.test(e) || s.tagUrn ? s : n.frag.appendChild(s)
        }

        function r(e, i) {
            if (e || (e = t), d)return e.createDocumentFragment();
            i = i || o(e);
            for (var s = i.frag.cloneNode(), r = 0, a = n(), l = a.length; l > r; r++)s.createElement(a[r]);
            return s
        }

        function a(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (i) {
                return _.shivMethods ? s(i, e, t) : t.createElem(i)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function (e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(_, t.frag)
        }

        function l(e) {
            e || (e = t);
            var n = o(e);
            return _.shivCSS && !c && !n.hasCSS && (n.hasCSS = !!i(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || a(e, n), e
        }

        var c, d, m = "3.7.0", u = e.html5 || {}, h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, v = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", f = 0, w = {};
        !function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", c = "hidden" in e, d = 1 == e.childNodes.length || function () {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                    }()
            } catch (i) {
                c = !0, d = !0
            }
        }();
        var _ = {
            elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: m,
            shivCSS: u.shivCSS !== !1,
            supportsUnknownElements: d,
            shivMethods: u.shivMethods !== !1,
            type: "default",
            shivDocument: l,
            createElement: s,
            createDocumentFragment: r
        };
        e.html5 = _, l(t)
    }(this, t), m._version = d, m._prefixes = f, m.mq = E, m.testStyles = b, m
}(this, this.document)), window.console || (window.console = {
    log: function () {
    }, info: function () {
    }, warn: function () {
    }, error: function () {
    }, fatal: function () {
    }
});
var client = "undefined" == typeof client ? void 0 : client, lang = void 0, audio = void 0, defaultmode = void 0, disclaimer = void 0, target_div = void 0, openthis = void 0, menuaccess = void 0, captions = void 0, subtitles = void 0, markup = void 0, search = void 0, sections = void 0, height = void 0, width = void 0, brochures = void 0, brochure = void 0, fullscreen = void 0, ignoreaudio = void 0, autoplay = void 0, showhiddenplaylists = void 0, dev = void 0, social = void 0, secure = void 0, vm_api = void 0, vm_ref = "undefined" == typeof vm_ref ? void 0 : vm_ref, vm_loc = "undefined" == typeof vm_loc ? void 0 : vm_loc, vm_reference = "undefined" == typeof vm_reference ? void 0 : vm_reference, device_width = void 0, noplayer = void 0, lite = !1, flash = void 0, html5 = void 0, vm_original_width = 0, vm_original_height = 0, vm_is_full_screen = !1, embedded_params = new Object, _vm_unique = "undefined" == typeof _vm_unique ? 1 : _vm_unique, _vm_handler, VM_PLAYER = VM_PLAYER || {};
VM_PLAYER.Player = function (e) {
    this.unique = e.unique, this.el = null, this.div = null, this.player = null, this.key = "", this.provider = 0, this.urls = null, this.container = null, this.id = e.id, this.target = e.target, this.client = e.client, this.ref = e.ref, this.options = e.embed, this.defaults = null, this.properties = {
        caption: "",
        playerState: -1,
        currentTime: 0,
        duration: 0,
        volume: 1
    }, this.states = {WAITING: -1, READY: 0, PLAYING: 1, PAUSED: 2}
}, VM_PLAYER.Player.prototype = {
    sendEvent: function (e) {
        var t = new CustomEvent(e.eventName, {detail: e.eventData, bubbles: !0, cancelable: !0});
        this.container.dispatchEvent(t)
    }, load: function () {
        this.ref.search("https") > -1 && (this.options.secure = !0);
        var e = this.options.secure === !1 ? "" : "s", t = "http" + e + "://www.swarminteractive.com/vm/viewmedica/allow/?client=" + this.client + "&ref=" + this.ref;
        this.jsonp(t, this.start, window["_vm_" + this.unique])
    }, start: function (e) {
        return void 0 !== e.response ? (_vm_show_error(this.client, this.ref, this.id, e, this.options), !1) : (this.key = e.key, this.provider = e.provider, this.urls = e.urls, this.defaults = e.settings, void 0 === this.target && (this.target = this.id), this.settings(e), this.validate() ? void(this.modern() ? this.open() : this.openLegacy()) : (_vm_show_error(this.client, this.ref, this.id, {response: "2196"}, this.options), !1))
    }, validate: function () {
        var e = !1;
        for (var t in this.urls) {
            var i = this.urls[t];
            if (this.ref.search(i) > -1) {
                e = !0;
                break
            }
        }
        return e
    }, open: function () {
        vm_opened_count++;
        var e = "", t = "";
        (this.options.secure === !0 || "true" === this.options.secure) && (e = "&sec=1", t = "s");
        var i = _vm_get_size("tablet", this.options.width);
        this.player = document.createElement("iframe"), this.player.setAttribute("width", this.options.width), this.player.setAttribute("height", i), this.player.setAttribute("frameborder", 0), this.player.setAttribute("webkitallowfullscreen", "always"), this.player.setAttribute("mozallowfullscreen", "always"), this.player.setAttribute("allowfullscreen", "always"), this.player.setAttribute("id", "viewmedica_" + this.id), this.player.setAttribute("src", "http" + t + "://swarminteractive.com/vm/viewmedica/embed/?client=" + this.client + this.params() + "&ref=" + encodeURIComponent(this.key) + e), this.player.style.border = "1px solid #ccc", this.player.style.overflow = "hidden", this.player.style["max-width"] = "100%", this.player.style["box-sizing"] = "border-box";
        var e = "", t = "";
        (this.options.secure === !0 || "true" === this.options.secure) && (e = "&sec=1", t = "s"), this.div = document.getElementById(this.target), this.div.style["max-width"] = "100%", this.div.style["box-sizing"] = "border-box", this.div.innerHTML = "", this.div.appendChild(this.player), this.div.setAttribute("id", this.id), this.setElement(this.target), this.options.api !== !1 && window.addEventListener("message", function (e) {
            window._vm_parse_status(e.data)
        }, !1)
    }, openLegacy: function () {
        vm_opened_count++;
        var e = _vm_get_size("flash", this.options.width), t = "", i = "";
        (this.options.secure === !0 || "true" === this.options.secure) && (t = "&secure=true", i = "s"), document.getElementById(this.target).innerHTML = '<object width="' + this.options.width + '" height="' + e + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="viewmedica">            <param name="wmode" value="transparent" />            <param name="allowfullscreen" value="true">            <param name="allowscriptaccess" value="always">            <param name="movie" value="http' + i + "://www.swarminteractive.com/subscriptions/viewer.swf?client=" + this.client + this.params() + '&oldembed=false">            <embed src="http' + i + "://www.swarminteractive.com/subscriptions/viewer.swf?client=" + this.client + this.params() + '&oldembed=false"                type="application/x-shockwave-flash"                wmode="transparent"                allowfullscreen="true"                allowscriptaccess="always"                width="' + this.options.width + '" height="' + e + '">            </embed>        </object>'
    }, settings: function () {
        for (var e = 0; e < vm_overrides.length; e++) {
            var t = vm_overrides[e];
            void 0 === this.options[t] && (this.options[t] = this.defaults[t])
        }
    }, jsonp: function (e, t, i) {
        var n = "viewmedica_jsonp_" + this.unique;
        e += e.match(/\?/) ? "&jsoncallback=" + n : "?jsoncallback=" + n, window[n] = function (e) {
            t.call(i, e), document.getElementsByTagName("head")[0].removeChild(o), o = null, delete window[n]
        };
        var o = document.createElement("script");
        o.type = "text/javascript", o.src = e, document.getElementsByTagName("head")[0].appendChild(o)
    }, modern: function () {
        return (vm_modernizr.rgba && vm_modernizr.fontface && vm_modernizr.opacity && vm_modernizr.video && vm_modernizr.svg && vm_modernizr.inlinesvg || navigator.userAgent.search("iPad") > 0 || this.options.lite) && !this.options.flash
    }, params: function () {
        var e = "";
        return e += "&lang=" + this.options.lang, e += "&openthis=" + this.id, e += "&embedded=" + encodeURIComponent(this.ref), (this.options.menuaccess === !1 || "false" === this.options.menuaccess) && (e += "&menuaccess=no"), (this.options.brochures === !1 || "false" === this.options.brochures || this.options.brochure === !1 || "false" === this.options.brochure) && (e += "&brodefault=false"), (this.options.disclaimer === !1 || "false" === this.options.disclaimer) && (e += "&disclaimer=off"), (this.options.captions === !1 || "false" === this.options.captions) && (e += "&captions=off"), (this.options.subtitles === !0 || "true" === this.options.subtitles) && (e += "&subtitles=on"), (this.options.search === !1 || "false" === this.options.search) && (e += "&search=off"), (this.options.sections === !1 || "false" === this.options.sections) && (e += "&sections=off"), (this.options.markup === !1 || "false" === this.options.markup) && (e += "&markup=off"), (this.options.vm_api === !1 || "false" === this.options.vm_api) && (e += "&api=off"), e += this.options.fullscreen === !1 || "false" === this.options.fullscreen ? "&fsmode=no" : "&fsmode=on", (this.options.dev === !0 || "local" === this.options.dev || "staging" === this.options.dev) && (e += "&dev=" + this.options.dev), (this.options.ignoreaudio === !0 || "true" === this.options.ignoreaudio || this.options.audio === !1 || "false" === this.options.audio) && (e += "&ignoreaudio=true"), (this.options.showhiddenplaylists === !0 || "true" === this.options.showhiddenplaylists) && (e += "&showhiddenplaylists=true"), (this.options.defaultmode === !1 || "auto" == this.options.defaultmode) && (e += "&defaultmode=" + this.options.defaultmode), (this.options.autoplay === !0 || "true" == this.options.autoplay) && (e += "&defaultmode=auto"), (this.options.secure === !0 || "true" === this.options.secure) && (e += "&sec=1"), (this.options.social === !1 || "false" === this.options.social) && (e += "&social=" + this.options.social), vm_modernizr.inlinesvg || (e += "&inlinesvg=no"), e
    }, navigate: function (e) {
        this.el.postMessage('navigate|{"data":"' + e + '"}', "*")
    }, setElement: function (e) {
        this.container = document.getElementById("viewmedica_" + e), this.el = this.container.contentWindow
    }, setProperty: function (e) {
        this.properties[e.property] = e.value
    }, getPlayerState: function () {
        return this.properties.playerState
    }, getCurrentTime: function () {
        return this.properties.currentTime
    }, getCaption: function () {
        return this.properties.caption
    }, getDuration: function () {
        return this.properties.duration
    }, playVideo: function () {
        this.el.postMessage("play|{}", "*")
    }, pauseVideo: function () {
        this.el.postMessage("pause|{}", "*")
    }, exitVideo: function () {
        this.el.postMessage("exitVideo|{}", "*")
    }, seekTo: function (e) {
        this.el.postMessage('seekTo|{"data":' + e + "}", "*")
    }, getVolume: function () {
        return this.properties.volume
    }, setVolume: function (e) {
        this.el.postMessage('setVolume|{"data":' + e + "}", "*")
    }, toggleMute: function () {
        this.el.postMessage("toggleMute|{}", "*")
    }, log: function (e) {
    }
}, window._vm = null, window._vm_players = window._vm_players || [], window.vm_overrides = ["openthis", "lang", "audio", "autoplay", "showhiddenplaylists", "defaultmode", "disclaimer", "menuaccess", "captions", "subtitles", "search", "markup", "sections", "width", "height", "vm_api", "brochures", "brochure", "fullscreen", "ignoreaudio", "secure", "device_width", "noplayer", "target_div", "flash", "html5", "social", "embedded", "dev"], window.vm_opened_count = 0;