class window.HandView extends Backbone.View

  className: 'hand'

  #todo: switch to mustache
  template: _.template '<h2><% if(isDealer){ %>Dealer<% }else{ %>You<% } %> (<span class="score"></span>)<span class="<% if(isDealer){ %>dealer<% }else{ %>player<% } %> bust"></span></h2>'

  initialize: ->
    @collection.on 'add remove change', => @render()
    @render()

  render: ->
    score = @collection.scores()
    @$el.children().detach()
    @$el.html @template @collection
    @$el.append @collection.map (card) ->
      new CardView(model: card).$el

    selector = if @collection.isDealer then '.dealer.bust' else '.player.bust'
    @$(selector).text(score[0])
    @$('.score').text score[1]
    if score[0] != ''
      $('.hit-button, .stand-button').addClass('disable')


