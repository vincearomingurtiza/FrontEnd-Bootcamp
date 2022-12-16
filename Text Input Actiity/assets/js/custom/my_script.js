$(document).ready(function(){
    $("body")
        /* HARUKI */
        .on("hover", ".haruki_input", harukiFocus)
        .on("blur", ".haruki_input", harukiFocusout)

        /* HOSHI */
        .on("focus", ".hoshi_input", hoshiFocus)
        .on("blur", ".hoshi_input", hoshiFocusout)

        /* JURO */
        .on("focus", ".juro_input", juroFocus)
        .on("blur", ".juro_input", juroFocusout)

        /* HIDEO */
        .on("focus", ".hideo_input", hideoFocus)
        .on("blur", ".hideo_input", hideoFocusout)

        /* MADOKA */
        .on("focus", ".madoka_input", madokaFocus)
        .on("blur", ".madoka_input", madokaFocusout)
});

    /* ----- HARUKI ----- */
    function harukiFocus(){
        let input_block = $(this).closest(".input_block");
        input_block.addClass("animation hoshi_name");
    }

    function harukiFocusout(){
        let input_block = $(this).closest(".input_block");

        if($(this).val() === ""){
            input_block.removeClass("animation hoshi_name");
        }
    }

    /* ----- HOSHI ----- */
    function hoshiFocus(){
        $(this).closest(".input_block").addClass("animation");
        $(this).closest("#hoshi_name_container").addClass("blue");
        $(this).closest("#hoshi_street_container").addClass("green");
        $(this).closest("#hoshi_town_container").addClass("red");
    }

    function hoshiFocusout(){
        if ($(this).val() === ""){
            $(this).closest(".input_block").removeClass("animation");
            $(this).closest("#hoshi_name_container").removeClass("blue");
            $(this).closest("#hoshi_street_container").removeClass("green");
            $(this).closest("#hoshi_town_container").removeClass("red");
        }
    }
    
     /* ----- JURO ----- */
    function juroFocus(){
        let input_block = $(this).closest(".input_block");
        input_block.addClass("animation");
    }
    
    function juroFocusout(){
        let input_block = $(this).closest(".input_block");

        if($(this).val() === ""){
            input_block.removeClass("animation");
        }
    }

    /* ----- HIDEO ----- */
    function hideoFocus(){
        let input_block = $(this).closest(".input_block");
        input_block.addClass("animation");
    }
    
    function hideoFocusout(){
        let input_block = $(this).closest(".input_block");
        
        if($(this).val() === ""){
            input_block.removeClass("animation");
        }
    }

    /* ----- MADOKA ----- */
    function madokaFocus(){
        let input_block = $(this).closest(".input_block");
        input_block.addClass("animation");
        input_block.removeClass("zero_delay");
    }
    
    function madokaFocusout(){
        let input_block = $(this).closest(".input_block");
        let animation_out = $(this).closest(".input_block")

        if($(this).val() === ""){
            input_block.removeClass("animation");
            animation_out.addClass("zero_delay");
        }
    }
