$("#frm_add_payment").submit(function (e) {
    e.preventDefault();

    var data = {
        vote :document.getElementById('vote').value,
        year:document.getElementById('year').value,
        payment :document.getElementById('payment').value,
        voucher_no :document.getElementById('voucher_no').value,
        voucher_date :document.getElementById('voucher_date').value,
        note :document.getElementById('note').value
    }



    add_payment(this,data);

    function add_payment(context,data) {

        $.ajax({
            method: $(context).attr('method'),
            url: $(context).attr('action'),
            data: data,
            dataType: 'JSON'
        }).done (function(resp){
            if(resp.status == 'error'){
                alert(resp.message);
            }else{
                console.log(data);
                $("#massage_make_payment").append("<p style='color:green'>successfully Added</p>");

                if(resp.status == 'success'){

                    $.ajax({
                        method: "post",
                        url: "/api/v1/add_new_vote_balance",
                        data: data,
                        dataType: 'JSON'
                    }).done (function(resp){

                        if(resp.status == 'error'){
                            alert(resp.message);
                        }
                        console.log(resp);

                    });
                }


            }
        });



    }

});
