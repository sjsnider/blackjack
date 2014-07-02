// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.CardView = (function(_super) {
    __extends(CardView, _super);

    function CardView() {
      return CardView.__super__.constructor.apply(this, arguments);
    }

    CardView.prototype.className = 'card';

    CardView.prototype.template = _.template('<%= rankName %> of <%= suitName %>');

    CardView.prototype.initialize = function() {
      this.model.on('change', (function(_this) {
        return function() {
          return _this.render;
        };
      })(this));
      return this.render();
    };

    CardView.prototype.render = function() {
      this.$el.children().detach().end().html;
      this.$el.html(this.template(this.model.attributes));
      if (!this.model.get('revealed')) {
        return this.$el.addClass('covered');
      }
    };

    return CardView;

  })(Backbone.View);

}).call(this);
