console.log("I'm reading this!");

document.addEventListener("DOMContentLoaded", function(){
    let signup_btn = document.getElementById("signup_btn");
    signup_btn.addEventListener("click", validation);
});

function validation(event){
    console.log("check!");
    let first_name = document.getElementById("first_name");
    let last_name  = document.getElementById("last_name");
    let email      = document.getElementById("email");
    let password   = document.getElementById("password");
    
    if (first_name.value === ""){
        first_name.classList.add("error");
    }
}