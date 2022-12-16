$(document).ready(function(){
    $("body")
    
    .on("click", ".year_one", yearOneAnimation)
    .on("click", ".year_two", yearTwoAnimation)
    .on("click", ".year_three", yearThreeAnimation)
    .on("click", ".year_four", yearFourAnimation)
});

function yearOneAnimation(){
    let color_fill = $(this).closest("#year_list");
    color_fill.removeClass("year_two_show year_three_show year_four_show").addClass("four_out_delay");
    $("#slider_container").removeClass("page_two_show page_three_show page_four_show").addClass("page_one_show");
}

function yearTwoAnimation(){
    let color_fill = $(this).closest("#year_list");
    color_fill.removeClass("year_three_show year_four_show four_out_delay").addClass("year_two_show");
    $("#slider_container").removeClass("page_one_show page_three_show page_four_show").addClass("page_two_show");
}

function yearThreeAnimation(){
    let color_fill = $(this).closest("#year_list");
    color_fill.removeClass("year_two_show year_four_show four_out_delay").addClass("year_three_show");
    $("#slider_container").removeClass("page_one_show page_two_show page_four_show").addClass("page_three_show");
}

function yearFourAnimation(){
    let color_fill = $(this).closest("#year_list");
    color_fill.removeClass("year_two_show year_three_show four_out_delay").addClass("year_four_show");
    $("#slider_container").removeClass("page_one_show page_two_show page_three_show").addClass("page_four_show");
}