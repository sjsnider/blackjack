#todo: refactor to have a game beneath the outer blackjack model
class window.App extends Backbone.Model

  initialize: ->
    @set 'deck', deck = new Deck()
    @set 'playerHand', deck.dealPlayer()
    @set 'dealerHand', deck.dealDealer()
    @set 'newGame', false
    @set 'hands', 1

    dealer = @get 'dealerHand'
    player = @get 'playerHand'
    player.on 'bust', ->
      do dealer.at(0).flip
      @set 'newGame', true
    , @

    @on 'reset', =>
      @set 'deck', deck = new Deck()
      @set 'playerHand', deck.dealPlayer()
      @set 'dealerHand', deck.dealDealer()
      @set 'newGame', false
      @set 'hands', @get('hands') + 1

      dealer = @get 'dealerHand'
      player = @get 'playerHand'
      player.on 'bust', ->
        do dealer.at(0).flip
        @set 'newGame', true
      , @
