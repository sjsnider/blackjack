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
      if score.length is 1
        if score[0] < 17
          do that.hit
          scoreChecker (do that.scores)
        # else alert('dealer done')
        true
      else if score.length is 2
        if score[1] <= 17
          do that.hit
          scoreChecker (do that.scores)
        else if score[0] <17
          do that.hit
          scoreChecker (do that.scores)
        else
         # alert('decide winner')
         true
    scoreChecker (do that.scores)
    return

  scores: ->
    # The scores are an array of potential scores.
    # Usually, that array contains one element. That is the only score.
    # when there is an ace, it offers you two scores - the original score, and score + 10.
    hasAce = @reduce (memo, card) ->
      memo or card.get('value') is 1
    , false
    score = @reduce (score, card) ->
      score + if card.get 'revealed' then card.get 'value' else 0
    , 0
    if score > 21 then @trigger 'bust', @
    if hasAce then [score, score + 10] else [score]
