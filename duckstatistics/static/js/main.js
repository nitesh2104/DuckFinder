$(document).ready(function () {
    /**
     * Contains multiple scenarios.
     * 1. Datatable loading plugin
     * 2. Error Validation Checking for values
     * */
    $('#main_table').DataTable({
        "pageLength": 10,
        "order": [[0, "desc"]]
    });

});


function validate_records() {
    /**
     * This method checks and validates the missing inputs.
     * */
    var lis = [];
    $(".container input").each(function () {
        if ($(this).val()) {
            lis.push($(this).val());
        }
    });
    if (lis.length === 8) {
        return true;
    }
    console.log(lis.length);
    $(".container input").each(function () {
        if (!$(this).val()) {
            $(".error_" + $(this).attr("name")).show();
            $(this).css("border", "2px solid red");
        }
        else {
            $(".error_" + $(this).attr("name")).hide();

        }
    });
}

function add_table_row(response) {
    $(".table_tbody_row:first").before(
        "<tr>" +
        "<td>" + "#" + "</td>" +
        "<td>" + response['country_name'] + "</td>" +
        "<td>" + response['park_name'] + "</td>" +
        "<td>" + response['number_of_ducks'] + "</td>" +
        "<td>" + response['time_fed'] + "</td>" +
        "<td>" + response['food_amount'] + "</td>" +
        "<td>" + response['food_type'] + "</td>" +
        "<td>" + response['food_name'] + "</td>" +
        "</tr>>"
    );
}

function submit_data() {
    /**
     * This is the method that contains the ajax request.
     * The information from the form is obtained and collected
     * in the form of dict. This dict is then sent to the
     * method create_entry via the post url which is captured
     * in the urls file. This then is read from the method
     * create_entry in the views.py and is further evaluated.
     * */

    var Object = {};
    Object.country_name = $(".container input[name=country]").val();
    Object.park_name = $(".container input[name=park]").val();
    Object.number_of_ducks = $(".container input[name=ducks_fed]").val();
    Object.food_name = $(".container input[name=food_name]").val();
    Object.food_type = $(".container input[name=food_type]").val();
    Object.time_fed = $(".container input[name=time_fed]").val();
    Object.fed_amount = $(".container input[name=fed_amount]").val();
    Object.repeat = $(".container input[name=repeat]").is(":checked");


    if (validate_records() === true) {
        $.ajax({
            type: "POST",
            url: "/post/create_entry/",
            data: Object,
            success: function (response) {
                add_table_row(response);
                $("#id01").fadeOut();
            }
        });
    }

}
