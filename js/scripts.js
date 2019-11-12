//pizza constructor
function Pizza(type, size, crust) {
  this.type = type;
  this.size = size;
  this.crust = crust;
  this.toppings = [];
}
//price size
var sizePrice = {
  small: 700,
  medium: 900,
  large: 1200
};
var toppingPrice = [
  {
    bacon: {
      small: 50,
      medium: 100,
      large: 150
    },
    mushrooms: {
      small: 50,
      medium: 100,
      large: 150
    },
    onions: {
      small: 50,
      medium: 100,
      large: 150
    }
  }
];

function Location(name, estate) {
  this.name = name;
  this.estate = estate;
}

var crustPrice = {
  crispy: 200,
  stuffed: 200,
  gluten: 150
};

function sizeCalcPrice(size) {
  if (size === "small") {
    return sizePrice.small * 1;
  } else if (size === "medium") {
    return sizePrice.medium * 1;
  } else {
    return sizePrice.large * 1;
  }
}

function crustCalcPrice(crust) {
  if (crust === "crispy") {
    return crustPrice.crispy * 1;
  } else if (crust === "stuffed") {
    return crustPrice.stuffed * 1;
  } else {
    return crustPrice.gluten * 1;
  }
}

function toppingsCalcPrice(toppings) {
  var noOfTopping = 0;
  for (i = 0; i < toppings.length; i++) {
    if (toppings[i] == "bacon") {
      noOfTopping += 150;
    }
    if (toppings[i] == "mushrooms") {
      noOfTopping += 100;
    }
    if (toppings[i] == "onions") {
      noOfTopping += 50;
    }
  }
  return noOfTopping * 1;
}

function checkBacon(topping) {
  return topping === "bacon";
}

// *********UI Logic***********//
$("document").ready(function() {
  function getPizzaType() {
    return $("#pizza-type")
      .find(":selected")
      .val();
  }
  function getPizzaSize() {
    return $("#pizza-size")
      .find(":selected")
      .val();
  }

  function getCrust() {
    return $("#pizza-crust")
      .find(":selected")
      .val();
  }

  function getToppings() {
    var toppingList = [];
    $(".toppings :checked").each(function() {
      toppingList.push($(this).val());
    });
    return toppingList;
  }

  $("form#myform").submit(function(event) {
    event.preventDefault();
    var pizzaType = getPizzaType();
    var pizzaSize = getPizzaSize();
    var crust = getCrust();
    var toppingList = getToppings();

    var newPizza = new Pizza(pizzaType, pizzaSize, crust);
    newPizza.toppings.push(toppingList);
    $("#cart").hide();
    $("#table").show();
    $(".checkout").show();
    var oneOrder =
      sizeCalcPrice(pizzaSize) +
      crustCalcPrice(crust) +
      toppingsCalcPrice(toppingList);

    $("#items").append(
      "<tr>" +
        "<td>" +
        newPizza.type +
        "</td>" +
        "<td>" +
        "<p>" +
        newPizza.size +
        "</p>" +
        "</td>" +
        "<td>" +
        "<p>" +
        newPizza.crust +
        "</p>" +
        "</td>" +
        "<td>" +
        newPizza.toppings +
        "</td>" +
        "<td>" +
        oneOrder +
        "</td>" +
        "</tr>"
    );
  });
  var totalQuantity = parseInt($("#quantity").val());
  function calcTotal() {
    var priceOnePizza =
      sizeCalcPrice(getPizzaSize()) +
      crustCalcPrice(getCrust()) +
      toppingsCalcPrice(getToppings());
    return priceOnePizza;
  }
  var pizzaList = [];

  $("#orderbtn").on("click", function() {
    totalQuantity += 1;
    $("#quantity").text(totalQuantity);
    pizzaList.push(calcTotal());
  });

  $("#gettotal").click(function() {
    var total = 0;
    pizzaList.forEach(function(pizza) {
      total += pizza;
    });

    $("#money").text(total);
  });

  $("#myModel").click(function() {
    var deliver = confirm(
      "Would you like us deliver your order at a cost of ksh 250."
    );
    if (deliver) {
      var place = prompt("Enter your location");
      var phonenumber = prompt("enter your number");
      var finalPrice = calcTotal() * totalQuantity + 250;
      alert(
        "Thankyou. Your order will be delivered at " +
          place +
          "Total amout is " +
          finalPrice
      );
      $("#place").text(place);
      $("phonenumber").number(phonenumber);

      $("#finalprice").text(finalPrice);

      $("#success").show();
    } else {
      $("#no-location").text(calcTotal() * totalQuantity);
      $("#no-delivery").show();
    }
  });
  $("#myModel").click(function() {
    var deliver = confirm(
      "Would you like us deliver your order to your doorstep? transport cost ksh 250."
    );
    $("#pizza-type").val("");
    $("#pizza-size").val("");
    $("#pizza-crust").val("");
    $("#items").remove();
    $("#quantity").text(0);
  });
});
