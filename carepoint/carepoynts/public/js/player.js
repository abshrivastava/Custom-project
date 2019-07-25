// Last update at: 2015-05-29 22:35:32 +00:00
//
// Inline Manual Player, v2.14.1
// by Riki Fridrich <riki@fczbkk.com> (http://fczbkk.com/)
// http://inlinemanual.com/
var EventBridge;
EventBridge = function () {
    function a() {
    }

    return a.prototype.add = function (a, b, c) {
        return null == c && (c = function () {
        }), a.addEventListener ? a.addEventListener(b, c) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0
    }, a.prototype.remove = function (a, b, c) {
        return null == c && (c = function () {
        }), a.removeEventListener ? a.removeEventListener(b, c) : a.detachEvent ? a.detachEvent("on" + b, c) : void 0
    }, a.prototype.stop = function (a) {
        return null != a ? a.preventDefault ? a.preventDefault() : a.returnValue = !1 : void 0
    }, a.prototype.target = function (a) {
        return null != a ? a.target || a.srcElement : null
    }, a
}();
var ClassBridge;
ClassBridge = function () {
    function a() {
    }

    return a.prototype.re = function (a) {
        return RegExp("(^|\\s)" + a + "(\\s|$)")
    }, a.prototype.has = function (a, b) {
        return this.re(b).test(a.className)
    }, a.prototype.add = function (a, b) {
        return this.has(a, b) ? void 0 : a.className += " " + b
    }, a.prototype.remove = function (a, b) {
        var c;
        return c = this.re(b), a.className = a.className.replace(c, " ")
    }, a.prototype.toggle = function (a, b) {
        return this.has(a, b) ? this.remove(a, b) : this.add(a, b)
    }, a
}(), function () {
    var a, b, c, d = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return -1
        };
    b = function (a) {
        var b, c, d, e, f, g, h;
        for (b = {}, f = 0, g = a.length; g > f; f++)c = a[f], b[c] = c;
        h = [];
        for (d in b)e = b[d], h.push(e);
        return h
    }, a = function () {
        function a(a, b) {
            null == b && (b = []), this.gaps = [], this.setCanvas(a), this.addGaps(b)
        }

        return a.prototype.setCanvas = function (a) {
            return this.isValidBox(a) ? this.canvas = a : void 0
        }, a.prototype.clearGaps = function () {
            return this.gaps = []
        }, a.prototype.addGaps = function (a) {
            var b, c, d, e;
            for (null == a && (a = []), e = [], c = 0, d = a.length; d > c; c++)b = a[c], e.push(this.addGap(b));
            return e
        }, a.prototype.addGap = function (a) {
            return this.isValidBox(a) && d.call(this.gaps, a) < 0 ? this.gaps.push(a) : void 0
        }, a.prototype.removeGaps = function (a) {
            var b, c, d, e;
            for (null == a && (a = []), e = [], c = 0, d = a.length; d > c; c++)b = a[c], e.push(this.removeGap(b));
            return e
        }, a.prototype.removeGap = function (a) {
            var b, c, d, e, f, g;
            for (f = this.gaps, g = [], c = d = 0, e = f.length; e > d; c = ++d)b = f[c], g.push(this.gaps.splice(c, 1));
            return g
        }, a.prototype.isValidBox = function (a) {
            var b, c, d, e;
            if ("object" != typeof a)return !1;
            for (e = ["left", "top", "width", "height"], c = 0, d = e.length; d > c; c++)if (b = e[c], null == a[b])return !1;
            return !0
        }, a.prototype.getGridPoints = function () {
            var a, c, d, e, f, g;
            for (d = {
                horizontal: [this.canvas.left, this.canvas.left + this.canvas.width],
                vertical: [this.canvas.top, this.canvas.top + this.canvas.height]
            }, g = this.gaps, e = 0, f = g.length; f > e; e++)c = g[e], d.horizontal.push(c.left, c.left + c.width), d.vertical.push(c.top, c.top + c.height);
            return a = function (a, b, c) {
                return a.filter(function (a) {
                    return a >= b && c >= a
                })
            }, d.horizontal = a(b(d.horizontal), this.canvas.left, this.canvas.left + this.canvas.width).sort(function (a, b) {
                return a - b
            }), d.vertical = a(b(d.vertical), this.canvas.top, this.canvas.top + this.canvas.height).sort(function (a, b) {
                return a - b
            }), d
        }, a.prototype.getGridMatrix = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
            for (f = [], n = a.vertical, b = j = 0, l = n.length; l > j; b = ++j) {
                for (i = n[b], g = [], o = a.horizontal, d = k = 0, m = o.length; m > k; d = ++k)h = o[d], c = b === a.vertical.length - 1 || d === a.horizontal.length - 1, e = c || this.isPointInGaps({
                    left: h,
                    top: i
                }), g.push(e === !0 ? 1 : 0);
                f.push(g)
            }
            return f
        }, a.prototype.isPointInGap = function (a, b) {
            var c, d;
            return b.left <= (c = a.left) && c < b.left + b.width && b.top <= (d = a.top) && d < b.top + b.height
        }, a.prototype.isPointInGaps = function (a) {
            var b, c, d, e;
            for (e = this.gaps, c = 0, d = e.length; d > c; c++)if (b = e[c], this.isPointInGap(a, b))return !0;
            return !1
        }, a.prototype.getMatrixBlockRight = function (a, b, c) {
            var d;
            for (d = b; 0 === a[c][d];)d++;
            return d
        }, a.prototype.getMatrixBlockBottom = function (a, b, c, d) {
            var e;
            for (e = c; this.getMatrixBlockRight(a, b, e) === d;)e++;
            return e
        }, a.prototype.getMatrixBlock = function (a, b, c) {
            var d, e;
            return d = this.getMatrixBlockRight(a, b, c), e = this.getMatrixBlockBottom(a, b, c, d, e), {
                x1: b,
                y1: c,
                x2: d,
                y2: e
            }
        }, a.prototype.markMatrixBlock = function (a, b) {
            var c, d, e, f, g, h, i, j;
            for (c = e = g = b.x1, h = b.x2; h >= g ? h > e : e > h; c = h >= g ? ++e : --e)for (d = f = i = b.y1, j = b.y2; j >= i ? j > f : f > j; d = j >= i ? ++f : --f)a[d][c] = 1;
            return a
        }, a.prototype.getAllMatrixBlocks = function (a) {
            var b, c, d, e, f, g, h, i;
            for (c = [], e = f = 0, h = a.length; h >= 0 ? h > f : f > h; e = h >= 0 ? ++f : --f)for (d = g = 0, i = a[0].length; i >= 0 ? i > g : g > i; d = i >= 0 ? ++g : --g)0 === a[e][d] && (b = this.getMatrixBlock(a, d, e), a = this.markMatrixBlock(a, b), c.push(b));
            return c
        }, a.prototype.generate = function () {
            var a, b, c, d, e, f, g;
            for (e = [], d = this.getGridPoints(), c = this.getGridMatrix(d), b = this.getAllMatrixBlocks(c), f = 0, g = b.length; g > f; f++)a = b[f], e.push({
                left: d.horizontal[a.x1],
                width: d.horizontal[a.x2] - d.horizontal[a.x1],
                top: d.vertical[a.y1],
                height: d.vertical[a.y2] - d.vertical[a.y1]
            });
            return e
        }, a
    }(), c = "object" == typeof exports ? exports : this, c.GapGrid = a
}.call(this), function () {
    var a;
    a = function () {
        function a(a) {
            var b = this;
            null == a && (a = {}), this.checkDependencies(), this.backdrops = [], this.covers = [], this.is_active = !1, this.options = {}, this.setOptions(this.default_options), this.setOptions(a), this.element_monitor = new ElementMonitor(null, {
                interval: this.options.watch_interval,
                onChange: function () {
                    return b.draw()
                }
            }), this.evt.add(window, "resize", function () {
                return b.redraw()
            })
        }

        return a.prototype.default_options = {
            backdrop_class: "backdrop",
            z_index: 1e3,
            padding: 5,
            color: "#000000",
            opacity: .5,
            hide_on_click: !0,
            cover: !1,
            watch: !1,
            watch_interval: 500,
            onShow: function () {
            },
            onHide: function () {
            }
        }, a.prototype.evt = new EventBridge, a.prototype.checkDependencies = function () {
            var a, b, c, d, e;
            for (b = ["DomBox", "EventBridge", "GapGrid", "ElementMonitor", "ElementCollector"], e = [], c = 0, d = b.length; d > c; c++) {
                if (a = b[c], !window[a])throw new Error("Backdrop requires " + a + " library to operate");
                e.push(void 0)
            }
            return e
        }, a.prototype.setOptions = function (a) {
            var b, c, d;
            null == a && (a = {}), d = [];
            for (b in a)c = a[b], d.push(null != this.default_options[b] ? this.options[b] = c : void 0);
            return d
        }, a.prototype.add = function (a) {
            return this.element_monitor.addElement(a), this.redraw()
        }, a.prototype.remove = function (a) {
            return this.element_monitor.removeElement(a), this.redraw()
        }, a.prototype.set = function (a) {
            return this.element_monitor.setElement(a), this.redraw()
        }, a.prototype.removeBackdrops = function () {
            var a, b, c, d;
            for (d = this.backdrops, b = 0, c = d.length; c > b; b++)a = d[b], a.parentNode.removeChild(a);
            return this.backdrops = []
        }, a.prototype.addBackdrops = function (a) {
            var b, c, d, e, f, g;
            for (b = {
                left: 0,
                top: 0,
                width: DomBox.Document.getWidth(),
                height: DomBox.Document.getHeight()
            }, d = new GapGrid(b, a), g = d.generate(), e = 0, f = g.length; f > e; e++)c = g[e], this.backdrops.push(this.createBackdrop(c));
            return this.backdrops
        }, a.prototype.createBackdrop = function (a) {
            var b, c, d, e, f, g = this;
            b = document.createElement("div"), b.className = this.options.backdrop_class, c = 100 * this.options.opacity, e = {
                position: "absolute",
                left: "" + a.left + "px",
                top: "" + a.top + "px",
                width: "" + a.width + "px",
                height: "" + a.height + "px",
                zIndex: this.options.z_index,
                backgroundColor: this.options.color,
                opacity: this.options.opacity,
                MsFilter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + c + ")",
                filter: "alpha(opacity=" + c + ")"
            };
            for (d in e)f = e[d], b.style[d] = f;
            return this.options.hide_on_click && this.evt.add(b, "click", function () {
                return g.hide()
            }), document.body.appendChild(b)
        }, a.prototype.addCover = function (a) {
            var b, c, d, e, f = this;
            b = document.createElement("div"), d = {
                position: "absolute",
                left: "" + a.left + "px",
                top: "" + a.top + "px",
                width: "" + a.width + "px",
                height: "" + a.height + "px",
                zIndex: this.options.z_index
            };
            for (c in d)e = d[c], b.style[c] = e;
            return this.options.hide_on_click && this.evt.add(b, "click", function () {
                return f.hide()
            }), document.body.appendChild(b), this.covers.push(b)
        }, a.prototype.addCovers = function (a) {
            var b, c, d, e;
            for (this.removeCovers(), e = [], c = 0, d = a.length; d > c; c++)b = a[c], e.push(this.addCover(b));
            return e
        }, a.prototype.removeCovers = function () {
            var a, b, c, d;
            for (d = this.covers, b = 0, c = d.length; c > b; b++)a = d[b], a.parentNode.removeChild(a);
            return this.covers = []
        }, a.prototype.draw = function () {
            var a, b, c, d, e, f;
            for (this.removeBackdrops(), this.removeCovers(), c = [], f = this.element_monitor.getElements(), d = 0, e = f.length; e > d; d++)a = f[d], b = DomBox.getBox(a), null != b && (b.setPadding(this.options.padding), c.push(b));
            return this.addBackdrops(c), this.options.cover ? this.addCovers(c) : void 0
        }, a.prototype.show = function (a) {
            return null != a && this.set(a), this.element_monitor.stop(), this.draw(), this.options.watch === !0 && this.element_monitor.start(), this.is_active = !0, this.options.onShow(this)
        }, a.prototype.hide = function () {
            return this.element_monitor.stop(), this.removeBackdrops(), this.removeCovers(), this.is_active = !1, this.options.onHide(this)
        }, a.prototype.redraw = function () {
            return this.is_active ? this.draw() : void 0
        }, a.prototype.destroy = function () {
            return this.hide()
        }, a
    }(), window.Backdrop = a
}.call(this), function () {
    var a, b, c = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return -1
        }, d = function (a, b) {
        function c() {
            this.constructor = a
        }

        for (var d in b)e.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    }, e = {}.hasOwnProperty;
    a = function () {
        function a(a) {
            null == a && (a = []), this.patterns = [], this.add(a)
        }

        return a.prototype.add = function (a) {
            var b, d, e;
            for (null == a && (a = []), "string" == typeof a && (a = [a]), b = 0, d = a.length; d > b; b++)e = a[b], c.call(this.patterns, e) < 0 && this.patterns.push(e);
            return this.patterns
        }, a.prototype.remove = function (a) {
            return null == a && (a = []), "string" == typeof a && (a = [a]), this.patterns = this.patterns.filter(function (b) {
                return c.call(a, b) < 0
            })
        }, a.prototype.test = function (b) {
            var c, d, e, f, g;
            for (g = this.patterns, c = 0, d = g.length; d > c; c++)if (e = g[c], f = new a.Pattern(e), f.test(b))return !0;
            return !1
        }, a.Pattern = function () {
            function b(a) {
                var b;
                ("*" === a || "<all_urls>" === a) && (a = "*://*/*?*#*"), this.original_pattern = a, b = this.sanitize(a), this.pattern = b, this.url_parts = this.getUrlParts(b)
            }

            return b.prototype.split_re = /^([a-z]+|\*)*:\/\/(.+@)*([\w\*\.\-]+)*(\:\d+)*(\/([^\?\#]*))*(\?([^\#]*))*(\#(.*))*/, b.prototype.split = function (a, b) {
                var c, d, e, f, g;
                null == a && (a = ""), null == b && (b = null), d = a.match(this.split_re), e = {
                    scheme: 1,
                    host: 3,
                    path: 6,
                    params: 8,
                    fragment: 10
                }, f = {};
                for (c in e)g = e[c], f[c] = (null != d ? d[g] : void 0) || b;
                return f
            }, b.prototype.getUrlParts = function (b) {
                var c;
                return null == b && (b = this.pattern), c = this.split(b), {
                    scheme: new a.Scheme(c.scheme),
                    host: new a.Host(c.host),
                    path: new a.Path(c.path),
                    params: new a.Params(c.params),
                    fragment: new a.Fragment(c.fragment)
                }
            }, b.prototype.sanitize = function (a) {
                var b;
                return null == a && (a = this.original_pattern), b = "*://*/*?*#*", ("*" === a || "<all_urls>" === a) && (a = b), a
            }, b.prototype.validate = function (a) {
                var b, c, d;
                null == a && (a = this.url_parts), c = !0;
                for (b in a)d = a[b], d.validate() || (c = !1);
                return c
            }, b.prototype.test = function (a) {
                var b, c, d, e, f, g;
                if (null != a) {
                    for (g = this.split(a), f = !0, e = ["scheme", "host", "path", "params", "fragment"], b = 0, c = e.length; c > b; b++)d = e[b], this.url_parts[d].test(g[d]) || (f = !1);
                    return f
                }
                return !1
            }, b
        }(), a.UrlPart = function () {
            function a(a) {
                this.original_pattern = a, this.pattern = this.sanitize(a)
            }

            return a.prototype.validate = function (a) {
                return null == a && (a = this.original_pattern), !1
            }, a.prototype.test = function (a, b) {
                return null == a && (a = ""), null == b && (b = this.pattern), null != b ? b.test(a) : !0
            }, a.prototype.sanitize = function (a) {
                return null == a && (a = this.original_pattern), this.validatePattern ? RegExp("^" + a + "$") : null
            }, a
        }(), a.Scheme = function (a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }

            return d(b, a), b.prototype.validate = function (a) {
                return null == a && (a = this.original_pattern), null != a ? /^(\*|[a-z]+)$/.test(a) : !1
            }, b.prototype.sanitize = function (a) {
                return null == a && (a = this.original_pattern), this.validate(a) ? (a = a.replace("*", "https?"), RegExp("^" + a + "$")) : null
            }, b
        }(a.UrlPart), a.Host = function (a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }

            return d(b, a), b.prototype.validate = function (a) {
                var b, c, d, e, f, g, h, i;
                if (null == a && (a = this.original_pattern), null != a) {
                    for (i = [/.+/], c = [/\*\*/, /\*[^\.]+/, /.\*/, /^(\.|-)/, /(\.|-)$/, /[^a-z0-9-.\*]/], g = !0, b = 0, e = i.length; e > b; b++)h = i[b], h.test(a) || (g = !1);
                    for (d = 0, f = c.length; f > d; d++)h = c[d], h.test(a) && (g = !1);
                    return g
                }
                return !1
            }, b.prototype.sanitize = function (a) {
                return null == a && (a = this.original_pattern), this.validate(a) ? (a = a.replace(".", "\\."), a = a.replace("*", "[a-z0-9-.]+"), RegExp("^" + a + "$")) : null
            }, b
        }(a.UrlPart), a.Path = function (a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }

            return d(b, a), b.prototype.validate = function (a) {
                return null == a && (a = this.original_pattern), !0
            }, b.prototype.sanitize = function (a) {
                return null == a && (a = this.original_pattern), null == a && (a = ""), a = a.replace(/\/$/, "\\/?"), a = a.replace(/\/\*$/, "((/?)|/*)"), a = a.replace(/\*/g, "[a-z0-9-./]*"), RegExp("^" + a + "$")
            }, b
        }(a.UrlPart), a.Params = function (a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }

            return d(b, a), b.prototype.validate = function (a) {
                var b, c, d, e, f;
                if (null == a && (a = this.original_pattern), null != a) {
                    for (c = [/\=\=/, /\=[^\&]+\=/, /^\=$/], e = !0, b = 0, d = c.length; d > b; b++)f = c[b], f.test(a) && (e = !1);
                    return e
                }
                return !0
            }, b.prototype.sanitize = function (a) {
                var b, c, d, e, f, g, h, i;
                if (null == a && (a = this.original_pattern), "*" === a && (a = null), h = {}, null != a)for (f = a.split("&"), b = 0, d = f.length; d > b; b++)e = f[b], g = e.split("="), c = g[0], i = g[1], c = "*" === c ? ".+" : c.replace(/\*/g, ".*"), i = "*" === i ? "=?.*" : "=" + i.replace(/\*/g, ".*"), h[c] = i;
                return h
            }, b.prototype.test = function (a, b) {
                var c, d, e, f;
                null == a && (a = ""), null == b && (b = this.pattern), e = !0;
                for (c in b)f = b[c], d = RegExp("(^|\\&)" + c + f + "(\\&|$)"), d.test(a) || (e = !1);
                return e
            }, b
        }(a.UrlPart), a.Fragment = function (a) {
            function b() {
                return b.__super__.constructor.apply(this, arguments)
            }

            return d(b, a), b.prototype.validate = function (a) {
                var b, c, d, e, f;
                if (null == a && (a = this.original_pattern), null != a) {
                    for (c = [/\#/], e = !0, b = 0, d = c.length; d > b; b++)f = c[b], f.test(a) && (e = !1);
                    return e
                }
                return !0
            }, b.prototype.sanitize = function (a) {
                return null == a && (a = this.original_pattern), this.validate(a) && null != a ? (a = a.replace(/\*/g, ".*"), RegExp("^" + a + "$")) : null
            }, b
        }(a.UrlPart), a
    }(), b = "object" == typeof exports ? exports : this, b.UrlMatch = a
}.call(this), function () {
    var a, b;
    a = function () {
        function a(a) {
            this.setOptions(a)
        }

        return a.prototype.default_options = {
            directions_start: 0,
            directions: "right topRight top topLeft left bottomLeft bottom bottomRight".split(" ")
        }, a.prototype.setOptions = function (a) {
            var b, c, d;
            null == a && (a = {}), this.options = {}, d = this.default_options;
            for (b in d)c = d[b], this.options[b] = a[b] || this.default_options[b];
            return this.options
        }, a.prototype.fromRad = function (a) {
            return a * (180 / Math.PI)
        }, a.prototype.toRad = function (a) {
            return a * (Math.PI / 180)
        }, a.prototype.normalize = function (a) {
            var b;
            return null == a && (a = 0), b = isNaN(a) ? 0 : a, b %= 360, 0 > b && (b += 360), b
        }, a.prototype.toDirection = function (a) {
            var b;
            return a = this.normalize(a), a -= this.options.directions_start, a = this.normalize(a), b = Math.round(a / (360 / this.options.directions.length)), this.options.directions[b] || this.options.directions[0]
        }, a.prototype.fromDirection = function (a) {
            var b, c, d, e, f, g, h;
            for (e = -1, h = this.options.directions, d = f = 0, g = h.length; g > f; d = ++f)c = h[d], c === a && (e = d);
            return -1 === e ? null : (b = e * (360 / this.options.directions.length), b = this.options.directions_start + b)
        }, a
    }(), b = "object" == typeof exports ? exports : this, b.Angle = a
}.call(this), function () {
    var a, b, c;
    b = function (a, b) {
        return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle ? document.defaultView.getComputedStyle(a, null).getPropertyValue(b) : null
    }, a = function (a) {
        var c, d;
        return c = "none" !== b(a, "display"), d = "hidden" !== b(a, "visibility"), c && d
    }, c = function (b) {
        var c;
        if (!(null != (c = document.body) ? c.contains(b) : void 0))return !1;
        for (; null != b && b !== document.body;) {
            if (!a(b))return !1;
            b = b.parentNode
        }
        return !0
    }, c.all = function (a) {
        var b, c, d;
        for (c = 0, d = a.length; d > c; c++)if (b = a[c], !this(b))return !1;
        return !0
    }, c.any = function (a) {
        var b, c, d;
        for (c = 0, d = a.length; d > c; c++)if (b = a[c], this(b))return !0;
        return !1
    }, window.isVisible = c
}.call(this), function () {
    var a, b, c, d, e, f, g, h, i = {}.hasOwnProperty, j = function (a, b) {
        function c() {
            this.constructor = a
        }

        for (var d in b)i.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    };
    for (b = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
        for (null == a && (a = []), i = {}, g = ["left", "top", "view_left", "view_top"], f = ["right", "bottom", "view_right", "view_bottom"], b = [].concat(g, f), d = {}, j = 0, n = b.length; n > j; j++)for (e = b[j], d[e] = [], k = 0, o = a.length; o > k; k++)c = a[k], d[e].push(c[e]);
        for (l = 0, p = g.length; p > l; l++)h = g[l], i[h] = Math.min.apply(null, d[h]);
        for (m = 0, q = f.length; q > m; m++)h = f[m], i[h] = Math.max.apply(null, d[h]);
        return i.width = i.right - i.left, i.height = i.bottom - i.top, i
    }, c = function (a) {
        return null != a && "object" == typeof a && 1 === a.nodeType && "object" == typeof a.style && "object" == typeof a.ownerDocument
    }, h = ["isVisible", "Angle"], f = 0, g = h.length; g > f; f++)if (d = h[f], null == window[d])throw new Error("DomBox requires " + d + " library to operate.");
    a = {
        angle: new Angle, getBox: function (b) {
            return "string" == typeof b ? new this.CollectionBox(b) : c(b) ? new this.ElementBox(b) : b instanceof a.Box ? b : null
        }, getDistance: function (c, d) {
            var e, f;
            return c = a.getBox(c), d = a.getBox(d), e = b([c, d]), f = {
                horizontal: e.width - (c.width + d.width),
                vertical: e.height - (c.height + d.height)
            }, f.horizontal < 0 && (f.horizontal = 0), f.vertical < 0 && (f.vertical = 0), f
        }, detectOverlap: function (c, d) {
            var e, f;
            return c = a.getBox(c), d = a.getBox(d), e = b([c, d]), f = {
                horizontal: e.width - (c.width + d.width),
                vertical: e.height - (c.height + d.height)
            }, f.horizontal < 0 && f.vertical < 0
        }, getPivotDistance: function (b, c) {
            var d, e, f, g;
            return b = a.getBox(b), c = a.getBox(c), d = b.getPivot(), e = c.getPivot(), f = d.left - e.left, g = d.top - e.top, Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2))
        }, getPivotAngle: function (b, c) {
            var d, e, f, g;
            return b = a.getBox(b), c = a.getBox(c), f = b.getPivot(), g = c.getPivot(), e = Math.atan2(g.top - f.top, g.left - f.left), d = a.angle.fromRad(e), a.angle.normalize(d)
        }
    }, e = "object" == typeof exports ? exports : this, e.DomBox = a, a.Box = function () {
        function a() {
            var a, b, c, d;
            for (d = this._properties, b = 0, c = d.length; c > b; b++)a = d[b], this[a] = 0;
            this.padding = 0, this.update()
        }

        return a.prototype._properties = ["width", "height", "left", "top", "right", "bottom", "view_left", "view_top", "view_right", "view_bottom"], a.prototype.update = function () {
            return this.pad(this.padding)
        }, a.prototype.setPadding = function (a) {
            return this.padding = a, this.update()
        }, a.prototype.pad = function (a) {
            return null == a && (a = 0), this.width += 2 * a, this.height += 2 * a, this.left -= a, this.top -= a, this.right += a, this.bottom += a, this.view_left -= a, this.view_top -= a, this.view_right += a, this.view_bottom += a
        }, a.prototype.getPivot = function () {
            return {left: this.left + this.width / 2, top: this.top + this.height / 2}
        }, a.prototype.moveTo = function (a, b) {
            var c, d;
            return null == a && (a = this.left), null == b && (b = this.top), isNaN(a) || (c = this.left - a, this.left = a, this.right = this.left + this.width, this.view_left -= c, this.view_right -= c), isNaN(b) ? void 0 : (d = this.top - b, this.top = b, this.bottom = this.top + this.height, this.view_top -= d, this.view_bottom -= d)
        }, a.prototype.moveBy = function (a, b) {
            return null == a && (a = 0), null == b && (b = 0), isNaN(a) || (this.left = this.left + a, this.right = this.left + this.width, this.view_left = this.view_left + a, this.view_right = this.view_right + a), isNaN(b) ? void 0 : (this.top += b, this.bottom = this.top + this.height, this.view_top += b, this.view_bottom += b)
        }, a.prototype.resizeTo = function (a, b) {
            return null == a && (a = this.width), null == b && (b = this.height), isNaN(a) || (this.width = 0 > a ? 0 : a, this.right = this.left + this.width, this.view_right = this.view_left + this.width), isNaN(b) ? void 0 : (this.height = 0 > b ? 0 : b, this.bottom = this.top + this.height, this.view_bottom = this.view_top + this.height)
        }, a.prototype.setSize = function (a, b) {
            return this.resizeTo(a, b)
        }, a.prototype.resizeBy = function (a, b) {
            return null == a && (a = 0), null == b && (b = 0), isNaN(a) || (this.width = this.width + a, this.width < 0 && (this.width = 0), this.right = this.left + this.width, this.view_right = this.view_left + this.width), isNaN(b) ? void 0 : (this.height = this.height + b, this.height < 0 && (this.height = 0), this.bottom = this.top + this.height, this.view_bottom = this.view_top + this.height)
        }, a.prototype.setLeft = function (a) {
            var b;
            return b = a - this.left, this.left = a, this.width = this.right - this.left, this.view_left += b
        }, a.prototype.setRight = function (a) {
            var b;
            return b = a - this.right, this.right = a, this.width = this.right - this.left, this.view_right += b
        }, a.prototype.setTop = function (a) {
            var b;
            return b = a - this.top, this.top = a, this.height = this.bottom - this.top, this.view_top += b
        }, a.prototype.setBottom = function (a) {
            var b;
            return b = a - this.bottom, this.bottom = a, this.height = this.bottom - this.top, this.view_bottom += b
        }, a.prototype.toString = function () {
            var a, b, c, d, e;
            for (b = {}, e = this._properties, c = 0, d = e.length; d > c; c++)a = e[c], b[a] = this[a];
            return JSON.stringify(b)
        }, a
    }(), a.ElementBox = function (b) {
        function c(a) {
            this.element = a, c.__super__.constructor.call(this)
        }

        return j(c, b), c.prototype.update = function () {
            var a, b, d, e;
            return b = this.getDocumentPosition(this.element), a = this.element.getBoundingClientRect(), this.width = null != (d = a.width) ? d : this.element.offsetWidth, this.height = null != (e = a.height) ? e : this.element.offsetHeight, this.left = b.left, this.top = b.top, this.right = b.left + this.width, this.bottom = b.top + this.height, this.view_left = a.left, this.view_top = a.top, this.view_right = a.right, this.view_bottom = a.bottom, c.__super__.update.call(this)
        }, c.prototype.getDocumentPosition = function (b) {
            var c, d, e, f;
            for (d = {
                left: 0,
                top: 0
            }, e = null != b ? b.parentNode : void 0; null != e && e !== document.body;)d.left -= e.scrollLeft, d.top -= e.scrollTop, e = e.parentNode;
            for (c = b; null != c;)"fixed" === this.getCssProperty(c, "position") ? (f = a.Viewport.getPosition(), d.left += c.offsetLeft + f.left, d.top += c.offsetTop + f.top, c = null) : (d.left += c.offsetLeft, d.top += c.offsetTop, c = c.offsetParent);
            return d
        }, c.prototype.getCssProperty = function (a, b) {
            var c;
            return null != window.getComputedStyle ? (c = window.getComputedStyle(a, null), c.getPropertyValue(b)) : null != a.currentStyle ? (b = b.replace(/-(.)/g, function (a, b) {
                return b.toUpperCase()
            }), a.currentStyle[b]) : null
        }, c
    }(a.Box), a.CollectionBox = function (c) {
        function d(a) {
            this.selector = a, d.__super__.constructor.call(this)
        }

        return j(d, c), d.prototype.update = function () {
            var c, e, f, g, h, i, j, k;
            if (c = [], this.selector)for (j = document.querySelectorAll(this.selector), h = 0, i = j.length; i > h; h++)e = j[h], isVisible(e) && c.push(new a.ElementBox(e));
            0 === c.length && c.push(new a.Box), k = b(c);
            for (f in k)g = k[f], this[f] = g;
            return d.__super__.update.call(this)
        }, d
    }(a.Box), a.Document = {
        getWidth: function () {
            var a, b;
            return Math.max(null != (a = document.body) ? a.scrollWidth : void 0, null != (b = document.body) ? b.offsetWidth : void 0, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth, 0)
        }, getHeight: function () {
            return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, 0)
        }, getSize: function () {
            return {width: a.Document.getWidth(), height: a.Document.getHeight()}
        }
    }, a.Viewport = {
        getWidth: function () {
            return window.innerWidth || document.documentElement.clientWidth || 0
        }, getHeight: function () {
            return window.innerHeight || document.documentElement.clientHeight || 0
        }, getSize: function () {
            return {width: a.Viewport.getWidth(), height: a.Viewport.getHeight()}
        }, getLeft: function () {
            return (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0)
        }, getTop: function () {
            return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
        }, getPosition: function () {
            return {left: a.Viewport.getLeft(), top: a.Viewport.getTop()}
        }, getBox: function () {
            var b, c;
            return b = a.Viewport.getPosition(), c = a.Viewport.getSize(), {
                width: c.width,
                height: c.height,
                left: b.left,
                top: b.top,
                right: b.left + c.width,
                bottom: b.top + c.height
            }
        }, moveInside: function (b) {
            var c, d;
            return b = a.getBox(b), d = a.Viewport.getBox(), c = {
                left: null,
                top: null
            }, b.right > d.right && (c.left = d.right - b.width), b.bottom > d.bottom && (c.top = d.bottom - b.height), b.left < d.left && (c.left = d.left), b.top < d.top && (c.top = d.top), b.moveTo(c.left, c.top)
        }, contains: function (b) {
            var c;
            return b = a.getBox(b), null == b ? !1 : (c = this.getBox(), c.left <= b.left && c.top <= b.top && c.right >= b.right && c.bottom >= b.bottom)
        }, partialyContains: function (b) {
            var c, d, e, f, g, h, i;
            return b = a.getBox(b), null == b ? !1 : (i = this.getBox(), e = Math.max(b.left, i.left), f = Math.max(b.top, i.top), h = Math.min(b.right, i.right), g = Math.min(b.bottom, i.bottom), d = h - e, c = g - f, d > 0 && c > 0)
        }, canContain: function (b) {
            return b = a.getBox(b), null == b ? !1 : b.width <= this.getWidth() && b.height <= this.getHeight()
        }, canCoexist: function (c, d) {
            var e;
            return c = a.getBox(c), d = a.getBox(d), null == c || null == d ? !1 : (e = b([c, d]), e.width <= this.getWidth() && e.height <= this.getHeight())
        }, canFitAround: function (b, c) {
            var d, e;
            return b = a.getBox(b), c = a.getBox(c), null == b || null == c ? !1 : (e = a.Viewport.getBox(), c.width > e.width || c.height > e.height ? !1 : (d = a.Viewport.getGaps(b), c.width <= d.horizontal.before || c.width <= d.horizontal.after || c.height <= d.vertical.before || c.height <= d.vertical.after))
        }, fitAround: function (b, c) {
            var d;
            if (b = a.getBox(b), c = a.getBox(c), a.Viewport.canFitAround(b, c)) {
                if (d = a.Viewport.getGaps(b), a.Viewport.moveInside(c), !a.detectOverlap(b, c))return;
                if (c.width <= d.horizontal.before && c.moveTo(b.left - c.width, null), !a.detectOverlap(b, c))return;
                if (c.height <= d.vertical.before && c.moveTo(null, b.top - c.height), !a.detectOverlap(b, c))return;
                if (c.width <= d.horizontal.after && c.moveTo(b.right, null), !a.detectOverlap(b, c))return;
                if (c.height <= d.vertical.after)return c.moveTo(null, b.bottom)
            }
        }, getGaps: function (b) {
            var c;
            return b = a.getBox(b), c = a.Viewport.getBox(), {
                horizontal: {
                    before: Math.max(0, b.left - c.left),
                    after: Math.max(0, c.right - b.right)
                }, vertical: {before: Math.max(0, b.top - c.top), after: Math.max(0, c.bottom - b.bottom)}
            }
        }, toString: function () {
            return JSON.stringify(a.Viewport.getBox())
        }
    }
}.call(this), function () {
    var a, b;
    a = function () {
        function a(a) {
            null == a && (a = {}), this.checkDependencies(), this.angle_utils = new Angle, this.direction_class_name = null, this.state = !1, this.target = null, this.is_orphan = !0, this.window_handler = null, this.element_monitor = new ElementMonitor(null, {
                onChange: function (a) {
                    return function () {
                        return a.reposition()
                    }
                }(this)
            }), this.setOptions(this.default_options), this.setOptions(a)
        }

        return a.prototype.default_options = {
            class_name: null,
            pointer_width: 10,
            pointer_length: 50,
            z_index: 1e3,
            scroll_message: "Scroll into view",
            disable_smart_position: !1,
            disable_scroll_message: !1,
            extra_class_names: {},
            content: document.createTextNode(""),
            angle: 0,
            debug: !1
        }, a.prototype.base_class_name = "fczbkk-popover", a.prototype.evt = new EventBridge, a.prototype.supports_svg = function () {
            var a, b;
            return a = "http://www.w3.org/TR/SVG11/feature#Image", b = "1.1", document.implementation.hasFeature(a, b)
        }(), a.prototype.class_bridge = new ClassBridge, a.prototype.checkDependencies = function () {
            var a, b, c, d, e;
            for (d = "Angle DomBox ClassBridge EventBridge ElementMonitor".split(" "), e = [], b = 0, c = d.length; c > b; b++) {
                if (a = d[b], !window[a])throw new Error("Popover requires " + a + " library to operate");
                e.push(void 0)
            }
            return e
        }, a.prototype.setOptions = function (a) {
            var b, c, d, e;
            null == a && (a = {}), c = {content: "setContent", angle: "setAngle"}, e = [];
            for (b in a)d = a[b], e.push(this.default_options.hasOwnProperty(b) ? null != c[b] ? this[c[b]](d) : this[b] = d : void 0);
            return e
        }, a.prototype.setContent = function (a) {
            var b, c, d;
            return null == a && (a = ""), "string" == typeof a && (b = document.createElement("div"), b.innerHTML = a, a = b), this.content = null != (null != a ? a.nodeType : void 0) ? a : null, null != this.ui ? (null != (c = this.ui.content) && null != (d = c.parentNode) && d.removeChild(this.ui.content), this.ui.content = this.createPopoverContent()) : void 0
        }, a.prototype.setAngle = function (a) {
            return null == a && (a = 0), "string" == typeof a && (a = this.angle_utils.fromDirection(a)), this.angle = this.angle_utils.normalize(a)
        }, a.prototype.attach = function (a) {
            return this.element_monitor.setElement(a), this.target = DomBox.getBox(a)
        }, a.prototype.detach = function () {
            return this.element_monitor.stop(), this.attach(null)
        }, a.prototype.setPosition = function (a) {
            return null == a && (a = {
                left: 0,
                top: 0
            }), this.ui.wrapper.style.left = "" + a.left + "px", this.ui.wrapper.style.top = "" + a.top + "px"
        }, a.prototype.positionOrphan = function () {
            var a, b;
            return b = DomBox.getBox(this.ui.wrapper), a = DomBox.Viewport.getSize(), this.setPosition({
                left: (a.width - b.width) / 2,
                top: (a.height - b.height) / 2
            })
        }, a.prototype.positionRegular = function () {
            var a, b, c, d, e;
            return e = DomBox.getBox(this.ui.wrapper), c = DomBox.getBox(this.target), DomBox.Viewport.canFitAround(c, e) ? (d = c.getPivot(), b = this.getOptimalDistance(e, c), a = this.moveVector(d, b), a.left -= e.width / 2, a.top -= e.height / 2, e.moveTo(a.left, a.top), this.disable_smart_position || (DomBox.Viewport.moveInside(e), DomBox.Viewport.fitAround(c, e)), this.setPosition(e), this.drawPointer()) : this.positionOrphan()
        }, a.prototype.drawPointer = function () {
            var a, b, c, d, e, f, g, h, i, j, k;
            return e = DomBox.getBox(this.ui.wrapper), i = DomBox.getBox(this.target), k = DomBox.Viewport.getBox(), i.left < k.left && i.setLeft(k.left), i.right > k.right && i.setRight(k.right), i.top < k.top && i.setTop(k.top), i.bottom > k.bottom && i.setBottom(k.bottom), this.debug && (this.clearDebugPoints(), this.drawDebugPoint({
                left: i.left,
                top: i.top
            }, "#0c0"), this.drawDebugPoint({left: i.right, top: i.top}, "#0c0"), this.drawDebugPoint({
                left: i.right,
                top: i.bottom
            }, "#0cc0"), this.drawDebugPoint({
                left: i.left,
                top: i.bottom
            }, "#0c0"), this.drawDebugPoint(i.getPivot(), "yellow")), c = DomBox.getPivotAngle(e, i), this.setDirectionClass(this.angle_utils.toDirection(c)), this.supports_svg ? (a = DomBox.getPivotDistance(i, e), f = this.getHypotenuse(e, c), j = this.getHypotenuse(i, c), d = a - f - j, d < this.pointer_width && (d = this.pointer_width), g = e.getPivot(), h = this.moveVector(g, f, c), b = this.moveVector(g, a - j, c), this.addPointerShape(h, b, e)) : void 0
        }, a.prototype.getHypotenuse = function (a, b) {
            var c, d, e, f, g;
            return null == b && (b = this.angle), f = this.angle_utils.toRad(b), e = a.height / 2, c = a.width / 2, g = Math.abs(e / Math.sin(f)), d = Math.abs(c / Math.cos(f)), Math.min(g, d)
        }, a.prototype.getOptimalDistance = function (a, b, c, d) {
            var e, f;
            return null == c && (c = this.angle), null == d && (d = this.pointer_length), a = DomBox.getBox(a), b = DomBox.getBox(b), e = {
                width: a.width + b.width,
                height: a.height + b.height
            }, f = this.getHypotenuse(e, c), f + d
        }, a.prototype.moveVector = function (a, b, c) {
            return null == a && (a = {
                left: 0,
                top: 0
            }), null == b && (b = 0), null == c && (c = this.angle), c = this.angle_utils.toRad(c), {
                left: a.left + Math.cos(c) * b,
                top: a.top + Math.sin(c) * b
            }
        }, a.prototype.setDirectionClass = function (a) {
            return null == a && (a = null), null != this.direction_class_name && (this.class_bridge.remove(this.ui.base, "" + this.base_class_name + "-" + this.direction_class_name), this.class_bridge.remove(this.ui.base, "" + this.class_name + "-" + this.direction_class_name)), this.direction_class_name = a, null != this.direction_class_name ? (this.class_bridge.add(this.ui.base, "" + this.base_class_name + "-" + this.direction_class_name), this.class_bridge.add(this.ui.base, "" + this.class_name + "-" + this.direction_class_name)) : void 0
        }, a.prototype.setOrphanClass = function () {
            if (null != this.ui.base) {
                if (!this.is_orphan)return this.class_bridge.remove(this.ui.base, "" + this.base_class_name + "-orphan"), this.class_bridge.remove(this.ui.base, "" + this.class_name + "-orphan");
                if (this.class_bridge.add(this.ui.base, "" + this.base_class_name + "-orphan"), null != this.class_name)return this.class_bridge.add(this.ui.base, "" + this.class_name + "-orphan")
            }
        }, a.prototype.show = function () {
            return this.hide(), this.createUi(), this.ui.wrapper.appendChild(this.ui.content), this.ui.wrapper.appendChild(this.ui.scroll_message), this.supports_svg && document.body.appendChild(this.ui.pointer_holder), this.ui.wrapper.appendChild(this.ui.static_pointer), this.ui.base.appendChild(this.ui.wrapper), document.body.appendChild(this.ui.base), this.reposition(), this.element_monitor.start(), this.state = !0
        }, a.prototype.hide = function () {
            var a, b, c, d, e, f;
            return null != (a = this.ui) && null != (b = a.base) && null != (c = b.parentNode) && c.removeChild(this.ui.base), null != (d = this.ui) && null != (e = d.pointer_holder) && null != (f = e.parentNode) && f.removeChild(this.ui.pointer_holder), this.cancelEventListeners(), this.element_monitor.stop(), this.state = !1
        }, a.prototype.toggle = function () {
            return this.state ? this.hide() : this.show()
        }, a.prototype.destroy = function () {
            return this.hide()
        }, a.prototype.createUi = function () {
            return this.ui = {
                base: this.createBaseElement(),
                wrapper: this.createPopoverWrapper(),
                content: this.createPopoverContent(),
                scroll_message: this.createScrollMessage(),
                pointer_holder: this.supports_svg ? this.createPointerHolder() : null,
                pointer: null,
                static_pointer: this.createStaticPointer()
            }
        }, a.prototype.createElement = function (a) {
            var b, c, d, e, f, g;
            for (b = document.createElement("div"), e = a ? "-" + a : "", this.class_bridge.add(b, "" + this.base_class_name + e), this.class_name && this.class_bridge.add(b, "" + this.class_name + e), c = this.extra_class_names[a] || [], f = 0, g = c.length; g > f; f++)d = c[f], this.class_bridge.add(b, d);
            return b
        }, a.prototype.createBaseElement = function () {
            var a;
            return a = this.createElement(), this.supports_svg && (null != this.class_name && this.class_bridge.add(a, "" + this.class_name + "-supports_svg"),
                this.class_bridge.add(a, "" + this.base_class_name + "-supports_svg")), a.style.zIndex = this.z_index + 2, a
        }, a.prototype.createPopoverWrapper = function () {
            return this.createElement("wrapper")
        }, a.prototype.createPopoverContent = function () {
            var a;
            return a = this.createElement("content"), a.appendChild(this.content), a
        }, a.prototype.createScrollMessage = function () {
            var a;
            return a = this.createElement("scroll_message"), a.appendChild(document.createTextNode(this.scroll_message)), this.evt.add(a, "click", function (a) {
                return function () {
                    return a.scrollIntoView()
                }
            }(this)), a
        }, a.prototype.createPointerHolder = function () {
            var a, b;
            return b = document.createElementNS("http://www.w3.org/2000/svg", "svg"), b.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), a = ["" + this.base_class_name + "-pointer-holder"], this.class_name && a.push("" + this.class_name + "-pointer-holder"), b.setAttribute("class", a.join(" ")), b.style.zIndex = this.z_index + 1, b
        }, a.prototype.createStaticPointer = function () {
            return this.createElement("static_pointer")
        }, a.prototype.scrollIntoView = function () {
            var a;
            return null != this.target ? (this.target.update(), a = document.body.appendChild(document.createElement("div")), a.style.position = "absolute", a.style.left = "" + this.target.left + "px", a.style.top = "" + this.target.top + "px", a.style.width = "" + this.target.width + "px", a.style.height = "" + this.target.height + "px", a.scrollIntoView(), a.parentNode.removeChild(a)) : void 0
        }, a.prototype.updateOrphanState = function () {
            return null != this.target ? (this.target.update(), this.is_orphan = 0 === this.target.width && 0 === this.target.height) : this.is_orphan = !0, this.is_orphan
        }, a.prototype.addPointerShape = function (a, b, c) {
            var d, e, f, g, h, i, j, k, l;
            for (this.removePointerShape(), f = "http://www.w3.org/2000/svg", j = document.createElementNS(f, "polygon"), d = {
                left: a.left,
                top: a.top,
                radius: this.pointer_width
            }, h = this.getIntersectionPoints(c, d), h.push(b), k = 0, l = h.length; l > k; k++)g = h[k], this.drawDebugPoint(g, "#0000cc");
            return i = function () {
                var a, b, c;
                for (c = [], a = 0, b = h.length; b > a; a++)g = h[a], c.push("" + g.left + "," + g.top);
                return c
            }().join(" "), j.setAttribute("points", i), e = ["" + this.base_class_name + "-pointer-shape"], null != this.class_name && e.push("" + this.class_name + "-pointer-shape"), j.setAttribute("class", e.join(" ")), this.ui.pointer = this.ui.pointer_holder.appendChild(j)
        }, a.prototype.removePointerShape = function () {
            var a;
            return null != (a = this.ui.pointer) && a.parentNode.removeChild(this.ui.pointer), this.ui.pointer = null
        }, a.prototype.updateScrollMessage = function () {
            return this.target.update(), DomBox.Viewport.partialyContains(this.target) ? this.hideScrollMessage() : this.showScrollMessage()
        }, a.prototype.hideScrollMessage = function () {
            return this.ui.scroll_message.style.display = "none"
        }, a.prototype.showScrollMessage = function () {
            return this.ui.scroll_message.style.display = "block"
        }, a.prototype.cancelEventListeners = function () {
            return null != this.window_handler ? (this.evt.remove(window, "resize", this.window_handler), this.evt.remove(window, "scroll", this.window_handler), this.window_handler = null) : void 0
        }, a.prototype.reposition = function () {
            return this.updateOrphanState(), this.setOrphanClass(), this.hideScrollMessage(), this.cancelEventListeners(), this.is_orphan ? (this.removePointerShape(), this.positionOrphan(), this.window_handler = function (a) {
                return function () {
                    return a.positionOrphan()
                }
            }(this), this.evt.add(window, "resize", this.window_handler)) : (this.positionRegular(), this.disable_scroll_message || this.updateScrollMessage(), this.disable_smart_position && this.disable_scroll_message ? void 0 : (this.window_handler = function (a) {
                return function () {
                    return a.disable_smart_position || a.positionRegular(), a.disable_scroll_message ? void 0 : a.updateScrollMessage()
                }
            }(this), this.evt.add(window, "resize", this.window_handler), this.evt.add(window, "scroll", this.window_handler)))
        }, a.prototype.getChordPoints = function (a, b, c) {
            var d, e, f, g;
            return f = [], d = c ? b - a.left : b - a.top, d = Math.abs(d), d === a.radius && (e = c ? {
                left: b,
                top: a.top
            } : {
                left: a.left,
                top: b
            }, f.push(e)), d < a.radius && (g = Math.sqrt(Math.pow(a.radius, 2) - Math.pow(d, 2)), c ? (f.push({
                left: b,
                top: a.top + g
            }), f.push({left: b, top: a.top - g})) : (f.push({left: a.left + g, top: b}), f.push({
                left: a.left - g,
                top: b
            }))), f
        }, a.prototype.getIntersectionPoints = function (a, b) {
            var c;
            return c = [], c = c.concat(this.getChordPoints(b, a.left, !0)), c = c.concat(this.getChordPoints(b, a.right, !0)), c = c.concat(this.getChordPoints(b, a.top, !1)), c = c.concat(this.getChordPoints(b, a.bottom, !1)), c = c.filter(function (b) {
                var c, d;
                return a.left <= (c = b.left) && c <= a.right && a.top <= (d = b.top) && d <= a.bottom
            })
        }, a.prototype.drawDebugPoint = function (a, b) {
            var c, d;
            return this.debug ? (c = "http://www.w3.org/2000/svg", d = document.createElementNS(c, "circle"), d.setAttribute("cx", a.left), d.setAttribute("cy", a.top), d.setAttribute("r", 5), d.setAttribute("fill", b), d.setAttribute("class", "debugPoint"), this.ui.pointer_holder.appendChild(d)) : null
        }, a.prototype.clearDebugPoints = function () {
            var a, b, c, d, e;
            if (!this.debug)return null;
            for (b = this.ui.pointer_holder.querySelectorAll(".debugPoint"), e = [], c = 0, d = b.length; d > c; c++)a = b[c], e.push(a.parentNode.removeChild(a));
            return e
        }, a
    }(), b = "object" == typeof exports ? exports : this, b.Popover = a
}.call(this), function () {
    var a, b;
    a = {
        validate: function (a) {
            var b;
            return b = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/, b.test(a)
        }, generate: function () {
            var a, b, c, d, e, f, g, h;
            for (c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", d = {x: "0123456789abcdef", y: "89ab"}, b = function (a) {
                var b;
                return b = Math.floor(Math.random() * a.length), a.charAt(b)
            }, e = "", h = c.split(""), f = 0, g = h.length; g > f; f++)a = h[f], e += null != d[a] ? b(d[a]) : a;
            return e
        }
    }, b = "object" == typeof exports ? exports : this, b.UUID4 = a
}.call(this), function () {
    var a, b, c = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return -1
        };
    a = function () {
        function a() {
            this.items = []
        }

        return a.prototype.add = function (a) {
            var b, d, e, f, g, h;
            if (this.isArray(a)) {
                for (h = [], f = 0, g = a.length; g > f; f++)e = a[f], h.push(this.add(e));
                return h
            }
            return b = c.call(this.items, a) < 0, d = this.getType(a), b && d ? this.items.push(a) : void 0
        }, a.prototype.remove = function (a) {
            var b, c, d, e, f, g, h, i, j;
            if (this.isArray(a)) {
                for (i = [], d = 0, f = a.length; f > d; d++)c = a[d], i.push(this.remove(c));
                return i
            }
            for (h = this.items, j = [], b = e = 0, g = h.length; g > e; b = ++e)c = h[b], j.push(c === a ? this.items.splice(b, 1) : void 0);
            return j
        }, a.prototype.reset = function () {
            return this.items = []
        }, a.prototype.get = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
            if (null == a && (a = document.body), o = [], b = [], null != (null != a ? a.contains : void 0))for (n = this.items, h = 0, k = n.length; k > h; h++)f = n[h], c = function () {
                switch (this.getType(f)) {
                    case"node":
                        return "getByNode";
                    case"collection":
                        return "getByCollection";
                    case"selector":
                        return "getBySelector";
                    case"function":
                        return "getByFunction";
                    default:
                        return null
                }
            }.call(this), null != c && (g = this[c](a, f), b = b.concat(g));
            for (i = 0, l = b.length; l > i; i++)f = b[i], d = a.contains(f), e = !f.getAttribute("data-element-collector"), e && d && o.push(f), f.setAttribute("data-element-collector", "1");
            for (j = 0, m = b.length; m > j; j++)f = b[j], f.removeAttribute("data-element-collector");
            return o
        }, a.prototype.getByNode = function (a, b) {
            return [b]
        }, a.prototype.getByCollection = function (a, b) {
            var c, d;
            return d = function () {
                var a, d, e;
                for (e = [], a = 0, d = b.length; d > a; a++)c = b[a], e.push(c);
                return e
            }()
        }, a.prototype.getBySelector = function (a, b) {
            var c;
            return c = a.querySelectorAll(b), this.getByCollection(a, c)
        }, a.prototype.getByFunction = function (a, b) {
            var c, d, e, f, g;
            for (g = [], c = b(a), this.isEnumerable(c) || (c = [c]), e = 0, f = c.length; f > e; e++)d = c[e], this.isNode(d) && g.push(d);
            return g
        }, a.prototype.isNode = function (a) {
            return 1 === (null != a ? a.nodeType : void 0)
        }, a.prototype.isArray = function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }, a.prototype.isCollection = function (a) {
            return "[object NodeList]" === Object.prototype.toString.call(a)
        }, a.prototype.isEnumerable = function (a) {
            return this.isArray(a) || this.isCollection(a)
        }, a.prototype.isSelector = function (a) {
            var b;
            if (null == a)return !1;
            try {
                document.querySelector(a)
            } catch (c) {
                return b = c, !1
            }
            return !0
        }, a.prototype.isFunction = function (a) {
            return "function" == typeof a
        }, a.prototype.getType = function (a) {
            return this.isNode(a) ? "node" : this.isCollection(a) ? "collection" : this.isArray(a) ? "array" : this.isSelector(a) ? "selector" : this.isFunction(a) ? "function" : null
        }, a
    }(), b = "object" == typeof exports ? exports : this, b.ElementCollector = a
}.call(this), function () {
    var a, b, c;
    b = 0, a = function () {
        function a(a, b) {
            null == b && (b = {}), this.checkDependencies(), this.elements = new ElementCollector, this.options = {}, this.setOptions(this.default_options), this.setOptions(b), this.setElement(a), this.updateMemory()
        }

        return a.prototype.default_options = {
            interval: 100,
            onResize: !1,
            onMove: !1,
            onVisibilityChange: !1,
            onShow: !1,
            onHide: !1,
            onExistenceChange: !1,
            onAppear: !1,
            onVanish: !1,
            onChange: !1
        }, a.prototype.checkDependencies = function () {
            var a, b, c, d, e;
            for (d = ["isVisible", "ElementCollector", "DomBox"], e = [], b = 0, c = d.length; c > b; b++) {
                if (a = d[b], null == window[a])throw new Error("ElementMonitor requires " + a + " library to operate.");
                e.push(void 0)
            }
            return e
        }, a.prototype.setOptions = function (a) {
            var b, c, d;
            null == a && (a = {}), d = [];
            for (b in a)c = a[b], d.push(null != this.default_options[b] ? this.options[b] = c : void 0);
            return d
        }, a.prototype.getElements = function () {
            return this.elements.get()
        }, a.prototype.addElement = function (a) {
            return this.elements.add(a)
        }, a.prototype.setElement = function (a) {
            return this.elements.reset(), this.elements.add(a)
        }, a.prototype.tick = function () {
            var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
            f = this.getState(), e = {
                size: !1,
                position: !1,
                show: !1,
                hide: !1,
                appear: !1,
                vanish: !1
            }, h = {}, z = this.memory;
            for (j in z)m = z[j], h[j] = !0;
            for (j in f)m = f[j], h[j] = !0;
            for (b = function () {
                var a;
                a = [];
                for (j in h)m = h[j], a.push(j);
                return a
            }(), x = 0, y = b.length; y > x; x++)g = b[x], d = this.memory[g], a = f[g], n = (null != d && null != (A = d.size) ? A.width : void 0) !== (null != a && null != (B = a.size) ? B.width : void 0), i = (null != d && null != (C = d.size) ? C.height : void 0) !== (null != a && null != (D = a.size) ? D.height : void 0), (n || i) && (e.size = !0), k = (null != d && null != (E = d.position) ? E.left : void 0) !== (null != a && null != (F = a.position) ? F.left : void 0), l = (null != d && null != (G = d.position) ? G.top : void 0) !== (null != a && null != (H = a.position) ? H.top : void 0), (k || l) && (e.position = !0), (null != d ? d.visibility : void 0) === !1 && (null != a ? a.visibility : void 0) === !0 && (e.show = !0), (null != d ? d.visibility : void 0) === !0 && (null != a ? a.visibility : void 0) === !1 && (e.hide = !0), null != d && null == a && (e.vanish = !0), null == d && null != a && (e.appear = !0);
            c = !1;
            for (j in e)m = e[j], m && (c = !0);
            return c && "function" == typeof(o = this.options).onChange && o.onChange(), e.size && "function" == typeof(p = this.options).onResize && p.onResize(), e.position && "function" == typeof(q = this.options).onMove && q.onMove(), (e.show || e.hide) && "function" == typeof(r = this.options).onVisibilityChange && r.onVisibilityChange(), e.show && "function" == typeof(s = this.options).onShow && s.onShow(), e.hide && "function" == typeof(t = this.options).onHide && t.onHide(), (e.appear || e.vanish) && "function" == typeof(u = this.options).onExistenceChange && u.onExistenceChange(), e.appear && "function" == typeof(v = this.options).onAppear && v.onAppear(), e.vanish && "function" == typeof(w = this.options).onVanish && w.onVanish(), this.updateMemory(f)
        }, a.prototype.start = function () {
            return this.stop(), this.ticker = setInterval(function (a) {
                return function () {
                    return a.tick()
                }
            }(this), this.options.interval)
        }, a.prototype.stop = function () {
            return null != this.ticker && clearInterval(this.ticker), this.ticker = null
        }, a.prototype.destroy = function () {
            return this.stop()
        }, a.prototype.getExistence = function (a) {
            return document.body.contains(a)
        }, a.prototype.getPosition = function (a) {
            var b;
            return b = DomBox.getBox(a), {left: b.left, top: b.top}
        }, a.prototype.getVisibility = function (a) {
            return isVisible(a)
        }, a.prototype.getSize = function (a) {
            var b;
            return b = DomBox.getBox(a), {width: b.width, height: b.height}
        }, a.prototype.isElement = function (a) {
            return null != a && "object" == typeof a && 1 === a.nodeType
        }, a.prototype.getState = function () {
            var a, c, d, e, f, g;
            for (d = {}, g = this.getElements(), e = 0, f = g.length; f > e; e++)a = g[e], a.getAttribute("data-element-monitor-id") || a.setAttribute("data-element-monitor-id", b++), c = a.getAttribute("data-element-monitor-id"), d[c] = this.getElementState(a);
            return d
        }, a.prototype.getElementState = function (a) {
            var b;
            return b = {}, (this.options.onChange || this.options.onMove) && (b.position = this.getPosition(a)), (this.options.onChange || this.options.onResize) && (b.size = this.getSize(a)), (this.options.onChange || this.options.onVisibilityChange || this.options.onShow || this.options.onHide) && (b.visibility = this.getVisibility(a)), b
        }, a.prototype.updateMemory = function (a) {
            return null == a && (a = this.getState()), this.memory = a
        }, a
    }(), c = "object" == typeof exports ? exports : this, c.ElementMonitor = a
}.call(this), function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }, S = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
            return -1
        }, T = [].slice, U = function (a, b) {
        function c() {
            this.constructor = a
        }

        for (var d in b)V.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    }, V = {}.hasOwnProperty;
    c = function () {
        function b(b) {
            null == b && (b = {}), this.handleCustomToggleClick = R(this.handleCustomToggleClick, this), this.debug("constructing new `InlineManualPlayer` with options", b), this.checkDependencies(), this.metadata = {}, this.rules = {}, this.is_suspended = !1, this.templates = N, this.initState(), this.currentStepStorage = new i("InmPlayerCurrent"), this.continuationStorage = new a("InmPlayerContinuation"), this.popover.angle_utils.setOptions({directions: "right rightBottom bottomRight bottom bottomLeft leftBottom left leftTop topLeft top topRight rightTop".split(" ")}), null == b.tracking && (b.tracking = {}), b.tracking.api_key = b.api_key, b.tracking.version = this.version, this.tracking = new h(b.tracking), this.tracking.track({event: "player_init"}), this.deactivateByUrlParams(document.location), this.options = {}, this.setOptions(D(this.default_options, b)), this.initUi(), this.tick(), this.activateByUrlParams(document.location), null != window.onpopstate ? this.evt.add(window, "popstate", function (a) {
                return function (b) {
                    return a.reinit()
                }
            }(this)) : this.evt.add(window, "hashchange", function (a) {
                return function () {
                    return a.reinit()
                }
            }(this)), this.evt.add(window, "storage", function (a) {
                return function (b) {
                    return a.handleStorageChange(b)
                }
            }(this)), this.executeCallback("onInit", this)
        }

        return b.prototype.default_options = {
            max_continuation_attempts: 3,
            variables: {},
            base_path: document.location.origin,
            position: "bottom_right",
            z_index: 1e3,
            style: "",
            tracking: {},
            api_key: null,
            context_topics_only: !1,
            language: "en",
            hide_branding: !1,
            hide_trigger: !1,
            custom_trigger: null,
            splash_mode: !1,
            backdrop_color: null,
            backdrop_opacity: null,
            backdrop_padding: null,
            launcher: null,
            launchers: [],
            launcher_options: {},
            popover_disable_smart_position: !1,
            filter_topics_by_language: !1,
            rules: {},
            metadata: {},
            topic_options: {},
            step_options: {}
        }, b.prototype.default_l10n = {
            title: "Inline Manual",
            back: "&larr; Back to topics",
            branding: "Powered by",
            branding_link: "http://inlinemanual.com/",
            previous: "&larr; Previous",
            next: "Next &rarr;",
            end: "End",
            footer: "",
            empty_topics_list: "No Help topics available for this page.",
            lang_direction: "ltr"
        }, b.prototype.default_callbacks = {
            onInit: function (a) {
            }, onDestroy: function (a) {
            }, onTopicStart: function (a, b) {
            }, onTopicPrevious: function (a, b, c) {
            }, onTopicNext: function (a, b, c) {
            }, onTopicEnd: function (a, b) {
            }, onStepActivate: function (a, b, c) {
            }, onStepShow: function (a, b, c) {
            }
        }, b.prototype.launcher_options = {
            offset_vertical: 10,
            offset_horizontal: -10,
            class_name: "inmplayer-launcher",
            content: "?",
            context_paths: null
        }, b.prototype.layer_stack = ["launcher", "backdrop", "popover", "splash", "panel"], b.prototype.classname_namespace = "inmplayer", b.prototype.default_template = '<div class="%classname%">%content%</div>', b.prototype.topics = {}, b.prototype.debug_enabled = !1, b.prototype.reinit_observer_enabled = !1, b.prototype.backdrop = null, b.prototype.panel_backdrop = null, b.prototype.valid_positions = ["right", "right_bottom", "bottom_right", "bottom", "bottom_left", "left_bottom", "left", "left_top", "top_left", "top", "top_right", "right_top"], b.prototype.popover = new Popover({
            class_name: "inmplayer-popover",
            pointer_length: 20
        }), b.prototype.current_topic = null, b.prototype.current_step = null, b.prototype.launchers = [], b.prototype.class_bridge = new ClassBridge, b.prototype.evt = new EventBridge, b.prototype.checkDependencies = function () {
            var a, b, c, d, e;
            for (a = ["Backdrop", "UrlMatch", "Popover", "ClassBridge", "EventBridge", "UUID4", "isVisible", "ElementMonitor"], d = [], b = 0, c = a.length; c > b; b++) {
                if (e = a[b], null == window[e])throw new Error("InlineManualPlayer requires " + e + " library to operate.");
                d.push(void 0)
            }
            return d
        }, b.prototype.setL10n = function (a) {
            var b, c, d;
            null == a && (a = {}), this.l10n = {}, null != a.rtl && null == a.lang_direction && (a.lang_direction = a.rtl ? "rtl" : "ltr"), c = this.default_l10n;
            for (b in c)d = c[b], this.l10n[b] = a[b] || d;
            return this.setState("l10n", JSON.stringify(this.l10n)), this.tick()
        }, b.prototype.setCallbacks = function (a) {
            var b, c, d, e;
            null == a && (a = {}), this.callbacks = {}, c = this.default_callbacks, d = [];
            for (b in c)e = c[b], d.push(this.callbacks[b] = a[b] || e);
            return d
        }, b.prototype.setOptions = function (a) {
            var b, c, d, e, f;
            null == a && (a = {}), this.setRules(a.rules), delete this.options.rules, this.setMetadata(D(null != (c = a.tracking) ? c.metadata : void 0, a.metadata)), delete this.options.metadata, null != a.basePath && (a.base_path = a.basePath, delete a.basePath);
            for (b in a)f = a[b], this.options[b] = f;
            return d = this.options.position, S.call(this.valid_positions, d) < 0 && (this.options.position = this.default_options.position), this.setState("position", this.options.position), this.setTopics(a.topics), delete this.options.topics, this.setCallbacks(a.callbacks), delete this.options.callbacks, this.setL10n(a.l10n), delete this.options.l10n, null != a.style && this.setState("custom_style", a.style), null != a.custom_trigger && (this.setCustomTrigger(a.custom_trigger), delete this.options.custom_trigger), null != a.hide_branding && this.setState("hide_branding", a.hide_branding), this.sanitizeStandaloneLaunchers(a.launchers), this.tick(), this.attemptContinuation(), this.is_suspended && this.current_topic && (e = this.getStepActivatedByUrlTrigger(this.current_topic), null != e && this.activateStep(this.current_topic, e)), null == this.current_topic || null == this.current_step ? this.attemptAutolaunch() : void 0
        }, b.prototype.updateTopicLaunchers = function (a) {
            var b, c, d, e;
            return d = this.topics[a], (e = null != (b = d.launcher) ? b.visibility : void 0) && (c = !1, "always" === e && (c = !0), "inactive" === e && this.current_topic !== a && (c = !0), c) ? d.launcher_object.add() : void 0
        }, b.prototype.updateStepLaunchers = function (a, b) {
            var c, d, e, f;
            return e = this.topics[a].steps[b], (f = null != (c = e.launcher) ? c.visibility : void 0) && (d = !1, "always" === f && (d = !0), "active" === f && this.current_topic === a && (d = !0), "inactive" === f && this.current_topic !== a && (d = !0), d) ? e.launcher_object.add() : void 0
        }, b.prototype.updateLaunchers = function () {
            var a, b, c, d, e, f, g, h, i, j, k, l, m;
            this.removeLaunchers(), f = this.getValidTopics();
            for (m in f)if (l = f[m], this.updateTopicLaunchers(m), null != l.steps)for (g = l.steps, k = a = 0, d = g.length; d > a; k = ++a)j = g[k], this.updateStepLaunchers(m, k);
            for (h = this.launchers, i = [], b = 0, e = h.length; e > b; b++)c = h[b], i.push(c.add());
            return i
        }, b.prototype.removeLaunchers = function () {
            var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
            f = this.topics;
            for (n in f)if (m = f[n], null != (g = m.launcher_object) && g.remove(), null != m.steps)for (h = m.steps, a = 0, d = h.length; d > a; a++)l = h[a], null != (i = l.launcher_object) && i.remove();
            for (j = this.launchers, k = [], b = 0, e = j.length; e > b; b++)c = j[b], k.push(c.remove());
            return k
        }, b.prototype.sanitizeStandaloneLaunchers = function (a) {
            var b, c, d, e, f, g, h;
            for (null == a && (a = []), this.launchers = [], b = function (a) {
                return function (b, c) {
                    var e, f;
                    return e = function () {
                    }, null != b && (e = function () {
                        return a.activateTopic(b)
                    }), null != b && null != c && (e = function () {
                        return a.activateStep(b, c)
                    }), d.on_activate && (e = a.sanitizeCallback(d.on_activate)), d.on_activate = e, f = new a.Launcher(d), a.launchers.push(f)
                }
            }(this), c = 0, f = a.length; f > c; c++)e = a[c], e = D(this.options.launcher_options, e), d = this.sanitizeLauncherOptions(e), h = d.topic, g = d.step, b(h, g);
            return this.setState("standalone_launchers", this.state.standalone_launchers++), this.launchers
        }, b.prototype.loadOptions = function (a, b) {
            return null == b && (b = function () {
            }), o(a, null, function (a) {
                return function (c) {
                    var d;
                    return d = JSON.parse(c), a.setOptions(d), b(a)
                }
            }(this))
        }, b.prototype.sanitizeStep = function (a, b, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o;
            for (null == a && (a = {}), null == d && (d = {}), n = D(this.options.step_options, (null != (l = this.topics[b]) ? l.step_options : void 0) || {}, a), f = this.options.base_path, o = this.options.variables, null != n.path && (n.path = G(n.path, f, o)), null != n.element ? Q(n.element) || (this.debug("WARNING:", "Invalid CSS selector `" + n.element + "` is used for step element.", "Fix it or use `null` instead.", n), n.element = null) : n.element = null, null == n.position && (n.position = n.placement), n.position = function () {
                switch (n.position) {
                    case"right_top":
                        return "rightTop";
                    case"top_right":
                        return "topRight";
                    case"top_left":
                        return "topLeft";
                    case"left_top":
                        return "leftTop";
                    case"left_bottom":
                        return "leftBottom";
                    case"bottom_left":
                        return "bottomLeft";
                    case"bottom_right":
                        return "bottomRight";
                    case"right_bottom":
                        return "rightBottom";
                    default:
                        return n.position
                }
            }(), n.url_trigger = this.sanitizeUrlTrigger(n.url_trigger), null == n.width && (n.width = 300), null != n.launcher && (i = this.launcher_options.class_name + "-" + b + "-" + c, j = D(this.options.launcher_options, d.launcher_options || {}, n.launcher), n.launcher = this.sanitizeLauncherOptions(j), null == (e = n.launcher).element && (e.element = n.element), n.launcher.class_name += " " + i, n.launcher.on_activate = function (a) {
                return function (d, e) {
                    var f;
                    return a.tracking.track({event: "launcher_activate", topic: b, step: c}), f = function () {
                        switch (d.options.point_at) {
                            case"step":
                                return n.element;
                            case"launcher":
                                return d.options.element;
                            case"self":
                                return "." + i;
                            default:
                                return "." + i
                        }
                    }(), a.activateStep(b, c, null, f)
                }
            }(this), n.launcher.on_add = function (a) {
                return function (d, e) {
                    return a.setZIndex(e, "launcher", b, c)
                }
            }(this), n.launcher_object = new this.Launcher(n.launcher)), m = ["on_activate", "on_deactivate", "on_show"], h = 0, k = m.length; k > h; h++)g = m[h], n[g] = this.sanitizeCallback(n[g]);
            return n
        }, b.prototype.sanitizeSteps = function (a, b, c) {
            var d, e, f, g, h;
            for (null == a && (a = []), f = [], h = d = 0, e = a.length; e > d; h = ++d)g = a[h], f.push(this.sanitizeStep(g, b, h, c));
            return f
        }, b.prototype.sanitizeContextPaths = function (a) {
            var b, c, d, e, f, g;
            for (null == a && (a = []), b = this.options.base_path, g = this.options.variables, f = [], c = 0, d = a.length; d > c; c++)e = a[c], f.push(G(e, b, g));
            return f
        }, b.prototype.sanitizeLauncherOptions = function (a) {
            var b, c, d, e, f;
            null == a && (a = {}), e = a, c = this.launcher_options;
            for (b in c)f = c[b], null == e[b] && (e[b] = f);
            return 0 === (null != (d = e.context_paths) ? d.length : void 0) && (this.debug("WARNING:", "Context paths in launcher config contain an empty array.", "Use `null` instead.", a), e.context_paths = null), null != e.context_paths && (e.context_paths = this.sanitizeContextPaths(e.context_paths), L(e.context_paths) || (e.visibility = "never")), e
        }, b.prototype.sanitizeTopic = function (a, b) {
            var c, d, e, f;
            return null == a && (a = {}), e = D(this.options.topic_options, a), f = ["default", "redirect"], d = e.type, S.call(f, d) < 0 && (e.type = f[0]), "redirect" === e.type && null == e.url && this.debug("WARNING:", 'Topic is of type "redirect", but no "url" is defined.', b), e.context_paths = this.sanitizeContextPaths(e.context_paths), null == e.language && (e.language = "en"), e.language_agnostic = !!e.language_agnostic, null != e.launcher && (c = D(this.options.launcher_options, e.launcher_options || {}, e.launcher), e.launcher = this.sanitizeLauncherOptions(c), e.launcher.on_activate = function (a) {
                return function () {
                    return a.tracking.track({event: "launcher_activate", topic: b}), a.activateTopic(b)
                }
            }(this), e.launcher.on_add = function (a) {
                return function (c, d) {
                    return a.setZIndex(d, "launcher", b)
                }
            }(this), e.launcher_object = new this.Launcher(e.launcher)), e.steps = this.sanitizeSteps(e.steps, b, e), e
        }, b.prototype.sanitizeTopics = function (a) {
            var b, c;
            null == a && (a = {});
            for (c in a)b = a[c], a[c] = this.sanitizeTopic(b, c);
            return a
        }, b.prototype.setTopics = function (a) {
            return null == a && (a = {}), this.topics = this.sanitizeTopics(a), this.deactivate(!0), this.setTopicTriggerElements(), this.setState("topics", this.state.topics++), this.tick()
        }, b.prototype.setTopicTriggerElements = function (a) {
            var b, c, d, e;
            null == a && (a = this.topics), c = [];
            for (d in a)e = a[d], null != e.trigger_element ? (b = new ElementCollector, b.add(e.trigger_element), c.push(function (a) {
                return function (c) {
                    var d, e, f, g, h;
                    for (g = b.get(), h = [], e = 0, f = g.length; f > e; e++)d = g[e], h.push(a.evt.add(d, "click", function () {
                        return a.activateTopic(c)
                    }));
                    return h
                }
            }(this)(d))) : c.push(void 0);
            return c
        }, b.prototype.sanitizeUrlTrigger = function (a) {
            var b, c, d;
            return null == a && (a = {}), null == a.url || "any" !== (c = a.scope) && "current" !== c ? null : (b = this.options.base_path, d = this.options.variables, a.url = G(a.url, b, d), a)
        }, b.prototype.getStepActivatedByUrlTrigger = function (a) {
            var b, c, d, e, f, g;
            for (g = null, e = this.topics[a].steps, b = c = 0, d = e.length; d > c; b = ++c)f = e[b], null != f.url_trigger && "any" === f.url_trigger.scope && L(f.url_trigger.url) && (g = b);
            return g
        }, b.prototype.countTopicSteps = function (a) {
            var b, c;
            return null != (b = this.topics[a]) && null != (c = b.steps) ? c.length : void 0
        }, b.prototype.activateTopic = function (a) {
            var b, c, d, e;
            if (!this.isValidTopic(a))return !1;
            switch (this.hidePanel(), c = null != (b = this.getStepActivatedByUrlTrigger(a)) ? b : 0, this.tracking.track({
                event: "topic_start",
                topic: a,
                steps: this.countTopicSteps(a)
            }), this.executeCallback("onTopicStart", this, a), e = this.topics[a], e.type) {
                case"redirect":
                    return d = e.redirect_target || null, this.redirect(e.url, d);
                default:
                    return this.activateStep(a, c)
            }
        }, b.prototype.deactivateStep = function () {
            return this.setState("step_displayed", !1)
        }, b.prototype.undisplayStep = function () {
            return this.setState("step_displayed", !1), this.is_suspended !== !0 && this.unsetPrerequisites(), this.removeCurrentStepTriggers(), this.popover.destroy(), this.deactivateBackdrop()
        }, b.prototype.activateStep = function (a, b, c, d) {
            var e, f, g, h, i;
            return null == c && (c = !1), null == d && (d = null), this.isValidTopic(a) ? (i = null != (f = this.topics[a]) ? f.steps[b] : void 0, null == i ? void this.debug("FAIL: tried to activate step", b, "of topic", a) : (this.debug("activating step", b, "of topic", a), this.executeCallback("onStepActivate", this, a, b), this.deactivateStep(), this.topics[a].steps[b].target_element = d, this.saveCurrentStep(a, b), this.is_suspended = !0, (c || !this.isStepActivatedByTrigger(i)) && (this.setPrerequisites(i, a, b, c), e = !0, null == i.path || L(i.path) ? this.continuationStorage.forget() : (e = !1, this.redirect(i.path)), null != this.condition_prerequisite && (e = !1), null != this.delay_prerequisite && (e = !1), null != i.url_trigger && (L(i.url_trigger.url) || (e = !1)), this.addCurrentStepTriggers(a, b), this.setState("step_displayed", e), e || (null != (g = this.condition_prerequisite) && g.start(), null != (h = this.delay_prerequisite) && h.start(), this.debug("step", b, "of topic", a, "not activated", "(probably because of delay or missing prerequisites)"))), this.tick())) : !1
        }, b.prototype.displayStep = function (a, b) {
            var c, d, e;
            return null == a && (a = this.current_topic), null == b && (b = this.current_step), e = null != (d = this.topics[a]) ? d.steps[b] : void 0, null != e ? (this.setState("step_displayed", !0), this.debug("displayed step", b, "of topic", a), this.tracking.track({
                event: "step_display",
                topic: a,
                steps: this.countTopicSteps(a),
                step: b
            }), this.is_suspended = !1, this.scrollElementToViewport(e.element), c = this.getPopoverClassNames(a, b), this.initPopover(e, c), e.backdrop && this.activateBackdrop(e.element, e.backdrop_cover, e.backdrop_options), this.executeCallback("onStepShow", this, a, b), e.on_show(this, a, b)) : void 0
        }, b.prototype.scrollElementToViewport = function (a) {
            var b, c;
            return b = new ElementCollector, b.add(a), c = b.get()[0], null == c || DomBox.Viewport.contains(c) ? void 0 : c.scrollIntoView()
        }, b.prototype.redirect = function (a, b) {
            return this.debug("redirecting to", a), null != b ? window.open(a, b) : document.location = a
        }, b.prototype.isStepActivatedByTrigger = function (a) {
            var b, c, d, e;
            if (null == a && (a = {}), null != a.triggers)for (d = a.triggers, b = 0, c = d.length; c > b; b++)if (e = d[b], "current" === e.scope && "current" === e.activate)return !0;
            return !1
        }, b.prototype.unsaveCurrentStep = function () {
            var a, b;
            return null != (a = this.topics[this.current_topic]) && null != (b = a.steps[this.current_step]) && b.on_deactivate(this, this.current_topic, this.current_step), this.current_topic = null, this.current_step = null, this.setState("topic_id", null), this.setState("step_id", null)
        }, b.prototype.saveCurrentStep = function (a, b) {
            return this.unsaveCurrentStep(), this.topics[a].steps[b].on_activate(this, this.current_topic, this.current_step), this.current_topic = a, this.current_step = b, this.currentStepStorage.set({
                topic_id: a,
                step_id: b
            }), this.setState("topic_id", a), this.setState("step_id", b), this.tick()
        }, b.prototype.getPopoverClassNames = function (a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            if (l = [], m = null != (j = this.topics[a]) ? j.steps[b] : void 0, null != m) {
                if (null != m.class_names)for (k = m.class_names, d = 0, f = k.length; f > d; d++)c = k[d], l.push(c);
                for (h = ["hide_title", "hide_prev", "hide_next", "hide_progress", "hide_navigation", "hide_end", "hide_controls", "hide_close"], e = 0, g = h.length; g > e; e++)i = h[e], m[i] && l.push(i);
                0 === b && l.push(this.classname_namespace + "-firstStep"), b === this.topics[a].steps.length - 1 && l.push(this.classname_namespace + "-lastStep")
            }
            return l
        }, b.prototype.initPopover = function (a, b) {
            var c;
            return null == b && (b = {}), this.popover.setContent(this.constructPopover(a)), this.popover.setAngle(a.position), this.popover.attach(a.target_element || a.element), c = this.getUiElement("popover_inner_content", this.popover.content), c.style.width = a.width + "px", this.popover.extra_class_names = {wrapper: b}, this.popover.setOptions({
                z_index: this.getZIndex("popover"),
                disable_smart_position: this.options.popover_disable_smart_position
            }), this.popover.show(), this.setLangDirectionClass(this.popover.ui.base), this.initPopoverContent()
        }, b.prototype.endTopic = function () {
            return this.tracking.track({
                event: "topic_end",
                topic: this.current_topic,
                steps: this.countTopicSteps(this.current_topic),
                step: this.current_step
            }), this.executeCallback("onTopicEnd", this, this.current_topic), this.deactivate()
        }, b.prototype.initPopoverContent = function () {
            var a, b, c, d;
            return d = this.getUiElement("popover_button_previous"), c = this.getUiElement("popover_button_next"), b = this.getUiElement("popover_button_end"), a = this.getUiElement("popover_close_button"), this.evt.add(d, "click", function (a) {
                return function () {
                    return null != d ? a.goToStep("previous") : void 0
                }
            }(this)), this.evt.add(c, "click", function (a) {
                return function () {
                    return null != c ? a.goToStep("next") : void 0
                }
            }(this)), this.evt.add(b, "click", function (a) {
                return function () {
                    return null != b ? a.endTopic() : void 0
                }
            }(this)), this.evt.add(a, "click", function (b) {
                return function () {
                    return null != a ? b.endTopic() : void 0
                }
            }(this))
        }, b.prototype.goToStep = function (a) {
            var b;
            return null == a && (a = 0), null != this.current_topic ? ("previous" === a && (a = this.current_step - 1, this.executeCallback("onTopicPrevious", this, this.current_topic, a)), "next" === a && (a = this.current_step + 1, this.executeCallback("onTopicNext", this, this.current_topic, a)), b = this.topics[this.current_topic].steps.length, a >= b ? this.deactivate() : this.activateStep(this.current_topic, a)) : void 0
        }, b.prototype.deactivate = function (a) {
            return null == a && (a = !1), this.debug("deactivating current topic"), this.countTopicSteps(this.current_topic) - 1 === this.current_step && this.tracking.track({
                event: "topic_done",
                topic: this.current_topic,
                steps: this.countTopicSteps(this.current_topic)
            }), this.unsaveCurrentStep(), this.deactivateStep(), this.removeObserver(), a || this.currentStepStorage.forget(), this.tick()
        }, b.prototype.destroy = function () {
            return this.deactivate(), this.destroyUi(), this.removeLaunchers(), this.executeCallback("onDestroy", this)
        }, b.prototype.attemptContinuation = function () {
            var a, b, c, d, e, f, g, h, i;
            return b = this.currentStepStorage.get(), a = this.continuationStorage.get(), null != b && (this.debug("attempt", a, "to continue step", b.step_id, "of topic", b.topic_id), h = null != b.topic_id && null != b.step_id) ? (i = null != (d = this.topics[b.topic_id]) && null != (e = d.steps) && null != (f = e[b.step_id]) ? f.max_continuation_attempts : void 0, c = i || this.options.max_continuation_attempts, g = 0 === c || c > a, h && g ? (this.continuationStorage.set(), this.activateStep(b.topic_id, b.step_id)) : (this.continuationStorage.forget(), this.currentStepStorage.forget())) : void 0
        }, b.prototype.triggers = [], b.prototype.removeTriggers = function () {
            var a, b, c, d;
            for (c = this.triggers, a = 0, b = c.length; b > a; a++)d = c[a], d.remove();
            return this.triggers = []
        }, b.prototype.addTriggers = function () {
            var a, b, c, d, e, f, g, h;
            this.removeTriggers(), a = this.topics, b = [];
            for (f in a)e = a[f], b.push(null != e.steps ? function () {
                var a, b, i, j;
                for (i = e.steps, j = [], d = a = 0, b = i.length; b > a; d = ++a)c = i[d], j.push(null != c.triggers ? function () {
                    var a, b, e, i;
                    for (e = c.triggers, i = [], a = 0, b = e.length; b > a; a++)g = e[a], null == g.element && (g.element = c.element), null != g.element ? (h = new this.Trigger(g), h.topic_id = f, h.step_id = d, h.tour = this, h.add(), i.push(this.triggers.push(h))) : i.push(void 0);
                    return i
                }.call(this) : void 0);
                return j
            }.call(this) : void 0);
            return b
        }, b.prototype.getUiElement = function (a, b) {
            var c, d, e, f;
            return c = "." + this.templates[a].classname, (null != b ? b.querySelector(c) : void 0) || (null != (d = this.ui) ? d.querySelector(c) : void 0) || (null != (e = this.popover) && null != (f = e.ui) ? f.base.querySelector(c) : void 0)
        }, b.prototype.showPanel = function () {
            return this.tracking.track({event: "widget_open"}), this.setState("panel_trigger", !1), this.setState("panel", !0), this.tick()
        }, b.prototype.hidePanel = function () {
            return this.setState("panel_trigger", !0), this.setState("panel", !1), this.tick()
        }, b.prototype.togglePanel = function () {
            return this.state.panel ? this.hidePanel() : this.showPanel()
        }, b.prototype.updateList = function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
            if (null == a && (a = []), n = this.ui_elements.panel_list.getNode(), n.innerHTML = "", a.length > 0) {
                for (c = "", h = 0, k = a.length; k > h; h++)g = a[h], c += this.evaluateTemplate(this.templates.list_item, g.content);
                for (n.innerHTML = c, d = n.querySelectorAll("." + this.templates.list_item.classname), p = [], f = i = 0, l = a.length; l > i; f = ++i) {
                    if (g = a[f], null != g.class_names)for (o = g.class_names, j = 0, m = o.length; m > j; j++)b = o[j], this.class_bridge.add(d[f], b);
                    g.highlight && this.highlightItem(f), p.push(null != g.callback ? this.evt.add(d[f], "click", g.callback) : void 0)
                }
                return p
            }
            return e = this.evaluateTemplate(this.templates.list_empty, M(this.l10n.empty_topics_list, this.options.language)), n.innerHTML = e
        }, b.prototype.getAllListItems = function () {
            return this.ui.querySelectorAll("." + this.templates.list_item.classname)
        }, b.prototype.getListItem = function (a) {
            return null == a && (a = -1), this.getAllListItems()[a]
        }, b.prototype.highlightItem = function (a) {
            var b;
            return b = this.getListItem(a), null != b ? this.class_bridge.add(b, this.classname_namespace + "-highlight") : void 0
        }, b.prototype.unhighlightItem = function (a) {
            var b;
            return b = this.getListItem(a), null != b ? this.class_bridge.remove(b, this.classname_namespace + "-highlight") : void 0
        }, b.prototype.unhighlightAllItems = function () {
            var a, b, c, d;
            for (d = [], a = b = 0, c = this.getAllListItems().length; c >= 0 ? c >= b : b >= c; a = c >= 0 ? ++b : --b)d.push(this.unhighlightItem(a));
            return d
        }, b.prototype.destroyUi = function () {
            var a, b, c, d, e, f, g, h, i;
            b = this.ui_elements;
            for (a in b)i = b[a], i.remove();
            return null != (c = this.ui) && null != (d = c.parentNode) && d.removeChild(this.ui), this.ui = null, null != (e = this.default_style_element) && null != (f = e.parentNode) && f.removeChild(this.default_style_element), this.default_style_element = null, null != (g = this.custom_style_element) && null != (h = g.parentNode) && h.removeChild(this.custom_style_element), this.custom_style_element = null, this.removeCustomTrigger()
        }, b.prototype.createUiElements = function () {
            return this.ui_elements = {
                panel_trigger: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-trigger",
                        content: this.translate("title")
                    }, events: {
                        click: function (a) {
                            return function () {
                                return a.showPanel()
                            }
                        }(this)
                    }, callbacks: {
                        onAdd: function (a) {
                            return function (b) {
                                return a.setZIndex(b.getNode(), "panel")
                            }
                        }(this), onStateCheck: function (a) {
                            return function () {
                                return !a.options.hide_trigger
                            }
                        }(this)
                    }
                }),
                panel_header: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-panel-header",
                        content: this.translate("title")
                    }, events: {
                        click: function (a) {
                            return function () {
                                return a.hidePanel()
                            }
                        }(this)
                    }
                }),
                panel_list: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-panel-body",
                        content: ""
                    }
                }),
                panel_close_button: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-panel-close-button",
                        content: "×"
                    }, events: {
                        click: function (a) {
                            return function () {
                                return a.hidePanel()
                            }
                        }(this)
                    }
                }),
                panel_custom_footer: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-panel-custom-footer",
                        content: this.translate("footer")
                    }, events: {
                        click: function (a) {
                            return function (b) {
                                var c;
                                for (c = a.evt.target(b); "a" !== c.tagName.toLowerCase();)c = c.parentNode;
                                return a.tracking.track({event: "footer_click", link_url: c.href})
                            }
                        }(this)
                    }
                }),
                panel_branding: new this.UiElement({
                    template: '<a href="%branding_link%" class="%classname%" target="_blank"> %content% Inline Manual </a>',
                    data: {
                        classname: this.classname_namespace + "-panel-footer-branding",
                        content: this.translate("branding"),
                        branding_link: this.translate("branding_link")
                    }
                }),
                panel_footer: new this.UiElement({
                    data: {
                        classname: this.classname_namespace + "-panel-footer",
                        content: ""
                    }, callbacks: {
                        onAdd: function (a) {
                            return function (b) {
                                return a.options.hide_branding || a.ui_elements.panel_branding.add(b.getNode()), a.ui_elements.panel_custom_footer.add(b.getNode())
                            }
                        }(this)
                    }
                }),
                panel: new this.UiElement({
                    data: {classname: this.classname_namespace + "-panel", content: ""},
                    callbacks: {
                        onAdd: function (a) {
                            return function (b) {
                                return a.onAddPanel(b.getNode())
                            }
                        }(this), onRemove: function (a) {
                            return function (b) {
                                return a.onRemovePanel()
                            }
                        }(this)
                    }
                })
            }
        }, b.prototype.initUi = function () {
            return this.removeObserver(), this.destroyUi(), this.addCustomTrigger(), this.createUiElements(), this.default_style_element = this.constructStyle(u), this.ui = document.body.appendChild(document.createElement("div")), this.setUiClassNames(), this.observer || this.addObserver(), this.tick(!0)
        }, b.prototype.setUiClassNames = function () {
            var a, b, c, d;
            if (null != this.ui) {
                for (this.ui.className = "", b = [this.classname_namespace + "-general", this.classname_namespace + "-position-" + this.options.position], c = 0, d = b.length; d > c; c++)a = b[c], this.class_bridge.add(this.ui, a);
                return this.setLangDirectionClass(this.ui)
            }
        }, b.prototype.custom_trigger_collection = new ElementCollector, b.prototype.setCustomTrigger = function (a) {
            return null == a && (a = this.options.custom_trigger), this.removeCustomTrigger(), this.custom_trigger_collection.reset(), this.custom_trigger_collection.add(a), this.addCustomTrigger()
        }, b.prototype.removeCustomTrigger = function () {
            var a, b, c, d, e;
            for (d = this.custom_trigger_collection.get(), e = [], b = 0, c = d.length; c > b; b++)a = d[b], e.push(this.evt.remove(a, "click", this.handleCustomToggleClick));
            return e
        }, b.prototype.addCustomTrigger = function () {
            var a, b, c, d, e;
            for (d = this.custom_trigger_collection.get(), e = [], b = 0, c = d.length; c > b; b++)a = d[b], e.push(this.evt.add(a, "click", this.handleCustomToggleClick));
            return e
        }, b.prototype.handleCustomToggleClick = function () {
            return this.togglePanel()
        }, b.prototype.evaluateTemplate = function (a, b, c) {
            var d, e, f;
            null == b && (b = ""), null == c && (c = this.l10n), e = a.template, e = e.replace("%classname%", a.classname), e = e.replace("%content%", b);
            for (d in c)f = c[d], e = e.replace("%" + d + "%", M(f, this.options.language));
            return e
        }, b.prototype.constructStyle = function (a) {
            var b, c;
            return null == a && (a = ""), b = document.head || document.querySelector("head"), c = document.createElement("style"), c.type = "text/css", c.styleSheet ? c.styleSheet.cssText = a : c.appendChild(document.createTextNode(a)), b.appendChild(c), c
        }, b.prototype.constructTemplate = function (a, b) {
            var c, d;
            return d = N[a], c = M(this.l10n[b], this.options.language), this.evaluateTemplate(d, c)
        }, b.prototype.constructPopover = function (a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n;
            return null == b && (b = N), null == c && (c = this.l10n), i = M(a.title, this.options.language), n = this.evaluateTemplate(b.popover_title, i), h = this.evaluateTemplate(b.popover_close_button), j = this.evaluateTemplate(b.popover_inner_content, M(a.content, this.options.language)), f = this.evaluateTemplate(b.popover_button_previous, M(c.previous, this.options.language)), e = this.evaluateTemplate(b.popover_button_next, M(c.next, this.options.language)), d = this.evaluateTemplate(b.popover_button_end, M(c.end, this.options.language)), m = (null != (l = this.topics[this.current_topic]) ? l.steps.length : void 0) || 0, k = this.evaluateTemplate(b.popover_progress, this.current_step + 1 + " / " + m), g = this.evaluateTemplate(b.popover_buttons, f + " " + e + " " + d + " " + k), n + " " + j + " " + g + " " + h
        }, b.prototype.displayTopics = function (a) {
            var b, c, d, e, f, g, h, i, j;
            for (null == a && (a = this.topics), c = [], g = [], f = this.sortTopics(this.getValidTopics()), b = function (a) {
                return function (b, d) {
                    var e, f;
                    return e = !0, d.hidden && (e = !1), d.visibility && (a.evaluateRule(d.visibility) || (e = !1)), e ? (f = {
                        content: M(d.title, a.options.language),
                        class_names: [],
                        callback: function () {
                            return a.activateTopic(b)
                        }
                    }, b === a.current_topic && f.class_names.push(a.classname_namespace + "-active"), "redirect" === d.type && L(d.url) && f.class_names.push(a.classname_namespace + "-highlight"), L(d.context_paths) ? (f.highlight = !0, c.push(f)) : g.push(f)) : void 0
                }
            }(this), d = 0, e = f.length; e > d; d++)i = f[d], h = a[i], b(i, h);
            return j = this.options.context_topics_only ? c : [].concat(c, g), this.updateList(j)
        }, b.prototype.constructCondition = function (a) {
            var b, c;
            return null == a && (a = {}), c = null, null != a.condition && (b = a.condition, b === !0 && null != a.element && (b = {
                type: "selector",
                value: a.element
            }), "string" == typeof b && (b = {
                type: "selector",
                value: b
            }), "function" == typeof b && (b = {type: "function", value: b}), null != b.value && (c = function () {
                switch (b.type) {
                    case"function":
                        return this.sanitizeCallback(b.value);
                    case"selector":
                        return function () {
                            var a, c, d, e, f;
                            for (a = new ElementCollector, a.add(b.value), f = a.get(), d = 0, e = f.length; e > d; d++)if (c = f[d], isVisible(c))return !0;
                            return !1
                        };
                    default:
                        return null
                }
            }.call(this))), c
        }, b.prototype.constructConditionPrerequisite = function (a, b) {
            var c;
            return null == a && (a = {}), null == b && (b = function () {
            }), (c = this.constructCondition(a)) ? new this.Prerequisite({check: c, onFinish: b}) : null
        }, b.prototype.constructDelayPrerequisite = function (a, b) {
            var c;
            return null == a && (a = {}), null == b && (b = function () {
            }), (null != a ? a.delay : void 0) && a.delay > 0 ? (c = new this.DelayCallback, new this.Prerequisite({
                check: function () {
                    return c.check()
                }, interval: 1e3 * a.delay, onFinish: b
            })) : null
        }, b.prototype.setPrerequisites = function (a, b, c, d) {
            var e, f, g;
            return g = function (a) {
                return function () {
                    return a.displayStep(b, c)
                }
            }(this), e = this.constructConditionPrerequisite(a, g), f = this.constructDelayPrerequisite(a, g), null != e && null != f ? (this.condition_prerequisite = this.constructConditionPrerequisite(a, function () {
                return f.start()
            }), this.delay_prerequisite = null) : (this.condition_prerequisite = e, this.delay_prerequisite = f)
        }, b.prototype.unsetPrerequisites = function () {
            var a, b;
            return null != (a = this.condition_prerequisite) && a.stop(), null != (b = this.delay_prerequisite) ? b.stop() : void 0
        }, b.prototype.activateBackdrop = function (a, b, c) {
            var d, e, f, g, h, i, j, k;
            for (null == b && (b = !1), null == c && (c = {}), this.deactivateBackdrop(), d = {
                z_index: this.getZIndex("backdrop"),
                hide_on_click: !1,
                cover: b,
                watch: !0
            }, j = ["color", "opacity", "padding"], e = 0, g = j.length; g > e; e++)h = j[e], i = this.options["backdrop_" + h], null != i && (d[h] = i);
            for (f in c)k = c[f], d[f] = k;
            return this.backdrop = new Backdrop(d), this.backdrop.show(a)
        }, b.prototype.deactivateBackdrop = function () {
            var a, b;
            return null != (a = this.backdrop) && a.destroy(), this.backdrop = null, null != (b = this.panel_backdrop) && b.destroy(), this.panel_backdrop = null
        }, b.prototype.setLangDirectionClass = function (a) {
            var b;
            return b = M(this.l10n.lang_direction, this.options.language), this.class_bridge.add(a, "inmplayer-lang-direction-" + b)
        }, b.prototype.reinit = function (a) {
            return null == a && (a = document.body), this.debug("`reinit()` called on ", a), this.initUi(), this.tick(!0), this.popover.hide(), this.popover.createUi(), null != this.current_topic && null != this.current_step ? this.activateStep(this.current_topic, this.current_step) : void 0
        }, b.prototype.manualReinit = function (a) {
            return null == a && (a = document.body), this.reinit(a)
        }, b.prototype.belongsToUi = function (a) {
            var b, c, d, e, f, g, h, i;
            for (i = [this.ui, null != (d = this.popover) && null != (e = d.ui) ? e.base : void 0, null != (f = this.popover) && null != (g = f.ui) ? g.pointer_holder : void 0], b = 0, c = i.length; c > b; b++) {
                if (h = i[b], a === h)return !0;
                if (null != h ? h.contains(a) : void 0)return !0
            }
            return !1
        }, b.prototype.observer = null, b.prototype.addObserver = function () {
            var a;
            return null == window.MutationObserver ? null : this.reinit_observer_enabled ? (this.removeObserver(), this.observer = new MutationObserver(function (a) {
                return function (b) {
                    var c, d, e, f, g, h, i, j, k, l, m;
                    for (m = !1, c = 0, f = b.length; f > c; c++) {
                        for (i = b[c], k = i.addedNodes, d = 0, g = k.length; g > d; d++)j = k[d], a.belongsToUi(j) || (m = !0);
                        for (l = i.removedNodes, e = 0, h = l.length; h > e; e++)j = l[e], a.belongsToUi(j) && (m = !0)
                    }
                    return m ? a.reinit() : void 0
                }
            }(this)), a = {childList: !0, subtree: !0}, this.observer.observe(document.body, a)) : null
        }, b.prototype.removeObserver = function () {
            return null != this.observer ? (this.observer.disconnect(), this.observer = null) : void 0
        }, b.prototype.enableObserver = function () {
            return this.reinit_observer_enabled = !0, this.addObserver()
        }, b.prototype.disableObserver = function () {
            return this.reinit_observer_enabled = !1, this.removeObserver()
        },b.prototype.debug = function () {
            var a, b, c, d, e;
            if (this.debug_enabled)return c = document.getElementById("inline_manual_debug"), null == c && (c = document.createElement("ul"), c.id = "inline_manual_debug", document.body.appendChild(c)), d = document.createElement("li"), b = function () {
                var b, c, d;
                for (d = [], b = 0, c = arguments.length; c > b; b++)a = arguments[b], "object" == typeof a && (a = JSON.stringify(a)), d.push(a);
                return d
            }.apply(this, arguments), d.innerHTML = b.join(", "), c.insertBefore(d, c.firstChild), "undefined" != typeof console && null !== console && null != (e = console.info) ? e.apply(console, arguments) : void 0
        },b.prototype.current_step_triggers = [],b.prototype.addCurrentStepTriggers = function (a, b) {
            var c, d, e, f, g, h, i, j, k;
            for (i = null != (g = this.topics[a]) ? g.steps[b] : void 0, d = (null != i ? i.triggers : void 0) || [], h = [], e = 0, f = d.length; f > e; e++)j = d[e], "current" === j.scope ? (k = new this.Trigger(j), null == (c = k.options).element && (c.element = i.element), k.topic_id = a, k.step_id = b, k.tour = this, k.add(), h.push(this.current_step_triggers.push(k))) : h.push(void 0);
            return h
        },b.prototype.removeCurrentStepTriggers = function () {
            var a, b, c, d;
            for (c = this.current_step_triggers, a = 0, b = c.length; b > a; a++)d = c[a], d.remove();
            return this.current_step_triggers = []
        },b.prototype.sortTopics = function (a) {
            var b, c, d, e, f, g, h;
            null == a && (a = {}), g = [];
            for (d in a)h = a[d], g.push({key: d, val: h});
            for (g = g.sort(function (a, b) {
                var c, d;
                return c = parseInt(a.val.order), d = parseInt(b.val.order), c !== d ? isNaN(c) ? 1 : isNaN(d) ? -1 : c - d : a.val.title !== b.val.title ? a.val.title > b.val.title ? 1 : -1 : 0
            }), f = [], c = 0, e = g.length; e > c; c++)b = g[c], f.push(b.key);
            return f
        },b.prototype.isValidTopic = function (a) {
            var b;
            return b = this.getValidTopics(), null != b[a]
        },b.prototype.getValidTopics = function (a) {
            return null == a && (a = this.topics), a = this.filterTopicsByRules(a), this.options.filter_topics_by_language === !0 && (a = this.filterTopicsByLanguage(a)), a
        },b.prototype.filterTopicsByRules = function (a) {
            var b, c, d, e;
            null == a && (a = this.topics), b = {};
            for (e in a)d = a[e], c = !0, d.visibility && (c = this.evaluateRule(d.visibility)), c && (b[e] = d);
            return b
        },b.prototype.filterTopicsByLanguage = function (a, b) {
            var c, d, e;
            null == a && (a = this.topics), null == b && (b = this.options.language), c = {};
            for (d in a)e = a[d], (e.language === b || e.language_agnostic) && (c[d] = e);
            return c
        },b.prototype.getUrlParams = function (a) {
            var b, c, d, e, f, g, h, i, j;
            for (null == a && (a = document.location), "string" == typeof a && (e = document.createElement("a"), e.href = a, a = e), g = a.search.replace(/^\?/, "").split("&"), h = {}, b = 0, d = g.length; d > b; b++)f = g[b], i = f.split("="), c = i[0], j = i[1], h[c] = j;
            return h
        },b.prototype.activateByUrlParams = function (a) {
            var b, c, d;
            return null == a && (a = document.location), c = this.getUrlParams(a), c.imTopic && null == c.imDeactivate ? (null != c.imStep ? (d = parseInt(c.imStep), this.activateStep(c.imTopic, d), b = "Activated topic '" + c.imTopic + "' at step '" + d + "' by URL.") : (this.activateTopic(c.imTopic), b = "Activated topic '" + c.imTopic + "' by URL."), this.debug(b)) : void 0
        },b.prototype.deactivateByUrlParams = function (a) {
            var b, c, d;
            return null == a && (a = document.location), b = this.getUrlParams(a), null != b.imDeactivate && (c = !1, null == b.imTopic && (c = !0, this.debug("Deactivating any topic at any step.")), b.imTopic === this.current_topic && null == b.imStep && (c = !0, this.debug("Deactivating topic '" + b.imTopic + "' at any step.")), d = parseInt(b.imStep), b.imTopic === this.current_topic && d === this.current_step && (c = !0, this.debug("Deactivating topic '" + b.imTopic + "' at step '" + d + "'.")), c) ? this.deactivate() : void 0
        },b.prototype.setLanguage = function (a) {
            return null == a && (a = "en"), this.options.language = a, this.setState("language", a), this.tick(), null != this.current_topic && null != this.current_step ? this.activateStep(this.current_topic, this.current_step) : void 0
        },b.prototype.sanitizeCallback = function (a) {
            var b, c, d;
            return b = function () {
                var b, e, f;
                switch (typeof a) {
                    case"string":
                        for (d = window, f = a.split("."), b = 0, e = f.length; e > b; b++)c = f[b], d = null != d ? d[c] : void 0;
                        return d || function () {
                            };
                    case"function":
                        return a;
                    default:
                        return function () {
                        }
                }
            }()
        },b.prototype.executeCallback = function () {
            var a, b, c;
            return a = arguments[0], c = 2 <= arguments.length ? T.call(arguments, 1) : [], b = this.sanitizeCallback(this.callbacks[a]), b.apply(null, c)
        },b.prototype.setZIndex = function (a, b, c, d) {
            var e;
            return null == c && (c = this.current_topic), null == d && (d = this.current_step), null != a && S.call(this.layer_stack, b) >= 0 ? (e = this.getZIndex(b, c, d), a.style.zIndex = e) : void 0
        },b.prototype.getZIndex = function (a, b, c) {
            var d, e, f, g, h, i, j, k, l, m;
            for (null == b && (b = this.current_topic), null == c && (c = this.current_step), d = (null != (j = this.topics[b]) && null != (k = j.steps[c]) ? k.z_index : void 0) || (null != (l = this.topics[b]) ? l.z_index : void 0) || this.options.z_index || 0, h = 0, m = this.layer_stack, e = f = 0, i = m.length; i > f; e = ++f)g = m[e], a === g && (h = e);
            return d + 10 * h
        },b.prototype.translate = function (a) {
            return M(this.l10n[a], this.options.language)
        },b.prototype.initState = function () {
            return this.changed_state_properties = {}, this.state_changed = !1, this.state = {
                step_displayed: !1,
                topic_id: null,
                step_id: null,
                panel: !1,
                panel_trigger: !0,
                style: this.default_options.style,
                custom_trigger: this.default_options.custom_trigger,
                position: this.default_options.position,
                topics: 0,
                standalone_launchers: 0,
                hide_branding: this.default_options.hide_branding,
                step_backdrop: !1,
                panel_backdrop: !1,
                custom_style: ""
            }
        },b.prototype.setState = function (a, b) {
            return this.state[a] !== b ? (this.state[a] = b, this.changed_state_properties[a] = !0, this.state_changed = !0) : void 0
        },b.prototype.getState = function (a) {
            return this.state[a]
        },b.prototype.tick = function (a) {
            return null == a && (a = !1), a || this.state_changed === !0 ? this.draw() : void 0
        },b.prototype.draw = function () {
            var a, b, c, d, e, f;
            if (this.ui_elements) {
                if (this.changed_state_properties.l10n) {
                    c = this.ui_elements;
                    for (b in c)f = c[b], f.remove();
                    this.createUiElements()
                }
                return this.changed_state_properties.position && this.setUiClassNames(), this.changed_state_properties.hide_branding && this.ui_elements.panel_footer.redraw(), this.changed_state_properties.topics && this.displayTopics(), this.ui_elements.panel_trigger.toggleByState(this.state.panel_trigger, this.ui), this.ui_elements.panel.toggleByState(this.state.panel, this.ui), this.changed_state_properties.custom_trigger && this.setCustomTrigger(), this.updateLaunchers(), (this.changed_state_properties.step_displayed || this.changed_state_properties.topic_id || this.changed_state_properties.step_id) && (this.state.step_displayed ? this.displayStep() : this.undisplayStep()), a = "" !== this.options.style && !this.custom_element_style, (this.changed_state_properties.custom_style || a) && (null != (d = this.custom_style_element) && null != (e = d.parentNode) && e.removeChild(this.custom_style_element), this.custom_style_element = this.constructStyle(this.options.style)), this.state_changed = !1, this.changed_state_properties = {}
            }
        },b.prototype.alignPanel = function (a) {
            var b, c;
            return null == a && (a = this.ui_elements.panel.getNode()), null != a ? (b = DomBox.getBox(a), c = (DomBox.Viewport.getHeight() - b.height) / 2, a.style.top = c + "px") : void 0
        },b.prototype.initPanelSplashMode = function (a) {
            var b, c, d, e;
            return b = DomBox.getBox(a), e = (DomBox.Viewport.getHeight() - b.height) / 2, c = (DomBox.Viewport.getWidth() - b.width) / 2, a.style.top = e + "px", a.style.left = c + "px", a.style.bottom = "auto", a.style.right = "auto", null != (d = this.backdrop) && d.hide(), this.panel_backdrop = new Backdrop({
                hide_on_click: !1,
                z_index: this.getZIndex("splash"),
                padding: 0,
                onHide: function (a) {
                    return function () {
                        var b;
                        return null != (b = a.backdrop) ? b.show() : void 0
                    }
                }(this)
            }), this.panel_backdrop.show(a)
        },b.prototype.onAddPanel = function (a) {
            var b;
            return this.setZIndex(a, "panel"), this.ui_elements.panel_header.add(a), this.ui_elements.panel_list.add(a), this.ui_elements.panel_footer.add(a), this.ui_elements.panel_close_button.add(a), this.displayTopics(), ("left" === (b = this.options.position) || "right" === b) && this.alignPanel(a), this.options.splash_mode && this.initPanelSplashMode(a), this.class_bridge.add(this.ui, this.classname_namespace + "-topicsDisplayed")
        },b.prototype.onRemovePanel = function () {
            var a;
            return null != (a = this.panel_backdrop) && a.hide(), null != this.ui ? this.class_bridge.remove(this.ui, this.classname_namespace + "-topicsDisplayed") : void 0
        },b.prototype.setRules = function (a) {
            var b, c, d, e;
            null == a && (a = {}), this.rules = {}, c = function (a) {
                return function (b) {
                    var d, e, f, g, h;
                    for (g = [], h = b.rules, e = 0, f = h.length; f > e; e++)d = h[e], "string" == typeof d ? null == a.rules[d] ? a.debug("Trying to use non-existing reference to rule", d) : g.push(a.rules[d]) : "ruleset" === d.type && g.push(c(d));
                    return b.rules = g, b
                }
            }(this);
            for (b in a)e = a[b], d = function () {
                switch (e.type) {
                    case"rule":
                        return this.rules[b] = new this.Rule(e);
                    case"ruleset":
                        return this.rules[b] = new this.Ruleset(c(e));
                    default:
                        return this.debug("Trying to add invalid rule", e), null
                }
            }.call(this);
            return this.rules
        },b.prototype.handleStorageChange = function (a) {
            var b, c, d, e, f;
            return "InmPlayerCurrent" === (null != a ? a.key : void 0) && a.newValue !== a.oldValue && (d = a.newValue || "{}", c = JSON.parse(d), f = this.current_topic !== c.topic_id, e = this.current_step === c.step_id, f || e) ? (b = this.currentStepStorage.get(), null != b ? this.activateStep(b.topic_id, b.step_id) : this.deactivate()) : void 0
        },b.prototype.setMetadata = function (a) {
            var b, c, d;
            null == a && (a = {}), c = [];
            for (b in a)d = a[b], c.push(this.metadata[b] = d);
            return c
        },b.prototype.attemptAutolaunch = function () {
            var a, b, c;
            a = this.topics;
            for (c in a)if (b = a[c], null != b.autolaunch && this.evaluateRule(b.autolaunch))return this.activateTopic(c), !0;
            return !1
        },b.prototype.evaluateRule = function (a) {
            return this.rules[a].eval(this.metadata)
        },b
    }(), F = "object" == typeof exports ? exports : this, F.InlineManualPlayer = c, A = function (a, b) {
        var c, d, e;
        c = [];
        for (d in b)e = b[d], c.push(B(a + "[" + d + "]", e));
        return c.join("&")
    }, z = function (a, b) {
        var c, d, e, f;
        for (e = [], c = 0, d = b.length; d > c; c++)f = b[c], e.push(B(a + "[]", f));
        return e.join("&")
    }, B = function (a, b) {
        return x(b) ? A(a, b) : w(b) ? z(a, b) : a + "=" + b
    }, C = function (a) {
        var b, c, d;
        null == a && (a = {}), c = [];
        for (b in a)d = a[b], c.push(B(b, d));
        return c.join("&")
    }, o = function (a, b, c) {
        var d, e, f, g, h, i, j;
        null == b && (b = {}), null == c && (c = function () {
        }), d = {method: "GET", params: {}}, f = {};
        for (e in d)i = d[e], f[e] = b[e] || i;
        return "GET" !== (h = f.method) && "POST" !== h && (f.method = "GET"), g = null, "POST" === f.method && (g = C(f.params)), j = null, "undefined" != typeof XDomainRequest && null !== XDomainRequest ? (j = new XDomainRequest, j.onload = function () {
            return c(j.responseText)
        }) : (j = new XMLHttpRequest, j.onreadystatechange = function () {
            var a;
            return 4 !== j.readyState || 200 !== (a = j.status) && 304 !== a ? void 0 : c(j.responseText)
        }), j.open(f.method, a, !0), j.send(g)
    }, window.createInlineManualPlayer = function (a, b) {
        var d, e, f, g, h;
        if (null == a && (a = {}), null == b && (b = "inline_manual_player"), null != window.inlineManualOptions) {
            f = window.inlineManualOptions;
            for (e in f)h = f[e], a[e] = h
        }
        if (null != window.inlineManualTracking) {
            null == a.tracking && (a.tracking = {}), null == (d = a.tracking).metadata && (d.metadata = {}), g = window.inlineManualTracking;
            for (e in g)h = g[e], a.tracking.metadata[e] = h
        }
        return window[b] = new c(a)
    }, t = function (a, b, c) {
        var d, e, f;
        null == a && (a = ""), null == b && (b = "div"), null == c && (c = {}), c["class"] = a, d = document.createElement(b);
        for (e in c)f = c[e], d.setAttribute(e, f);
        return d
    }, n = function (a, b, c, d) {
        var e;
        return null == a && (a = document.body), e = t(b, c, d), a.appendChild(e), e
    }, D = function () {
        var a, b, c, d, e, f, g;
        for (e = 1 <= arguments.length ? T.call(arguments, 0) : [], f = {}, a = 0, c = e.length; c > a; a++)if (d = e[a], x(d))for (b in d)g = d[b], f[b] = g;
        return f
    }, w = function (a) {
        return null != a ? -1 !== a.constructor.toString().indexOf("Array") : !1
    }, x = function (a) {
        return null != a ? "object" == typeof a && !w(a) : !1
    }, M = function (a, b) {
        return null == a && (a = ""), null == b && (b = "en"), "string" == typeof a ? a : (null != a ? a[b] : void 0) || (null != a ? a.en : void 0) || ""
    }, s = function (a) {
        return null == a && (a = ""), /:\/\//.test(a)
    }, p = function (a, b) {
        var c, d, e;
        null == a && (a = ""), null == b && (b = {});
        for (c in b)e = b[c], d = RegExp("\\[" + c + "\\]", "g"), a = a.replace(d, e);
        return a
    }, G = function (a, b, c) {
        var d, e;
        return null == a && (a = ""), null == b && (b = ""), null == c && (c = {}), s(a) || (e = "/" === a.charAt(0), d = "/" === b.charAt(b.length - 1), e || d || (a = "/" + a), e && d && (a = a.substring(1)), a = "" + b + a), a = p(a, c)
    }, J = function (a, b, c) {
        var d, e, f, g;
        for (null == a && (a = []), "string" == typeof a && (a = [a]), f = [], d = 0, e = a.length; e > d; d++)g = a[d], f.push(this.sanitizeUrl(g, b, c));
        return f
    }, H = function (a) {
        return null == a && (a = ""), ("" === a || "*" === a) && (a = "*://*/*"), s(a) || (a = "*://*" + a), a
    }, I = function (a) {
        var b, c, d, e;
        for (null == a && (a = []), "string" == typeof a && (a = [a]), e = [], b = 0, c = a.length; c > b; b++)d = a[b], e.push(H(d));
        return e
    }, L = function (a, b) {
        var c;
        return null == b && (b = document.location), "object" == typeof b && (b = b.toString()), a = I(a), c = new UrlMatch(a), c.test(b)
    }, Q = function (a) {
        var b;
        if (null == a)return !1;
        try {
            document.querySelector(a)
        } catch (c) {
            return b = c, !1
        }
        return !0
    }, c.prototype.version = "2.14.1", j = function () {
        function a(a, b) {
            this.setContent(a), this.setData(b)
        }

        return a.prototype.setContent = function (a) {
            return null == a && (a = ""), this.content = a
        }, a.prototype.setData = function (a) {
            return null == a && (a = {}), this.data = a
        }, a.prototype.setDataItem = function (a, b) {
            return this.data[a] = b
        }, a.prototype.getHtml = function () {
            var a, b, c, d;
            c = this.content, b = this.data;
            for (a in b)d = b[a], c = c.replace(RegExp("\\%" + a + "\\%", "g"), d);
            return c
        }, a.prototype.getDom = function () {
            var a, b, c;
            if (b = document.createElement("div"), b.innerHTML = this.getHtml(), c = null, b.childNodes.length > 1)for (c = document.createDocumentFragment(); a = b.firstChild;)c.appendChild(a); else c = b.childNodes[0];
            return c
        }, a
    }(), c.prototype.Template = j, i = function () {
        function a(a, b) {
            this.id = null != a ? a : "StorageInterface" + (new Date).getTime(), this.onGet = null != b ? b : function (a) {
                return a
            }
        }

        return a.prototype.get = function () {
            var a;
            try {
                return this.onGet(JSON.parse(localStorage.getItem(this.id)))
            } catch (b) {
                return a = b, this.onGet(null)
            }
        }, a.prototype.set = function (a) {
            var b;
            try {
                return localStorage.setItem(this.id, JSON.stringify(a))
            } catch (c) {
                b = c
            }
        }, a.prototype.forget = function () {
            var a;
            try {
                return localStorage.removeItem(this.id)
            } catch (b) {
                a = b
            }
        }, a
    }(), a = function (a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments)
        }

        return U(b, a), b.prototype.set = function () {
            return b.__super__.set.call(this, this.get() + 1)
        }, b.prototype.get = function () {
            return b.__super__.get.call(this) || 0
        }, b
    }(i), l = function () {
        function a(a) {
            null == a && (a = {}), this.execute = R(this.execute, this), this.options = this.sanitize(a), this.monitor = new ElementMonitor(this.options.element, {
                onAppear: function (a) {
                    return function () {
                        return a.remove(), a.add()
                    }
                }(this)
            }), this.monitor.start()
        }

        return a.prototype.default_options = {
            element: null,
            events: [],
            scope: "current",
            activate: "current"
        }, a.prototype.evt = new EventBridge, a.prototype.window_events = ["load", "unload", "abort", "error", "resize", "scroll"], a.prototype.sanitize = function (a, b) {
            var c;
            return null == a && (a = {}), null == b && (b = this.default_options), c = D(b, a), c.events = this.sanitizeEvents(c.events), c.scope = this.sanitizeScope(c.scope), c.activate = this.sanitizeActivate(c.activate), c.element = this.sanitizeElement(c.element), c
        }, a.prototype.sanitizeEvents = function (a) {
            var b, c;
            return null == a && (a = []), "string" == typeof a && (a = [a]), b = ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout", "dragstart", "drag", "dragenter", "dragleave", "dragover", "drop", "dragend", "keydown", "keypress", "keyup", "load", "unload", "abort", "error", "resize", "scroll", "select", "change", "submit", "reset", "focus", "blur"], a = function () {
                var d, e, f;
                for (f = [], d = 0, e = a.length; e > d; d++)c = a[d], S.call(b, c) >= 0 && f.push(c);
                return f
            }()
        }, a.prototype.sanitizeScope = function (a) {
            var b;
            return b = ["current", "any"], S.call(b, a) < 0 && (a = null), a
        }, a.prototype.sanitizeActivate = function (a) {
            var b;
            return b = ["current", "next", "prev"], S.call(b, a) < 0 && (a = b[0]), a
        }, a.prototype.sanitizeElement = function (a) {
            return "string" != typeof a ? (c.prototype.debug("WARNING:", "Invalid data is used as CSS selector for trigger element.", "Use either valid string with CSS selector or `null` instead.", a), null) : /^\s*$/.test(a) ? (c.prototype.debug("WARNING:", "Empty string is used as CSS selector for trigger element.", "Use `null` instead.", a), null) : a
        }, a.prototype.execute = function () {
            return null != this.tour && this.tour.current_topic === this.topic_id && ("any" === this.options.scope || "current" === this.options.scope && this.tour.current_step === this.step_id) ? "current" === this.options.activate ? this.tour.activateStep(this.topic_id, this.step_id, !0) : this.tour.goToStep(this.options.activate) : void 0
        }, a.prototype.add = function (a, b) {
            var c, d, e, f, g, h;
            for (null == a && (a = this.options.element), null == b && (b = this.options.events), h = [], f = 0, g = b.length; g > f; f++)e = b[f], d = S.call(this.window_events, e) >= 0 ? [window] : document.querySelectorAll(a), h.push(function () {
                var a, b, f;
                for (f = [], a = 0, b = d.length; b > a; a++)c = d[a], f.push(this.evt.add(c, e, this.execute));
                return f
            }.call(this));
            return h
        }, a.prototype.remove = function (a, b) {
            var c, d, e, f, g, h;
            for (null == a && (a = this.options.element), null == b && (b = this.options.events), h = [], f = 0, g = b.length; g > f; f++)e = b[f], d = S.call(this.window_events, e) >= 0 ? [window] : document.querySelectorAll(a), h.push(function () {
                var a, b, f;
                for (f = [], a = 0, b = d.length; b > a; a++)c = d[a], f.push(this.evt.remove(c, e, this.execute));
                return f
            }.call(this));
            return h
        }, a
    }(), c.prototype.Trigger = l, b = function () {
        function a() {
            this.reset(), this.id = Math.random()
        }

        return a.prototype.check = function () {
            return this.status === !1 ? (this.status = !0, !1) : !0
        }, a.prototype.reset = function () {
            return this.status = !1
        }, a
    }(), c.prototype.DelayCallback = b, e = function () {
        function a(a) {
            this.options = null != a ? a : {}, this.check = this.options.check || function () {
                return !0
            }, this.interval = this.options.interval || 100, this.onStart = this.options.onStart || function () {
            }, this.onTick = this.options.onTick || function () {
            }, this.onStop = this.options.onStop || function () {
            }, this.onFinish = this.options.onFinish || function () {
            }, this.reset()
        }

        return a.ticker = null, a.prototype.tick = function () {
            return this.status = !!this.check(), this.status && this.finish(), this.onTick(this)
        }, a.prototype.start = function () {
            return this.ticker = setInterval(function (a) {
                return function () {
                    return a.tick()
                }
            }(this), this.interval), this.tick(), this.onStart(this)
        }, a.prototype.stop = function () {
            return clearInterval(this.ticker), this.ticker = null, this.onStop(this)
        }, a.prototype.finish = function () {
            return this.stop(), this.onFinish(this)
        }, a.prototype.isRunning = function () {
            return null != this.ticker
        }, a.prototype.reset = function () {
            return this.status = !1
        }, a
    }(), c.prototype.Prerequisite = e, h = function () {
        function a(a) {
            null == a && (a = {}), this.setOptions(this.default_options), this.setOptions(a), this.uuid = this.getUuid()
        }

        return a.prototype.default_options = {
            storage_key: "inline-manual-player-uuid",
            tracking_url: "//analytics.inlinemanual.com/__ptm",
            tracking_debug_url: "//localhost:3000/tracking",
            enabled: !1,
            debug: !1,
            metadata: {},
            api_key: null,
            version: null
        }, a.prototype.technical_data = {url: document.location.toString()}, a.prototype.setOptions = function (a) {
            var b, c, d;
            null == a && (a = {}), c = [];
            for (b in a)d = a[b], c.push(this[b] = a[b]);
            return c
        }, a.prototype.getUuid = function () {
            var a, b;
            b = null;
            try {
                b = "undefined" != typeof localStorage && null !== localStorage ? localStorage.getItem(this.storage_key) : void 0, UUID4.validate(b) || (b = UUID4.generate(), "undefined" != typeof localStorage && null !== localStorage && localStorage.setItem(this.storage_key, b))
            } catch (c) {
                a = c
            }
            return b
        }, a.prototype.track = function (a) {
            var b, c, d, e;
            null == a && (a = {}), b = {uuid: this.getUuid(), time: (new Date).getTime()}, d = this.technical_data;
            for (c in d)e = d[c], b[c] = e;
            for (c in a)e = a[c], b[c] = e;
            return "player_init" === a.event && (b.meta = this.metadata, b.version = this.version), null != this.api_key && (b.key = this.api_key), this.enabled ? this.send(b) : void 0
        }, a.prototype.send = function (a) {
            var b;
            return null == a && (a = {}), b = this.debug ? this.tracking_debug_url : this.tracking_url, s(b) || (b = "" + document.location.protocol + b), o(b, {
                method: "POST",
                params: a
            })
        }, a
    }(), c.prototype.Statistics = h, d = function () {
        function a(a) {
            null == a && (a = {}), this.launcher_elements = [], this.options = {}, this.template = new j, this.monitor = new ElementMonitor, this.monitor.setOptions({
                onChange: function (a) {
                    return function () {
                        return a.draw()
                    }
                }(this)
            }), this.setOptions(a)
        }

        return a.prototype.default_options = {
            element: null,
            position: "top_right",
            offset_vertical: 0,
            offset_horizontal: 0,
            class_name: "",
            content: "",
            title: "",
            template: '<div class="%class_name%" title="%title%">%content%</div>',
            point_at: null,
            on_add: function () {
            },
            on_remove: function () {
            },
            on_activate: function () {
            }
        }, a.prototype.evt = new EventBridge, a.prototype.cls = new ClassBridge, a.prototype.setOptions = function (a) {
            var b, c, d;
            null == a && (a = {}), c = this.default_options;
            for (b in c)d = c[b], this.options[b] = a[b] || d;
            return this.setTemplate(), this.monitor.setElement(this.options.element)
        }, a.prototype.setTemplate = function (a) {
            return null == a && (a = this.options.template), this.template.setContent(a), this.template.setData({
                class_name: this.options.class_name,
                content: this.options.content,
                title: this.options.title
            })
        }, a.prototype.setElementPosition = function (a, b, c) {
            var d, e, f, g;
            return a.style.position = "absolute", f = DomBox.getBox(b), d = DomBox.getBox(a), e = function () {
                switch (c) {
                    case"top_right":
                    case"right":
                    case"bottom_right":
                        return f.right + this.options.offset_horizontal;
                    case"top":
                    case"bottom":
                        return f.left + f.width / 2 - d.width / 2;
                    case"top_left":
                    case"left":
                    case"bottom_left":
                        return f.left - d.width - this.options.offset_horizontal
                }
            }.call(this), g = function () {
                switch (c) {
                    case"top_right":
                    case"top":
                    case"top_left":
                        return f.top - d.height + this.options.offset_vertical;
                    case"left":
                    case"right":
                        return f.top + f.height / 2 - d.height / 2;
                    case"bottom_right":
                    case"bottom":
                    case"bottom_left":
                        return f.bottom - this.options.offset_vertical
                }
            }.call(this), a.style.left = e + "px", a.style.top = g + "px"
        }, a.prototype.draw = function () {
            var a, b, c, d, e, f;
            for (this.removeElements(), d = this.monitor.getElements(), e = [], a = 0, c = d.length; c > a; a++)f = d[a], b = this.template.getDom(), this.evt.add(b, "click", function (a) {
                return function (b) {
                    return a.activate(b)
                }
            }(this)), document.body.appendChild(b), this.setElementPosition(b, f, this.options.position), isVisible(f) || (b.style.display = "none"), this.launcher_elements.push(b), e.push(this.options.on_add(this, b));
            return e
        }, a.prototype.add = function () {
            return this.removeElements(), this.draw(), this.monitor.start()
        }, a.prototype.removeElements = function () {
            var a, b, c;
            for (c = []; a = this.launcher_elements.pop();)this.options.on_remove(this, a), c.push(null != (b = a.parentNode) ? b.removeChild(a) : void 0);
            return c
        }, a.prototype.remove = function () {
            return this.monitor.stop(), this.removeElements()
        }, a.prototype.activate = function (a) {
            var b;
            if (b = this.evt.target(a), "" !== this.options.class_name)for (; null != b && !this.cls.has(this.options.class_name);)b = b.parentNode;
            return this.options.on_activate(this, b)
        }, a.prototype.activateOnSelf = function () {
            var a;
            return a = document.querySelector(this.options.element), this.options.on_activate(this, a)
        }, a.prototype.destroy = function () {
            return this.remove()
        }, a
    }(), c.prototype.Launcher = d, v = {
        general: {
            is_empty: function (a, b) {
                return !a || 0 === a.length
            }, is_equal: function (a, b) {
                return a === b
            }
        }, text: {
            contains: function (a, b) {
                return -1 !== a.search(b)
            }, starts_with: function (a, b) {
                return RegExp("^" + b).test(a)
            }, ends_with: function (a, b) {
                return RegExp(b + "$").test(a)
            }, regexp: function (a, b) {
                var c;
                return c = new RegExp(b), c.test(a)
            }
        }, number: {
            is_empty: function (a, b) {
                return !a && "number" != typeof a
            }, gt: function (a, b) {
                return a > b
            }, gte: function (a, b) {
                return a >= b
            }, lt: function (a, b) {
                return b > a
            }, lte: function (a, b) {
                return b >= a
            }
        }, array: {
            is_equal: function (a, b) {
                var c, d, e, f;
                if (a.length !== b.length)return !1;
                for (c = d = 0, e = a.length; e > d; c = ++d)if (f = a[c], a[c] !== b[c])return !1;
                return !0
            }, contains: function (a, b) {
                return S.call(a, b) >= 0
            }
        }, date: {
            is_equal: function (a, b) {
                return b = f.prototype.sanitizeTime(b), a === b
            }, is_within: function (a, b) {
                var c, d;
                return d = (new Date).getTime(), c = f.prototype.parseRelativeTime(b), a >= d - c && d + c >= a
            }, is_before: function (a, b) {
                return b = f.prototype.sanitizeTime(b, -1), b >= a
            }, is_after: function (a, b) {
                return b = f.prototype.sanitizeTime(b, 1), a >= b
            }
        }
    }, E = function (a) {
        return function () {
            return !a.apply(null, arguments)
        }
    }, f = function () {
        function a(a, b) {
            this.onError = null != b ? b : function () {
            }, this.options = {}, this.sanitizeOptions(a)
        }

        return a.prototype.sanitizeOptions = function (a) {
            return null == a && (a = {}), this.sanitizeKind(a.kind), this.sanitizeCondition(a.condition), this.sanitizeValue(a.value), this.sanitizeField(a.field)
        }, a.prototype.sanitizeKind = function (a) {
            return null != this.eval_methods[a] ? this.options.kind = a : this.onError("Rule can not be of kind '" + a + "'.")
        }, a.prototype.sanitizeField = function (a) {
            return null != a ? this.options.field = a : this.onError("Rule can not be created without a field.")
        }, a.prototype.sanitizeCondition = function (a) {
            var b;
            return null != (null != (b = this.eval_methods[this.options.kind]) ? b[a] : void 0) ? this.options.condition = a : this.onError("Rule of kind '" + this.options.kind + "' can not use condition '" + a + "'.")
        }, a.prototype.sanitizeValue = function (a) {
            return null != a || "is_empty" === this.options.condition ? this.options.value = a : this.onError("Rule must contain a value when conditions is '" + this.options.condition + "'.")
        }, a.prototype.relativeTimeUnits = {
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 2592e6,
            year: 31536e6
        }, a.prototype.splitRelativeTime = function (a) {
            var b, c, d, e, f, g, h, i, j;
            return f = null, j = function () {
                var a, c;
                a = this.relativeTimeUnits, c = [];
                for (b in a)i = a[b], c.push(b);
                return c
            }.call(this).join("|"), e = RegExp("^\\s*(\\+|\\-)*\\s*(\\d+)\\s*(" + j + ")s*\\s*$"), c = e.exec(a), null != c ? (d = c[0], g = c[1], a = c[2], h = c[3], a = parseInt(a), "-" === g && (a = -1 * a), f = {
                value: a,
                unit: h
            }) : this.onError("Rule is trying to use invalid date value '" + a + "'"), f
        }, a.prototype.parseRelativeTime = function (a) {
            var b, c, d;
            return d = 0, b = this.splitRelativeTime(a), null != b && (c = this.relativeTimeUnits[b.unit], d = b.value * c), d
        }, a.prototype.sanitizeTime = function (a, b) {
            var c, d;
            switch (null == b && (b = 1), typeof a) {
                case"number":
                    return a;
                case"string":
                    return d = (new Date).getTime(), c = this.parseRelativeTime(a), d + c * b;
                default:
                    return (new Date).getTime()
            }
        }, a.prototype.eval = function (a) {
            var b;
            return null == a && (a = {}), v = null != (b = this.eval_methods[this.options.kind]) ? b[this.options.condition] : void 0, null != v ? v(a[this.options.field], this.options.value) : (this.onError("Rule is trying to use invalid combination of kind (" + this.options.kind + ") and condition (" + this.options.condition + ")."), !1)
        }, a.prototype.eval_methods = {
            text: {
                is_empty: v.general.is_empty,
                empty: v.general.is_empty,
                is_equal: v.general.is_equal,
                eq: v.general.is_equal,
                contains: v.text.contains,
                includes: v.text.contains,
                "in": v.text.contains,
                starts_with: v.text.starts_with,
                starts: v.text.starts_with,
                ends_with: v.text.ends_with,
                ends: v.text.ends_with,
                regexp: v.text.regexp,
                re: v.text.regexp,
                is_not_empty: E(v.general.is_empty),
                not_empty: E(v.general.is_empty),
                is_not_equal: E(v.general.is_equal),
                neq: E(v.general.is_equal),
                does_not_contain: E(v.text.contains),
                does_not_include: E(v.text.contains),
                nin: E(v.text.contains),
                does_not_start_with: E(v.text.starts_with),
                doesnt_start: E(v.text.starts_with),
                does_not_end_with: E(v.text.ends_with),
                doesnt_end: E(v.text.ends_with),
                not_regexp: E(v.text.regexp),
                nre: E(v.text.regexp)
            },
            number: {
                is_empty: v.number.is_empty,
                empty: v.number.is_empty,
                is_equal: v.general.is_equal,
                eq: v.general.is_equal,
                is_greater_than: v.number.gt,
                gt: v.number.gt,
                is_greater_than_or_equal: v.number.gte,
                gte: v.number.gte,
                is_less_than: v.number.lt,
                lt: v.number.lt,
                is_less_than_or_equal: v.number.lte,
                lte: v.number.lte,
                is_not_empty: E(v.number.is_empty),
                not_empty: E(v.number.is_empty),
                is_not_equal: E(v.general.is_equal),
                neq: E(v.general.is_equal),
                is_not_greater_than: E(v.number.gt),
                ngt: E(v.number.gt),
                is_not_greater_than_or_equal: E(v.number.gte),
                ngte: E(v.number.gte),
                is_not_less_than: E(v.number.lt),
                nlt: E(v.number.lt),
                is_not_less_than_or_equal: E(v.number.lte),
                nlte: E(v.number.lte)
            },
            array: {
                is_empty: v.general.is_empty,
                empty: v.general.is_empty,
                is_equal: v.array.is_equal,
                eq: v.array.is_equal,
                contains: v.array.contains,
                includes: v.array.contains,
                "in": v.array.contains,
                is_not_empty: E(v.general.is_empty),
                not_empty: E(v.general.is_empty),
                is_not_equal: E(v.array.is_equal),
                neq: E(v.array.is_equal),
                does_not_contain: E(v.array.contains),
                does_not_include: E(v.array.contains),
                nin: E(v.array.contains)
            },
            date: {
                is_empty: v.general.is_empty,
                empty: v.general.is_empty,
                is_equal: v.date.is_equal,
                eq: v.date.is_equal,
                is_within: v.date.is_within,
                within: v.date.is_within,
                is_before: v.date.is_before,
                is_less_than: v.date.is_before,
                lt: v.date.is_before,
                before: v.date.is_before,
                is_after: v.date.is_after,
                is_greater_than: v.date.is_after,
                gt: v.date.is_after,
                after: v.date.is_after,
                is_not_empty: E(v.general.is_empty),
                not_empty: E(v.general.is_empty),
                is_not_equal: E(v.date.is_equal),
                neq: E(v.date.is_equal),
                is_not_within: E(v.date.is_within),
                not_within: E(v.date.is_within),
                is_not_before: E(v.date.is_before),
                is_not_less_than: E(v.date.is_before),
                nlt: E(v.date.is_before),
                not_before: E(v.date.is_before),
                is_not_after: E(v.date.is_after),
                is_not_greater_than: E(v.date.is_after),
                ngt: E(v.date.is_after),
                not_after: E(v.date.is_after)
            }
        }, a
    }(), c.prototype.Rule = f, g = function () {
        function a(a, b) {
            this.onError = null != b ? b : function () {
            }, this.options = {}, this.sanitizeOptions(a)
        }

        return a.prototype.sanitizeOptions = function (a) {
            return null == a && (a = {}), this.sanitizeOperation(a.operation), this.sanitizeRules(a.rules)
        }, a.prototype.sanitizeOperation = function (a) {
            return this.eval_methods[a] ? this.options.operation = a : this.onError("Ruleset can not use operation '" + a + "'.")
        }, a.prototype.sanitizeRules = function (a) {
            var b, c, d;
            if (this.options.rules = [], w(a))for (b = 0, c = a.length; c > b; b++)d = a[b], this.sanitizeRule(d); else this.onError("Ruleset can not use '" + a + "' as rules list.");
            return this.options.rules
        }, a.prototype.sanitizeRule = function (b) {
            return b instanceof f || b instanceof a || (b = function () {
                switch (null != b ? b.type : void 0) {
                    case"rule":
                        return new f(b);
                    case"ruleset":
                        return new a(b);
                    default:
                        return null
                }
            }()), null != b && this.options.rules.push(b), b
        }, a.prototype.eval = function (a) {
            return null == a && (a = {}), 0 === this.options.rules.length ? !0 : this.eval_methods[this.options.operation](this.options.rules, a)
        }, a.prototype.eval_methods = {
            or: function (a, b) {
                var c, d, e;
                for (c = 0, d = a.length; d > c; c++)if (e = a[c], e.eval(b))return !0;
                return !1
            }, and: function (a, b) {
                var c, d, e;
                for (c = 0, d = a.length; d > c; c++)if (e = a[c], !e.eval(b))return !1;
                return !0
            }
        }, a
    }(), c.prototype.Ruleset = g, m = function () {
        function a(a) {
            var b, c, d;
            if (null == a && (a = {}), this.changed = !1, this.data = {}, this.setData(a.data), this.setTemplate(a.template), this.events = {}, null != a.events) {
                c = a.events;
                for (b in c)d = c[b], this.addEvent(b, d)
            }
            this.callbacks = {}, this.setCallbacks(this.default_callbacks), this.setCallbacks(a.callbacks), this.createNode()
        }

        return a.prototype.evt = new EventBridge, a.prototype.default_template = '<div class="%classname%">%content%</div>', a.prototype.default_callbacks = {
            onCreate: function () {
            }, onAdd: function () {
            }, onRemove: function () {
            }, onStateCheck: function () {
                return !0
            }
        }, a.prototype.setData = function (a) {
            var b, c;
            null == a && (a = {});
            for (b in a)c = a[b], this.data[b] !== c && (this.changed = !0), this.data[b] = c;
            return this.data
        }, a.prototype.setTemplate = function (a) {
            return null == a && (a = this.default_template), a !== this.template && (this.changed = !0), this.template = a
        }, a.prototype.addEvent = function (a, b) {
            return null == b && (b = function () {
            }), this.changed = !0, this.events[a] = b
        }, a.prototype.setCallbacks = function (a) {
            var b, c, d;
            null == a && (a = {}), c = [];
            for (b in a)d = a[b], c.push(this.callbacks[b] = d);
            return c
        }, a.prototype.createNode = function () {
            var a, b, c, d;
            this.changed = !1, this.remove(), c = new j(this.template, this.data), this.node = c.getDom(), b = this.events;
            for (a in b)d = b[a], this.evt.add(this.node, a, d);
            return this.callbacks.onCreate(this), this.node
        }, a.prototype.getNode = function () {
            return (this.changed || null == this.node) && this.createNode(), this.node
        }, a.prototype.add = function (a, b) {
            return null == a && (a = document.body), a.insertBefore(this.getNode(), b), this.callbacks.onAdd(this)
        }, a.prototype.remove = function () {
            var a, b;
            return this.callbacks.onRemove(this), null != (a = this.node) && null != (b = a.parentNode) && b.removeChild(this.node), this.node = null
        }, a.prototype.toggleByState = function (a, b) {
            return a === !0 && this.callbacks.onStateCheck() ? this.add(b) : this.remove()
        }, a.prototype.redraw = function () {
            var a, b, c;
            return a = this.getNode(), b = null != a ? a.parentNode : void 0, c = a.nextSibling, this.remove(), this.add(b, c)
        }, a
    }(), c.prototype.UiElement = m, k = function () {
        function a(a, b) {
            this.template = null != b ? b : this.default_template, this.classname = this.classname_namespace, null != a && (this.classname += "-" + a.replace(/_/g, "-"))
        }

        return a.prototype.default_template = '<div class="%classname%">%content%</div>', a.prototype.classname_namespace = "inmplayer", a
    }(), O = {
        general: {},
        trigger: {},
        panel: {},
        panel_close_button: {template: '<div class="%classname%">&times;</div>'},
        panel_header: {},
        panel_footer: {},
        panel_footer_back: {},
        panel_custom_footer: {},
        panel_footer_branding: {template: '<a href="%branding_link%" class="%classname%" target="_blank" > %content% Inline Manual </a>'},
        list: {classname: "panel-body"},
        list_item: {},
        list_empty: {},
        popover_title: {},
        popover_close_button: {template: '<div class="%classname%">&times;</div>'},
        popover_inner_content: {},
        popover_buttons: {},
        popover_button_previous: {},
        popover_button_next: {},
        popover_button_end: {},
        popover_progress: {},
        launcher: {template: '<div class="%classname%" title="%title%">%content%</div>'}
    }, N = {};
    for (y in O)P = O[y], q = P.classname || y, K = P.template, r = new k(q, K), N[y] = r;
    u = "html { position: relative; min-height: 100%; } .fczbkk-popover { position: absolute; top: 0; left: 0; } .fczbkk-popover-wrapper { position: absolute; top: 0; left: 0; border: 1px solid #cccccc; background: #fff; padding: 1em; width: 300px; box-sizing: border-box; } .fczbkk-popover-scroll_message { display: none; } .fczbkk-popover-pointer-shape { fill: #ffffff; stroke: #cccccc; stroke-width: 1px; } .fczbkk-popover-pointer-holder { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; } .fczbkk-popover-orphan { position: fixed; } .fczbkk-popover-orphan .fczbkk-popover-static_pointer .fczbkk-popover-pointer-holder { display: none; } .fczbkk-popover-static_pointer { position: absolute; border-width: 10px; border-style: solid; border-color: transparent; width: 0; height: 0; } .fczbkk-popover-supports_svg .fczbkk-popover-static_pointer { display: none; } .fczbkk-popover-right .fczbkk-popover-static_pointer, .fczbkk-popover-rightTop .fczbkk-popover-static_pointer, .fczbkk-popover-rightBottom .fczbkk-popover-static_pointer { right: -10px; border-left-color: #cccccc; border-right-width: 0; } .fczbkk-popover-left .fczbkk-popover-static_pointer, .fczbkk-popover-leftTop .fczbkk-popover-static_pointer, .fczbkk-popover-leftBottom .fczbkk-popover-static_pointer { left: -10px; border-right-color: #cccccc; border-left-width: 0; } .fczbkk-popover-right .fczbkk-popover-static_pointer, .fczbkk-popover-left .fczbkk-popover-static_pointer { top: 50%; margin-top: -5px; } .fczbkk-popover-top .fczbkk-popover-static_pointer, .fczbkk-popover-topRight .fczbkk-popover-static_pointer, .fczbkk-popover-topLeft .fczbkk-popover-static_pointer { top: -10px; border-bottom-color: #cccccc; border-top-width: 0; } .fczbkk-popover-bottom .fczbkk-popover-static_pointer, .fczbkk-popover-bottomRight .fczbkk-popover-static_pointer, .fczbkk-popover-bottomLeft .fczbkk-popover-static_pointer { bottom: -10px; border-top-color: #cccccc; border-bottom-width: 0; } .fczbkk-popover-top .fczbkk-popover-static_pointer, .fczbkk-popover-bottom .fczbkk-popover-static_pointer { left: 50%; margin-left: -5px; } .fczbkk-popover-rightTop .fczbkk-popover-static_pointer, .fczbkk-popover-leftTop .fczbkk-popover-static_pointer { top: 0; } .fczbkk-popover-rightBottom .fczbkk-popover-static_pointer, .fczbkk-popover-leftBottom .fczbkk-popover-static_pointer { bottom: 0; } .fczbkk-popover-topRight .fczbkk-popover-static_pointer, .fczbkk-popover-bottomRight .fczbkk-popover-static_pointer { right: 0; } .fczbkk-popover-topLeft .fczbkk-popover-static_pointer, .fczbkk-popover-bottomLeft .fczbkk-popover-static_pointer { left: 0; } .inmplayer-general { font-size: 14px; } .inmplayer-launcher { box-sizing: content-box; width: 20px; line-height: 20px; background: #c00; border-radius: 100%; border: 2px solid #fff; color: #fff; font-size: 10px; font-weight: bold; text-align: center; cursor: pointer; cursor: hand; } .inmplayer-trigger { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; background: #03a9f4; color: #ffffff; box-shadow: 0 0 10.5px rgba(0, 0, 0, 0.2); position: fixed; font-size: 17.5px; line-height: 35px; border: 1px solid #fff; border-radius: 5.25px; } .inmplayer-list-item { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; border-bottom: 1px solid #e6f1f6; padding: 2px 10.5px; } .inmplayer-list-item:last-child { border-bottom: none; } .inmplayer-list-item:hover { color: #03a9f4; } .inmplayer-list-empty { color: #ccc; padding: 10.5px 10.5px; } .inmplayer-position-bottom .inmplayer-trigger, .inmplayer-position-top .inmplayer-trigger, .inmplayer-position-left .inmplayer-trigger, .inmplayer-position-right .inmplayer-trigger, .inmplayer-position-right_top .inmplayer-trigger, .inmplayer-position-right_bottom .inmplayer-trigger, .inmplayer-position-left_top .inmplayer-trigger, .inmplayer-position-left_bottom .inmplayer-trigger { width: 140px; text-align: center; } .inmplayer-position-bottom .inmplayer-trigger, .inmplayer-position-top .inmplayer-trigger { left: 50%; margin-left: -70px; } .inmplayer-position-bottom .inmplayer-trigger { bottom: 10px; } .inmplayer-position-top .inmplayer-trigger { top: 10px; } .inmplayer-position-left .inmplayer-trigger, .inmplayer-position-right .inmplayer-trigger { top: 50%; } .inmplayer-position-left .inmplayer-trigger, .inmplayer-position-left_bottom .inmplayer-trigger, .inmplayer-position-left_top .inmplayer-trigger { left: -70px; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg); } .inmplayer-position-right .inmplayer-trigger, .inmplayer-position-right_bottom .inmplayer-trigger, .inmplayer-position-right_top .inmplayer-trigger { right: -70px; -webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); -o-transform: rotate(-90deg); -ms-transform: rotate(-90deg); transform: rotate(-90deg); } .inmplayer-position-bottom_right .inmplayer-trigger { bottom: 10px; right: 10.5px; } .inmplayer-position-bottom_left .inmplayer-trigger { bottom: 10px; left: 10.5px; } .inmplayer-position-top_right .inmplayer-trigger { top: 10px; right: 10.5px; } .inmplayer-position-top_left .inmplayer-trigger { top: 10px; left: 10.5px; } .inmplayer-position-left_top .inmplayer-trigger { top: 80.5px; } .inmplayer-position-left_bottom .inmplayer-trigger { bottom: 80.5px; } .inmplayer-position-right_top .inmplayer-trigger { top: 80.5px; } .inmplayer-position-right_bottom .inmplayer-trigger { bottom: 80.5px; } .inmplayer-position-bottom_right .inmplayer-panel, .inmplayer-position-right_bottom .inmplayer-panel { bottom: 10.5px; right: 10.5px; } .inmplayer-position-bottom_left .inmplayer-panel, .inmplayer-position-left_bottom .inmplayer-panel { bottom: 10.5px; left: 10.5px; } .inmplayer-position-top_right .inmplayer-panel, .inmplayer-position-right_top .inmplayer-panel, .inmplayer-position-right .inmplayer-panel { top: 10.5px; right: 10.5px; } .inmplayer-position-top_left .inmplayer-panel, .inmplayer-position-left_top .inmplayer-panel, .inmplayer-position-left .inmplayer-panel { top: 10.5px; left: 10.5px; } .inmplayer-position-top .inmplayer-panel, .inmplayer-position-bottom .inmplayer-panel { left: 50%; margin-left: -175px; } .inmplayer-position-top .inmplayer-panel { top: 10.5px; } .inmplayer-position-bottom .inmplayer-panel { bottom: 10.5px; } .inmplayer-panel { box-shadow: 0 0 10.5px rgba(0, 0, 0, 0.2); position: fixed; background: #fff; min-width: 350px; border-radius: 5.25px; border: 1px solid #fff; } .inmplayer-panel-header { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; background: #03a9f4; color: #ffffff; font-size: 17.5px; line-height: 35px; border-radius: 5.25px 5.25px 0 0; } .inmplayer-panel-close-button { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; background: #03a9f4; color: #ffffff; position: absolute; top: 0; right: 0; font-size: 17.5px; background-color: transparent; } .inmplayer-panel-body { max-height: 13em; overflow: auto; border: 1px solid #e6f1f6; } .inmplayer-panel-body .inmplayer-highlight { background: #def4ff; } .inmplayer-panel-body .inmplayer-active { padding-left: 7.875px; border-left-width: 3.5px; border-left-color: #79d4fd; border-left-style: solid; } .inmplayer-panel-footer { overflow: hidden; background: #f7fcff; border: 1px solid #e6f1f6; border-top: none; border-radius: 0 0 5.25px 5.25px; } .inmplayer-panel-footer a, .inmplayer-panel-footer div { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; float: left; text-decoration: none; font-size: 14px; color: #7690a2; } .inmplayer-panel-footer-branding { float: right !important; color: #ccc; } .inmplayer-popover { font-size: 14px; line-height: 21px; } .inmplayer-popover-pointer-shape { fill: #03a9f4; stroke: #03a9f4; stroke-width: 1px; } .inmplayer-popover-wrapper { background: #fff; color: #222; border: 1px solid #e6f1f6; border-radius: 5.25px; padding: 0; width: auto; box-shadow: 0 0 10.5px rgba(0, 0, 0, 0.2); } .inmplayer-popover-scroll_message { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; text-align: center; background: #79d4fd; } .inmplayer-popover-close-button { position: absolute; top: 0; right: 0; line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; } .inmplayer-popover-content { padding: 1em; } .inmplayer-popover-title { font-weight: bold; margin-bottom: 1em; } .inmplayer-popover-progress { line-height: 2em; text-align: center; z-index: 10; } .inmplayer-popover-buttons { margin-top: 1em; overflow: hidden; } .inmplayer-popover-button-previous, .inmplayer-popover-button-next, .inmplayer-popover-button-end { line-height: 28px; padding: 0 10.5px; cursor: pointer; cursor: hand; display: block; background: #03a9f4; color: #ffffff; border: 1px solid #0286c2; border-radius: 5.25px; z-index: 20; } .inmplayer-popover-button-previous, .inmplayer-popover-button-next { float: left; margin-right: 10.5px; } .inmplayer-lang-direction-rtl .inmplayer-popover-button-previous, .inmplayer-lang-direction-rtl .inmplayer-popover-button-next { float: left; margin-right: 0; margin-left: 10.5px; } .inmplayer-popover-button-end { float: right; margin-left: 10.5px; } .inmplayer-lang-direction-rtl .inmplayer-popover-button-end { float: left; margin-left: 0; margin-right: 10.5px; } .inmplayer-firstStep .inmplayer-popover-button-previous, .inmplayer-lastStep .inmplayer-popover-button-next { display: none; } .hide_prev .inmplayer-popover-button-previous, .hide_next .inmplayer-popover-button-next, .hide_progress .inmplayer-popover-progress, .hide_navigation .inmplayer-popover-button-previous, .hide_navigation .inmplayer-popover-button-next, .hide_end .inmplayer-popover-button-end, .hide_close .inmplayer-popover-close-button, .hide_controls .inmplayer-popover-button-previous, .hide_controls .inmplayer-popover-button-next, .hide_controls .inmplayer-popover-button-end, .hide_title .inmplayer-popover-title { display: none; } .inmplayer-lang-direction-rtl { text-align: right; } #inline_manual_debug { margin: 0; padding: 0; position: fixed; bottom: 0; left: 0; width: 700px; max-height: 140px; overflow: auto; background: #ffeb86; color: #333; font-family: sans-serif; font-size: 10.5px; } #inline_manual_debug li { list-style: none; border-bottom: 1px solid #ffe353; padding: 3.5px 14px; }"
}.call(this);
(function () {
    createInlineManualPlayer({
        "base_path": "/",
        "api_key": "53bee066cccebf56138d7f33ef28ba94",
        "position": "bottom_left",
        "z_index": 1000,
        "context_topics_only": false,
        "filter_topics_by_language": false,
        "splash_mode": false,
        "hide_trigger": false,
        "custom_trigger": null,
        "backdrop_color": "#000000",
        "backdrop_opacity": "0.5",
        "backdrop_padding": 10,
        "variables": {},
        "tracking": {},
        "l10n": {
            "title": "Inline Manual",
            "footer": "",
            "branding": "Powered by",
            "branding_link": "https://inlinemanual.com/",
            "previous": "&larr; Previous",
            "next": "Next &rarr;",
            "end": "End",
            "back": "Back",
            "empty_topics_list": "No Help topics available for this page.",
            "lang_direction": "ltr"
        },
        "topics": {
            "2699": {
                "id": 2699,
                "parent_id": null,
                "title": "FTUE",
                "description": "First time user experience",
                "type": "tour",
                "language": "en",
                "privacy": "public",
                "published": true,
                "archived": false,
                "published_at": "2015-05-29T15:38:11.848Z",
                "archived_at": null,
                "created_at": "2015-05-29T15:38:11.848Z",
                "updated_at": "2015-05-29T22:04:32.403Z",
                "tags": [],
                "context_paths": [],
                "steps": [{
                    "title": "First Time Walk Trough",
                    "content": "<hr><h4>Follow along with this walk through to learn the basics of the CCMRegistry Application.</h4>",
                    "path": null,
                    "element": null,
                    "position": "top",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": true,
                    "backdrop_cover": false,
                    "condition": false,
                    "class_names": ["hide_title", "hide_end"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": [{"element": null, "scope": "current", "activate": "next", "events": ["next"]}]
                }, {
                    "title": "Navigation",
                    "content": "Use these buttons to change the main screen area to the different funtional areas within the application.",
                    "path": null,
                    "element": "#dashboard",
                    "position": "right",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": [{"element": null, "scope": "current", "activate": "next", "events": ["next"]}]
                }, {
                    "title": "Account Selector",
                    "content": "This menu button displays the currently selected account, click to show a list recently viewed accounts. &nbsp;Selecting a account from the list will swap to that accounts view.",
                    "path": null,
                    "element": "#memberButton",
                    "position": "bottom",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "Message Button",
                    "content": "The message button showthe current number of unread messages, click to display inbox.",
                    "path": null,
                    "element": "#emailBtn",
                    "position": "bottom_left",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "User Button",
                    "content": "The logged-in user is shown here, &nbsp;Click to access Settings, Favorites, Help and other user utilities.",
                    "path": null,
                    "element": ".dropdown > .dropdown-toggle",
                    "position": "bottom_left",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "hotlist",
                    "content": "This area of the dashboard is used to display \"Hot List' patients that are close to completion for the current month, click to access their patient account view.",
                    "path": null,
                    "element": ".h5.small",
                    "position": "bottom",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "Census",
                    "content": "<p>Patient Scoreboard.</p><p style=\"margin-left: 25px;\">Census : total number of patients engaged for the current calendar month.</p><p style=\"margin-left: 25px;\">Complete: number of engaged patients that have reached 20 min of clinical work for the current month.</p><p style=\"margin-left: 25px;\">Incomplete: number of engaged patients that have NOT reached 20 min of clinical work for the current month.</p><p style=\"margin-left: 25px;\">Time Demand: cumulative time required to reach billing status on the Incomplete patient list, shown as Hours:Mins</p>",
                    "path": null,
                    "element": ".dashCont > :nth-child(1)",
                    "position": "bottom_right",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "donuts",
                    "content": "<p>Graphic view of potential revenue for current month. Green represents the number of Complete patients x CMS reimbursement rate for local area.</p><p>Pink represents the number of Incomplete patients x CMS reimbursement rate for local area.</p>",
                    "path": null,
                    "element": ".dashCont > :nth-child(5)",
                    "position": "bottom",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }, {
                    "title": "donuts2",
                    "content": "<p>Graphic view of the clinical risk ratings for the patients loaded into the application. Typically, the higher risk patients will consume more of your resources with respect to chronic care management.</p>",
                    "path": null,
                    "element": ".dashCont > :nth-child(6)",
                    "position": "bottom",
                    "delay": null,
                    "width": 300,
                    "z_index": null,
                    "backdrop": false,
                    "backdrop_cover": false,
                    "condition": true,
                    "class_names": ["hide_title", "hide_end", "hide_prev"],
                    "launcher": null,
                    "url_trigger": null,
                    "triggers": []
                }],
                "launcher": null,
                "version": "HEAD",
                "order": 0,
                "hidden": false,
                "language_agnostic": false,
                "owner": {"id": 2164, "type": "user", "name": "", "username": "carecliques"}
            }
        },
        "style": ".inmplayer-popover-wrapper {  background-color: #f7f0f0;  color: #222222;  border-style: solid;  border-color: #c0c0c0;  border-width: 1px;  -webkit-border-radius: 6px;  -moz-border-radius: 6px;  border-radius: 6px;}.inmplayer-popover-button-previous, .inmplayer-popover-button-next, .inmplayer-popover-button-end {  background-color: #03a9f4;  color: #f1f6f7;  border-style: solid;  border-color: #007db6;  border-width: 1px;  -webkit-border-radius: 2px;  -moz-border-radius: 2px;  border-radius: 2px;}.inmplayer-popover-pointer-shape {  fill: #03a9f4;  stroke: #03a9f4;  stroke-width: 1px;}.inmplayer-launcher {  background-color: #0072cc;  color: #ffffff;  border-style: solid;  border-color: #ffffff;  border-width: 2%;  -webkit-border-radius: 50%;  -moz-border-radius: 50%;  border-radius: 50%;}.inmplayer-panel-header, .inmplayer-trigger {  background-color: #03a9f4;  color: #ffffff;}.inmplayer-panel-close-button {  background-color: transparent;}"
    });
}).call(this);
