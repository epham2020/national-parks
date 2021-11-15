
import React from "react";

async function getParks(updateFunc) {

  var imgDict = {};
  var titleDict = {};
  var captionDict = {};

  const webcams = await fetch('https://developer.nps.gov/api/v1/webcams?limit=192&api_key=ZXXr1uUYZgQP6dKgYSEcuW71p5YxXU1f3ioeYPtW');
  const camData = await webcams.json();
  for (var l in camData.data){
    const { relatedParks, images } = camData.data[l];
    for (var m in relatedParks){
      if (relatedParks[m].designation === "National Park"){
        if (images.length > 0){
          if (!(relatedParks[m].fullName in imgDict)){
            var keyList = [];
            var titList = [];
            var capList = [];

            keyList.push(images[0].url);
            titList.push(images[0].title);
            capList.push(images[0].caption);

            imgDict[relatedParks[m].fullName] = keyList;
            titleDict[relatedParks[m].fullName] = titList;
            captionDict[relatedParks[m].fullName] = capList;
          }
          else{
            imgDict[relatedParks[m].fullName].push(images[0].url)
            titleDict[relatedParks[m].fullName].push(images[0].title)
            captionDict[relatedParks[m].fullName].push(images[0].caption)
          }
        }
      }
    }
  }
  
  var imgList = Object.keys(imgDict);
  var titleList = Object.keys(titleDict);
  var captionList = Object.keys(captionDict);

  updateFunc(imgDict, imgList, titleDict, titleList, captionDict, captionList);
}


class Parks extends React.Component {
  
  constructor() {

    super();
    getParks((imgDict, imgList, titleDict, titleList, captionDict, captionList) => {
      this.setState({
        imgDict:imgDict,
        imgList: imgList,
        titleDict: titleDict,
        titleList: titleList,
        captionDict: captionDict,
        captionList: captionList
      })
    });

    this.state = {
      imgDict: {},
      imgList: [],
      titleDict: {},
      titleList: [],
      captionDict: {},
      captionList: [],
      selectedPark: null,
    };
    
    this.getImages = this.getImages.bind(this);
  }
  // getParks();

getImages(e) {

    if (!(e && e.target && e.target.value && this.state && this.state.imgDict)) {
      return;
    }

    var imgURL = this.state.imgDict[e.target.value]
    var indTitle = this.state.titleDict[e.target.value]
    var indCaption = this.state.captionDict[e.target.value]

    document.getElementById('lst').innerHTML = "";
  
    for (var i=0; i<imgURL.length;i++){
      var image = new Image(700,300);
      image.src = imgURL[i];
      image.style = "margin-left: 15px; margin-bottom: 15px";
      document.getElementById('lst').appendChild(image);

      var newTitleBold = document.createElement('strong');
      console.log(indTitle);
      var newTitle = document.createTextNode(indTitle[i] + ": ");

      newTitleBold.appendChild(newTitle);
      document.getElementById('lst').appendChild(newTitleBold);

      var newCaption = document.createTextNode(indCaption[i]);
      document.getElementById('lst').appendChild(newCaption);

      var br = document.createElement("br");
      document.getElementById('lst').appendChild(br);
  
      var empty = document.createElement("pre");
      var newLine = document.createTextNode('\n\n\n');
      empty.appendChild(newLine);
      document.getElementById('lst').appendChild(empty);
    }
  }

  render() {
    
    let selectedPark;


      return (
        <div className="parks">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-7">
                <img
                  class="img-fluid rounded mb-4 mb-lg-0"
                  src="https://bluemountainbb.com/wp-content/uploads/2020/08/bigstock-Logan-pass-8194883-900x400.jpg"
                  alt=""
                />
                <figcaption>Glacier National Park</figcaption>
    
              </div>
              <div class="col-lg-5" style={{padding: 0}}>
                <h1 class="font-weight-light">Parks</h1>
                <p>
                  Explore the unique nature, recreation, history, and culture of our parks
                </p>
              </div>
            </div>
            <div class="row align-items-center my-5" style={{padding: 0}}>
              <p style={{'fontSize': '25px', color: '#8bc34a', 'fontFamily': 'Rockwell'}}>
                <u style={{color: '#b66611'}}>Click from available National Parks to view non streaming webcam photos</u><br />
              </p>
              <select name="parks" id="parksDropdown" value={selectedPark} onChange={this.getImages}>
                  {this.state.imgList.map((val) => {
                      return <option value={val}>{val}</option>;
                  })}
              </select>


            </div>
            <div class="row align-items-center my-5">
              <div class="col-lg-5" style={{padding: 0}}>
              <p style={{'fontSize': '25px', color: '#8bc34a', 'fontFamily': 'Rockwell'}}>
                <u style={{color: '#b66611'}}>Images</u><br />
              </p>
                <p>
                  <span id="lst"></span><br /><br />
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
  }

  

export default Parks;