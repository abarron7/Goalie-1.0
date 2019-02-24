// Get references to page elements
var $username = $("#input-username");
var $balance = $("#input-balance");
var $income = $("#input-income");
var $goaldescr = $("#input-goaldescr");
var $goalamount = $("#input-goalamount");

var $submitBtn = $("#submitf");

// The API object contains methods for each kind of request we'll make
var API = {
  getUsers: function() {
    return $.ajax({
      url: "api/users",
      type: "GET"
    });
  },
  saveUser: function(users) {
    console.log("\n\n Running API.saveUser function.\n");
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(users)
    });
  },
  getFinancials: function() {
    return $.ajax({
      url: "api/Financials/",
      type: "GET"
    });
  },
  saveFinancials: function(financials) {
    console.log("\n Running API.saveFinancials function.\n");
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../api/Financials",
      data: JSON.stringify(financials)
    });
  },
  deleteFinancials: function(id) {
    return $.ajax({
      url: "../../api/Financials/" + id,
      type: "DELETE"
    });
  }
};

// refreshUsers gets new financials from the db and repopulates the list
// var refreshUsers = function() {
//   API.getUser().then(function(data) {
//     var $user = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + User.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": User.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new financials
// Save the new financials to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var financials = {
    balance: $balance.val().trim(),
    income: $income.val().trim(),
    goaldescr: $goaldescr.val().trim(),
    goalamount: $goalamount.val().trim(),
    userid: 0
  };

  if (!financials.balance) {
    alert("You must enter your balance!");
    return;
  }

  var newID;

  API.saveFinancials(financials).then(function(x) {
    console.log("Running API.saveFinancials(financials)");
    console.log("new financial entry ID is " + x.id);
    newID = x.id;

    financials.userid = newID;
    console.log(financials.userid);
  });

  $balance.val("");
  $income.val("");
  $goaldescr.val("");
  $goalamount.val("");
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
