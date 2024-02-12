function showUser(str) {
  if (str !== "") {
    $.ajax({
      url: "/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ choice: str }),
      success: function (result) {},
    });
  }
}
