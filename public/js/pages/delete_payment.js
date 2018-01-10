
$("#frm_delete_payment").submit(function (e) {
    e.preventDefault();
    var data = {
        id :document.getElementById('payment_id').value,
    }
    getDeletePaymentData();
    function getDeletePaymentData(){
        $.ajax({
            method: 'get',
            url: '/api/v1/payments/getData',
            data: data,
            dataType: 'JSON'
        }).done(function (resp) {
            if (resp.status == 'error') {
                alert(resp.message);
                console.log(data);
            } else {
                console.log(resp);
                console.log(resp.payment[0].id);


                var data1 = {
                    id: resp.payment[0].id,
                    vote: resp.payment[0].vote,
                    year: resp.payment[0].year,
                    payment: resp.payment[0].payment,

                };

                console.log(data1);
                delete_payment(data1);
            }
        })
    }

    function delete_payment(data1) {

        $.ajax({
            method:'post',
            url:'/api/v1/payments/delete',
            data:data1,
            dataType:'JSON'
        }).done(function (resp) {
            if (resp.status == 'error') {
                alert(resp.message);
                console.log(data1);
            } else {
                $("#massage").append("<p style='color:red'>successfully Deleted</p>");

                if(resp.status == 'success'){
                    console.log(resp.select_vote);
                }
            }


        })


    }

});


check_payment.onclick= function () {

    var data = {
        id :document.getElementById('payment_id').value
    };
    getdata(data);
    function getdata(data) {

        $.ajax({
            method: 'get',
            url: '/api/v1/payments/getData',
            data: data,
            dataType: 'JSON'
        }).done(function (resp) {
            if (resp.status == 'error') {
                alert(resp.message);
                console.log(data);
            } else {
                console.log(resp);
                console.log(resp.payment[0].id);

                $("#delete_payment_details").append("<div id='d_p_well' class='well' style='background-color:lightseagreen'></div>")
                $("#d_p_well").append("<table id='tbl_d_p' class='table table-striped'>" +
                    "<tr>"+
                    "<th>Description</th>"+
                    "<th>Values</th>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>id</td>" +
                    "<td>"+resp.payment[0].id+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>note</td>"+
                    "<td>"+resp.payment[0].note+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>payment</td>" +
                    "<td>"+resp.payment[0].payment+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>vote</td>" +
                    "<td>"+resp.payment[0].vote+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>voucher_no</td>" +
                    "<td>"+resp.payment[0].voucher_no+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>voucher_date</td>" +
                    "<td>"+resp.payment[0].voucher_date+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>year</td>" +
                    "<td>"+resp.payment[0].year+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>created_at</td>" +
                    "<td>"+resp.payment[0].created_at+"</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td>updated_at</td>" +
                    "<td>"+resp.payment[0].updated_at+"</td>" +
                    "</tr>" +
                    "</table>")

            }
        })

    }

};
