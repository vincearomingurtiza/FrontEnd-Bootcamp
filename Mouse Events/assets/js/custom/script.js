let x_array = [];
$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
});

function move(){
    $(document).on("keyup", function(event){
        let move_element = $("#pokemon_master");
        let sprite_class = "";
        move_element.removeClass();
        
        switch (event.which){
            case 37: case 65: {  /*Left & A */
                move_element.css({left: "-=10px"});
                sprite_class = "move_left_foot_to_left";
                break;
            }

            case 38: case 87: {  /* Up & W */
                move_element.css({top: "-=10px"});
                sprite_class = ("move_left_foot_to_up");
                break;
            }

            case 39 : case 68: {  /* Right & D*/
                move_element.css({left: "+=10px"});
                sprite_class = ("move_left_foot_to_right");
                break;
            }

            case 40: case 83: {  /* Down & S*/
                move_element.css({top: "+=10px"});
                sprite_class = ("move_left_foot_to_down");
                break;
            }
        }
     
        move_element.addClass(sprite_class);

    }) .on("keydown", function(event){
        let move_element = $("#pokemon_master");
        let sprite_class = "";
        move_element.removeClass();

        switch (event.which){
            case 37: case 65: {  /*Left & A */
                move_element.css({left: "-=10px"});
                sprite_class = "move_right_foot_to_left";
                break;
            }

            case 38: case 87: {  /* Up & W */
                move_element.css({top: "-=10px"});
                sprite_class = "move_right_foot_to_up";
                break;
            }

            case 39: case 68: {  /* Right & D */
                move_element.css({left: "+=10px"});
                sprite_class = "move_right_foot_to_right";
                break;
            }

            case 40: case 83: {  /* Down & S */
                move_element.css({top: "+=10px"});
                sprite_class = "move_right_foot_to_down";
                break;
            }
        }
        move_element.addClass(sprite_class);
    
    }) .on("mouseup", function(event){

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