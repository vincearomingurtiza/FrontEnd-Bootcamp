let recursion_count = 0; 
let add_this = 1;
const LEFT_MAX_COORDINATES = 718;
const TOP_MAX_COORDINATES  = 649;
console.log("My script is in!");

document.addEventListener("DOMContentLoaded", function(){
    enemySpawn();
    playerMove();
    enemyMove();
    life();
});

/* Life */
function life(){
    let life_block       = document.getElementById("life_block");
    for(let counter = 0; counter < 3; counter++){
        let create_life = document.createElement("span");
        create_life.classList.add("life_" + counter, "heart_style");
        life_block.appendChild(create_life);
    }
}

/* Create/Spawn Enemy */
function enemySpawn(){
    recursion_count++;
    
    let enemy_spawn_field = document.getElementById("enemy_spawn_field");
    let create_enemy = document.createElement("li");
    let random_number_x  = Math.floor(Math.random()* (963 - 767)) + 767;  /* Enemy spawn x-coordinates 767px - 984px */
    let random_number_y  = Math.floor(Math.random()* (600 - 62))  + 62;   /* Enemy spawn y-coordinates 0px - 610px */
    
    create_enemy.classList.add("enemy_" + recursion_count, "enemy_style");
    enemy_spawn_field.appendChild(create_enemy);
    /* Set Enemy Position */
    document.querySelector(".enemy_" + recursion_count).style.left = random_number_x + "px";
    document.querySelector(".enemy_" + recursion_count).style.top  = random_number_y + "px";

    setTimeout(function(){
        // if (enemy_spawn_field.children.length < 10){
            enemySpawn();
        // }
    }, 1250);
}

/* Enemy Move */
function enemyMove(){
    let enemy_style   = document.querySelectorAll(".enemy_style");
    let add_this = 8;

    enemy_style.forEach(function(this_enemy){
        let enemy_move = parseInt(this_enemy.style.left) - add_this;
        let this_this = this_enemy.getBoundingClientRect();
        this_enemy.style.left = enemy_move + "px";

        /* Remove enemy element when reach its end point */
        if (this_this.left < 0){
            this_enemy.remove();
        }
    });

    setTimeout(function(){
        enemyMove();
    }, 100);
}
/* Player Move Listener */
function playerMove(){
    let player = document.querySelector("#player");
    player.style.left = "40px";
    player.style.top = "330px";
    document.addEventListener("keydown", keyDown);
}

/*Player Move Using Keyboard Event */
function keyDown(event){
    let battlefield = document.getElementById("battlefield")
    let player = document.getElementById("player");
    let add_move = 10;

    switch (event.which){
        case 37: case 65: {  /*Left & A */
            console.log("A | LEFT");
            let player_x = parseInt(player.style.left) - add_move;
            // console.log(player_x, document.getElementById("player").style.left);
            player.style.left = player_x + "px";
            break;
        }

        case 38: case 87: {  /* Up & W */
            console.log("W | UP");
            let player_y = parseInt(player.style.top) - add_move;
            player.style.top = player_y + "px";
            break;
        }

        case 39: case 68: {  /* Right & D */
            console.log("D | RIGHT");
            let player_x = parseInt(player.style.left) + add_move;
            player.style.left = player_x + "px";
            break;
        }

        case 40: case 83: {  /* Down & S */
            console.log("S | DOWN");
            let player_y = parseInt(player.style.top) + add_move;
            player.style.top = player_y + "px";
            break;
        }

        case 32: {  /* Down & S */
            console.log("bullet fired: " + battlefield.children.length);
            playerFiresBullet();
            break;
        }
    }
}

/* Player Fires Bullet */
function playerFiresBullet(){
    let player = document.getElementById("player");
    // let player_coordinates = player.getBoundingClientRect();

    let battlefield = document.getElementById("battlefield");
    let create_player_bullet = document.createElement("span");
     
    create_player_bullet.classList.add("player_bullet", "bullet_" + add_this);
    battlefield.appendChild(create_player_bullet);
    create_player_bullet.style.left = player.style.left + "px";
    create_player_bullet.style.top  = player.style.top  + "px";
    add_this++;

    console.log(player.style.left);
    movePlayerBullet();
}

/* Move bullet when fired */
function movePlayerBullet(){
    let player_bullet = document.querySelectorAll(".player_bullet");
    let add_move = 10;

    player_bullet.forEach(function(this_bullet){
        let player_bullet_move = parseInt(this_bullet.style.left) + add_move;
        this_bullet.style.left = player_bullet_move + "px";
    });

    setTimeout(function(){
        movePlayerBullet();
    }, 10);
}