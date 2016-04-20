/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function sortScores(scoreObj) {
    scoreObj.sort(function (a, b) {
        return a.score - b.score;
    });
    return scoreObj;
}
;

function displayHighScores(amount, hasStorage) {
    $("#highscores").empty();
    $("#highscores").append("<thead> <tr> <th>#</th> <th>Oppilas</th> <th>Yritykset</th></tr></thead>");
    if (hasStorage) {
        var scores = localStorage["scores"];
        if (scores != null) {
            var scoresObj = JSON.parse(scores);
            for (var i = 1; i < amount + 1 && i < scoresObj.length + 1; i++) {
                $("#highscores").append("<tr> <td>" + i + "</td>" + "<td>" + scoresObj[i - 1].name + "</td>" + "<td>" + scoresObj[i - 1].score + "</td> </tr>");
            }
        }
    }//else {
    //no highscores to display
    // }
}