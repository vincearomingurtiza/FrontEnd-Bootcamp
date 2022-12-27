$(document).ready(function(){
    $("body")
        .on("change", "#select_row", displayRow)    /* create table */
});

/* DOCU: To create tr and td
 * Triggered by: .on("change", "#select_row", displayRow)
 * Last Updated Date: December 27, 2022 
 * @author: Vince
 * */
function displayRow(){
    let selected_row_value  = $("#select_row option:selected").val();
    let selected_column_value  = $("#select_column option:selected").val();
    let table_container = $("#table_container");
    table_container.empty();

    for(let row_count = 0; row_count < selected_row_value; row_count++){
        let create_row = $("<tr>");
        $("#table_container").append(create_row);
        
        for(let column_count = 0; column_count < selected_column_value; column_count++){ 
            let create_column = $("<td> "+ row_count +" "+ ","+" "+ column_count+ " </td>");
            create_row.append(create_column);
        }
    }
};