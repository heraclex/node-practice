var clientApp = (function($) {
  var apiUrl = "http://localhost:3000/api/users/";

  var init = function() {
    console.log("client app start....!");
    startSocketIo();
    bindingSearchButton();
    getUsers();
    ko.applyBindings(clientApp);
    console.log("client app ready....!");
  };

  return {
    users: ko.observableArray(),
    searchText: "Search",
    showProgressBar: ko.observable(true),
    Init: init
  };

  function startSocketIo() {
    var socket = io();
    socket.on("connect", function(data) {
      socket.emit("join", "Hello World from client");
    });
    socket.on("messages", function(data) {
      $("#alert").html(data);
    });
  }
  function bindingSearchButton() {
    $("#search-form > button").click(function(e) {
      var searchtext = $("#search-form input:first-child").val();
      e.preventDefault();
      if (searchtext !== null || searchtext !== "") {
        var jqxhr = $.get(apiUrl + searchtext, function(data) {
          if (data) {
            clientApp.users.push(data);
          }
        });
        jqxhr.fail(function() {
          //alert("error");
        });
      }
    });
  }
  function getUsers() {
    $.get(apiUrl, function(data) {
      if (data) {
        data.forEach(element => {
          clientApp.users.push(element);
        });
        clientApp.showProgressBar(false);
      }
    }).fail(function() {
      //alert("error");
    });
  }
})(jQuery);
