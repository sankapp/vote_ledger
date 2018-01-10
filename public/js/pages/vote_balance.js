(function ($) {

    getdata();

    function getdata() {
        $.ajax({
            method:"get",
            url:"/api/v1/vote_balance",
            dataType:'JSON'
        }).done(function (resp) {
            if(resp.status == 'error'){
                alert(resp.message)
            }else{



                function default_lord() {
                    var vote_bal_lenth = resp.all_votes_balances.length;
                    var d = new Date();
                    var req_year = d.getFullYear();
                    document.getElementById('select_year').value = req_year;

                    var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                        "<th>Id</th>" +
                        "<th>Vote</th>" +
                        "<th>Year</th>" +
                        "<th>Current balance</th>" +
                        "<th>Payment</th>" +
                        "<th>Voucher No</th>" +
                        "<th>Voucher Date</th>" +
                        "<th>New Balance</th>" +
                        "<th>Date & Time</th>" +
                        "</tr>";


                    for (var i = 0; i < vote_bal_lenth; i++) {
                        if (resp.all_votes_balances[i].year == req_year) {
                            output += "<tr >" +
                                "<td>" + resp.all_votes_balances[i].id + "</td>" +
                                "<td>" + resp.all_votes_balances[i].vote + "</td>" +
                                "<td>" + resp.all_votes_balances[i].year + "</td>" +
                                "<td>" + resp.all_votes_balances[i].current_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].payment_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].voucher_no + "</td>" +
                                "<td>" + resp.all_votes_balances[i].voucher_date + "</td>" +
                                "<td>" + resp.all_votes_balances[i].new_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].updated_at + "</td>" +
                                "</tr>"
                            console.log(i);
                            console.log(output);
                        }
                    }
                    var update = document.getElementById('tbl_vote_balance');
                    update.innerHTML = output;

                }

                default_lord();


                //change year and auto load function
                select_year.onchange = function () {
                    var vote_bal_lenth = resp.all_votes_balances.length;
                    var req_year = document.getElementById('select_year').value;
                    var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                        "<th>Id</th>" +
                        "<th>Vote</th>" +
                        "<th>Year</th>" +
                        "<th>Current balance</th>" +
                        "<th>Payment</th>" +
                        "<th>Voucher No</th>" +
                        "<th>Voucher Date</th>" +
                        "<th>New Balance</th>" +
                        "<th>Date & Time</th>" +
                        "</tr>";

                    console.log(req_year);
                    for (var i = 0; i < vote_bal_lenth; i++) {
                        if (resp.all_votes_balances[i].year == req_year) {
                            output += "<tr >" +
                                "<td>" + resp.all_votes_balances[i].id + "</td>" +
                                "<td>" + resp.all_votes_balances[i].vote + "</td>" +
                                "<td>" + resp.all_votes_balances[i].year + "</td>" +
                                "<td>" + resp.all_votes_balances[i].current_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].payment_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].voucher_no + "</td>" +
                                "<td>" + resp.all_votes_balances[i].voucher_date + "</td>" +
                                "<td>" + resp.all_votes_balances[i].new_val.toFixed(2) + "</td>" +
                                "<td>" + resp.all_votes_balances[i].updated_at + "</td>" +
                                "</tr>"
                            console.log(i);
                            console.log(output);

                        }
                    }

                    var update = document.getElementById('tbl_vote_balance');
                    update.innerHTML = output;
                }
            }
        })
    }
})(jQuery)

//search function
$("#frm_vote_balance_search").submit(function (e) {
    e.preventDefault();

    var data ={
        vote : document.getElementById('select_vote').value,
        year : document.getElementById('select_year').value,
        begin_date : document.getElementById('begin_date').value,
        end_date : document.getElementById('end_date').value
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
                var vote_bal_length = resp.vote_balance.length;
                var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                    "<th>Id</th>" +
                    "<th>Vote</th>" +
                    "<th>Year</th>" +
                    "<th>Current balance</th>" +
                    "<th>Payment</th>" +
                    "<th>Voucher No</th>" +
                    "<th>Voucher Date</th>" +
                    "<th>New Balance</th>" +
                    "<th>Date & Time</th>" +
                    "</tr>";

                for (var i = 0; i < vote_bal_length; i++) {
                    output += "<tr >" +
                        "<td>" + resp.vote_balance[i].id + "</td>" +
                        "<td>" + resp.vote_balance[i].vote + "</td>" +
                        "<td>" + resp.vote_balance[i].year + "</td>" +
                        "<td>" + resp.vote_balance[i].current_val.toFixed(2) + "</td>" +
                        "<td>" + resp.vote_balance[i].payment_val.toFixed(2) + "</td>" +
                        "<td>" + resp.vote_balance[i].voucher_no + "</td>" +
                        "<td>" + resp.vote_balance[i].voucher_date + "</td>" +
                        "<td>" + resp.vote_balance[i].new_val.toFixed(2) + "</td>" +
                        "<td>" + resp.vote_balance[i].updated_at + "</td>" +
                        "</tr>"
                    console.log(i);
                    console.log(output);
                }

                output +="<tr style='background-color: #b2dba1; color: #8a6d3b'>" +
                    "<td colspan='4'> Total </td>" +
                    "<td>" + resp.vote_balance_sum + "</td>" +
                    "<td colspan='4'></td>" +
                    "</tr>"
                var update = document.getElementById('tbl_vote_balance');
                update.innerHTML = output;

            }
        });
    }
})