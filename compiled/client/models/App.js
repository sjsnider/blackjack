// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.App = (function(_super) {
    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.initialize = function() {
      var deck;
      this.set('deck', deck = new Deck());
      this.set('playerHand', deck.dealPlayer());
      this.set('dealerHand', deck.dealDealer());
      this.set('hands', 1);
      this.set('cash', 500);
      this.set('bet', 5);
      this.get('playerHand').on('all', this.playerEvents, this);
      this.get('dealerHand').on('all', this.dealerEvents, this);
      return this.on('reset', (function(_this) {
        return function() {
          _this.set('deck', deck = new Deck());
          _this.set('playerHand', deck.dealPlayer());
          _this.set('dealerHand', deck.dealDealer());
          _this.set('hands', _this.get('hands') + 1);
          _this.get('playerHand').on('all', _this.playerEvents, _this);
          return _this.get('dealerHand').on('all', _this.dealerEvents, _this);
        };
      })(this));
    };

    App.prototype.dealerEvents = function(event) {
      switch (event) {
        case 'bust':
          break;
        case 'stand':
          return this.showDown();
      }
    };

    App.prototype.playerEvents = function(event) {
      switch (event) {
        case 'bust':
          return this.get('dealerHand').at(0).flip();
        case 'stand':
          return this.get('dealerHand').dealerPlay();
        case 'blackJack':
          return this.get('dealerHand').at(0).flip();
      }
    };

    App.prototype.showDown = function() {
      var d, dScore, p, pScore;
      dScore = this.get('dealerHand').scores();
      pScore = this.get('playerHand').scores();
      p = pScore[2] <= 21 ? pScore[2] : pScore[1];
      d = dScore[2] <= 21 ? dScore[2] : dScore[1];
      if (p > d) {
        this.set('cash', this.get('cash') + this.get('bet'));
      } else if (p < d) {
        this.set('cash', this.get('cash') - this.get('bet'));
      }
      return this.trigger('reset', this);
    };

    return App;

  })(Backbone.Model);

}).call(this);
