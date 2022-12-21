$(document).ready(function(){
    $("body")
        .on("change", "#select_row", displayRow) 
        // .on("change", "#select_column", displayColumn)
});

function displayRow(){
    let selected_row_value  = $("#select_row option:selected").val();
    let selected_column_value  = $("#select_column option:selected").val();
    $("#table_container").empty()
    
    for(let counter = 0; counter < selected_row_value; counter++){
        let create_row = $("<tr>");

        create_row.attr("data-value-for-row",counter);
        $("#table_container").append(create_row);
    }
    
    let get_data_value_for_row = $("tr").attr("data-value-for-row");
    
    for(let column_count = 0; column_count < selected_column_value; column_count++){
        
        let create_column = $("<td> " + get_data_value_for_row + " "+ "," +" " + column_count + " </td>");
        $("tr").append(create_column);
    }
    // console.log(get_row_count);
    console.log(get_data_value_for_row);
};