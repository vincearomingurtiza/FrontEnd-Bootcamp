let remaining_time = 0;
$(document).ready(function(){
    $("body")
        .on("change", "input", inputChange)
        .on("click", "button", countdownFix)
        repeatMe();
});

function inputChange(){
    let get_input = document.getElementById("number_type").value;
    let push_text = document.getElementById("push");
    remaining_time = get_input;
    
    push_text.innerHTML = get_input;
};

function countdownFix(){
    let push_text = document.getElementById("push");
    push_text.innerHTML = remaining_time;
    remaining_time--;

    if(remaining_time >= 0){
        setTimeout(function(){
            countdownFix();
        }, 1000);
    }
    
};
 
function repeatMe(){
    console.log('im here');
    setTimeout(function(){
        repeatMe();
    }, 1000);
}