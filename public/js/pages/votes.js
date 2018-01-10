
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


            var select_year = document.getElementById('select_year');
            console.log(vote_length);
            console.log(id);
            console.log(vote);
            console.log(allocate);
            console.log(year);

//default load function
            function default_load() {
                var d = new Date();
                var req_year = d.getFullYear();
                document.getElementById('select_year').value = req_year;
                var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                    "<th>Id</th>" +
                    "<th>Vote</th>" +
                    "<th>Allocate</th>" +
                    "<th>Year</th>" +
                    "</tr>";

                for (var i = 0; i < vote_length; i++) {
                    if (resp.all_votes[i].year == req_year) {
                        output += "<tr >" +
                            "<td>" + resp.all_votes[i].id + "</td>" +
                            "<td>" + resp.all_votes[i].vote + "</td>" +
                            "<td>" + resp.all_votes[i].allocate.toFixed(2) + "</td>" +
                            "<td>" + resp.all_votes[i].year + "</td>" +
                            "</tr>"
                        console.log(i);
                        console.log(output);
                    }
                }
                var update = document.getElementById('tbl_votes');
                update.innerHTML = output;
            }
        }

        default_load();
//change year and auto load function
        select_year.onchange = function () {
            var req_year = document.getElementById('select_year').value;
            var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                "<th>Id</th>" +
                "<th>Vote</th>" +
                "<th>Allocate</th>" +
                "<th>Year</th>" +
                "</tr>";
            console.log(req_year);
            for (var i = 0; i < vote_length; i++) {
                if (resp.all_votes[i].year == req_year) {
                    output += "<tr >" +
                        "<td>" + resp.all_votes[i].id + "</td>" +
                        "<td>" + resp.all_votes[i].vote + "</td>" +
                        "<td>" + resp.all_votes[i].allocate.toFixed(2) + "</td>" +
                        "<td>" + resp.all_votes[i].year + "</td>" +
                        "</tr>"
                    console.log(i);
                    console.log(output);

                }
            }

            var update = document.getElementById('tbl_votes');
            update.innerHTML = output;
        }

    });


    }
})(jQuery)

//search function
$("#frm_search").submit(function (e) {
    e.preventDefault();

    var data ={
        vote : document.getElementById('select_vote').value,
        year : document.getElementById('select_year').value
    }

    search_votes(this,data);

    function search_votes(context,data) {

        $.ajax({
            method:$(context).attr('method'),
            url:$(context).attr('action'),
            data:data,
            dataType:'JSON'

        }).done(function (resp) {

            if (resp.status == 'error') {
                alert(resp.message);
            } else {
                var vote_length = resp.filtered_votes.length;
                var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                    "<th>Id</th>" +
                    "<th>Vote</th>" +
                    "<th>Allocate</th>" +
                    "<th>Year</th>" +
                    "</tr>";
                console.log(resp);
                console.log(vote_length);
                for (var i = 0; i < vote_length; i++) {
                        output += "<tr >" +
                            "<td>" + resp.filtered_votes[i].id + "</td>" +
                            "<td>" + resp.filtered_votes[i].vote + "</td>" +
                            "<td>" + parseFloat(resp.filtered_votes[i].allocate).toFixed(2) + "</td>" +
                            "<td>" + resp.filtered_votes[i].year + "</td>" +
                            "</tr>"
                        console.log(i);
                        console.log(output);
                }

                output +="<tr style='background-color: #b2dba1; color: #8a6d3b'>" +
                    "<td colspan='2'> Total </td>" +
                    "<td>" + resp.filtered_votes_sum.toFixed(2) + "</td>" +
                    "<td></td>" +
                    "</tr>"
                var update = document.getElementById('tbl_votes');
                update.innerHTML = output;

            }
        });
    }
})