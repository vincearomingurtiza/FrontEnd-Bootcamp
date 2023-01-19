let recursion_count = 0;
const LEFT_MAX_COORDINATES = 718;
const TOP_MAX_COORDINATES = 649;

document.addEventListener("DOMContentLoaded", function(){
    duplicateBoxElement();
});

function duplicateBoxElement(){
    let dark_zone_element   = document.getElementById("dark_zone");
    let random_number_for_x = Math.floor(Math.random() * LEFT_MAX_COORDINATES);
    let random_number_for_y = Math.floor(Math.random() * TOP_MAX_COORDINATES);
    let create_box = document.createElement("div");
    
    create_box.classList.add("box_" + recursion_count, "box_style");
    dark_zone_element.appendChild(create_box);

    create_box.addEventListener("mousedown", function(event){
        if (event.target.classList.contains("disable") == false){
            event.target.classList.add("drag_start");
            console.log("down");
        }
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
    event.target.classList.remove("drag_start");

    let get_safe_zone = document.querySelector("#safe_zone");
    let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
    let get_this_coordinates = event.target.getBoundingClientRect();

    if (get_this_coordinates.left >= get_safe_zone_coordinates.left){
        event.target.classList.add("disable");
    }
}

function isColliding (box_a, box_b){

    let box_a_left = parseInt(box_a.x);
    let box_a_top = parseInt(box_a.y);
    let box_a_width = parseInt(box_a.width);
    let box_a_height = parseInt(box_a.height);

    let box_b_left = parseInt(box_b.x);
    let box_b_top = parseInt(box_b.y);
    let box_b_width = parseInt(box_b.width);
    let box_b_height = parseInt(box_b.height);

    return (box_a_left < box_b_left + box_b_width &&
    box_a_left + box_a_width > box_b_left &&
    box_a_top  < box_b_top + box_b_height &&
    box_a_top + box_a_height > box_b_top);
}

function onMouseMove(event){
    let dark_zone = document.querySelector("#dark_zone").getBoundingClientRect();

    if (event.target.classList.contains("drag_start")){
        let dragging_box = event.target;
        let dragging_box_coordinates  = dragging_box.getBoundingClientRect();

        let client_X = event.clientX - (dark_zone.left + 20);
        let client_Y = event.clientY - (dark_zone.top + 20);
        
        dragging_box.style.left = client_X + "px";
        dragging_box.style.top  = client_Y + "px";
        
        checkBoxCollisions(dragging_box, dragging_box_coordinates);
    }
}

function checkBoxCollisions(dragging_box, dragging_box_coordinates){
    let other_boxes     = document.querySelectorAll(".box_style:not(.drag_start)");
    let is_box_coliding = false;

    other_boxes.forEach(function(current_box){
        let current_box_coordinates   = current_box.getBoundingClientRect();
        console.log(isColliding(dragging_box_coordinates, current_box_coordinates));
        // /* Collision Check */
        if(isColliding(dragging_box_coordinates, current_box_coordinates)){ 
            is_box_coliding = true;
            current_box.classList.add("collide");

        } else {
            current_box.classList.remove("collide");
        }

        if(is_box_coliding){
            dragging_box.classList.add("collide");

        } else {
            dragging_box.classList.remove("collide");
        }
    });
}