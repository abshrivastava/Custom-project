/**
 * Created by tom.giannulli on 1/5/16.
 */
!function (e, t) {
    "use strict";
    function n(e, t) {
        try {
            e.style.display = "none", t.removeChild(e)
        } catch (n) {
            a._debug
        }
    }

    var o = "https://connect.humanapi.co", a = {}, i = null, s = null, l = null;
    if (!e.HumanConnect) {
        var r = document.getElementsByTagName("body")[0] || document.documentElement, d = r.style.overflow, c = function (e) {
            a._debug;
            try {
                var t = JSON.parse(e.data);
                if ("hapi-connect-close" === t.type && i && (n(i, r), s && n(s, r), a.onClose && a.onClose(), l && n(l, r), r.style.overflow = d), "hapi-connect-finish" === t.type && i && (i.style.display = "none", s && (s.style.display = "none"), a.onFinish && a.onFinish(null, t.token), l && n(l, r), r.style.overflow = d), "hapi-connect-open" === t.type && (store && store.set("humanapiSessionToken", t.token.sessionToken), l && n(l, r)), "hapi-connect-popup-iframe" === t.type && p(t.url, "hapi-popup-iframe"), "hapi-close-popup-iframe" === t.type) {
                    var o = document.getElementById("hapi-popup-iframe");
                    o.parentElement.removeChild(o), i.contentWindow.postMessage(JSON.stringify({type: "hapi-external-auth-added"}), "*")
                }
                "hapi-close-popup-mobile" === t.type && i.contentWindow.postMessage(JSON.stringify({type: "hapi-external-auth-added"}), "*"), "hapi-connect-error" === t.type && a.onError && a.onError(t.error)
            } catch (c) {
                a._debug
            }
        };
        e.addEventListener ? e.addEventListener("message", c, !1) : e.attachEvent && e.attachEvent("onmessage", c);
        var u = function (e, t, n) {
            var i = a.publicToken, s = o + "?clientUserId=" + t;
            return s += e ? "&clientId=" + e : "", s += i ? "&publicToken=" + i : "", s += n ? "&sessionToken= " + n : "", s += a.iframeFlag ? "&iframeFlag=1" : "", s += a.embed ? "&embed=1" : "", s += "&lang=" + a.language, s += a.addedSource ? "&addedSource=" + a.addedSource : "", s += a._isDevPortal ? "&devPortal=1" : "", s += a.__finishUrl ? "&finishUrl=" + a.__finishUrl : "", s += a.__closeUrl ? "&closeUrl=" + a.__closeUrl : "", s += a.style ? "&style=" + encodeURIComponent(JSON.stringify(a.style)) : "", s += a.modal ? "&modal=1" : "", s += a.mode ? "&mode=" + a.mode : "", s += a.test ? "&test=" + a.test : "", s += a.ka ? "&ka=" + a.ka : "", s += a.sourceId ? "&sourceId=" + a.sourceId : "", p(s, !1)
        }, p = function (e, t) {
            var n = null, o = null;
            return n = document.createElement("iframe"), n.src = e, n.style.width = "100%", n.style.height = "100%", n.style.position = "fixed", n.style.top = "0", n.style.left = "0", n.style.overflowX = "hidden", n.style.zIndex = "99999", n.style.display = "block", n.style.margin = "0", n.style.padding = "0", n.style.border = "0px none transparent", n.style.visibility = "visible", n.style.backgroundColor = a.modal ? "transparent" : "#ffffff", n.style.overflowY = "auto", n.style["-webkit-tap-highlight-color"] = "transparent", n.setAttribute("frameBorder", "0"), n.setAttribute("allowtransparency", "true"), t !== !1 ? n.id = t : n.id = "human-connect", r.appendChild(n), [n, o]
        }, y = function () {
            var e = document.createElement("img");
            return e.src = o + "/spinner.gif", e.style.height = "30px", e.style.width = "30px", e.style.position = "fixed", e.style.top = "50%", e.style.left = "50%", e.style.marginLeft = "-15px", e.style.zIndex = "99999", r.appendChild(e), e
        }, m = document.getElementsByTagName("head")[0] || document.documentElement, f = function (e) {
            m.insertBefore(e, m.firstChild)
        }, h = function (e, t, n) {
            var o = document.createElement("script");
            if (o.src = e, "function" == typeof t) {
                var a;
                o.onload = o.onreadystatechange = function () {
                    a || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (a = !0, setTimeout(t, 0), o.onload = o.onreadystatechange = null)
                }
            }
            "function" == typeof n && (o.onerror = n), f(o)
        };
        a.open = function (e) {
            l = y();
            var t = e.clientId, n = e.clientUserId;
            e._baseURL && (o = e._baseURL);
            var r = e.publicToken || a.publicToken;
            a.publicToken = r, a.onFinish = e.finish, a.onClose = e.close, a.onError = e.error, a.iframeFlag = !1, a._debug = e._debug, a._isDevPortal = e._isDevPortal, a.language = e.language || "en", a.embed = e.embed || !1, a.uiState = e.uiState || !1, a.uiMessageType = e.uiMessageType || !1, a.__finishUrl = e.__finishUrl, a.__closeUrl = e.__closeUrl, a.style = e.style || !1, a.addedSource = e.addedSource || !1, a.modal = e.modal || 0, a.mode = e.mode, a.test = e.test, a.ka = e.ka, a.sourceId = e.sourceId;
            var d = [];
            h(o + "/store.min.js", function () {
                d = u(t, n, store.get("humanapiSessionToken")), i = d[0], s = d[1]
            }, function () {
                d = u(t, n, null), i = d[0], s = d[1]
            })
        }, a.setPublicToken = function (e) {
            a.publicToken = e
        }, e.HumanConnect = a
    }
}(this);