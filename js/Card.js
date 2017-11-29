function Card(id, name, columnId) {
    var self = this;

    this.id = id;
    this.name = name;
    this.columnId = columnId;
    this.$element = createCard();

    function createCard() {
        // CREATING COMPONENTS OF CARDS
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');
        var $cardChangeDescription = $('<button>').addClass('description-change');
        $cardChangeDescription.append('<i class="fa fa-pencil" aria-hidden="true"></i>');
        // ADDING EVENTS
        $cardDelete.click(function() {
            self.removeCard();
        });
        $cardChangeDescription.click(function(){
            self.changeCardDescription();
        })
        // CONSTRUCTION CARD ELEMENT
        $card.append($cardDelete).append($cardDescription).append($cardChangeDescription);
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
    },
    changeCardDescription: function() {
        var self = this;

        self.$element.parent().siblings(".add-card").css("display", "none");
        self.$element.parent().siblings(".card-change-form").css("display", "inline");

        self.$element.parent().siblings('.input-change').val(self.name).focus();

        self.$element.parent().siblings(".accept-change-button").click(function(){
            self.name = self.$element.parent().siblings('.input-change').val();

            if ( self.name == "") {
                self.name = "No description";
            } 
                
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: self.name,
                    bootcamp_kanban_column_id: self.columnId
                },
                success: function (){
                    self.$element.children('.card-description').text(self.name);  
                    self.$element.parent().siblings(".add-card").css("display", "inline");
                    self.$element.parent().siblings(".card-change-form").css("display", "none");
                    self.$element.parent().siblings(".accept-change-button").off('click');
                }
            });
        });

        self.$element.parent().siblings('.input-change').keyup(function(event){
            event.preventDefault();
            if (event.keyCode === 13) {
                self.$element.parent().siblings(".accept-change-button").click();
                self.$element.parent().siblings(".accept-change-button").off('click');
            }
        });
    }
}

