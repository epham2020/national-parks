
import React from "react";

async function getParks(updateFunc) {

  var imgDict = {};

  const webcams = await fetch('https://developer.nps.gov/api/v1/webcams?limit=192&api_key=ZXXr1uUYZgQP6dKgYSEcuW71p5YxXU1f3ioeYPtW');
  const camData = await webcams.json();
  for (var l in camData.data){
    const { relatedParks, images } = camData.data[l];
    for (var m in relatedParks){
      if (relatedParks[m].designation === "National Park"){
        if (images.length > 0){
          if (!(relatedParks[m].fullName in imgDict)){
            var keyList = [];
            keyList.push(images[0].url);
            imgDict[relatedParks[m].fullName] = keyList;
          }
          else{
            imgDict[relatedParks[m].fullName].push(images[0].url)
          }
        }
      }
    }
  }
  
  var imgList = Object.keys(imgDict);

  updateFunc(imgDict, imgList);
}


class Parks extends React.Component {
  
  constructor() {

    super();
    getParks((imgDict, imgList) => {
      this.setState({
        imgDict:imgDict,
        imgList: imgList,
      })
    });

    this.state = {
      imgDict: {},
      imgList: [],
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
    document.getElementById('lst').innerHTML = "";
  
    for (var i=0; i<imgURL.length;i++){
      var image = new Image(700,300);
      image.src = imgURL[i];
      document.getElementById('lst').appendChild(image);
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
            <div class="row align-items-center my-5">
              <p>
                <u>Click from available National Parks to view non streaming webcam photos</u><br />
                <span id="acts"></span><br /><br />
              </p>
              <select name="parks" id="parksDropdown" value={selectedPark} onChange={this.getImages}>
                  {this.state.imgList.map((val) => {
                      return <option value={val}>{val}</option>;
                  })}
              </select>


            </div>
            <div class="row align-items-center my-5">
              <div class="col-lg-5" style={{padding: 0}}>
                <p>
                  <u>Images</u><br />
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