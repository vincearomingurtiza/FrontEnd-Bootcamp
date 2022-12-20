$(document).ready(function(){
    $("body")
        .on("click", "button", loadTiles)           /* to generate li to #images_list */
        .on("click", ".close_card", flip)       /* to flip card when click */

        loadTiles();                            
        generatePairedCards();
});

function generatePairedCards(){
    let paired_cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    return paired_cards;
};

/* DOCU: Generate li to #images_list
 * Triggered by: .on("click", "h1", loadTiles)
 * Last Updated Date: December 20, 2022 
 * @author: Vince
 * */
function loadTiles(){
    $("#images_list").empty(); 
    let get_paired_cards = generatePairedCards();
    console.log(get_paired_cards.length);
    
    for(let count_start = 0; count_start <= 15 ; count_start++){
        let random_index        = Math.floor((Math.random() * get_paired_cards.length) + 0); 
        let get_array_element   = get_paired_cards.splice(random_index, 1); 
        let create_card         = $("<li>");

        /*  */
        create_card.attr("data-value", get_array_element);
        create_card.addClass("front_card");
        create_card.addClass("close_card");
        $("#images_list").append(create_card);
    }
};

let matched_array = [];

/* DOCU: To flip cards when click
 * Triggered by: .on("click", ".close_card", flip)
 * Last Updated Date: December 20, 2022 
 * @author: Vince
 * */
function flip(){
    $(this).removeClass("front_card");
    $(this).addClass("disabled");
    let selected_data_matched = $(this).attr("data-value");

    if (matched_array.length < 2){
        matched_array.push(selected_data_matched);
    }
    
    if (matched_array.length == 2){
        if (matched_array [0] == matched_array [1]){
            $(".disabled.close_card").removeClass("close_card");
        }else if (matched_array [0] != matched_array [1]){
            setTimeout(function(){
                $(".disabled.close_card").addClass("front_card");
                $(".disabled.close_card").removeClass("disabled");
            },500);
        }
        matched_array = [];
    }
};
