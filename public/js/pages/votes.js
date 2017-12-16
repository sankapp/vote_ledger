
(function($){



    getData();

    function getData () {
    $.ajax({
        method:"get",
        url:"/api/v1/votes",
        dataType:'JSON'

    }).done(function(resp){

        if(resp.status == 'error'){
            alert(resp.message);
        }else{
            console.log(resp);
            //console.log(resp.all_votes[0].allocate);
            var vote_length = resp.all_votes.length;
            var id = resp.all_votes[0].id;
            var vote = resp.all_votes[0].vote;
            var allocate = resp.all_votes[0].allocate;
            var year = resp.all_votes[0].year;
            console.log(vote_length);
            console.log(id);
            console.log(vote);
            console.log(allocate);
            console.log(year);

            var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                "<th>Id</th>" +
                "<th>Vote</th>" +
                "<th>Allocate</th>" +
                "<th>Year</th>" +
                "</tr>";

            for(var i=0 ; i<vote_length;i++) {
                output += "<tr >" +
                "<td>"+ resp.all_votes[i].id +"</td>"+
                "<td>"+ resp.all_votes[i].vote +"</td>" +
                "<td>"+ resp.all_votes[i].allocate +"</td>" +
                "<td>"+ resp.all_votes[i].year +"</td>" +
                "</tr>"
                console.log(i);
                console.log(output);

            }
            var update = document.getElementById('tbl_votes');
            update.innerHTML=output;

        }
    })

        $("#tbl_head").css("background-color", "yellow");
}
    })(jQuery)
