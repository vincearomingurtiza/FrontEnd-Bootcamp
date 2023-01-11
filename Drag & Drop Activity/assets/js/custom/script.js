let recursion_count = 0;
$(document).ready(function(){
    $("body")
        .on("click", ".box_style", moveBoxElement)
        duplicateBoxElement()
});

function duplicateBoxElement(){
    let dark_zone_element = document.getElementById("dark_zone");
    let random_number_for_x = Math.floor(Math.random() * 718);
    let random_number_for_y = Math.floor(Math.random() * 649);
    let create_box = document.createElement("span");

    create_box.classList.add("box_" + recursion_count, "box_style");
    dark_zone_element.appendChild(create_box);
    
    $(".box_" + recursion_count).css("left", random_number_for_x + "px");
    $(".box_" + recursion_count).css("top" , random_number_for_y + "px");
    
    recursion_count++;
    
    setTimeout(function(){
        if(recursion_count < 5){
            duplicateBoxElement();
        }
    }, 0);
}

function moveBoxElement(){
    let get_click_element = this;

    let mouseDown = function(){
        this.addEventListener("mousemove", mouseMove);
        this.addEventListener("mouseup", mouseUp)
    }

    let mouseMove = function(event){    
        let client_X = event.clientX;
        let client_Y = event.clientY;
        
        let drag_position_left = client_X - 195.5;
        let drag_position_top  = client_Y - 137;

        get_click_element.style.left = drag_position_left + "px";
        get_click_element.style.top  = drag_position_top  + "px";
    }

    let mouseUp = function(){
        this.removeEventListener("mousemove", mouseMove);
        this.removeEventListener("mouseup", mouseUp);
    }
    
    this.addEventListener("mousedown", mouseDown);
}