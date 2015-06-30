var defaultOpt = {
    attr: 'data-lazyload',
    attrRetina: 'data-lazyload-retina',
    threshold: 1
}

function Lazyload(opt) {
    this.opt = opt || {};
    for (key in defaultOpt) {
        this.opt[key] = this.opt[key] || defaultOpt[key];
    }
    this.lastScroll;
    this.ticking = false;
    this.selector = '[' + this.opt.attr + ']'
    this.nodes = document.querySelectorAll(this.selector);
    this.start();
}

var proto = {
    start: function() {
        window.addEventListener('scroll', _scroll.bind(this), false);
        window.addEventListener('resize', _scroll.bind(this), false);
    },
    stop: function() {
        window.removeEventListener('scroll', _scroll.bind(this), false);
        window.removeEventListener('resize', _scroll.bind(this),  false);
    }
};


function _update() {
    this.nodes = Array.prototype.slice.call(this.nodes);
    this.nodes.forEach(function(v, i) {
        var node = this.nodes[i];
        if (node.hasAttribute(this.opt.attr) && _inViewport.call(this, node)) {
            v.setAttribute('src', v.getAttribute(this.opt.attr));
        }
    }.bind(this))
    this.ticking = false;
}

function _scroll(e) {
    this.lastScroll = window.scrollY;
    if (!this.ticking) {
        requestAnimationFrame(_update.bind(this));
        this.ticking = true;
    }
}

function _inViewport(node) {
    var viewportTop = this.lastScroll;
    var viewportBottom = viewportTop + window.innerHeight;

    var elementTop = getOffsetTop(node);
    var elementBottom = elementTop + node.offsetHeight;
    var threshold = (this.opt.threshold / 100) * window.innerHeight;
    return elementBottom >= viewportTop - threshold && elementTop <= viewportBottom + threshold
}

function getOffsetTop(element) {
    var offsetTop = 0;

    do {
        if (!isNaN(element.offsetTop)) {
            offsetTop += element.offsetTop;
        }
    } while (element = element.offsetParent);

    return offsetTop;
}


Lazyload.prototype = proto;

module.exports = {
    Lazyload: Lazyload
}
