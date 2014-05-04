#todo: refactor to have a game beneath the outer blackjack model
class window.App extends Backbone.Model

  initialize: ->
    @set 'deck', deck = new Deck()
    @set 'playerHand', deck.dealPlayer()
    @set 'dealerHand', deck.dealDealer()
    @set 'hands', 1
    @set 'cash', 500
    @set 'bet', 5

    @get('playerHand').on 'all', @playerEvents, @
    @get('dealerHand').on 'all', @dealerEvents, @

    @on 'reset', =>
      @set 'deck', deck = new Deck()
      @set 'playerHand', deck.dealPlayer()
      @set 'dealerHand', deck.dealDealer()
      @set 'hands', @get('hands') + 1
      @get('playerHand').on 'all', @playerEvents, @
      @get('dealerHand').on 'all', @dealerEvents, @


  dealerEvents: (event)->
    switch event
      when 'bust' then
      when 'stand' then @showDown()

  playerEvents: (event)->
    switch event
      when 'bust' then @get('dealerHand').at(0).flip()
      when 'stand' then @get('dealerHand').dealerPlay()
      when 'blackJack' then @get('dealerHand').at(0).flip()

  showDown: ->
    dScore = @get('dealerHand').scores();
    pScore = @get('playerHand').scores();

    p = if pScore[2] <= 21 then pScore[2] else pScore[1]
    d = if dScore[2] <= 21 then dScore[2] else dScore[1]

    if p > d
      @set('cash', @get('cash')+@get('bet'))
      # @trigger 'win:player', @
    else if p < d
      @set('cash', @get('cash')-@get('bet'))
      # @trigger 'win:dealer', @
    # else @trigger 'push', @
    @trigger 'reset', @


