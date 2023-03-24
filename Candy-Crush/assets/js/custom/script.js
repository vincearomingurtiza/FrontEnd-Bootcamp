console.log("IM IN!");
document.addEventListener("DOMContentLoaded", function(){
    generateCandy();
});

let remove_tiles = [].sort();

function generateCandy(){
    let candy_container = document.querySelector("#candy_container");

    for(let tr_count = 0; tr_count < 6; tr_count++){
        let tr_element = document.createElement("tr");

        tr_element.setAttribute("id", "row_" + tr_count);
        candy_container.appendChild(tr_element);
        
        for(let td_count = 0; td_count < 6; td_count++){
            let td_element = document.createElement("td");
            let random_number = Math.floor(Math.random() * (4 - 1) + 1);

            td_element.setAttribute("draggable", true);
            td_element.classList.add("candy_" + random_number);
            td_element.value = random_number;
            td_element.setAttribute("id", "column_" + td_count);
            tr_element.appendChild(td_element);
        }
    }

    let all_td = document.querySelectorAll("td");
    all_td.forEach(function(active_td){
        active_td.addEventListener("mousedown", swapTile);
    });

    for(let td_count = 0; td_count < all_td.length; td_count++){
        all_td[td_count].setAttribute("count", td_count);
    }
    matchHorizontal();
    matchVertical();
    setTimeout(function(){
        removeTiles();
    }, 1000);
    setTimeout(function(){
        fillEmptyTiles();
    }, 2000);
};

let swap_array = [];
let tile_attr  = [];

function swapTile(event){
    event.target.classList.add("swap", "active_click");
    /* Limit tile that can swap */
    event.target.previousElementSibling.classList.add("swap");
    event.target.nextElementSibling.classList.add("swap");

    let tr = event.target.closest("tr");
    let tr_previous = tr.previousElementSibling;
    let tr_next = tr.nextElementSibling;

    tr_previous.querySelector("#"+event.target.id+"").classList.add("swap");
    tr_next.querySelector("#"+event.target.id+"").classList.add("swap");
    /* Disable tile */
    let disable_candy = document.querySelectorAll("td:not(.swap)");
    for (let element = 0; element < disable_candy.length; element++){
        disable_candy[element].classList.add("disable");
    }
    /* Limit 2 click */
    if (swap_array.length < 2){
        swap_array.push(event.target);
    }
    /* Remove classes */
    let all_candy = document.querySelectorAll("td");
    if (swap_array.length === 2){
        for(let counter = 0; counter < all_candy.length; counter++){
            all_candy[counter].classList.remove("disable", "swap", "active_click");
        }
        swap_array = [];
    }
    /* Push to tile_attr */
    if (tile_attr.length < 4){
        tile_attr.push(event.target.getAttribute("count"));
        tile_attr.push(event.target.classList[0]);
    }
    /* Swap Tiles */
    if (tile_attr.length == 4){
        all_candy[tile_attr[2]].setAttribute("class", tile_attr[1]);
        all_candy[tile_attr[0]].setAttribute("class", tile_attr[3]);
        tile_attr = [];
        matchHorizontal();
        matchVertical();
        setTimeout(function(){
            removeTiles();
        }, 1000);
        setTimeout(function(){
            fillEmptyTiles();
        }, 2000);
    }
};

function matchHorizontal(){
    let horizontal_array = [];

    for(let row = 0; row < 6; row++){
        let table_row = document.querySelector("#row_" + row);

        for(let column = 0; column < 6; column++){
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
        for(let row = 0; row < 6; row++){
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

function removeTiles(){
    let all_tiles = document.querySelectorAll("td");
    let filtered_matched_tiles = remove_tiles.filter(function(item, index){ 
        if (remove_tiles.indexOf(item) == index)
        return item;
    });
    let sorted_matched_tiles = filtered_matched_tiles.sort((a,b) => a-b);
    
    for(let element = 0; element < all_tiles.length; element++){
        if (all_tiles[element].getAttribute("count") === sorted_matched_tiles[0]){
            all_tiles[element].className = "empty";
            // all_tiles[element].classList.add("empty");
            // all_tiles[element].classList.add("match");
            sorted_matched_tiles.splice(0,1);
        }
    }
    remove_tiles = [];
};

function fillEmptyTiless(){
    let fill_empty = [];
    let row_count = 0;

    for(let counter = 0; counter < 6; counter++){
        for(let row = 0; row < 6; row++){
            let table_row = document.querySelector("#row_" + row);
            let table_data = table_row.querySelector("#column_" + row_count);
            
            fill_empty.push(table_data);
        }
        console.log(fill_empty);

        for(let element = 0; element < 5; element++){
            if (fill_empty[0].classList.contains("empty")){
                fill_empty[0] = fill_empty[1];
            };
            
            fill_empty.splice(0,1);
        }
        fill_empty = [];
        row_count++;
   }
};

function fillEmptyTiles(){
    let row_count = 0;
    let row_tiles = [];

    for(let counter = 0; counter < 6; counter ++){
        for(let row = 0; row < 6; row++){
            let table_row  = document.querySelector("#row_" + row);
            let table_data = table_row.querySelector("#column_" + row_count);
            row_tiles.push(table_data);
        }
        for(let element = 0; element < 5; element++){
            // console.log(row_tiles[0]);
            // console.log(row_tiles[1]);
            // console.log('-----');
            if (row_tiles[1].classList[0] === "empty"){
                console.log(row_tiles[1].getAttribute("count") + " : this is empty");
                console.log(row_tiles[1]);
                row_tiles[5].className = row_tiles[4].className;
                row_tiles[4].className = row_tiles[3].className;
                row_tiles[3].className = row_tiles[2].className;
            }
            row_tiles.splice(1 ,1);
        }
        console.log("=====");
        row_count++;
        row_tiles = [];
    }
};