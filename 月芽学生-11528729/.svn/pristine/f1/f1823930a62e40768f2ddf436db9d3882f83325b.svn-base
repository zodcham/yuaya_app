appcan.ready(function() {
    loadscore();
});

function loadscore() {
    var lv = appcan.locStorage.getVal('yyIdiomLevel');
    if (lv == null) {
        lv = 1;
        appcan.locStorage.setVal('yyIdiomLevel', lv);

        appcan.locStorage.setVal('lv1_count', 0);
        appcan.locStorage.setVal('lv1_success', 0);
        appcan.locStorage.setVal('lv2_count', 0);
        appcan.locStorage.setVal('lv2_success', 0);
        appcan.locStorage.setVal('lv3_count', 0);
        appcan.locStorage.setVal('lv3_success', 0);
        appcan.locStorage.setVal('lv4_count', 0);
        appcan.locStorage.setVal('lv4_success', 0);
        appcan.locStorage.setVal('lv5_count', 0);
        appcan.locStorage.setVal('lv5_success', 0);
        appcan.locStorage.setVal('lv6_count', 0);
        appcan.locStorage.setVal('lv6_success', 0);
        appcan.locStorage.setVal('lv7_count', 0);
        appcan.locStorage.setVal('lv7_success', 0);
    } else {
        lv = Number(lv);

        //lv=1;
        //appcan.locStorage.setVal('yyIdiomLevel', lv);

    }

    for (var i = 1; i <= lv; i++) {
        $("#lv" + i).removeClass("uhide");
    }

}

function start(level) {
    setLocVal("lv_id", level);
    appcan.window.open("gaming", "gaming.html", 5);
}

function help() {
    appcan.window.open("game_help", "game_help.html", 5);
}

function score() {
    appcan.window.open("game_score", "game_score.html", 5);

}
