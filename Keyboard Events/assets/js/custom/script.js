$(document).ready(function(){
    $("body")
        .on("click", "body", move)
        move();
});

function move(){
	$(document).keydown(function(event){
        console.log(event.which);
        switch (event.which){
            case 37: {  /*left arrow */
                $("#move_me").css({
                    left: "-=10px"
                })
                break;
            }

            case 39: {  /* Right arrow */
                $("#move_me").css({
                    left: "+=10px"
                })
                break;
            }

            case 38: {  /* Up arrow */
                $("#move_me").css({
                    top: "-=10px"
                })
                break;
            }

            case 40: {  /* Down arrow */
                $("#move_me").css({
                    top: "+=10px"
                })
                break;
            }

            case 65: {  /* A */
                $("#move_me").css({
                    left: "-=10px"
                })
                break;
            }

            case 68: {  /* D */
                $("#move_me").css({
                    left: "+=10px"
                })
                break;
            }

            case 87: {  /* W */
                $("#move_me").css({
                    top: "-=10px"
                })
                break;
            }

            case 83: {  /* S */
                $("#move_me").css({
                    top: "+=10px"
                })
                break;
            }

            case 32: {  /* Spacebar Change Color*/
                let random_number = Math.floor((Math.random() * 5) + 1);
                
                $("#move_me").removeClass("color_1 color_2 color_3 color_4 color_5");
                $("#move_me").addClass("color_" + random_number);
                break;
            }
        }
    })
};