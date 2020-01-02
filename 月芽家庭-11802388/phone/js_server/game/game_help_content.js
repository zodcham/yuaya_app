appcan.ready(function() {
    var lv = appcan.locStorage.getVal('yyIdiomLevel');
    if (lv == null) {
        lv = 1;
        appcan.locStorage.setVal('yyIdiomLevel', lv);
    } else {
        lv = Number(lv);
    }

    for (var i = 1; i <= lv; i++) {
        $("#lv" + i).removeClass("uhide");
    }

});

function start(level) {
    setLocVal("lv_id", level);
    appcan.window.open("gaming", "gaming.html", 5);
}

function help() {

}

function score() {

}