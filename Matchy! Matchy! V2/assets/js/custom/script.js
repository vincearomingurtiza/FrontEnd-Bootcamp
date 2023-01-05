let xny_array = [];
$(document).ready(function(){
    $("body")
    .on("click", "button", loadCards)
    .on("click", ".close_card", flipCard)

    loadCards();
    createPairedCards();
});

function createPairedCards(){
    let paired_cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    return paired_cards;
}

function loadCards(){
    $("#cards_container").empty();
    let select_paired_cards = createPairedCards();

    for(let row_count = 0; row_count < 4; row_count++){
        let create_row = $("<tr>");
        $("#cards_container").append(create_row);
        
        for(let create_card_count =  0; create_card_count < 4; create_card_count++){
            let random_index_count = Math.floor((Math.random() * select_paired_cards.length) + 0);
            let select_array_element =  select_paired_cards.splice(random_index_count, 1);
            let create_card = $("<td>", {class : "card_" + select_array_element});

            create_card.attr("data-card-value", select_array_element);
            create_card.addClass("front_card")
            create_card.addClass("close_card");
            create_row.append(create_card);
        }
    }
};

function flipCard(){
    $(this).removeClass("front_card");
    $(this).addClass("disabled");
    let selected_data_card_value_matched = $(this).attr("data-card-value");
    let close_cards_classes = $(".disabled.close_card");
    
    if (xny_array.length < 2){
        xny_array.push(selected_data_card_value_matched);
    }

    if( xny_array.length == 2){
        if (xny_array[0] == xny_array[1]){
            close_cards_classes.removeClass("close_card");
        } else {
            setTimeout(function(){
                close_cards_classes.addClass("front_card");
                close_cards_classes.removeClass("disabled");
            },500);
        }
        xny_array = [];
    }

};