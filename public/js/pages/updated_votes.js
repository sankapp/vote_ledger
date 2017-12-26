
(function($) {

    getData();

    function getData() {
        $.ajax({
            url:"/api/v1/updated_votes",
            method:"get",
            dataType:"JSON"
        }).done(function (resp) {

            if (resp.status == 'error') {
                alert(resp.message);
            } else {

                console.log(resp);

                //default load function
                function default_load() {
                    var vote_length = resp.updated_votes.length;
                    var d = new Date();
                    var req_year = d.getFullYear();
                    document.getElementById('select_year').value = req_year;
                    var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                        "<th>Id</th>" +
                        "<th>Deduction Vote</th>" +
                        "<th>Before Deduction</th>" +
                        "<th>Addition Vote</th>" +
                        "<th>Before Addition</th>" +
                        "<th>New Allocation</th>" +
                        "<th>New Allocation for Deduct Vote</th>" +
                        "<th>New Allocation for Add Vote</th>" +
                        "<th>Note</th>" +
                        "<th>Updated Date</th>" +
                        "<th>year</th>" +
                        "</tr>";


                    for (var i = 0; i < vote_length; i++) {
                        if (resp.updated_votes[i].year == req_year) {
                            output += "<tr >" +
                                "<td>" + resp.updated_votes[i].id + "</td>" +
                                "<td>" + resp.updated_votes[i].d_vote + "</td>" +
                                "<td>" + resp.updated_votes[i].d_allocation + "</td>" +
                                "<td>" + resp.updated_votes[i].a_vote + "</td>" +
                                "<td>" + resp.updated_votes[i].a_allocation + "</td>" +
                                "<td>" + resp.updated_votes[i].changed_amount + "</td>" +
                                "<td>" + resp.updated_votes[i].changed_d_allocation + "</td>" +
                                "<td>" + resp.updated_votes[i].changed_a_allocation + "</td>" +
                                "<td>" + resp.updated_votes[i].Note + "</td>" +
                                "<td>" + resp.updated_votes[i].updated_at + "</td>" +
                                "<td>" + resp.updated_votes[i].year + "</td>" +
                                "</tr>"
                            console.log(i);
                            console.log(output);
                        }
                    }
                    var update = document.getElementById('tbl_updated_votes');
                    update.innerHTML = output;
                }
            }

            default_load();


        });
    }

})(jQuery)