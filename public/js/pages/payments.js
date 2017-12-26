
(function($){



    getData();

    function getData () {
    $.ajax({
        method:"get",
        url:"api/v1/payments",
        dataType:'JSON'

    }).done(function(resp){

        if(resp.status == 'error'){
            alert(resp.message);
        }else{
            console.log(resp);
//default load function
            function default_load() {
                var vote_length = resp.all_payments.length;
                var d = new Date();
                var req_year = d.getFullYear();
                document.getElementById('select_year').value = req_year;
                var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                    "<th>Id</th>" +
                    "<th>Vote</th>" +
                    "<th>Year</th>" +
                    "<th>Voucher No</th>" +
                    "<th>Voucher Date</th>" +
                    "<th>Payment</th>" +
                    "<th>Date & Time</th>" +
                    "</tr>";

                for (var i = 0; i < vote_length; i++) {
                    if (resp.all_payments[i].year == req_year) {
                        output += "<tr >" +
                            "<td>" + resp.all_payments[i].id + "</td>" +
                            "<td>" + resp.all_payments[i].vote + "</td>" +
                            "<td>" + resp.all_payments[i].year + "</td>" +
                            "<td>" + resp.all_payments[i].voucher_no + "</td>" +
                            "<td>" + resp.all_payments[i].voucher_date + "</td>" +
                            "<td>" + resp.all_payments[i].payment + "</td>" +
                            "<td>" + resp.all_payments[i].updated_at + "</td>" +
                            "</tr>"
                        console.log(i);
                        console.log(output);
                    }
                }
                var update = document.getElementById('tbl_payments');
                update.innerHTML = output;
            }
        }

        default_load();


    });


    }
})(jQuery)


//search function
$("#frm_payment_search").submit(function (e) {
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
                var payment_length = resp.filtered_payments.length;
                var output = "<tr style='background-color: #b2dba1; color: #8a6d3b' >" +
                    "<th>Id</th>" +
                    "<th>Vote</th>" +
                    "<th>Year</th>" +
                    "<th>Voucher No</th>" +
                    "<th>Voucher Date</th>" +
                    "<th>Payment</th>" +
                    "<th>Date & Time</th>" +
                    "</tr>";
                console.log(resp);
                console.log(payment_length);
                for (var i = 0; i < payment_length; i++) {
                    output += "<tr >" +
                        "<td>" + resp.filtered_payments[i].id + "</td>" +
                        "<td>" + resp.filtered_payments[i].vote + "</td>" +
                        "<td>" + resp.filtered_payments[i].year + "</td>" +
                        "<td>" + resp.filtered_payments[i].voucher_no + "</td>" +
                        "<td>" + resp.filtered_payments[i].voucher_date + "</td>" +
                        "<td>" + resp.filtered_payments[i].payment + "</td>" +
                        "<td>" + resp.filtered_payments[i].updated_at + "</td>" +
                        "</tr>"
                    console.log(i);
                    console.log(output);
                }

                output +="<tr style='background-color: #b2dba1; color: #8a6d3b'>" +
                    "<td colspan='5'> Total </td>" +
                    "<td>" + resp.filtered_payments_sum + "</td>" +
                    "<td></td>" +
                    "</tr>"
                var update = document.getElementById('tbl_payments');
                update.innerHTML = output;

            }
        });
    }
})

