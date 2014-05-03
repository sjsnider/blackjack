// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.HandView = (function(_super) {
    __extends(HandView, _super);

    function HandView() {
      return HandView.__super__.constructor.apply(this, arguments);
    }

    HandView.prototype.className = 'hand';

    HandView.prototype.template = _.template('<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (<span class="score"></span>)<span class="<% if(isDealer){ %>dealer<% }else{ %>player<% } %> bust"></span></h2>');

    HandView.prototype.initialize = function() {
      this.collection.on('add remove change', (function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
      return this.render();
    };

    HandView.prototype.render = function() {
      var score, selector;
      score = this.collection.scores();
      this.$el.children().detach();
      this.$el.html(this.template(this.collection));
      this.$el.append(this.collection.map(function(card) {
        return new CardView({
          model: card
        }).$el;
      }));
      selector = this.collection.isDealer ? '.dealer.bust' : '.player.bust';
      this.$(selector).text(score[0]);
      this.$('.score').text(score[1]);
      if (score[0] !== '') {
        return $('.hit-button, .stand-button').addClass('disable');
      }
    };

    return HandView;

  })(Backbone.View);

}).call(this);
