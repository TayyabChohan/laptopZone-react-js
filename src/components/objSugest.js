


import $ from 'jquery';

var getUrl = window.location;
let finalurl = getUrl.protocol + "//" + getUrl.hostname+"/laptopzone/reactcontroller/c_react/get_obj_drop_sugestion";
var users = [
  {
    NICKNAME: 'crazyfrog',
    EMAIL: 'frog@foobar.com'
  }
]

  // $.ajax({
  //         url: finalurl,
  //         dataType: 'json',
  //         type: 'POST',
  //          data:{},
  //           success: function(data) {
  //             users = data; 
  //             console.log(data);
               
                
  //           }.bind(this),
  //           error: function(xhr, resp, text) {
  //               //show error to console
  //               //console.log(xhr,resp,text);
  //           }
  //       });

  return new Promise(function(resolve, reject) {
      $.ajax({
            url:  finalurl,
            dataType: 'json',
            type: 'POST',
            data:{},
      }).then(function(data) {
        resolve(data);
      }, function(err) {
        reject(err);
      });
    });


// const datas = [
//   {
//     NICKNAME: 'crazyfrog',
//     EMAIL: 'frog@foobar.com'
//   },
//   {
//     NICKNAME: 'tatanka',
//     EMAIL: 'ttt@hotmail.com'
//   },
//   {
//     NICKNAME: 'wild',
//     EMAIL: 'www@mail.ru'
//   },
//   {
//     NICKNAME: 'race car',
//     EMAIL: 'racing@gmail.com'
//   },
//   {
//     NICKNAME: 'cook',
//     EMAIL: 'cooking@yahoo.com'
//   },
//   {
//     NICKNAME: 'Apple',
//     EMAIL: 'Computer and laptop parts'
//   },
//   {
//     NICKNAME: 'Dvd',
//     EMAIL: 'laptop parts '
//   },
//   {
//     NICKNAME: 'Dvd',
//     EMAIL: 'laptop parts seperate'
//   },{
//     NICKNAME: 'Dvddddd',
//     EMAIL: '(laptop parts seperate laptop parts seperate laptop parts seperate laptop parts seperate)'
//   },{
//     NICKNAME: 'adil',
//     EMAIL: '(laptop parts seperate laptop parts seperate laptop parts seperate laptop parts seperate)'
//   },{
//     NICKNAME: 'asad',
//     EMAIL: '(laptop father)'
//   },
// ];
//users = data;
console.log(users);
console.log('1');
//console.log(datas);


export default users;




// import $ from 'jquery';
// function users() {

//   var getUrl = window.location;
//   let finalurl = getUrl.protocol + "//" + getUrl.hostname+"/laptopzone/reactcontroller/c_react/get_obj_drop_sugestion";
  
  
 
//   return new Promise(function(resolve, reject) {
//       $.ajax({
//         url:  finalurl,
//               dataType: 'json',
//             type: 'POST',
//              data:{},
//       }).then(function(data) {
//         resolve(data.query);
//       }, function(err) {
//         reject(err);
//       });
//     });
// }

// export default users;