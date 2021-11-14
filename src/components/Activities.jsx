import React from "react";

// async function getActivities() { 
//   const response = await fetch('https://developer.nps.gov/api/v1/activities?api_key=HdcKBIGAqrkB3XPmfIrzvBRke7MsV493U0m1t7Ni');
//   const datas = await response.json();
//   const { data } = datas;
//   console.log(data);

//   var act = ""
//   for (var i in data){
//     act = act + " " + data[i].name
//   }

//   document.getElementById('nam').textContent = act;
// }

async function getActivitiesByPark() {

  //fetch activity data from NPS API
  const response = await fetch('https://developer.nps.gov/api/v1/activities/parks?api_key=ZXXr1uUYZgQP6dKgYSEcuW71p5YxXU1f3ioeYPtW');
  const datas = await response.json();
  const { data } = datas;

  //map that maps the activity to a list of national park names
  var activToNameDict = {}

  //map that maps the activity to a list of national park codes
  var activToCodeDict = {}

  for (var i in data){
    var fullNameArray = []
    var parkCodeArray = []

    //for each activity, add the fullName to fullNameArray and parkCode to parkCode array only if a National Park designation
    const { parks } = data[i]
    for (var j in parks){
      if (parks[j].designation === "National Park"){
        fullNameArray.push(parks[j].fullName)
        parkCodeArray.push(parks[j].parkCode)
      }
    }
    activToNameDict[data[i].name] = fullNameArray
    activToCodeDict[data[i].name] = parkCodeArray
  }

  //create a list of the keys to iterate over
  var activArray = Object.keys(activToNameDict);
 
  //for each activity, create a button
  for (let n=0;n<activArray.length;n++) {  
   let activ = activArray[n]
   var v = document.createElement('input');
   v.type="button";
   v.value=activ;

   //On click, pulls up the list of buttons of national parks that has that activity
   v.onclick = function () {getList(activToNameDict, activToCodeDict, activ)};
   document.getElementById('acts').appendChild(v);
  }
}

function getList(activToNameDict, activToCodeDict, activ) {

  //reset list of national parks each time an activity is clicked
  document.getElementById('list').innerHTML = "";

  //create a button for each national park that is under that activity
  for (let n=0;n<activToNameDict[activ].length;n++){
    var a = document.createElement('input');
    a.innerHTML = "Click Me";
    a.type="button";
    a.value=activToNameDict[activ][n];

    //On click of national park button, pulls up an informationanl page about that national park
    //input of park code
    a.onclick = function () {getInformation(this, activToCodeDict[activ][n])};
    document.getElementById('list').appendChild(a);  
  }

  document.getElementById('indAct').innerHTML = activ + ": offered at the following U.S. National Parks";
}

async function getInformation(button, parkCode) {

  var buttonVal = button.value;
  document.getElementById('infoTitle').innerHTML = "Information about " + buttonVal;

  //fetches park data from NPS API for national park corresponnding to parkCode
  var urlLink = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&api_key=ZXXr1uUYZgQP6dKgYSEcuW71p5YxXU1f3ioeYPtW';
  const response = await fetch(urlLink);
  const datas = await response.json();
  const { data } = datas;

  const { url, fullName, description, latLong, activities, states, contacts, operatingHours } = data[0];

  var arrayActivities = []
  for (var k in activities){
    arrayActivities.push(activities[k].name + "</br>");
  }

  var mapPhones = [];
  for (var o in contacts.phoneNumbers){
    mapPhones.push(contacts.phoneNumbers[o].type + ": " + contacts.phoneNumbers[o].phoneNumber + "</br>");
  }

  var emailAdd = [];
  for (var p in contacts.emailAddresses){
    emailAdd.push(contacts.emailAddresses[p].emailAddress + "</br>");
  }

  var hours = [];
  console.log(operatingHours);
  for (var g in operatingHours[0].standardHours){
    hours.push(g + ": " + operatingHours[0].standardHours[g] + "</br>");
  }

  document.getElementById('url').innerHTML = "<b>Link</b>: " + url;
  document.getElementById('fullName').innerHTML = "<b>Name</b>: " + fullName;
  document.getElementById('states').innerHTML = "<b>State</b>: " + states;
  document.getElementById('description').innerHTML = "<b>Description</b>: " + description;
  document.getElementById('latLong').innerHTML = "<b>Coordinates</b>: " + latLong;
  document.getElementById('activities').innerHTML = "<b>Activities</b>:</br> " + arrayActivities.join(' ');
  document.getElementById('phone').innerHTML = "<b>Phone</b>:</br> " + mapPhones.join(' ');
  document.getElementById('email').innerHTML = "<b>Email</b>:</br> " + emailAdd.join(' ');
  document.getElementById('hours').innerHTML = "<b>Hours</b>:</br> " + hours.join(' ');

}


function Activities() {

  getActivitiesByPark();
  //getActivities();
  return (
    <div className="activities">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.antilogvacations.com/Images/Home/Subdestinations/International/International-Alaska-GlacierBayNationalPark.jpg"
              alt=""
            />
            <figcaption>Yellowstone National Park</figcaption>

          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Activities</h1>
            <p>
              Find out which parks offer our wide range of activities
            </p>
          </div>
        </div>
        <div class="row align-items-center my-5">
          <p>
            <u>Click an activity to find which parks offer it</u><br />
            <span id="acts"></span><br /><br />
            <u><span id="indAct"></span></u><br />
            <span id="list"></span><br />
          </p>
        </div>
        <div class="row align-items-center my-5">
          <p>
            <u><span style={{'fontSize': '40px', color: 'red', 'fontFamily': 'cursive'}} id="infoTitle"></span></u><br /><br />
            <span id="fullName"></span><br /><br />
            <span id="states"></span><br /><br />
            <span id="description"></span><br /><br />
          </p>
        </div> 
        <div class="row align-items-baseline my-5">
        
          <div class="col-lg-7">
            <p>
              <span id="latLong"></span><br /><br />
              <span id="url"></span><br /><br />
              <span id="activities"></span><br /><br />
            </p>
          </div>
          <div class="col-lg-5">
            <p>
              <span id="phone"></span><br /><br />
              <span id="email"></span><br /><br />
              <span id="hours"></span><br /><br />
            </p>
          </div>
          
        </div>
        <div class="row align-items-center my-5">
          <p>
            <br /><br /><br /><br />
          </p>
        </div>       
      </div>
    </div>
  );
}

export default Activities;