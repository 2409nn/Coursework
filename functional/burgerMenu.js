$(document).ready(function() {

    // let status = "hidden"

    $("#burger").click(function() {

        $("aside").toggleClass("active")

        $("aside nav li a").css({"marginLeft" : "20px"})

        $("aside nav li a span").css({"fontSize": "12px",
                                    "marginLeft": "10px"})

    })

})