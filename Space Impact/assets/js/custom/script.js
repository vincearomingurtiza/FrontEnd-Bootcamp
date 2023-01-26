console.log("My script is in!");
let recursion_count = 0; 
let life_array = [];
let enemy_bullet_array = [];
let enemy_bullet_count = 1;
let life_count = 3;
let boom_count = 1;
let pew_count = 1;

let before = 0;
let after  = 1;

document.addEventListener("DOMContentLoaded", function(){
    enemySpawn();
    playerMove();
    enemyMove();
    life();
    playerBulletAndEnemyBulletCollision();
    movePlayerBullet();
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

        let create_enemy_bullet = document.createElement("div");
        create_enemy_bullet.classList.add("enemy_bullet", "enemy_bullet_" + recursion_count);
        enemy_spawn_field.appendChild(create_enemy_bullet);

        let enemy_bullet_x = random_number_x - 50;
        let enemy_bullet_y = random_number_y + 15;

        let get_this_number_to_push = Math.floor(Math.random() * (recursion_count - 1) + 1);
        // console.log("push this: " + get_this_number_to_push);

        document.querySelector(".enemy_bullet_" + recursion_count).style.left = enemy_bullet_x  + "px";
        document.querySelector(".enemy_bullet_" + recursion_count).style.top  = enemy_bullet_y + "px";
        
        setTimeout(function(){
            console.log("Life: " + life_count);
            if (life_count > 0){
                enemyFiresBullet();
            }

            // if (recursion_count < 5){
                enemySpawn();
            // }
    }, 1250);
}

/* Enemy Move */
function enemyMove(){
    let enemy_style   = document.querySelectorAll(".enemy_style");
    let enemy_bullet   = document.querySelectorAll(".enemy_bullet");
    let player = document.getElementById("player");
    let player_coordinates = player.getBoundingClientRect();
    let add_this = 8;
    let enemy_bullet_move = 10;

    enemy_bullet.forEach(function(this_bullet){
        let bullet_move = parseInt(this_bullet.style.left) - enemy_bullet_move;
        this_bullet.style.left = bullet_move + "px";
    });
    
    enemy_style.forEach(function(this_enemy){
        let enemy_move = parseInt(this_enemy.style.left) - add_this;
        let this_enemy_coordinates = this_enemy.getBoundingClientRect();
        this_enemy.style.left = enemy_move + "px";
        
        console.log("------");
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
            
            /* Enemy Bullet Move */
            let battlefield = document.getElementById("battlefield");
            let create_explosion = document.createElement("div");
            
            create_explosion.classList.add("boom");
            battlefield.appendChild(create_explosion);
            console.log("boom count: " + boom_count);
            
            let this_enemy_x = parseInt(this_enemy.style.left) - 50;
            let this_enemy_y = parseInt(this_enemy.style.top)  - 25;
            
            create_explosion.style.left = this_enemy_x + "px";
            create_explosion.style.top  = this_enemy_y + "px";

            playerAndEnemyBulletCollision();

            /* Explosion Animation */
            setTimeout(boomAnimation, 800);
            boom_count++;

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
}

/* Move bullet when fired */
function movePlayerBullet(){
    let player_bullet = document.querySelectorAll(".player_bullet");
    let enemy = document.querySelectorAll(".enemy_style");
    let add_move = 10;
    
    player_bullet.forEach(function(this_bullet){
        let player_bullet_move = parseInt(this_bullet.style.left) + add_move;
        this_bullet.style.left = player_bullet_move + "px";

        /* Remove player bullet element when reach its end point */
        if (parseInt(this_bullet.style.left) > 1020){
            this_bullet.remove();
        }
        playerBulletAndEnemyCollision();
    });
    
    setTimeout(function(){
        movePlayerBullet();
    }, 30);
}

/* Enemy Bullet Move */
function enemyFiresBullet(){
    let enemy = document.querySelectorAll(".enemy_style");
    let add_move = 10;

    enemy.forEach(function(this_enemy){
        let enemy_bullet_move = parseInt(this_enemy.style.left) + add_move;
        this_enemy.style.left = enemy_bullet_move + "px"
    });
    playerAndEnemyBulletCollision();
}

function pewAnimation(){
    let pew = document.querySelector(".pew");
    pew.remove();
}

function boomAnimation(){
    let boom = document.querySelector(".boom");
    boom.remove();
}

function playerBulletAndEnemyBulletCollision(){
    let enemy_bullet  = document.querySelectorAll(".enemy_bullet");
    let player_bullet = document.querySelectorAll(".player_bullet");
    
    player_bullet.forEach(function(this_player_bullet){
        enemy_bullet.forEach(function(this_enemy_bullet){
            let player_bullet_coordinates = this_player_bullet.getBoundingClientRect();
            let enemy_bullet_coordinates = this_enemy_bullet.getBoundingClientRect();
            
            if (player_bullet_coordinates.bottom >= enemy_bullet_coordinates.top    &&
                player_bullet_coordinates.top    <= enemy_bullet_coordinates.bottom &&
                player_bullet_coordinates.right  >= enemy_bullet_coordinates.left   &&
                player_bullet_coordinates.left   <= enemy_bullet_coordinates.right){
                    
                console.log("HAHAHA BENG! BENG!");
                alert();
            }
        })
    });
}

/* Player bullet and enemy collision */
function playerBulletAndEnemyCollision(){
    let player_bullet = document.querySelectorAll(".player_bullet");
    let enemy = document.querySelectorAll(".enemy_style");
    
    player_bullet.forEach(function(this_bullet){
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

                create_explosion.classList.add("pew");
                battlefield.appendChild(create_explosion);

                let enemy_x = parseInt(this_enemy.style.left) - 50;
                let enemy_y = parseInt(this_enemy.style.top)  - 25;

                create_explosion.style.left = enemy_x + "px";
                create_explosion.style.top  = enemy_y + "px";

                /* Explosion Animation */
                setTimeout(pewAnimation, 800);
                pew_count++;
            }
        });
    });
}

