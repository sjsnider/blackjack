class window.Hand extends Backbone.Collection

  model: Card

  initialize: (array, @deck, @isDealer) ->

  hit: ->
    @add(@deck.pop()).last()

  stand: ->
    @trigger 'playerStand', @

  dealerPlay: ->
    do @at(0).flip
    # score = do @scores
    that = this
    scoreChecker = (score) ->
      if score.length is 2
        if score[1] < 17
          do that.hit
          scoreChecker (do that.scores)
          $('.hit-button, .stand-button').addClass('disable')
          true
      else if score.length is 3
        if score[2] <= 17
          do that.hit
          scoreChecker (do that.scores)
        else if score[1] <17
          do that.hit
          scoreChecker (do that.scores)
        else
          $('.hit-button, .stand-button').addClass('disable')
          true
    scoreChecker (do that.scores)
    return

  scores: ->
    # The scores are an array of potential scores.
    # Usually, that array contains one element. That is the only score.
    # when there is an ace, it offers you two scores - the original score, and score + 10.
    msg = ''
    hasAce = @reduce (memo, card) ->
      memo or card.get('value') is 1
    , false
    score = @reduce (score, card) ->
      score + if card.get 'revealed' then card.get 'value' else 0
    , 0
    if (score + 10) == 21 and @length == 2 and hasAce
      msg = 'blackJack'
      @trigger 'dealerFlip', @
    if score > 21
      msg = 'bust'
      @trigger 'dealerFlip', @
    if hasAce then [msg, score, score + 10] else [msg, score]
