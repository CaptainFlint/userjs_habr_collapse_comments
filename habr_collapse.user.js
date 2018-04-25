// ==UserScript==
// @name            Comment collapsing
// @description     Allows to collapse/expand comment subtrees
// @author          Aleksey Borodin (@minamoto), Konstantin Vlasov (@CaptainFlint)
// @namespace       Habrahabr
// @version         1.1
// @include         https://geektimes.com/*
// @include         https://habr.com/*
// @updateURL       https://raw.githubusercontent.com/CaptainFlint/userjs_habr_collapse_comments/master/habr_collapse.user.js
// ==/UserScript==


"use strict";

!function(win) {

if (window != window.top)
    return

win.addEventListener("load", function() {

    $('.voting-wjt_comments').filter(function() {
        return $(this).parent().parent().next().children().length > 0;
    }).before(function() { return '<a href="#" class="comment_toggle" title="Свернуть ветку">[–] (' + $(this).parent().parent().next().find('div.comment').length + ')</a>';});

    $('.comment__message_banned').filter(function() {
        return $(this).parent().next().children().length > 0;
    }).append(function() { return '<a href="#" class="comment_toggle" style="margin-left: 10px;" title="Свернуть ветку">[–] (' + $(this).parent().next().find('div.comment').length + ')</a>';});

    $('.comments-section__subscribe-panel').before('<a href="#" class="all_comments_hide" style="margin-left: 10px;" title="Свернуть все ветки">[ – – – ]</a><a href="#" class="all_comments_show" style="color: red; font-weight: bold; margin-left: 10px;" title="Развернуть все ветки">[ + + + ]</a>');

    $('.comment_toggle').on("click", function() {
        $(this).parent().parent().next().toggle();
        if ($(this).text() == '[–]') {
            $(this).text('[+] (' + $(this).parent().parent().next().find('div.comment').length + ')');
            $(this).css({'color': 'red', 'font-weight': 'bold'});
            $(this).attr('title', "Развернуть ветку");
        }
        else {
            $(this).text('[–] (' + $(this).parent().parent().next().find('div.comment').length + ')')
            $(this).css({'color': '', 'font-weight': ''});
            $(this).attr('title', "Свернуть ветку");
        }
    });

    $('.all_comments_hide').on("click", function() {
        $('.comments-section > ul > li > div.comment a.comment_toggle').each(function () {
            if ($(this).text() == '[–]') {
                $(this).trigger( "click" );
            }
        })
    });

    $('.all_comments_show').on("click", function() {
        $('.comments-section > ul > li > div.comment a.comment_toggle').each(function () {
            if ($(this).text() == '[+]') {
                $(this).trigger( "click" );
            }
        })
    });

}, false);

}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow);
