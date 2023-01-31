console.log("READING THIS!");
let clone_count = 1;

document.addEventListener("DOMContentLoaded", function(){
    listenThis()
    checkIfNoPost();
});

function checkIfNoPost(){
    let forum = document.querySelectorAll(".forum_style");
    if (forum.length == 1){
        let no_post = document.querySelector("#no_post");
        no_post.style.display = "block";
    } else {
        no_post.style.display = "none";
    }
    console.log(forum.length);

    setTimeout(function(){
        checkIfNoPost();
    }, 0);
}

function listenThis(){
    let post_button = document.querySelector("#post_btn");
    let post_input = document.getElementById("post_input");
    let comment_buttons = document.querySelectorAll(".comment_btn_style");
    
    post_button.addEventListener("click", postForum);
    
    let forums = document.querySelectorAll(".forum_style");
    let delete_forum_btns = document.querySelectorAll(".delete_forum_btn");
    forums.forEach(function(active_forum){
        delete_forum_btns.forEach(function(active_delete_btn){
            active_delete_btn.addEventListener("click", deleteForum);
        });
    });

    comment_buttons.forEach(function(each_comment){
        each_comment.addEventListener("click", postComment);
    });

    setTimeout(function(){
        listenThis();
    }, 5);
}

function postForum(){
    let post_input     = document.getElementById("post_input");
    let forum_paragraph = document.querySelector("#forum_paragraph")
    let delete_forum_btn = document.querySelectorAll(".delete_forum_btn");
    
    forum_paragraph.innerHTML = ""+ post_input.value +"";

    let forum_to_clone = document.querySelector(".clone_forum");
    let forum_section = document.getElementById("forum");
    let cloned_forum = forum_to_clone.cloneNode(true);
    cloned_forum.classList.add("forum_" + clone_count);
    cloned_forum.setAttribute("id", "forum_" + clone_count);
    forum_section.appendChild(cloned_forum);

    let get = document.querySelector(".forum_" + clone_count);
    get.classList.remove("clone_forum");
    clone_count++;
    post_input.value = "";
}

function postComment(){
    console.log("POSTED A COMMENT!");
}

function deleteForum(){
}
