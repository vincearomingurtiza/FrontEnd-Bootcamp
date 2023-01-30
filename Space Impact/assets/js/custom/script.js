let enemy_spawn_count = 0; 
let life_count = 3;
const ENEMY_START_X = 767;
const ENEMY_END_X   = 963;
const ENEMY_START_Y = 62;
const ENEMY_END_Y   = 600;
const ENEMY_BULLET_SPEED = 16;
const ENEMY_MOVE_SPEED = 8;
const PLAYER_BULLET_SPEED = 16;
const BATTLEFIELD_WIDTH = 1020;

document.addEventListener("DOMContentLoaded", function(){
    showLifeCount();
    initializePlayer();
    enemySpawn();
    enemyMove();
    movePlayerBullet();
    randomEnemyFiresABullet();
});

/* Life */
function showLifeCount(){
    let life_block = document.getElementById("life_block");
    life_block.innerHTML = "";
    for(let counter = 1; counter <= life_count; counter++){
        let create_life = document.createElement("span");
        
        create_life.classList.add("life_" + counter, "heart_style");
        life_block.appendChild(create_life);
    }
    setTimeout(function(){
        showLifeCount();
    }, 17);
}

/* Gameover Modal */
function gameOverModal(){
    let modal = document.getElementById("myModal");
    let restart_button = document.getElementById("restart_btn");

    modal.style.display = "block";
    restart_button.addEventListener("click", function(){
    window.location.reload();
    });
}

/* Player Move Listener */
function initializePlayer(){
    let player = document.querySelector("#player");
    player.style.left = "40px";
    player.style.top = "330px";
    document.removeEventListener("keydown", playerMove);
    document.addEventListener("keydown", playerMove);
}

