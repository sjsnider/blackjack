// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Hand = (function(_super) {
    __extends(Hand, _super);

    function Hand() {
      return Hand.__super__.constructor.apply(this, arguments);
    }

    Hand.prototype.model = Card;

    Hand.prototype.initialize = function(array, deck, isDealer) {
      this.deck = deck;
      this.isDealer = isDealer;
    };

    Hand.prototype.hit = function() {
      return this.add(this.deck.pop()).last();
    };

    Hand.prototype.stand = function() {
      return this.trigger('playerStand', this);
    };

    Hand.prototype.dealerPlay = function() {
      var scoreChecker, that;
      this.at(0).flip();
      that = this;
      scoreChecker = function(score) {
        if (score.length === 2) {
          if (score[1] < 17) {
            that.hit();
            scoreChecker(that.scores());
            $('.hit-button, .stand-button').addClass('disable');
            return true;
          }
        } else if (score.length === 3) {
          if (score[2] <= 17) {
            that.hit();
            return scoreChecker(that.scores());
          } else if (score[1] < 17) {
            that.hit();
            return scoreChecker(that.scores());
          } else {
            $('.hit-button, .stand-button').addClass('disable');
            return true;
          }
        }
      };
      scoreChecker(that.scores());
    };

    Hand.prototype.scores = function() {
      var hasAce, msg, score;
      msg = '';
      hasAce = this.reduce(function(memo, card) {
        return memo || card.get('value') === 1;
      }, false);
      score = this.reduce(function(score, card) {
        return score + (card.get('revealed') ? card.get('value') : 0);
      }, 0);
      if ((score + 10) === 21 && this.length === 2 && hasAce) {
        msg = 'blackJack';
        this.trigger('dealerFlip', this);
      }
      if (score > 21) {
        msg = 'bust';
        this.trigger('dealerFlip', this);
      }
      if (hasAce) {
        return [msg, score, score + 10];
      } else {
        return [msg, score];
      }
    };

    return Hand;

  })(Backbone.Collection);

}).call(this);
