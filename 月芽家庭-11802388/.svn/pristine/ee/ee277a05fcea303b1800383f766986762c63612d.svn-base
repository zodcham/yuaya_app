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
        appcan.window.open("ranking_details", "ranking_details.html", 5);
    });
});
