function resetkeyboard(){
    var kbd = $("#keyboard");
    kbd.empty();
    kbd.append($("#keyboard-template").children().clone(true));
};

var dakuten = {
    "か":"が", "き":"ぎ", "く":"ぐ", "け":"げ", "こ":"ご",
    "さ":"ざ", "し":"じ", "す":"ず", "せ":"ぜ", "そ":"ぞ",
    "た":"だ", "ち":"ぢ", "つ":"づ", "て":"で", "と":"ど",
    "は":"ば", "ひ":"び", "ふ":"ぶ", "へ":"べ", "ほ":"ぼ"
}

var handakuten = {
    "は":"ぱ", "ひ":"ぴ", "ふ":"ぷ", "へ":"ぺ", "ほ":"ぽ"
}

var komoji = {
    "や":"ゃ", "ゆ":"ゅ", "よ":"ょ", "わ":"ゎ", "つ":"っ"
}

function replacer(str, dict) {
    var s = dict[str.slice(-1)];
    if(typeof s != "undefined") {
        str = str.slice(0, -1) + s;
    }
    return str;
}

function input(char) {
    var str = $("#monitor").text();
    switch(char) {
        case "消":
            str = str.slice(0, -1);
            break;
        case "゛":
            str = replacer(str, dakuten);
            break;
        case "゜":
            str = replacer(str, handakuten);
            break;
        case "小":
            str = replacer(str, komoji);
            break;
        default:
            str += char;
    }
    str = str.slice(-8); //bad
    $("#monitor").text(str);
};

$(document).ready(function(){
    resetkeyboard();
});

var test = [];
var leftkeys = [90, 88, 67, 86, 65, 83, 68, 70, 81, 87, 69, 82];
var rightkeys = [85, 73, 79, 80, 74, 75, 76, 186, 77, 188, 190, 191, 220, 186, 221, 219, 50];

$(window).keydown(function(e){
    if($.inArray(e.keyCode, leftkeys) != -1) {
        if($("#keyboard > .left > *").length == 1) {
            var s = $("#keyboard > .left > *").text();
            input(s);
            resetkeyboard();
            return;
        }

        $("#keyboard > .right").empty();
        $("#keyboard > .left > *:first").appendTo("#keyboard > .right");
        $("#keyboard > * > * > *").unwrap();
    } else if($.inArray(e.keyCode, rightkeys) != -1) {
        if($("#keyboard > .right > *").length == 1) {
            var s = $("#keyboard > .right > *").text();
            input(s);
            resetkeyboard();
            return;
        }

        $("#keyboard > .left").empty();
        $("#keyboard > .right > *:last").appendTo("#keyboard > .left");
        $("#keyboard > * > * > *").unwrap();
    }
});
