$(document).ready(function(){
    $("body")

    // .on("focus", "button", active)
    // .on("blur", "button", unactive)

    .on("mouseenter", "#disney", disneyIn)
    .on("mouseout", "#disney", disneyOut)

    .on("mouseenter", "#beauty_and_the_beast", bnbIn)
    .on("mouseout", "#beauty_and_the_beast", bnbOut)

    .on("mouseenter", "#aladdin", aladdinIn)
    .on("mouseout", "#aladdin", aladdinOut)

    .on("mouseenter", "#lion_king", lionkingIn)
    .on("mouseout", "#lion_king", lionkingOut)
});

function active(){
    let circle_btn = $(this);
    circle_btn.addClass("animation");
    // alert("In");
}

function unactive(){
    let circle_btn = $(this);
    circle_btn.removeClass("animation");
    // alert("Out");
}

function disneyIn(){
    let active_button = $("#disney_btn");
    let inactive_button = $("#disney_btn").siblings();
    
    active_button.addClass("active_btn");
    inactive_button.addClass("inactive_btn");
}

function disneyOut(){
    let active_button = $("#disney_btn");
    let inactive_button = $("#disney_btn").siblings();
    
    active_button.removeClass("active_btn");
    inactive_button.removeClass("inactive_btn");
}

function bnbIn(){
    let active_button = $("#beauty_and_the_beast_btn");
    let inactive_button = $("#beauty_and_the_beast_btn").siblings();
    
    active_button.addClass("active_btn");
    inactive_button.addClass("inactive_btn");
}

function bnbOut(){
    let active_button = $("#beauty_and_the_beast_btn");
    let inactive_button = $("#beauty_and_the_beast_btn").siblings();
    
    active_button.removeClass("active_btn");
    inactive_button.removeClass("inactive_btn");
}

function aladdinIn(){
    let active_button = $("#aladdin_btn");
    let inactive_button = $("#aladdin_btn").siblings();
    
    active_button.addClass("active_btn");
    inactive_button.addClass("inactive_btn");
}

function aladdinOut(){
    let active_button = $("#aladdin_btn");
    let inactive_button = $("#aladdin_btn").siblings();
    
    active_button.removeClass("active_btn");
    inactive_button.removeClass("inactive_btn");
}

function lionkingIn(){
    let active_button = $("#lion_king_btn");
    let inactive_button = $("#lion_king_btn").siblings();
    
    active_button.addClass("active_btn");
    inactive_button.addClass("inactive_btn");
}

function lionkingOut(){
    let active_button = $("#lion_king_btn");
    let inactive_button = $("#lion_king_btn").siblings();
    
    active_button.removeClass("active_btn");
    inactive_button.removeClass("inactive_btn");
}
