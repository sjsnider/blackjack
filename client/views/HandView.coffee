class window.HandView extends Backbone.View

  className: 'hand'

  #todo: switch to mustache
  template: _.template '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (<span class="score"></span>)<span class="bust"></span></h2>'

  initialize: ->
    @collection.on 'add remove change', => @render()
    @render()

  render: ->
    score = @collection.scores()[0]
    @$el.children().detach()
    @$el.html @template @collection
    @$el.append @collection.map (card) ->
      new CardView(model: card).$el
    @$('.bust').text if score > 21 then "Bust!" else ""
    @$('.score').text score

