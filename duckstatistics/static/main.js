$(document).ready(function () {
    /**
     * Contains multiple scenarios.
     * 1. Datatable loading plugin
     * 2. Error Validation Checking for values
     * */
    $('#main_table').DataTable();

});


function validate_records() {
    var lis = [];
    $(".container input").each(function () {
        if ($(this).val()) {
            lis.push($(this).val());
        }
    });
    if (lis.length === 7) {
        return true;
    }
    $(".container input").each(function () {
        if (!$(this).val()) {
            $(".error_" + $(this).attr("name")).show();
            $(this).css("border", "2px solid red");
        }
        else {
            $(".error_" + $(this).attr("name")).hide();
            $(this).css("border", " None");

        }
    });
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
    if (validate_records() === true) {
        $.ajax({
            type: "POST",
            url: "post/create_entry/",
            data: Object,
            success: function (response) {
                console.log(response);
            }
        });
    }

}
