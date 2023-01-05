let x_array = [];
let add_this = 0;
$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
        walkToTheRight();
});

function move(){
    $(document).on("mouseup", function(event){

        let pokemon_master = $("#pokemon_master");
        let character = pokemon_master[0];
        let get_element = character.getBoundingClientRect();

        let client_horizontal = get_element.left;
        let horizontal = event.clientX;
        let vertical = event.clientY;
        let sprite_class = "";

        character.style.left = horizontal + "px";
        character.style.top  = vertical + "px";
        pokemon_master.removeClass();
        
        if (client_horizontal < x_array[0]){
            sprite_class = "move_right_foot_to_right";
        }
        
        if (client_horizontal > x_array[0]){
            sprite_class = "move_left_foot_to_left";
        }
        pokemon_master.addClass(sprite_class);
        x_array = [];
        
    }) .on("mousedown", function(event){
        let client_x = event.clientX;
        
        if (x_array.length < 2){
            x_array.push(client_x);
        }
    });
};

function walkToTheRight(){
    let pokemon_master = $("#pokemon_master");
    let character = pokemon_master[0];
    let get_element = character.getBoundingClientRect();
    let client_horizontal = get_element.left;

    add_this++;

    let add_the_value_on_clientX = client_horizontal + add_this;
    character.style.left = add_the_value_on_clientX + "px";
    pokemon_master.removeClass();
    pokemon_master.addClass("move_right_foot_to_right");

    setTimeout(function(){
        walkToTheRight();
    }, 200);
}