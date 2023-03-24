(function(){
    const ROWS       = 6;
    const COLUMNS    = 6;
    let all_candies  = [];
    let remove_tiles = [];
    let candy_1;
    let candy_2;
    
    document.addEventListener("DOMContentLoaded", function(){
        generateCandy();
        setInterval(function(){
            matchHorizontal();
            matchVertical();
            removeCandies();
            slideDownCandies();
        }, 800);
    });
    
    function generateCandy(){
        let candy_container = document.querySelector("#candy_container");
    
        for(let tr_count = 0; tr_count < ROWS; tr_count++){
            let tr_element = document.createElement("tr");
            let row_array = [];
    
            tr_element.setAttribute("id", "row_" + tr_count);
            candy_container.appendChild(tr_element);
            
            for(let td_count = 0; td_count < COLUMNS; td_count++){
                let td_element = document.createElement("td");
                let random_number = Math.floor(Math.random() * (7 - 1) + 1);
    
                td_element.setAttribute("coordinate", tr_count.toString() + "," + td_count.toString())
                td_element.setAttribute("draggable", true);
                td_element.classList.add("candy_" + random_number);
                td_element.setAttribute("id", "column_" + td_count);
                tr_element.appendChild(td_element);
    
                row_array.push(td_element);
    
                td_element.addEventListener("dragstart", dragStart); /* when click, initialize drag process */
                td_element.addEventListener("dragover", dragOver);   /* when clicking, moving mouse to drag the candy/tile */ 
                td_element.addEventListener("dragenter", dragEnter); /* while dragging candy/tile to others */
                td_element.addEventListener("dragleave", dragLeave); /* when leaving tile over other tile */
                td_element.addEventListener("dragend", dragEnd);     /* after drag, swap tiles/candies */
                td_element.addEventListener("drop", dragDrop);       /* when dropping tile to other tile */
            }
            all_candies.push(row_array);
        }
    
        let all_td = document.querySelectorAll("td");
        for(let td_count = 0; td_count < all_td.length; td_count++){
            all_td[td_count].setAttribute("count", td_count);
        }
    };
    
    function dragStart(event){
        candy_1 = event.target;
    };
    
    function dragOver(event){
        event.preventDefault();
    
    };
    
    function dragEnter(event){
        event.preventDefault();
    };
    
    function dragLeave(event){
        event.preventDefault();
    };
    
    function dragDrop(event){
        candy_2 = event.target;
    };
    
    function dragEnd(event){
        let candy_1_coordinates = candy_1.getAttribute("coordinate").split(",");
        let candy_1_x           = parseInt(candy_1_coordinates[0]);
        let candy_1_y           = parseInt(candy_1_coordinates[1]);
        
        let candy_2_coordinates = candy_2.getAttribute("coordinate").split(",");
        let candy_2_x           = parseInt(candy_2_coordinates[0]);
        let candy_2_y           = parseInt(candy_2_coordinates[1]);
    
        let swap_left           = candy_2_y == candy_1_y - 1 && candy_1_x == candy_2_x;
        let swap_right          = candy_2_y == candy_1_y + 1 && candy_1_x == candy_2_x;
        let swap_top            = candy_2_x == candy_1_x - 1 && candy_1_y == candy_2_y;
        let swap_bottom         = candy_2_x == candy_1_x + 1 && candy_1_y == candy_2_y;
    
        let when_swap           = swap_left || swap_right || swap_top || swap_bottom;
    
        if (when_swap){
            let candy_1_swap    = candy_1.className;
            let candy_2_swap    = candy_2.className;
    
            candy_2.className   = candy_1_swap;
            candy_1.className   = candy_2_swap;
        }
    };
    
    
    function matchHorizontal(){
        let horizontal_array = [];
    
        for(let row = 0; row < ROWS; row++){
            let table_row = document.querySelector("#row_" + row);
    
            for(let column = 0; column < COLUMNS; column++){
                let table_data = table_row.querySelector("#column_" + column);
    
                horizontal_array.push(table_data);
            }
    
            for(let check = 0; check < 4; check++){
                if (horizontal_array[0].classList[0] == horizontal_array[1].classList[0] &&
                    horizontal_array[1].classList[0] == horizontal_array[2].classList[0]){
    
                    for(let element = 0; element <3; element++){
                        remove_tiles.push(horizontal_array[element].getAttribute("count"));
                    }
                }
                horizontal_array.splice(0,1);
            }
            horizontal_array = [];
        }
    };
    
    function matchVertical(){
        let vertical_array = [];
        let row_count = 0;
    
        for(let counter = 0; counter < 6; counter++){
            for(let row = 0; row < ROWS; row++){
                let table_row = document.querySelector("#row_" + row);
                let table_data = table_row.querySelector("#column_" + row_count);
    
                vertical_array.push(table_data);
            }
            row_count++;
    
            for(let check = 0; check < 4; check++){
                if (vertical_array[0].classList[0] == vertical_array[1].classList[0] &&
                    vertical_array[1].classList[0] == vertical_array[2].classList[0]){
                    
                    for(let element = 0; element <3; element++){
                        remove_tiles.push(vertical_array[element].getAttribute("count"));
                    }
                }
                vertical_array.splice(0,1);
            }
            vertical_array = [];
        }
    };
    
    function removeCandies(){
        let all_tiles = document.querySelectorAll("td");
        let filtered_matched_tiles = remove_tiles.filter(function(item, index){ 
            if (remove_tiles.indexOf(item) == index){
                return item;
            }
        });
        let sorted_matched_tiles = filtered_matched_tiles.sort((a,b) => a-b);
        
        for(let element = 0; element < all_tiles.length; element++){
            if (all_tiles[element].getAttribute("count") === sorted_matched_tiles[0]){
                all_tiles[element].className = "empty";
                sorted_matched_tiles.splice(0,1);
            }
        }
        remove_tiles = [];
    };
    
    function slideDownCandies(){
        for(let column = 0; column < COLUMNS; column++){
            let index  = ROWS - 1;
            
            for(let row = ROWS - 1; row >= 0; row--){
                if(!all_candies[row][column].classList.contains("empty")){
                    all_candies[index][column].className = all_candies[row][column].className;
                    index -= 1;
                }
            }
    
            for(let row = index; row >= 0; row--){
                all_candies[row][column].className = "empty";
    
                /* put random candy after 148ms */
                setTimeout(function(){
                    all_candies[row][column].className = putRandomCandies();
                }, 360);
            }
        }
    };
    
    function putRandomCandies(){
        let random_number = Math.floor(Math.random() * (7 - 1) + 1);
        return "candy_" + random_number;
    }
})()