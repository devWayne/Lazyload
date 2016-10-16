var defaultOpt = {
    attr: 'data-lazyload',
    attrRetina: 'data-lazyload-retina',
    threshold: 1
}

class Lazyload {
    constructor(opt) {
        this.opt = opt || {};
        for (let key in defaultOpt) {
            this.opt[key] = this.opt[key] || defaultOpt[key];
        }
        this.lastScroll;
        this.ticking = false;
        this.selector = '[' + this.opt.attr + ']'
        this.nodes = document.querySelectorAll(this.selector);
        this.start();
    }

    start() {
        window.addEventListener('scroll', this._scroll.bind(this), false);
        window.addEventListener('resize', this._scroll.bind(this), false);
    }

    stop() {
        window.removeEventListener('scroll', this._scroll.bind(this), false);
        window.removeEventListener('resize', this._scroll.bind(this), false);
    }


    _update() {
        this.nodes = Array.prototype.slice.call(this.nodes);
        this.nodes.forEach(function(v, i) {
            var node = this.nodes[i];
            if (node.hasAttribute(this.opt.attr) && Lazyload._inViewport.call(this, node)) {
                v.setAttribute('src', v.getAttribute(this.opt.attr));
            }
        }.bind(this))
        this.ticking = false;
    }

    _scroll(e) {
        this.lastScroll = window.scrollY;
        if (!this.ticking) {
            requestAnimationFrame(this._update.bind(this));
            this.ticking = true;
        }
    }


    static _inViewport(node) {
        var viewportTop = this.lastScroll;
        var viewportBottom = viewportTop + window.innerHeight;

        var elementTop = Lazyload.getOffsetTop(node);
        var elementBottom = elementTop + node.offsetHeight;
        var threshold = (this.opt.threshold / 100) * window.innerHeight;
        return elementBottom >= viewportTop - threshold && elementTop <= viewportBottom + threshold
    }

    static getOffsetTop(element) {
        var offsetTop = 0;

        do {
            if (!isNaN(element.offsetTop)) {
                offsetTop += element.offsetTop;
            }
        } while (element = element.offsetParent);

        return offsetTop;
    }


}

module.exports = Lazyload
