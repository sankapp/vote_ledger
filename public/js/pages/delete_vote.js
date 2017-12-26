$("#frm_delete_vote").submit(function (e) {
    e.preventDefault();

    var data = {
        vote :document.getElementById('vote').value,
        year:document.getElementById('year').value
    }



    delete_vote(this,data);

    function delete_vote(context,data) {

        $.ajax({
            method:$(context).attr('method'),
            url:$(context).attr('action'),
            data:data,
            dataType:'JSON'
        }).done(function (resp) {
            if (resp.status == 'error') {
                alert(resp.message);
                console.log(data);
            } else {
                $("#massage").append("<p style='color:red'>successfully Deleted</p>");
            }
        })


    }

});
