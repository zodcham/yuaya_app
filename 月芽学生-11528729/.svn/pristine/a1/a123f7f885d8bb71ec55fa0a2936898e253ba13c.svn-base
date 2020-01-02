appcan.ready(function() {
    $(".item").on("click", function() {
        var rankingType = $(this).attr("rankingType");
        var rankingName = $(this).find(".name").html();
        getSysInfo();
        sysInfo.ranking = {
            "rankingType" : rankingType,
            "rankingName" : rankingName
        };
        setSysInfo();
        appcan.window.open("ranking_details", "ranking/ranking_details.html", 5);
    });
});

function opengame(){
    appcan.window.open("game", "game/game_index.html", 5);
} 