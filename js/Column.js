function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
        // CREATING COMPONENTS OF COLUMNS
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card').attr("id", randomString());
        var addCardButtonId = $columnAddCard.attr("id");

        var $inputElement = $('<input>').addClass('card-form').attr("placeholder", "Enter a card description").attr("id", randomString());
        var inputElementId = $inputElement.attr("id");

        var $inputAcceptCard = $('<button>').addClass('card-form btn accept-button').attr("id", randomString());
        $inputAcceptCard.append('<i class="fa fa-check" aria-hidden="true"></i>');
        var acceptButtonId = $inputAcceptCard.attr("id");

        var $inputDeleteCard = $('<button>').addClass('card-form btn delete-button').attr("id", randomString());
        $inputDeleteCard.append('<i class="fa fa-times" aria-hidden="true"></i>');
        var deleteButtonId = $inputDeleteCard.attr("id");

        var $cardAlert = $('<p>').addClass('card-alert');

        // ADDING EVENTS
        $columnDelete.click(function() {
            self.removeColumn();
        });
        $columnAddCard.click(function(){
            showHideButtons("none", "inline");    
            $("#" + inputElementId).val("").focus();           
        });
        $inputAcceptCard.click(function(){
            if (($("#" + inputElementId)).val() == "") {
                $cardAlert.text("Please enter a card description!");
            } else {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                    name: ($("#" + inputElementId)).val(),
                    bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, ($("#" + inputElementId)).val());
                        self.addCard(card);
                    }
                });
                showHideButtons("inline", "none");
                $cardAlert.text("");
            }
        });
        $inputElement.keyup(function(event){
            event.preventDefault();
            if (event.keyCode === 13) {
                $inputAcceptCard.click();
            }
        });
        $inputDeleteCard.click(function(){
            $cardAlert.text("");
            showHideButtons("inline", "none");
        });

        function showHideButtons (show, hide) {
            $('#' + addCardButtonId).css("display", show);
            $("#" + inputElementId).css("display", hide);
            $("#" + acceptButtonId).css("display", hide);
            $("#" + deleteButtonId).css("display", hide);
        }
        // CONSTRUCTION COLUMN ELEMENT
        $column.append($columnTitle).append($columnDelete).append($columnAddCard).append($inputElement).append($inputAcceptCard).append($inputDeleteCard).append($cardAlert).append($columnCardList);
        // RETURN OF CREATED COLUMN
        return $column;
    }
}

Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        var self = this;
        $.ajax({
          url: baseUrl + '/column/' + self.id,
          method: 'DELETE',
          success: function(response){
            self.$element.remove();
          }
        });
    }
}