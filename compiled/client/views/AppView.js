// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.template = _.template('<button class="hit-button">Hit</button> <button class="stand-button">Stand</button> <button class="new-button">New Game</button> <div class="player-hand-container"></div> <div class="dealer-hand-container"></div>');

    AppView.prototype.events = {
      "click .hit-button": function() {
        return this.model.get('playerHand').hit();
      },
      "click .stand-button": function() {
        return this.model.get('playerHand').stand();
      },
      "click .new-button": function() {
        return this.model.trigger('reset', this);
      }
    };

    AppView.prototype.initialize = function() {
      // this.model.on('change:newGame', (function(_this) {
      //   return function() {
      //     return _this.bust();
      //   };
      // })(this));
      this.model.on('change:hands', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
      return this.render();
    };

    AppView.prototype.bust = function() {
      return $('.hit-button, .stand-button').addClass('disable');
    };

    AppView.prototype.render = function() {
      this.$el.children().detach();
      this.$el.html(this.template());
      this.$('.player-hand-container').html(new HandView({
        collection: this.model.get('playerHand')
      }).el);
      return this.$('.dealer-hand-container').html(new HandView({
        collection: this.model.get('dealerHand')
      }).el);
    };

    return AppView;

  })(Backbone.View);

}).call(this);
