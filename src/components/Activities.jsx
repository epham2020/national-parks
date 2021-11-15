import React from "react";

/**
 * getActivities fetches data from the NPS API, creating a mapping of activities to national parks that have that activity,
 * and creating buttons corresponding to activity names
 */
async function getActivities() {

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
   v.style="margin-left: 15px; margin-bottom: 15px; padding: 15px; background: #d6c0a8";

   //On click, pulls up the list of buttons of national parks that has that activity
   v.onclick = function () {getList(activToNameDict, activToCodeDict, activ)};
   document.getElementById('acts').appendChild(v);
  }
}


/**
 * getList returns for the activity that was clicked, a series of buttons of national parks that have that
 * activity
 * 
 * @param {*} activToNameDict a mapping that maps an activity string to a list of full names of national parks
 * @param {*} activToCodeDict a mapping that maps an activity string to a list of park codes of national parks
 * @param {*} activ the activity whose corresponding button is clicked
 */
function getList(activToNameDict, activToCodeDict, activ) {

  //reset list of national parks each time an activity is clicked
  document.getElementById('list').innerHTML = "";

  //create a button for each national park that is under that activity
  for (let n=0;n<activToNameDict[activ].length;n++){
    var a = document.createElement('input');
    a.type="button";
    a.value=activToNameDict[activ][n];
    a.style="margin-left: 15px; margin-bottom: 15px; padding: 15px; background: #d6c0a8";

    //On click of national park button, pulls up an informationanl page about that national park
    //input of park code
    a.onclick = function () {getInformation(this, activToCodeDict[activ][n])};
    document.getElementById('list').appendChild(a);  
  }

  //header for list of national parks that offer clicked activity
  document.getElementById('indAct').innerHTML = activ + ": offered at the following U.S. National Parks";
}


/**
 * getInformation returns for the national park button that was clicked,
 * an informational page about the park including a description, operating hours,
 * contact, and images
 * 
 * @param {*} button information about the national park button object that was clicked
 * @param {*} parkCode the park code corresponding to the national park button that was clicked
 */
async function getInformation(button, parkCode) {

  //header for informational page
  var buttonVal = button.value;
  document.getElementById('infoTitle').innerHTML = "Information about " + buttonVal;

  //fetches park data from NPS API for national park corresponnding to parkCode
  var urlLink = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkCode + '&api_key=ZXXr1uUYZgQP6dKgYSEcuW71p5YxXU1f3ioeYPtW';
  const response = await fetch(urlLink);
  const datas = await response.json();
  const { data } = datas;

  const { url, fullName, description, latLong, activities, states, contacts, operatingHours, images } = data[0];

  //fetches activities corresponding to national park that was clicked
  var arrayActivities = []
  for (var k in activities){
    arrayActivities.push(activities[k].name + "</br>");
  }

  //fetches phone numbers corresponding to national park that was clicked
  var mapPhones = [];
  for (var o in contacts.phoneNumbers){
    mapPhones.push(contacts.phoneNumbers[o].type + ": " + contacts.phoneNumbers[o].phoneNumber + "</br>");
  }

  //fetches email addresses corresponding to national park that was clicked
  var emailAdd = [];
  for (var p in contacts.emailAddresses){
    emailAdd.push(contacts.emailAddresses[p].emailAddress + "</br>");
  }

  //fetches operating hours corresponding to national park that was clicked
  var hours = [];
  for (var g in operatingHours[0].standardHours){
    hours.push(g + ": " + operatingHours[0].standardHours[g] + "</br>");
  }

  //fetches images corresponding to national park that was clicked
  var imageArray = [];
  var titleArray = [];
  var captionArray = [];
  for (var indImage in images){
    imageArray.push(images[indImage].url);
    titleArray.push(images[indImage].title);
    captionArray.push(images[indImage].caption);
  }

  document.getElementById('url').innerHTML = "<b>Link</b>:</br> " + url;
  document.getElementById('fullName').innerHTML = "<b>Name</b>: " + fullName;
  document.getElementById('states').innerHTML = "<b>State</b>: " + states;
  document.getElementById('description').innerHTML = "<b>Description</b>: " + description;
  document.getElementById('latLong').innerHTML = "<b>Coordinates</b>:</br> " + latLong;
  document.getElementById('activities').innerHTML = "<b>Activities</b>:</br> " + arrayActivities.join(' ');
  document.getElementById('phone').innerHTML = "<b>Phone</b>:</br> " + mapPhones.join(' ');
  document.getElementById('email').innerHTML = "<b>Email</b>:</br> " + emailAdd.join(' ');
  document.getElementById('hours').innerHTML = "<b>Hours</b>:</br> " + hours.join(' ');

  document.getElementById('image').innerHTML = "";
  for (var z=0; z<imageArray.length;z++){
    var newImage = new Image(1237, 696);
    newImage.src = imageArray[z];
    newImage.style = "margin-left: 15px; margin-bottom: 15px";
    document.getElementById('image').appendChild(newImage);

    var newTitleBold = document.createElement('strong');
    var newTitle = document.createTextNode(titleArray[z] + ": ");
    newTitleBold.appendChild(newTitle);
    document.getElementById('image').appendChild(newTitleBold);

    var newCaption = document.createTextNode(captionArray[z]);
    document.getElementById('image').appendChild(newCaption);

    var br = document.createElement("br");
    document.getElementById('image').appendChild(br);

    var empty = document.createElement("pre");
    var newLine = document.createTextNode('\n\n\n');
    empty.appendChild(newLine);
    document.getElementById('image').appendChild(empty);


  }

}


function Activities() {

  getActivities();
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
            <p style={{'fontSize': '25px', color: '#8bc34a', 'fontFamily': 'Rockwell'}}>
              <u style={{color: '#8bc34a'}}>Click an activity to find out which parks offer it</u><br />
            </p>
            <span id="acts"></span><br /><br />
            <u style={{color: '#8bc34a'}}><span style={{'fontSize': '25px', color: '#8bc34a', 'fontFamily': 'Rockwell'}} id="indAct"></span></u><br /><br />
            <span id="list"></span><br />
          </p>
        </div>
        <div class="row align-items-center my-5">
          <p>
            <p style={{'text-align': 'center'}}>
              <u style={{color: '#8bc34a'}}><span style={{'fontSize': '35px', color: '#8bc34a', 'fontFamily': 'Rockwell'}} id="infoTitle"></span></u><br /><br />
            </p>
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
            <span id="image"></span><br /><br />
          </p>
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