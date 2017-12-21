$("#frm_add_vote").submit(function (e) {
    e.preventDefault();

    var data = {
        vote :document.getElementById('vote').value,
        allocate :document.getElementById('allocation').value,
        year:document.getElementById('year').value
    }



    add_vote(this,data);

    function add_vote(context,data) {

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
                $("#massage").append("<p style='color:green'>successfully Added</p>");
            }
        })


    }

});
