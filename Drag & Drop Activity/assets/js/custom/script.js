let recursion_count = 0;
document.addEventListener("DOMContentLoaded", function(){
    duplicateBoxElement();
});

function duplicateBoxElement(){
    let dark_zone_element   = document.getElementById("dark_zone");
    let random_number_for_x = Math.floor(Math.random() * 718);
    let random_number_for_y = Math.floor(Math.random() * 649);
    let create_box = document.createElement("div");
    
    create_box.classList.add("box_" + recursion_count, "box_style");
    dark_zone_element.appendChild(create_box);

    create_box.addEventListener("mousedown", function(event){
        event.target.classList.add("drag_start");
        event.target.classList.add("move_cursor");
        console.log("down");
    });

    create_box.addEventListener("mousemove", onMouseMove);
    create_box.addEventListener("mouseup", onMouseUp);
    
    document.querySelector(".box_" + recursion_count).style.left = random_number_for_x + "px";
    document.querySelector(".box_" + recursion_count).style.top  = random_number_for_y + "px";
    
    recursion_count++;
    
    setTimeout(function(){
        if(recursion_count < 5){
            duplicateBoxElement();
        }
    }, 0);
}

function onMouseUp(event){
    console.log("up");
    event.target.classList.remove("drag_start");
    event.target.classList.remove("move_cursor");

    let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
    let get_this_coordinates = dragging_box.getBoundingClientRect();

    if (get_this_coordinates.left >= get_safe_zone_coordinates.left){
        dragging_box.classList.add("disable");
    }
}
function onMouseMove(event){
    if (event.target.classList.contains("drag_start")){
        let dragging_box = event.target;
        let dragging_box_coordinates  = dragging_box.getBoundingClientRect();
        // let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
        let other_boxes     = document.querySelectorAll(".box_style:not(.move_cursor)");

        console.log("move");
        let client_X = event.clientX - 195.5;
        let client_Y = event.clientY - 130;
        
        dragging_box.style.left = client_X + "px";
        dragging_box.style.top  = client_Y + "px";

        other_boxes.forEach(function(current_box){
            let current_box_coordinates   = current_box.getBoundingClientRect();
            if(dragging_box != current_box){
                /* Safe Box Check */
                // if (get_this_box_coordinates.left >= get_safe_zone_coordinates.left){
                //     dragging_box.classList.add("safe_box");
                // } else {
                //     dragging_box.classList.remove("safe_box");
                // }
                
                /* Collision Check */
                if (dragging_box_coordinates.bottom >= current_box_coordinates.top    &&
                    dragging_box_coordinates.top    <= current_box_coordinates.bottom &&
                    dragging_box_coordinates.right  >= current_box_coordinates.left   &&
                    dragging_box_coordinates.left   <= current_box_coordinates.right){
    
                        dragging_box.classList.add("collide");
                        current_box.classList.add("collide");
                } else {
                    dragging_box.classList.remove("collide");
                    current_box.classList.remove("collide");
                }
            }
        });
    }
}