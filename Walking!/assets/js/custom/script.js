$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
});

function move(){
    $(document).keyup(function(event){
        let move_element = $("#move_me");
        
        switch (event.which){
            case 37: case 65: {  /*Left & A */
                move_element.css({left: "-=10px"});
                move_element.removeClass();
                move_element.addClass("move_left_foot_to_left");
                break;
            }

            case 39 : case 68: {  /* Right & D*/
                move_element.css({left: "+=10px"});
                move_element.removeClass();
                move_element.addClass("move_left_foot_to_right");
                break;
            }

            case 38: case 87: {  /* Up & W */
                move_element.css({top: "-=10px"});
                move_element.removeClass();
                move_element.addClass("move_left_foot_to_up");
                break;
            }

            case 40: case 83: {  /* Down & S*/
                move_element.css({top: "+=10px"});
                move_element.removeClass();
                move_element.addClass("move_left_foot_to_down");
                break;
            }
        }
    });

	$(document).keydown(function(event){
        let move_element = $("#move_me");

        switch (event.which){
            case 37: case 65: {  /*Left & A */
                move_element.css({left: "-=10px"});
                move_element.removeClass();
                move_element.addClass("move_right_foot_to_left");
                break;
            }

            case 39: case 68: {  /* Right & D */
                move_element.css({left: "+=10px"});
                move_element.removeClass();
                move_element.addClass("move_right_foot_to_right");
                break;
            }

            case 38: case 87: {  /* Up & W */
                move_element.css({top: "-=10px"});
                move_element.removeClass();
                move_element.addClass("move_right_foot_to_up");
                break;
            }

            case 40: case 83: {  /* Down & S */
                move_element.css({top: "+=10px"});
                move_element.removeClass();
                move_element.addClass("move_right_foot_to_down");
                break;
            }
        }
    });
};