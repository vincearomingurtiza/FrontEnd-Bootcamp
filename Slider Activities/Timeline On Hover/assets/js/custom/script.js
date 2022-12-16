$(document).ready(function(){
    $("body")
    
    .on("mouseenter", ".season_block", showImageColor)
    .on("mouseout", ".season_block", hideImageColor)
});

function showImageColor(){
    let season = $(this).siblings();
    season.addClass("sibling_animation");
    $(this).addClass("current_season");
}

function hideImageColor(){
    let season = $(this).siblings();
    season.removeClass("sibling_animation");
    $(this).removeClass("current_season");
}