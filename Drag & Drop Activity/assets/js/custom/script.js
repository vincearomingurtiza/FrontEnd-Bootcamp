$(document).ready(function(){
    $("body")
        .on("click","#safe_zone", test)
    test()
});

function test(){
    let war_zone_element = document.getElementById("dark_zone");;
    
    for(let counter = 0; counter < 10; counter++){
        let random_number_for_x = Math.floor(Math.random() * 718);
        let random_number_for_y = Math.floor(Math.random() * 649);
        let create_box = document.createElement("span");
        
        create_box.classList.add("box_" + counter, "box_style");
        
        let get_box_element = document.getElementsByClassName("box_" + counter);
        // let get_pixels = random_number_for_x+"px";
        // let get_this = $(".box_"+counter+"");
        $(".box_1").css("left", random_number_for_x + "px");
        $(".box_1").css("top", random_number_for_y + "px");
        // get_box_element.style.left = ""+get_pixels+"";

        // get_box_element.style.left = random_number_for_x + "px";
        // get_box_element.style.top  = random_number_for_y + "px";
        war_zone_element.appendChild(create_box);
        // get_box_element.css("top", ""+random_number_for_y+"px");
        // get_box_element.style.top   = random_number_for_y + "px";
        // console.log(get_this);
        
        console.log("x: " + random_number_for_x);
        console.log("y: " + random_number_for_y);
    }

    for(let counter = 0; counter < 10; counter++){
        let random_number_for_x = Math.floor(Math.random() * 718);
        let random_number_for_y = Math.floor(Math.random() * 649);
        let create_box = document.createElement("span");
        
        create_box.classList.add("box_" + counter, "box_style");
        
        let get_box_element = document.getElementsByClassName("box_" + counter);
        // let get_pixels = random_number_for_x+"px";
        // let get_this = $(".box_"+counter+"");
        $(".box_0").css("left", random_number_for_x + "px");
        $(".box_0").css("top", random_number_for_y + "px");
        // get_box_element.style.left = ""+get_pixels+"";

        // get_box_element.style.left = random_number_for_x + "px";
        // get_box_element.style.top  = random_number_for_y + "px";
        war_zone_element.appendChild(create_box);
        // get_box_element.css("top", ""+random_number_for_y+"px");
        // get_box_element.style.top   = random_number_for_y + "px";
        // console.log(get_this);
        
        console.log("x: " + random_number_for_x);
        console.log("y: " + random_number_for_y);
    }
};