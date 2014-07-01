/*global window, document*/
;
(function ($, window, document, undefined) {

    var pluginName = "kendoTabSlider",
        defaults = {
            propertyName: "value"
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            this.$el = $(this.element);
            this.$ul = this.$el.find('.k-tabstrip-items').first();

            if (!this.isTabStripActivated()) {
                console.log('No Kendo TabStrip found');
                return false;
            }

            this.modifyUlWidth(this.getTabStripElementsWidth());

            this.findActiveTab();
            this.getTabStripWidth();
            this.modifyGlobalCSS();
            this.getTabStripElementsWidth();
            this.bindEvents();
        },

        isTabStripActivated: function () {
            if (this.$el.data().role == 'tabstrip') return true;
            return false;
        },


        findActiveTab: function () {
            this.$ul.find('.k-state-active').css({'paddingBottom': '2px'});
        },

        getTabStripWidth: function () {
            this.tabStripWidth = this.$ul.width();
            console.log('tabStripWidth', this.tabStripWidth);
        },

        getTabStripElementsWidth: function () {
            var width = 0;
            this.$ul.find('li').each(function (index, item) {
                width += $(item).outerWidth();
            });
            return width;
        },

        modifyGlobalCSS: function () {
            var tabStripWidth = this.$el.outerWidth() - 2 * parseFloat(this.$ul.css('paddingLeft')) - parseInt(this.$el.css('borderLeft'));

            this.$el.css({
                'position': 'relative',
                'paddingTop': parseFloat(this.$ul.outerHeight()) - 1 + 'px',
                'overflow': 'hidden'
            });

            this.$ul.css({
                'position': 'absolute',
                'overflow': 'hidden',
                'top': parseFloat(this.$ul.css('padding-left')) + 'px',
                'paddingTop': '0px',
                'width': this.tabStripWidth + 'px',
                'clip': 'rect(0px,' + tabStripWidth + 'px,36px,0px)',
                'paddingLeft': '0px',
                'marginLeft': parseFloat(this.$ul.css('padding-left')) + 'px'
            });
        },

        modifyUlWidth: function (newWidth) {
            var clipWidth = parseInt(this.$el.width())  - 2 * parseFloat(this.$ul.css('marginLeft')),
                elWidth = this.$el.width();

            if (newWidth > elWidth) {
                this.$ul.css({
                    'width': newWidth,
                    'clip': 'rect(0px,' + clipWidth + 'px,36px,0px)'
                });
            } else {
                this.$ul.css({
                    'width': elWidth,
                    'clip': 'rect(0px,' + elWidth + 'px,36px,0px)'
                });
            }
        },

        bindEvents: function () {
            var parent = this;

            $("#tabStrip").data("kendoTabStrip").bind("select", function (e) {
                parent.modifyTabCSS(e);
            });

            $("#tabStrip").data("kendoTabStrip").bind("activate", function (e) {
                parent.tabActivated(e, parent);
            });

            $(window).resize(function () {
                parent.windowResize();
            });
        },

        windowResize: function () {
            this.modifyUlWidth(this.getTabStripElementsWidth());
        },

        test: function() {
            console.log('z')
        },

        tabActivated: function (e, parent) {
            parent.removePaddingFromInactiveTabs();
            parent.modifyTabCSS(e);
            parent.modifyUlWidth(parent.getTabStripElementsWidth());
        },

        removePaddingFromInactiveTabs: function () {
            this.$ul.find('li').css({'paddingBottom': ''});
        },

        modifyTabCSS: function (elem) {
            var tab = $(elem.item);
            tab.css({
                'paddingBottom': '2px'
            });
        },

        addRightArrow: function () {
            var rArr = this.createArrowTemplate('right');
        },

        addLeftArrow: function () {
            var lArr = this.createArrowTemplate('left');
        },

        createArrowTemplate: function (type) {

        },

        removeRightArrow: function () {

        },

        removeLeftArrow: function () {

        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);