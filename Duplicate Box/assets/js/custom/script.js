$(document).ready(function(){
    $("body")
        .on("change", "#act1_select", activityOne)
        .on("change", "#act2_select", activityTwo)
        .on("click", ".delete_btn", deleteButton)
        .on("change", "#act3_select", activityThree)
});

function activityOne(){
    let selected_value  = $("#act1_select option:selected").val();
    $("#act1_list").empty();

    for (let count_start = 1; count_start <= selected_value; count_start++){
            let box_duplicate = $(".act1_item:first").clone();
            box_duplicate.removeClass("clone_item");
            $("#act1_list").append(box_duplicate);
        }
};

function activityTwo(){
    let selected_value  = $("#act2_select option:selected").val();
    $("#act2_list").empty();

    for (let count_start = 1; count_start <= selected_value; count_start++){
        let box_duplicate = $(".act2_item:first").clone();
        box_duplicate.removeClass("clone_item");
        $("#act2_list").append(box_duplicate);
    }
};

function deleteButton(){
    $(this).closest("li").remove();
    let box_count = $("#act2_list li").length;
    $("#act2_select").find("option[value= " + box_count + "]").prop("selected", true);
};

function activityThree(){
    let selected_value  = $("#act3_select option:selected").val();
    $("#multiplication_table").empty();

    for (let count_start = 1; count_start <= selected_value; count_start++){
        // append ul here on division id = "multiplication_table"
        let multiplier_list = $("<ul>", {class: "by" + count_start} );
        $("#multiplication_table").append(multiplier_list);
        
        for (let multiply_by = 1; multiply_by <= 10; multiply_by++){ 
            
            let product = multiply_by * count_start;
            if ( count_start == count_start){
                $(".by" + count_start).append("<li> " + product + "</li>");
            }
        }
    }
};