let recursion_count = 0;
document.addEventListener("DOMContentLoaded", function(){
    duplicateBoxElement();
    let body_element = document.querySelector("body");
    
    body_element.addEventListener("mousedown", function(event){
        if(event.target.classList.contains("box_style")){
            moveBoxElement(event.target);
        }
    });
});

function duplicateBoxElement(){
    let dark_zone_element   = document.getElementById("dark_zone");
    let random_number_for_x = Math.floor(Math.random() * 718);
    let random_number_for_y = Math.floor(Math.random() * 649);
    let create_box = document.createElement("div");
    
    create_box.classList.add("box_" + recursion_count, "box_style");
    dark_zone_element.appendChild(create_box);
    
    document.querySelector(".box_" + recursion_count).style.left = random_number_for_x + "px";
    document.querySelector(".box_" + recursion_count).style.top  = random_number_for_y + "px";
    
    recursion_count++;
    
    setTimeout(function(){
        if(recursion_count < 5){
            duplicateBoxElement();
        }
    }, 0);
}

function moveBoxElement(target){
    let get_this_box      = target;
    let dark_zone_element = document.getElementById("dark_zone");
    let get_safe_zone     = document.querySelector("#safe_zone");
    let get_box_style     = document.querySelectorAll(".box_style");
    // console.log(get_box_style);
    
    /* MOUSEMOVE */
    let mouseMove = function(event){
        let client_X = event.clientX - 195.5;
        let client_Y = event.clientY - 137;
        
        get_this_box.style.left = client_X + "px";
        get_this_box.style.top  = client_Y + "px";

        get_box_style.forEach(function(box){
            let get_this_box_coordinates  = get_this_box.getBoundingClientRect();
            let box_coordinates           = box.getBoundingClientRect();
            let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
            // if(get_this_box != box){
            // }
            if (get_this_box_coordinates.left >= get_safe_zone_coordinates.left){
                get_this_box.classList.add("safe_box");
            } else {
                get_this_box.classList.remove("safe_box");
            }

            if (get_this_box_coordinates.bottom >= box_coordinates.top    &&
                get_this_box_coordinates.top    <= box_coordinates.bottom &&
                get_this_box_coordinates.right  >= box_coordinates.left   &&
                get_this_box_coordinates.left   <= box_coordinates.right){

                    get_this_box.classList.add("collide");
                    box.classList.add("collide");

                    console.log("-------------------------------------------------");
                    console.log(get_this_box);
                    console.log(box);
                    console.log("-------------------------------------------------");
                    console.log(get_this_box.classList);
                    console.log(box.classList);

            } else {
                // get_this_box.classList.remove("collide");
                // box.classList.remove("collide");
            }
            
        })
    }
    /* MOUSEUP */
    let mouseUp = function(){
        this.removeEventListener("mousemove", mouseMove);
        this.removeEventListener("mouseup", mouseUp);
        get_this_box.classList.remove("move_cursor");

        let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
        let get_this_coordinates = get_this_box.getBoundingClientRect();

        if (get_this_coordinates.left >= get_safe_zone_coordinates.left){
            get_this_box.classList.add("disable");
        }
    }
    
    dark_zone_element.addEventListener("mouseup", mouseUp);
    dark_zone_element.addEventListener("mousemove", mouseMove);
    get_this_box.classList.add("move_cursor");
}