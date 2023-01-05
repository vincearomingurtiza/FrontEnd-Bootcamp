$(document).ready(function(){
    $("body")
        .on("change", "input", inputChange)
        .on("click", "button", countDown)
        countDown();
});

function inputChange(){
    let get_input = document.getElementById("number_type").value;
    let push_text = document.getElementById("push");
    
    push_text.innerHTML = get_input;
};

function countDown(){
    let get_input = document.getElementById("number_type").value;
    let push_text = document.getElementById("push");
    
    setInterval(function(){
        get_input--;

        if (get_input >= 0){
            let get_element_where_to_push = push_text;
            get_element_where_to_push.innerHTML = get_input;
            console.log(get_input);
        }
    }, 1000);
};