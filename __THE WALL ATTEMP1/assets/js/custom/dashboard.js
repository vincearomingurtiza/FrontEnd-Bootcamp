let forum_clone_count = 1
let comment_count     = 1
document.addEventListener("DOMContentLoaded", function(){
    listenToThis();
});

function listenToThis(){
    let post_button = document.querySelector("#post_btn");
    post_button.addEventListener("click", cloningForum);

    let comment_buttons = document.querySelectorAll(".comment_btn");
    comment_buttons.forEach(function(active_comment_button){
        active_comment_button.addEventListener("click", cloningComment);
    });

    let forum_section = document.querySelectorAll(".forum_section");
    let no_forum = document.querySelector("#no_forum");
    console.log(forum_section.length);

    if (forum_section.length = 1){
        no_forum.style.display = "block";
    }
    
    if (forum_section.length > 1){
        no_forum.style.display = "none";
    }
    
    let post_textarea = document.querySelector("#post_textarea");
    if (post_textarea.value == ""){
        post_button.removeEventListener("click", cloningForum);
    }

    setTimeout(function(){
        listenToThis();
    }, 5);
}

function cloningForum(){
    let post_textarea = document.querySelector("#post_textarea");
    let forum_article = document.querySelector(".forum_article");
    forum_article.innerHTML = ""+ post_textarea.value +"";

    let forum_clones = document.querySelector(".forum_clone_0");
    let cloned_forum = forum_clones.cloneNode(true);
    let clone_forum_here = document.querySelector("#pass_forum_here");

    let comment_button = document.querySelector(".comment_btn")
    comment_button.setAttribute("id", "comment_btn_" + forum_clone_count );
    
    let comment_textarea = document.querySelector(".comment_textarea")
    comment_textarea.setAttribute("id", "comment_textarea_" + forum_clone_count);
    
    cloned_forum.setAttribute("id", "forum_" + forum_clone_count);
    cloned_forum.classList.remove("forum_clone_0");
    clone_forum_here.appendChild(cloned_forum);

    forum_clone_count++;
    post_textarea.value = "";
}

function cloningComment(){
    let comment_article = document.querySelector(".comment_article");
    let comment_textareas = document.querySelectorAll(".comment_textarea");
    
    comment_textareas.forEach(function(active_comment){
        console.log(active_comment.value);
        comment_textareas.value = ""+ active_comment.value +"";
    });
    
    let comment_clone = document.querySelector(".comment_block");
    let cloned_comment = comment_clone.cloneNode(true);
    let clone_comment_here = document.querySelector(".pass_comment_here");
    cloned_comment.setAttribute("id", "comment_" + comment_count);
    cloned_comment.classList.remove("clone_comment");
    clone_comment_here.appendChild(cloned_comment);

    comment_count++;
    comment_textareas.value = "";
}