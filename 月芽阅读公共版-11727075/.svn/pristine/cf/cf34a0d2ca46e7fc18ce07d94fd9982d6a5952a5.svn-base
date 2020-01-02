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
    appcan.window.open("game_index", "game/game_index.html", 5);
}


$(".btn_home").on("click", function() {
    rootopenPlayer();
    appcan.window.close(-1);
})
$(".btn_mall").on("click", function() {
    appcan.window.open("mall", "index_mall.html", 5);
    //setTimeout(function(){ appcan.window.close(-1); }, 1000);
})
$(".btn_club").on("click", function() {
    appcan.window.open("yueduquan", "yueduquan/Reading_circle.html", 5);
    setTimeout(function(){ appcan.window.close(-1); }, 1000);
})
$(".btn_rank").on("click", function() {
    //appcan.window.open("ph", "Paihang.html", 5);
    //appcan.window.close(-1);
})
$(".btn_person").on("click", function() {
    appcan.window.open("person", "index_person.html", 5);
    setTimeout(function(){ appcan.window.close(-1); }, 1000);
})