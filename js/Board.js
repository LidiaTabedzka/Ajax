 //przesuwanie kart między kolumnami
function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
}

 //tworzenie nowych tablic
 function Board(name) {
    var self = this;

    this.id = randomString()
    this.name = name;
    this.$element = createBoard();

    function createBoard() {
        // CREATING COMPONENTS OF BOARD
        var $board = $('<div>').addClass('board');
        var $boardDescription = $('<h1>').addClass('board-description').text(self.name);
        var $boardDelete = $('<button>').addClass('btn-delete-board').text('x');

        var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column').attr("id", randomString());
        var addColumnButtonId = $boardAddColumn.attr("id");

        var $inputElement = $('<input>').addClass('column-form').attr("placeholder", "Enter a column name").attr("id", randomString());
        var inputElementId = $inputElement.attr("id");

        var $inputAcceptColumn = $('<button>').addClass('column-form btn accept-button').attr("id", randomString());
        $inputAcceptColumn.append('<i class="fa fa-check" aria-hidden="true"></i>');
        var acceptButtonId = $inputAcceptColumn.attr("id");

        var $inputDeleteColumn = $('<button>').addClass('column-form btn delete-button').attr("id", randomString());
        $inputDeleteColumn.append('<i class="fa fa-times" aria-hidden="true"></i>');
        var deleteButtonId = $inputDeleteColumn.attr("id");

        var $columnAlert = $('<p>').addClass('column-alert');
        var $boardColumnContainer = $('<div>').addClass('column-container');

        // ADDING EVENTS
        $boardDelete.click(function() {
            self.removeBoard();
        });
        $boardAddColumn.click(function(){
            showHideButtons("none", "inline");
            $("#" + inputElementId).val("").focus();
        });
        $inputAcceptColumn.click(function(){
            if (($("#" + inputElementId)).val() == "") {
                $columnAlert.text("Please enter a column name!");
            } else {
                $.ajax({
                    url: baseUrl + '/column',
                    method: 'POST',
                    data: {
                        name: ($("#" + inputElementId)).val()
                    },
                    success: function(response){
                        var column = new Column(response.id, ($("#" + inputElementId)).val());
                        self.addColumn(column);
                      }
                });
                showHideButtons("inline", "none");
                $columnAlert.text("");
            }
        });
        $inputElement.keyup(function(event){
            event.preventDefault();
            if (event.keyCode === 13) {
                $inputAcceptColumn.click();
            }
        });
        $inputDeleteColumn.click(function(){
            $columnAlert.text("");
            showHideButtons("inline", "none");
        });
        function showHideButtons (show, hide) {
            $('#' + addColumnButtonId).css("display", show);
            $("#" + inputElementId).css("display", hide);
            $("#" + acceptButtonId).css("display", hide);
            $("#" + deleteButtonId).css("display", hide);
        }
        // CONSTRUCTION BOARD ELEMENT
        $board.append($boardDelete).append($boardDescription).append($boardAddColumn).append($inputElement).append($inputAcceptColumn).append($inputDeleteColumn).append($columnAlert).append($boardColumnContainer);
        // RETURN OF CREATED BOARD
        return $board;
    }
}

//Funkcje tworzenia nowej kolumny i usuwania tablicy
Board.prototype = {
    addColumn: function(column) {
        this.$element.children("div").append(column.$element);
        initSortable();  
    },
    removeBoard: function() {
        this.$element.remove();
    }
}

//Przycisk tworzenia nowej tablicy
$(".create-board").click(function() {
    document.getElementById("boardInput").value = "";
    showHideBoardButtons("inline", "none");
    $("#boardInput").focus();
});

//Pole do wpisania nazwy nowej tablicy - przycisk accept
$("#boardInputAccept").click(function(){
    var name = document.getElementById("boardInput").value;

    if (name == "") {
        $(".board-alert").text("Please enter a board name!");
    } else {
        var board = new Board(name);

        $(".boards-container").append(board.$element);
        $(".board-alert").text("");
        showHideBoardButtons("none", "inline");
    }
});
$("#boardInput").keyup(function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        $("#boardInputAccept").click();
    }
});

//Pole do wpisania nazwy nowej tablicy - przycisk delete
$("#boardInputDelete").click(function(){
    $(".board-alert").text("");
    showHideBoardButtons("none", "inline");
});

function showHideBoardButtons (show, hide) {
    $(".board-form").css("display", show); 
    $(".create-board").css("display", hide); 
}