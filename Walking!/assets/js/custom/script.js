$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
});

function move(){
    $(document).on("keyup", function(event){
        let move_element = $("#pokemon_master");
        move_element.removeClass();
        let sprite_class = "";
        
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

    }).on("keydown", function(event){
        let move_element = $("#pokemon_master");
        move_element.removeClass();
        let sprite_class = "";

        switch (event.which){
            case 37: case 65: {  /*Left & A */
                move_element.css({left: "-=10px"});
                sprite_class = ("move_right_foot_to_left");
                break;
            }

            case 38: case 87: {  /* Up & W */
                move_element.css({top: "-=10px"});
                sprite_class = ("move_right_foot_to_up");
                break;
            }

            case 39: case 68: {  /* Right & D */
                move_element.css({left: "+=10px"});
                sprite_class = ("move_right_foot_to_right");
                break;
            }

            case 40: case 83: {  /* Down & S */
                move_element.css({top: "+=10px"});
                sprite_class = ("move_right_foot_to_down");
                break;
            }
        }

        move_element.addClass(sprite_class);
    });
};