console.log("My script is in!");
let recursion_count = 0; 
let life_array = [];
let life_count = 3;
let explosion_count = 1;

let before = 0;
let after  = 1;

document.addEventListener("DOMContentLoaded", function(){
    enemySpawn();
    playerMove();
    enemyMove();
    life();
    // explosionAnimation();
});

/* Gameover Modal */
function gameOverModal(){
    let modal = document.getElementById("myModal");
    let restart_button = document.getElementById("restart_btn");

    modal.style.display = "block";
    restart_button.addEventListener("click", function(){
    window.location.reload();
    });
}

/* Life */
function life(){
    let life_block = document.getElementById("life_block");
    for(let counter = 1; counter <= life_count; counter++){
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
        console.log("Life: " + life_count);
        if (life_count > 0){
            enemySpawn();
        }
    }, 1250);
}

/* Enemy Move */
function enemyMove(){
    let enemy_style   = document.querySelectorAll(".enemy_style");
    let player = document.getElementById("player");
    let player_coordinates = player.getBoundingClientRect();
    let add_this = 8;
    
    enemy_style.forEach(function(this_enemy){
        let enemy_move = parseInt(this_enemy.style.left) - add_this;
        let this_enemy_coordinates = this_enemy.getBoundingClientRect();
        this_enemy.style.left = enemy_move + "px";
   
        /* Remove enemy element when reach its end point */
        if (parseInt(this_enemy.style.left) < 0){
            this_enemy.remove();
        }

        /*  Check player and enemy collision */
        if (player_coordinates.bottom >= this_enemy_coordinates.top    &&
            player_coordinates.top    <= this_enemy_coordinates.bottom &&
            player_coordinates.right  >= this_enemy_coordinates.left   &&
            player_coordinates.left   <= this_enemy_coordinates.right){
            
            this_enemy.remove();
            life_array.push("Collided!");
            console.log(life_array);
            player.style.left = "40px";
            player.style.top = "330px";
            
            let battlefield = document.getElementById("battlefield");
            let create_explosion = document.createElement("div");
            
            create_explosion.classList.add("boom", "pew_" + explosion_count);
            battlefield.appendChild(create_explosion);
            
            let this_enemy_x = parseInt(this_enemy.style.left) - 50;
            let this_enemy_y = parseInt(this_enemy.style.top)  - 25;
            
            create_explosion.style.left = this_enemy_x + "px";
            create_explosion.style.top  = this_enemy_y + "px";

            explosionAnimation();
            explosion_count++;

            /* Life Check */
            let life = document.querySelector(".life_" + life_count);
            console.log(life);
            life.remove();
            life_count--;
            /* Gameover */
            if (life_array.length == 3){
                document.removeEventListener("keydown", keyDown);
                player.remove();
                gameOverModal();
                console.log("Gameover");
            }    
        }
    });

    setTimeout(function(){
        if (life_array.length < 3){
            enemyMove();
        }
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
            let player_x = parseInt(player.style.left) - add_move;
            // console.log(player_x, document.getElementById("player").style.left);
            player.style.left = player_x + "px";
            break;
        }

        case 38: case 87: {  /* Up & W */
            let player_y = parseInt(player.style.top) - add_move;
            player.style.top = player_y + "px";
            break;
        }

        case 39: case 68: {  /* Right & D */
            let player_x = parseInt(player.style.left) + add_move;
            player.style.left = player_x + "px";
            break;
        }

        case 40: case 83: {  /* Down & S */
            let player_y = parseInt(player.style.top) + add_move;
            player.style.top = player_y + "px";
            break;
        }

        case 32: {  /* Down & S */
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
    let add_this = 1;
     
    create_player_bullet.classList.add("player_bullet");
    battlefield.appendChild(create_player_bullet);

    let bullet_x = parseInt(player.style.left) + 30;
    let bullet_y = parseInt(player.style.top)  + 16;

    create_player_bullet.style.left = bullet_x + "px";
    create_player_bullet.style.top  = bullet_y + "px";

    movePlayerBullet();
}

/* Move bullet when fired */
function movePlayerBullet(){
    let player_bullet = document.querySelectorAll(".player_bullet");
    let enemy = document.querySelectorAll(".enemy_style");
    // let enemy_coordinates = enemy.getBoundingClientRect();
    let add_move = 10;
    
    player_bullet.forEach(function(this_bullet){
        // let this_bullet_coordinates = this_bullet.getBoundingClientRect();
        let player_bullet_move = parseInt(this_bullet.style.left) + add_move;
        this_bullet.style.left = player_bullet_move + "px";
        // console.log(player_bullet_move);

        /* Remove player bullet element when reach its end point */
        if (parseInt(this_bullet.style.left) > 1020){
            this_bullet.remove();
        }

        enemy.forEach(function(this_enemy){
            let enemy_position  = this_enemy.getBoundingClientRect();
            let bullet_position = this_bullet.getBoundingClientRect();

            if (bullet_position.bottom >= enemy_position.top    &&
                bullet_position.top    <= enemy_position.bottom &&
                bullet_position.right  >= enemy_position.left   &&
                bullet_position.left   <= enemy_position.right){
                
                console.log("collided!");
                this_enemy.remove();
                this_bullet.remove();
            
                let battlefield = document.querySelector("#battlefield");
                let create_explosion = document.createElement("div");

                create_explosion.classList.add("boom")
                battlefield.appendChild(create_explosion);

                let enemy_x = parseInt(this_enemy.style.left) - 50;
                let enemy_y = parseInt(this_enemy.style.top)  - 25;

                create_explosion.style.left = enemy_x + "px";
                create_explosion.style.top  = enemy_y + "px";
                explosionAnimation();
            }
        });
    });

    setTimeout(function(){
        movePlayerBullet();
    }, 30);
}

function explosionAnimation(){
    let boom_panis = document.querySelector(".boom");
    // let boom_pew = document.querySelector(".pew_" + explosion_count)
    before++;
    boom_panis.classList.add("boom_" + after);
    after++;

    setTimeout(function(){
        boom_panis.classList.remove("boom_" + before);
        console.log("booom! YEAH!");
        if (before <= 40){
            explosionAnimation();
        } 
    }, 8);
}
