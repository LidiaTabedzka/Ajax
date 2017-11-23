function Card(id, name) {
    var self = this;

    this.id = id;
    this.name = name;
    this.$element = createCard();

    function createCard() {
        // CREATING COMPONENTS OF CARDS
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');
        // ADDING EVENTS
        $cardDelete.click(function() {
            self.removeCard();
        });
        // CONSTRUCTION CARD ELEMENT
        $card.append($cardDelete).append($cardDescription);
        // RETURN OF CREATED CARD
        return $card;
    }
}

//usuwanie karty
Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
          url: baseUrl + '/card/' + self.id,
          method: 'DELETE',
          success: function(){
            self.$element.remove();
          }
        });
    }
}