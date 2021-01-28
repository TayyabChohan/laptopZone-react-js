import $ from "jquery";
function PostData(type, userName, passWord) {
  var getUrl = window.location;
  let finalurl =
    getUrl.protocol +
    "//" +
    getUrl.hostname +
    "/laptopzone/reactcontroller/c_react/login";

  return new Promise(function(resolve, reject) {
    $.ajax({
      url: finalurl,
      dataType: "json",
      type: "POST",
      data: { userName: userName, passWord: passWord }
    }).then(
      function(data) {
        resolve(data.query);
      },
      function(err) {
        reject(err);
      }
    );
  });
}

export default PostData;
