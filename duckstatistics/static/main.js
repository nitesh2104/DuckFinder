function submit_data() {
    var Object = {};
    Object.country_name = $(".container input[name=country]").val();
    Object.park_name = $(".container input[name=park]").val();
    Object.number_of_ducks = $(".container input[name=ducks_fed]").val();
    Object.food_name = $(".container input[name=food_name]").val();
    Object.food_type = $(".container input[name=food_type]").val();
    Object.time_fed = $(".container input[name=time_fed]").val();
    Object.fed_amount = $(".container input[name=fed_amount]").val();
    $.ajax({
        type: "POST",
        url: "post/create_entry/",
        data: Object,
        success: function (response) {
            console.log(response);
        }
    });
}
