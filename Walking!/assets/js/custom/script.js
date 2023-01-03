$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
});

function move(){
    $(document).keyup(function(event){
        let move_element = $("#move_me");
        let remove_classes = move_element.removeClass("move_left_foot_to_left move_right_foot_to_left move_left_foot_to_right move_right_foot_to_right move_left_foot_to_up move_right_foot_to_up move_left_foot_to_down move_right_foot_to_down");
        
        switch (event.which){
            case 37: case 65: {  /*left arrow */
                move_element.css({left: "-=7px"});
                remove_classes;
                move_element.addClass("move_left_foot_to_left");
                break;
            }

            case 39 : case 68: {  /* Right arrow */
                move_element.css({left: "+=7px"});
                remove_classes;
                move_element.addClass("move_left_foot_to_right");
                break;
            }

            case 38: case 87: {  /* Up arrow */
                move_element.css({top: "-=7px"});
                remove_classes;
                move_element.addClass("move_left_foot_to_up");
                break;
            }

            case 40: case 83: {  /* Down arrow */
                move_element.css({top: "+=7px"});
                remove_classes;
                move_element.addClass("move_left_foot_to_down");
                break;
            }
        }
    });

	$(document).keydown(function(event){
        let move_element = $("#move_me");
        let remove_classes = move_element.removeClass("move_left_foot_to_left move_right_foot_to_left move_left_foot_to_right move_right_foot_to_right move_left_foot_to_up move_right_foot_to_up move_left_foot_to_down move_right_foot_to_down");
        
        switch (event.which){
            case 37 : case 65 : {  /*Left arrow */
                move_element.css({left: "-=7px"});
                remove_classes;
                move_element.addClass("move_right_foot_to_left");
                break;
            }

            case 39: case 68: {  /* Right arrow */
                move_element.css({left: "+=7px"});
                remove_classes;
                move_element.addClass("move_right_foot_to_right");
                break;
            }

            case 38: case 87: {  /* Up arrow */
                move_element.css({top: "-=7px"});
                remove_classes;
                move_element.addClass("move_right_foot_to_up");
                break;
            }

            case 40: case 83: {  /* Down arrow */
                move_element.css({top: "+=7px"});
                remove_classes;
                move_element.addClass("move_right_foot_to_down");
                break;
            }
        }
    });
};