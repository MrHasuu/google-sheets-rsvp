/*
Those of you who finds this, you know who you are.
I know this entire thing is on the frontend and easily hackable.
so dont, kthx.
This isnt a PR, dont review it.
*/

function toggleAttendCollapse(val) {
  $("#collapseForm").collapse("show");
  if (val === 1) {
    $("#yesForm").collapse("show");
    $("#yesRadio").prop("checked", true);
    $("#noRadio").prop("checked", false);
  } else {
    $("#yesForm").collapse("hide");
    $("#yesRadio").prop("checked", false);
    $("#noRadio").prop("checked", true);
  }
}

function confirmClicked() {
  var url =
    "https://script.google.com/macros/s/12345/exec";

  if (
    $("#nameError").html().includes("*") ||
    $("#attendeeName1").val() === ""
  ) {
    console.log("no");
    return;
  }

  var mydata = {
    attend: $("#yesRadio").prop("checked") ? "Yes" : "No",
    name: $("#attendeeName1").val(),
    party: $(".partyOption").val() === "1" ? "solo" : "full party",
    people: $("#partyCount").val(),
    kids: $("#kidCount").val(),
    allergy: $(".allergyBox").val(),
    message: $(".messageBox").val(),
    date: new Date(),
  };

  showPopup(); // swing happy sylphy

  try {
    $.post(url, mydata, function (response) {
      if (response.status === "success") {
        console.log("Data sent successfully!");
        $("#happy").removeClass("swing");
        $("#send").addClass("hide");
        $(".success").removeClass("hide");
        $(".closer").removeClass("hide");
      }
    });
  } catch (e) {
    console.error(e);
    $("#happy").addClass("hide");
    $("#sad").removeClass("hide");
    $("#send").addClass("hide");
    $(".failed").removeClass("hide");
    $(".closer").removeClass("hide");
  }
}

function textValidation() {
  const text = $("#attendeeName1").val();
  if (text === "") return "* field required";
  const pattern = /^[a-zA-Z\s\-]*$/;
  return pattern.test(text) ? "" : "* Invalid name";
}

function numberValidation(type) {
  const input = type === 1 ? $("#partyCount").val() : $("#kidCount").val();
  if (input.includes(".")) {
    if (type === 1) {
      $("#partyCount").val(0);
    } else {
      $("#kidCount").val(0);
    }
    return;
  } else {
    let num = Number(input);

    if (num > -1) {
      // good stuff, everything else gots to go.
    } else {
      if (type === 1) {
        $("#partyCount").val(0);
      } else {
        $("#kidCount").val(0);
      }
    }
  }
}

function showPopup() {
  $(".popup").removeClass("hide");
  $(".darkbg").removeClass("hide");
}

function hidePopup() {
  $(".popup").addClass("hide");
  $(".darkbg").addClass("hide");
  $("#happy").removeClass().addClass("sylphy swing");
  $("#sad").removeClass().addClass("sylphy hide");
  $("#send").removeClass("hide");
  $(".failed").addClass("hide");
  $(".success").addClass("hide");
  $(".closer").addClass("hide");
}

document.addEventListener("DOMContentLoaded", function () {
  $(".partyOption").change(function () {
    var selectedValue = $(this).val();
    if (selectedValue === "2") {
      $("#collapseKids").collapse("show");
    } else if (selectedValue === "1") {
      $("#collapseKids").collapse("hide");
    }
  });

  $("#attendeeName1").on("input", function () {
    const res = textValidation();
    $("#nameError").text(res);
  });

  $("#partyCount").on("input", function () {
    const res = numberValidation(1);
  });

  $("#kidCount").on("input", function () {
    const res = numberValidation(2);
  });
});
