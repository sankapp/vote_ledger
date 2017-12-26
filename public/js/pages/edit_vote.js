$("#frm_edit_vote").submit(function (e) {
    e.preventDefault();

    var data = {
        deduct_vote :document.getElementById('deduct_vote').value,
        add_vote :document.getElementById('add_vote').value,
        year:document.getElementById('year').value
    }



    edit_vote(this,data);

    function edit_vote(context,data) {

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
                console.log(resp);
              $("#edit_tbl_row").append("<td>"+ resp.deduct_vote_details[0].vote+"</td>");
              $("#edit_tbl_row").append("<td>"+ resp.add_vote_details[0].vote+"</td>");
              $("#edit_tbl_row").after("<tr id='edit_tbl_row2'></tr>");
              $("#edit_tbl_row2").append("<td>"+ resp.deduct_vote_details[0].allocate+"</td>");
              $("#edit_tbl_row2").append("<td>"+ resp.add_vote_details[0].allocate+"</td>");

              $("#d_vote").attr("value" , resp.deduct_vote_details[0].vote);
              $("#d_vote_allocation").attr("value" , resp.deduct_vote_details[0].allocate);
              $("#a_vote").attr("value" , resp.add_vote_details[0].vote);
              $("#a_vote_allocation").attr("value" , resp.add_vote_details[0].allocate);
              $("#u_year").attr("value" , resp.add_vote_details[0].year);

            }
        })


    }

});

$("#changing_amount").change(function () {
    var d_val_al = document.getElementById("d_vote_allocation").value;
    var a_val_al = document.getElementById("a_vote_allocation").value;
    var c_val = document.getElementById("changing_amount").value;

    var aa_val_al = parseFloat(a_val_al);
    var cc_val = parseFloat(c_val);


    var new_d_val = (d_val_al - c_val);
    var new_a_val1 = aa_val_al + cc_val;

    $("#d_changed").attr("value",new_d_val);
    $("#a_changed").attr("value",new_a_val1);

});


$("#frm_update_vote").submit(function (e) {

    e.preventDefault();

    var data = {
        d_vote :document.getElementById('d_vote').value,
        d_allocation :document.getElementById('d_vote_allocation').value,
        changed_d_allocation :document.getElementById('d_changed').value,
        a_vote :document.getElementById('a_vote').value,
        a_allocation :document.getElementById('a_vote_allocation').value,
        changed_a_allocation :document.getElementById('a_changed').value,
        changed_amount :document.getElementById('changing_amount').value,
        Note :document.getElementById('Note').value,
        year:document.getElementById('u_year').value
    }



    update_vote(this,data);

    function update_vote(context,data) {

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
             $("#massage").append("<p style='color: #3c763d'>Successfully Updated</p>")
            }
        });
    }
})