/*Player Move Using Keyboard Event */
function playerMove(event){
    let player = document.getElementById("player");
    let player_move = 10;

    switch (event.which){
        case 37: case 65: {  /*Left & A */
            let player_x = parseInt(player.style.left) - player_move;
            player.style.left = player_x + "px";
            break;
        }

        case 38: case 87: {  /* Up & W */
            let player_y = parseInt(player.style.top) - player_move;
            player.style.top = player_y + "px";
            break;
        }

        case 39: case 68: {  /* Right & D */
            let player_x = parseInt(player.style.left) + player_move;
            player.style.left = player_x + "px";
            break;
        }

        case 40: case 83: {  /* Down & S */
            let player_y = parseInt(player.style.top) + player_move;
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
     
    create_player_bullet.classList.add("player_bullet");
    battlefield.appendChild(create_player_bullet);

    let bullet_x = parseInt(player.style.left) + 30;
    let bullet_y = parseInt(player.style.top)  + 16;

    create_player_bullet.style.left = bullet_x + "px";
    create_player_bullet.style.top  = bullet_y + "px";
}

/* Move bullet when fired */
function movePlayerBullet(){
    let player_bullets = document.querySelectorAll(".player_bullet");
    
    player_bullets.forEach(function(active_bullet){
        let player_bullet_position = parseInt(active_bullet.style.left) + PLAYER_BULLET_SPEED;
        active_bullet.style.left = player_bullet_position + "px";
        
        playerBulletAndEnemyCollision();
        playerBulletAndEnemyBulletCollision();

        /* Remove player bullet element when reach its end point */
        if (parseInt(active_bullet.style.left) > BATTLEFIELD_WIDTH){
            active_bullet.remove();
        }
    });
    
    setTimeout(function(){
        movePlayerBullet();
    }, 42);
}

/* Create/Spawn Enemy || Enemy fires a bullet */
function enemySpawn(){
    enemy_spawn_count++;
    let enemy_spawn_field = document.getElementById("enemy_spawn_field");
    let create_enemy = document.createElement("li");
    let random_number_x  = Math.floor(Math.random()* (ENEMY_END_X - ENEMY_START_X)) + ENEMY_START_X;  /* Enemy spawn x-coordinates 767px - 984px */
    let random_number_y  = Math.floor(Math.random()* (ENEMY_END_Y - ENEMY_START_Y)) + ENEMY_START_Y;   /* Enemy spawn y-coordinates 0px - 610px */
    
    create_enemy.classList.add("enemy_" + enemy_spawn_count, "enemy_style");
    enemy_spawn_field.appendChild(create_enemy);
    /* Set Enemy Position */
    create_enemy.style.left = random_number_x + "px";
    create_enemy.style.top  = random_number_y + "px";
    
    setTimeout(function(){
        enemySpawn();
    }, 1250);
}

/* Enemy bullet move */
function enemyBulletMove(){
    let enemy_bullet   = document.querySelectorAll(".enemy_bullet");
    enemy_bullet.forEach(function(this_bullet){
        let bullet_move = parseInt(this_bullet.style.left) - ENEMY_BULLET_SPEED;
        this_bullet.style.left = bullet_move + "px";
        /* Remove enemy bullet element when reach its end point */
        if (parseInt(this_bullet.style.left) < 0){
            this_bullet.remove();
        }
    });
}

/* Enemy Move || Player and Enemy Collision*/
function enemyMove(){
    let enemies   = document.querySelectorAll(".enemy_style");
    let player = document.getElementById("player");
    let player_coordinates = player.getBoundingClientRect();

    /* Enemy bullet move trigger */
    enemyBulletMove();
    
    enemies.forEach(function(active_enemy){
        let active_enemy_position = parseInt(active_enemy.style.left) - ENEMY_MOVE_SPEED;
        let active_enemy_coordinates = active_enemy.getBoundingClientRect();
        active_enemy.style.left = active_enemy_position + "px";
        
        /* Remove enemy element when reach its end point */
        if (parseInt(active_enemy.style.left) < (active_enemy_coordinates.width * -1)){
            active_enemy.remove();
        }

        /*  Check player and enemy collision */
        if (player_coordinates.bottom >= active_enemy_coordinates.top    &&
            player_coordinates.top    <= active_enemy_coordinates.bottom &&
            player_coordinates.right  >= active_enemy_coordinates.left   &&
            player_coordinates.left   <= active_enemy_coordinates.right){
            
            console.log("Player X Enemy Collided");
            active_enemy.remove();
            initializePlayer();
            
            /* Create explosion */
            let battlefield = document.getElementById("battlefield");
            let create_explosion = document.createElement("div");
            
            create_explosion.classList.add("boom");
            battlefield.appendChild(create_explosion);
            
            let active_enemy_x = parseInt(active_enemy.style.left);
            let active_enemy_y = parseInt(active_enemy.style.top);
            
            create_explosion.style.left = active_enemy_x + "px";
            create_explosion.style.top  = active_enemy_y + "px";

            /* Explosion Animation */
            setTimeout(function(){
                let boom = document.querySelector(".boom");
                boom.remove();
            }, 480);

            /* Life Update */
            life_count--;

            /* Gameover */
            if (life_count == 0){
                document.removeEventListener("keydown", playerMove);
                player.remove();
                gameOverModal();
                console.log("Gameover");
            }    
        }
    });
    /* Triggers player and enemy bullet collision */
    playerAndEnemyBulletCollision();
    setTimeout(function(){
        if (life_count > 0){
            enemyMove();
        }
    }, 42);
}

/* Player Bullet - Enemy Bullet Collision */
function playerBulletAndEnemyBulletCollision(){
    let enemy_bullet  = document.querySelectorAll(".enemy_bullet");
    let player_bullet = document.querySelectorAll(".player_bullet");
    
    player_bullet.forEach(function(this_player_bullet){
        let player_bullet_coordinates = this_player_bullet.getBoundingClientRect();
        enemy_bullet.forEach(function(active_enemy_bullet){
            let enemy_bullet_coordinates = active_enemy_bullet.getBoundingClientRect();
            
            if (player_bullet_coordinates.bottom >= enemy_bullet_coordinates.top    &&
                player_bullet_coordinates.top    <= enemy_bullet_coordinates.bottom &&
                player_bullet_coordinates.right  >= enemy_bullet_coordinates.left   &&
                player_bullet_coordinates.left   <= enemy_bullet_coordinates.right){
                    
                console.log("P-Bullet X E-Bullet Collide");
                this_player_bullet.remove()
                active_enemy_bullet.remove()

                let battlefield = document.getElementById("battlefield");
                let create_explosion = document.createElement("div");

                create_explosion.classList.add("spark");
                battlefield.appendChild(create_explosion);

                let player_bullet_x = parseInt(this_player_bullet.style.left) - 20;
                let player_bullet_y = parseInt(this_player_bullet.style.top)  - 30;

                create_explosion.style.left = player_bullet_x + "px";
                create_explosion.style.top  = player_bullet_y + "px";

                setTimeout(function(){
                    let spark = document.querySelector(".spark");
                    spark.remove();
                }, 850);
            }
        })
    });
}

/* Player bullet and enemy collision */
function playerBulletAndEnemyCollision(){
    let player_bullet = document.querySelectorAll(".player_bullet");
    let enemy = document.querySelectorAll(".enemy_style");
    
    player_bullet.forEach(function(this_bullet){
        enemy.forEach(function(active_enemy){
            let enemy_position  = active_enemy.getBoundingClientRect();
            let bullet_position = this_bullet.getBoundingClientRect();

            if (bullet_position.bottom >= enemy_position.top    &&
                bullet_position.top    <= enemy_position.bottom &&
                bullet_position.right  >= enemy_position.left   &&
                bullet_position.left   <= enemy_position.right){
                
                console.log("P-Bullet X Enemy Collide");
                active_enemy.remove();
                this_bullet.remove();
            
                let battlefield = document.querySelector("#battlefield");
                let create_explosion = document.createElement("div");

                create_explosion.classList.add("pew");
                battlefield.appendChild(create_explosion);

                let enemy_x = parseInt(active_enemy.style.left) - 50;
                let enemy_y = parseInt(active_enemy.style.top)  - 25;

                create_explosion.style.left = enemy_x + "px";
                create_explosion.style.top  = enemy_y + "px";

                /* Explosion Animation */
                setTimeout(function(){
                   let pew = document.querySelector(".pew");
                    pew.remove();
                }, 800);
            }
        });
    });
}

/* Player and Enemy Bullet */
function playerAndEnemyBulletCollision(){
    let player = document.querySelector("#player");
    let enemy_bullets = document.querySelectorAll(".enemy_bullet");
    let player_coordinates = player.getBoundingClientRect();
    
    enemy_bullets.forEach(function(active_enemy_bullet){
        let active_enemy_bullet_coordinates = active_enemy_bullet.getBoundingClientRect();

        /* Player and enemy bullet collision */
        if (player_coordinates.bottom >= active_enemy_bullet_coordinates.top    &&
            player_coordinates.top    <= active_enemy_bullet_coordinates.bottom &&
            player_coordinates.right  >= active_enemy_bullet_coordinates.left   &&
            player_coordinates.left   <= active_enemy_bullet_coordinates.right){

            active_enemy_bullet.remove();
            player.style.left = "40px";
            player.style.top  = "330px";

            /* Add explosion animation */
            let battlefield = document.querySelector("#battlefield");
            let create_player_enemy_bullet_explosion = document.createElement("div");

            create_player_enemy_bullet_explosion.classList.add("boom");
            battlefield.appendChild(create_player_enemy_bullet_explosion);
            
            let enemy_bullet_x = parseInt(active_enemy_bullet.style.left) - 40;
            let enemy_bullet_y = parseInt(active_enemy_bullet.style.top)  - 40;

            create_player_enemy_bullet_explosion.style.left = enemy_bullet_x + "px";
            create_player_enemy_bullet_explosion.style.top  = enemy_bullet_y + "px";
 
            /* Life Check */
            life_count--;
            
            /* Gameover */
            if (life_count == 0){
                document.removeEventListener("keydown", playerMove);
                player.remove();
                gameOverModal();
                console.log("Gameover");
            }

            setTimeout(function(){
                create_player_enemy_bullet_explosion.remove();
            }, 800);
        }
    });
}

function randomEnemyFiresABullet(){
    let battlefield = document.querySelector("#battlefield");
    let create_enemy_bullet = document.createElement("span");
    
    create_enemy_bullet.classList.add("enemy_bullet");
    battlefield.appendChild(create_enemy_bullet);

    // let random_enemy = document.querySelector(".enemy_" + enemy_index);
    let enemies   = document.querySelectorAll(".enemy_style");
    // console.log(enemy_style.length);
    
    let enemy_index = Math.floor(Math.random()* enemies.length);
    console.log(enemies[enemy_index]);
    
    let random_enemy = enemies[enemy_index];
    // console.log(enemy_index);
    /* Todo:
        Get a random Enemy from enemy_style */
    let random_enemy_x = parseInt(random_enemy.style.left);
    let random_enemy_y = parseInt(random_enemy.style.top) + 16;

    create_enemy_bullet.style.left = random_enemy_x + "px";
    create_enemy_bullet.style.top = random_enemy_y + "px";
    
    setTimeout(function(){
        randomEnemyFiresABullet();
    }, 250);
}