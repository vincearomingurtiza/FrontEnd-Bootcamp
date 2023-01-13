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
    let dark_zone_element = document.getElementById("dark_zone");

    let get_safe_zone = document.querySelector("#safe_zone");
    let get_box_style = document.querySelector(".box_style");
    let get_this_this = get_click_element;
    let get_box_0 = document.querySelector(".box_0");
    let get_box_1 = document.querySelector(".box_1");
    let get_box_2 = document.querySelector(".box_2");
    let get_box_3 = document.querySelector(".box_3");
    let get_box_4 = document.querySelector(".box_4");

    

    let mouseDown = function(event){
        dark_zone_element.addEventListener("mousemove", mouseMove);
        dark_zone_element.addEventListener("mouseup", mouseUp);
        get_click_element.classList.add("move_cursor");
    }
    
    let mouseMove = function(event){
        let client_X = event.clientX;
        let client_Y = event.clientY;
        
        let drag_position_left = client_X - 195.5;
        let drag_position_top  = client_Y - 137;
        
        let this_this = event.target;
        get_click_element.style.left = drag_position_left + "px";
        get_click_element.style.top  = drag_position_top  + "px";

        for(let counter = 0; counter < 5; counter++){
            let get_box_coordinates = get_box_0;
        }
 
        let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
        let get_box_style_coordinates = get_box_style.getBoundingClientRect();
        let get_this_this_coordinates = get_this_this.getBoundingClientRect();
        let active_click              = this.getBoundingClientRect();
        
        let get_box_0_coordinates = get_box_0.getBoundingClientRect();
        let get_box_1_coordinates = get_box_1.getBoundingClientRect();
        let get_box_2_coordinates = get_box_2.getBoundingClientRect();
        let get_box_3_coordinates = get_box_3.getBoundingClientRect();
        let get_box_4_coordinates = get_box_4.getBoundingClientRect();

        if (get_box_style_coordinates.left >= get_safe_zone_coordinates.left){
            get_box_0.classList.add("safe_box");
        } else {
            get_box_0.classList.remove("safe_box");
            get_box_0.classList.remove("collide");
            get_box_1.classList.remove("collide");
            get_box_2.classList.remove("collide");
            get_box_3.classList.remove("collide");
            get_box_4.classList.remove("collide");
        }

        if (active_click.bottom >= get_box_0_coordinates.top    &&
            active_click.top    <= get_box_0_coordinates.bottom &&
            active_click.right  >= get_box_0_coordinates.left   &&
            active_click.left   <= get_box_0_coordinates.right){
            // active_click.classList.add("collide");
            get_box_0.classList.add("collide");
        } else if (
            active_click.bottom >= get_box_1_coordinates.top    &&
            active_click.top    <= get_box_1_coordinates.bottom &&
            active_click.right  >= get_box_1_coordinates.left   &&
            active_click.left   <= get_box_1_coordinates.right){
            // active_click.classList.add("collide");
            get_box_1.classList.add("collide");
        } else if (
            active_click.bottom >= get_box_2_coordinates.top    &&
            active_click.top    <= get_box_2_coordinates.bottom &&
            active_click.right  >= get_box_2_coordinates.left   &&
            active_click.left   <= get_box_2_coordinates.right){
            // active_click.classList.add("collide");
            get_box_2.classList.add("collide");
        } else if (
            active_click.bottom >= get_box_3_coordinates.top    &&
            active_click.top    <= get_box_3_coordinates.bottom &&
            active_click.right  >= get_box_3_coordinates.left   &&
            active_click.left   <= get_box_3_coordinates.right){
            // active_click.classList.add("collide");
            get_box_3.classList.add("collide");
        } else if (
            active_click.bottom >= get_box_4_coordinates.top    &&
            active_click.top    <= get_box_4_coordinates.bottom &&
            active_click.right  >= get_box_4_coordinates.left   &&
            active_click.left   <= get_box_4_coordinates.right){
            // active_click.classList.add("collide");
            get_box_4.classList.add("collide");
        } else {
            get_click_element.classList.remove("collide");
            get_box_0.classList.remove("collide");
            get_box_1.classList.remove("collide");
            get_box_2.classList.remove("collide");
            get_box_3.classList.remove("collide");
            get_box_4.classList.remove("collide");
        }
    }

    let mouseUp = function(){
        this.removeEventListener("mousemove", mouseMove);
        this.removeEventListener("mouseup", mouseUp);
        get_click_element.classList.remove("move_cursor");

        let get_safe_zone_coordinates = get_safe_zone.getBoundingClientRect();
        let get_box_style_coordinates = get_box_style.getBoundingClientRect();

        if (get_box_style_coordinates.left >= get_safe_zone_coordinates.left){
            get_box_0.classList.add("disable");
        }
    }
    
    this.addEventListener("mousedown", mouseDown);
}




  // if(
        //     get_box_1_coordinates.bottom >= get_box_0_coordinates.top    &&
        //     get_box_1_coordinates.top    <= get_box_0_coordinates.bottom &&
        //     get_box_1_coordinates.right  >= get_box_0_coordinates.left   &&
        //     get_box_1_coordinates.left   <= get_box_0_coordinates.right){

        //     get_box_1.classList.add("collide");
        //     get_box_0.classList.add("collide");
        // }
        // else if(
        //     get_box_1_coordinates.bottom >= get_box_2_coordinates.top    &&
        //     get_box_1_coordinates.top    <= get_box_2_coordinates.bottom &&
        //     get_box_1_coordinates.right  >= get_box_2_coordinates.left   &&
        //     get_box_1_coordinates.left   <= get_box_2_coordinates.right){

        //     get_box_1.classList.add("collide");
        //     get_box_2.classList.add("collide");
        // }

        // else if(
        //     get_box_1_coordinates.bottom >= get_box_3_coordinates.top    &&
        //     get_box_1_coordinates.top    <= get_box_3_coordinates.bottom &&
        //     get_box_1_coordinates.right  >= get_box_3_coordinates.left   &&
        //     get_box_1_coordinates.left   <= get_box_3_coordinates.right){

        //     get_box_1.classList.add("collide");
        //     get_box_3.classList.add("collide");
        // }

        // else if(
        //     get_box_1_coordinates.bottom >= get_box_4_coordinates.top    &&
        //     get_box_1_coordinates.top    <= get_box_4_coordinates.bottom &&
        //     get_box_1_coordinates.right  >= get_box_4_coordinates.left   &&
        //     get_box_1_coordinates.left   <= get_box_4_coordinates.right){

        //     get_box_1.classList.add("collide");
        //     get_box_4.classList.add("collide");
        // }

        // else if(
        //     get_box_2_coordinates.bottom >= get_box_0_coordinates.top    &&
        //     get_box_2_coordinates.top    <= get_box_0_coordinates.bottom &&
        //     get_box_2_coordinates.right  >= get_box_0_coordinates.left   &&
        //     get_box_2_coordinates.left   <= get_box_0_coordinates.right){

        //     get_box_2.classList.add("collide");
        //     get_box_0.classList.add("collide");
        // }

        // else if(
        //     get_box_2_coordinates.bottom >= get_box_1_coordinates.top    &&
        //     get_box_2_coordinates.top    <= get_box_1_coordinates.bottom &&
        //     get_box_2_coordinates.right  >= get_box_1_coordinates.left   &&
        //     get_box_2_coordinates.left   <= get_box_1_coordinates.right){

        //     get_box_2.classList.add("collide");
        //     get_box_1.classList.add("collide");
        // }

        // else if(
        //     get_box_2_coordinates.bottom >= get_box_3_coordinates.top    &&
        //     get_box_2_coordinates.top    <= get_box_3_coordinates.bottom &&
        //     get_box_2_coordinates.right  >= get_box_3_coordinates.left   &&
        //     get_box_2_coordinates.left   <= get_box_3_coordinates.right){

        //     get_box_2.classList.add("collide");
        //     get_box_3.classList.add("collide");
        // }

        // else if(
        //     get_box_2_coordinates.bottom >= get_box_4_coordinates.top    &&
        //     get_box_2_coordinates.top    <= get_box_4_coordinates.bottom &&
        //     get_box_2_coordinates.right  >= get_box_4_coordinates.left   &&
        //     get_box_2_coordinates.left   <= get_box_4_coordinates.right){

        //     get_box_2.classList.add("collide");
        //     get_box_4.classList.add("collide");
        // }

        // else if(
        //     get_box_3_coordinates.bottom >= get_box_0_coordinates.top    &&
        //     get_box_3_coordinates.top    <= get_box_0_coordinates.bottom &&
        //     get_box_3_coordinates.right  >= get_box_0_coordinates.left   &&
        //     get_box_3_coordinates.left   <= get_box_0_coordinates.right){

        //     get_box_3.classList.add("collide");
        //     get_box_0.classList.add("collide");
        // }

        // else if(
        //     get_box_3_coordinates.bottom >= get_box_1_coordinates.top    &&
        //     get_box_3_coordinates.top    <= get_box_1_coordinates.bottom &&
        //     get_box_3_coordinates.right  >= get_box_1_coordinates.left   &&
        //     get_box_3_coordinates.left   <= get_box_1_coordinates.right){

        //     get_box_3.classList.add("collide");
        //     get_box_1.classList.add("collide");
        // }

        // else if(
        //     get_box_3_coordinates.bottom >= get_box_2_coordinates.top    &&
        //     get_box_3_coordinates.top    <= get_box_2_coordinates.bottom &&
        //     get_box_3_coordinates.right  >= get_box_2_coordinates.left   &&
        //     get_box_3_coordinates.left   <= get_box_2_coordinates.right){

        //     get_box_3.classList.add("collide");
        //     get_box_2.classList.add("collide");
        // }

        // else if(
        //     get_box_3_coordinates.bottom >= get_box_4_coordinates.top    &&
        //     get_box_3_coordinates.top    <= get_box_4_coordinates.bottom &&
        //     get_box_3_coordinates.right  >= get_box_4_coordinates.left   &&
        //     get_box_3_coordinates.left   <= get_box_4_coordinates.right){

        //     get_box_3.classList.add("collide");
        //     get_box_4.classList.add("collide");
        // }

        // else if(
        //     get_box_4_coordinates.bottom >= get_box_0_coordinates.top    &&
        //     get_box_4_coordinates.top    <= get_box_0_coordinates.bottom &&
        //     get_box_4_coordinates.right  >= get_box_0_coordinates.left   &&
        //     get_box_4_coordinates.left   <= get_box_0_coordinates.right){

        //     get_box_4.classList.add("collide");
        //     get_box_0.classList.add("collide");
        // }

        // else if(
        //     get_box_4_coordinates.bottom >= get_box_1_coordinates.top    &&
        //     get_box_4_coordinates.top    <= get_box_1_coordinates.bottom &&
        //     get_box_4_coordinates.right  >= get_box_1_coordinates.left   &&
        //     get_box_4_coordinates.left   <= get_box_1_coordinates.right){

        //     get_box_4.classList.add("collide");
        //     get_box_1.classList.add("collide");
        // }

        // else if(
        //     get_box_4_coordinates.bottom >= get_box_2_coordinates.top    &&
        //     get_box_4_coordinates.top    <= get_box_2_coordinates.bottom &&
        //     get_box_4_coordinates.right  >= get_box_2_coordinates.left   &&
        //     get_box_4_coordinates.left   <= get_box_2_coordinates.right){

        //     get_box_4.classList.add("collide");
        //     get_box_2.classList.add("collide");
        // }

        // else if(
        //     get_box_4_coordinates.bottom >= get_box_3_coordinates.top    &&
        //     get_box_4_coordinates.top    <= get_box_3_coordinates.bottom &&
        //     get_box_4_coordinates.right  >= get_box_3_coordinates.left   &&
        //     get_box_4_coordinates.left   <= get_box_3_coordinates.right){

        //     get_box_4.classList.add("collide");
        //     get_box_3.classList.add("collide");
        // }