/* Player and Enemy Bullet */
function playerAndEnemyBulletCollision(){
    let player = document.querySelector("#player");
    let enemy_bullet = document.querySelectorAll(".enemy_bullet");
    let player_coordinates = player.getBoundingClientRect();
    
    enemy_bullet.forEach(function(this_this_enemy_bullet){
        let this_enemy_bullet_coordinates = this_this_enemy_bullet.getBoundingClientRect();

        /* Player and enemy bullet collision */
        if (player_coordinates.bottom >= this_enemy_bullet_coordinates.top    &&
            player_coordinates.top    <= this_enemy_bullet_coordinates.bottom &&
            player_coordinates.right  >= this_enemy_bullet_coordinates.left   &&
            player_coordinates.left   <= this_enemy_bullet_coordinates.right){

            this_this_enemy_bullet.remove();
            life_array.push("Collided!");
            player.style.left = "40px";
            player.style.top  = "330px";

            /* Add explosion animation */
            let battlefield = document.querySelector("#battlefield");
            let create_player_enemy_bullet_explosion = document.createElement("div");

            create_player_enemy_bullet_explosion.classList.add("boom");
            battlefield.appendChild(create_player_enemy_bullet_explosion);
            
            let enemy_bullet_x = parseInt(this_this_enemy_bullet.style.left) - 40;
            let enemy_bullet_y = parseInt(this_this_enemy_bullet.style.top)  - 40;

            create_player_enemy_bullet_explosion.style.left = enemy_bullet_x + "px";
            create_player_enemy_bullet_explosion.style.top  = enemy_bullet_y + "px";
 
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

            setTimeout(function(){
                create_player_enemy_bullet_explosion.remove();
            }, 500);
        }
    });
}