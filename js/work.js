(function(){

  //variables for data join
   var beerIcon = 15;
   var mapSize = 260000;
   var latLong = [17.045, 38.92];


//begin script when window loads
window.onload = setMap();

// python -m SimpleHTTPServer the code for my dev server
// C:\gis575\d3-coordinated-viz\d3-coordinated-viz>python -m SimpleHTTPServer
// http://localhost:8000/index.html

//set up choropleth map
function setMap(){

  //map frame dimensions
  var width = 700,
      height = 550;

  //create new svg container for the map
  var map = d3.select("body")
      .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height);

    //create Albers equal area conic projection centered on Washington, DC
  var projection = d3.geoAlbers()
        .center(latLong)
        //38, -95  or 0, 46.2
        .rotate([94, 0, 0])
        .parallels([-30.5, 34.5])
        .scale(mapSize)
      //  .translate([width / 2, height / 2]);

  var path = d3.geoPath()
      .projection(projection);

  //use queue to parallelize asynchronous data loading
      //console.log("waiting")
      d3.queue()
        .defer(d3.json, "data/highslope.geojson") //load slope
        .defer(d3.json, "data/river.geojson") //load water
        .defer(d3.json, "data/bikelanes.geojson") //load bike lanes
        .defer(d3.json, "data/metrostn.geojson") //load metro
        .defer(d3.json, "data/breweries.geojson") //load beer into mouth
        .defer(d3.json, "data/street2.geojson") //load streets
        .defer(d3.json, "data/wards_sm.geojson") //load wards
        .await(callback);

  function callback(error, slope, river, bikelane, metrostn, breweries, streets, wards){
      //place graticule on the map
      setGraticule(map, path);

    var slopes = slope.features;

    var rivers = river.features;

    var bikelanes = bikelane.features;

    var metro = metrostn.features;

    var brew = breweries.features;

    var street = streets.features;

    var ward = wards.features;

      //create the color scale
    //  var colorScale = makeColorScale(csvData);
      // add enumeration units
      setEnumerationUnits(slopes, rivers, bikelanes, metro, brew, street, ward, map, path);

  }; //end of callback
}; //end of setmap

//function to create color scale generator
function makeColorScale(data){
    var colorClasses = [
      // I tried a bunch of options
      /*
        "#D4B9DA",
        "#C994C7",
        "#DF65B0",
        "#DD1C77",
        "#980043"
      */
      /*
      "#fee5d9",
      "#fcae91",
      "#fb6a4a",
      "#de2d26",
      "#a50f15"
      */
      /*"#ffffb2",
      "#fecc5c",
      "#fd8d3c",
      "#f03b20",
      "#bd0026" */
      // brown/oranges
      "#ffffd4",
      "#fed98e",
      "#fe9929",
      "#d95f0e",
      "#993404"
    ];

    //create color scale generator
    var colorScale = d3.scaleQuantile()
        .range(colorClasses);

    //build array of all values of the expressed attribute
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };

    //assign array of expressed values as scale domain
    colorScale.domain(domainArray);
    //console.log(colorClasses)
    return colorScale;
};

//};

// mostly just creates the backgrounds here
function setGraticule(map, path){

    //create graticules
    var graticule = d3.geoGraticule()
      //.step([1, 1]); //place graticule lines every 5 degrees of longitude and latitude
    //create graticule lines

    //create graticule background
    var gratBackground = map.append("path")
        .datum(graticule.outline()) //bind graticule background
        .attr("class", "gratBackground") //assign class for styling
        .attr("d", path) //project graticule

    var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
        .data(graticule.lines()) //bind graticule lines to each element to be created
        .enter() //create an element for each datum
        .append("path") //append each element to the svg as a path element
        .attr("class", "gratLines") //assign class for styling
        .attr("d", path); //project graticule lines
        console.log("done")
};

function btnColor(btn) {
var property = document.getElementById(btn);
    if (property.className !== 'toggled') {
        property.className = 'toggled'
    }
    else {
        property.className = 'regular';
    }
}

function setEnumerationUnits(slope, river, bikelanes, metro, beer, street, ward, map, path){

//in setEnumerationUnits()...add tracts to map

var menuDiv = d3.select("body");
var menuButton = menuDiv.append("button")
    .attr("id", "buttonCentre")
    .attr("class", "buttonPos")
    .classed("button", true)
    .on('click', function(){
      console.log("clicked")
    var active = bikes.active ? false : true,
          newOpacity = active ? 0 : 1;
          console.log(active)
        d3.selectAll("path.bikeln")
          .transition()
          .duration(400)
          .style("opacity", newOpacity);
        d3.selectAll("path.slope")
          .transition()
          .duration(400)
          .style("opacity", newOpacity);
        //d3.select("#buttonCentre").style("opacity", newOpacity)
        if (active){
          d3.select("#buttonCentre")
          .style("background-color", "#fff")
          d3.select("#bikelegend")
          .style("opacity", 1)
          .transition()
          .duration(400)
          .style("opacity", 0)
        } else {
          d3.select("#buttonCentre")
          .style("background-color", "#4CAF50")
          d3.select("#bikelegend")
          .style("opacity", 0)
          .transition()
          .duration(400)
          .style("opacity", 1)
        }

        //btnColor("button")
        // Update whether or not the elements are active
        bikes.active = active;
      },
  );

// load the proj and all the data
  var proj = d3.geoAlbers()
        .center(latLong)
        //38, -95  or 0, 46.2
        .rotate([94, 0, 0])
        .parallels([-30.5, 34.5])
        .scale(mapSize)

  var beerproj = d3.geoAlbers()
        .center([latLong[0]+0.0017,latLong[1]-0.0022])
        //38, -95  or 0, 46.2
        .rotate([94, 0, 0])
        .parallels([-30.5, 34.5])
        .scale(mapSize)

//    var latLong = [17.05, 38.915];
  var proj2 = d3.geoAlbers()
        .center([latLong[0],latLong[1]-0.001])
        //38, -95  or 0, 46.2
        .rotate([94, 0, 0])
        .parallels([-30.5, 34.5])
        .scale(mapSize)

/*
   var tracts = map.selectAll(".tracts")
       .data(census)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "white")
       .attr("stroke-width",1)
       .attr("fill-opacity",0)
       //.style("fill", "lightgray");
*/
var background = map.selectAll(".background")
    .data(ward)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke-width",0)
    .attr("stroke-linejoin","round")
    .attr("stroke-linecap","round")
    .style("fill", "#ccc");

   var rivers = map.selectAll(".rivers")
       .data(river)
       .enter()
       .append("path")
       .attr("d", path)
       .style("fill", "lightblue");

   var highslope = map.selectAll(".highslope")
       .data(slope)
       .enter()
       .append("path")
        .attr("class","slope")
       .attr("d", path)
       .style("fill", "tan");

   var wards = map.selectAll(".wards")
       .data(ward)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "white")
       .attr("stroke-width",2)
       .attr("stroke-linejoin","round")
       .attr("stroke-linecap","round")
       .attr("fill-opacity",0)
       //.style("fill", "#ddd");



  var streets = map.selectAll(".streets")
       .data(street)
       .enter()
       .append("path")
       .attr("id","streets")
       .attr("class","streets")
       .attr("d", path)
       .attr("stroke", "#eee")
       .attr("fill-opacity",0)
       .attr("stroke-linejoin","round")
       .attr("stroke-linecap","round")
       .attr("stroke-width",0.5);

  var bike = map.selectAll(".bike")
       .data(bikelanes)
       .enter()
       .append("path")
       .attr("id","bikes")
       .attr("class","bikeln")
       .attr("d", path)
       .attr("stroke", "lightgreen")
       .attr("fill-opacity",0)
       .attr("stroke-linejoin","round")
       .attr("stroke-linecap","round")
       .attr("stroke-width",2);

  var metropt = map.selectAll(".metro")
        .data(metro)
        .enter()
        .append("image")
        .attr("d", path)
        .attr('xlink:href',"img/train.svg")
        .attr('height', '10')
        .attr('width', '10')
        .attr("transform", function(d) { return "translate(" + proj(d.geometry.coordinates) + ")"; })
        .on("mouseover", function(d){
            metrolabel(d.properties);
        })
        .on("mouseout", function(d){
            dehighlight(d.properties);
        })
        .on("mousemove", moveLabel)
        //.attr('x', '-50')
        //.attr('y', '-50')
        //.style("fill", "black")
        .style("opacity", 0.6);

var brewfillwhite = map.selectAll(".beer")
      .data(beer)
      .enter()
      .append("circle")
      .attr("class","brewfillwhite")
      .attr("d", path)
      .attr("transform", function(d) {
        return "translate(" + proj2(d.geometry.coordinates) + ")"; })
      .attr("r", 4.7)
      .style("fill", "white")
      .style("opacity", 1)

var brewfillyellow = map.selectAll(".beer")
      .data(beer)
      .enter()
      .append("circle")
      .attr("class","brewfillyellow")
      .attr("d", path)
      .attr("transform", function(d) {
        return "translate(" + proj(d.geometry.coordinates) + ")"; })
      .attr("r", 4.7)
      .style("fill", "#ffef47")
      .style("opacity", 1)

  var brewloc = map.selectAll(".beer")
        .data(beer)
        .enter()
        .append("image")
        .attr("d", path)
        .attr("class","beermap")
        .attr('xlink:href',"img/beer.svg")
        .attr('height', '15')
        .attr('width', '15')
        .attr("transform", function(d) { return "translate(" + beerproj(d.geometry.coordinates) + ")" })
        .on("mouseover", function(d){
            highlight(d.properties);
        })
        .on("mouseout", function(d){
            dehighlight(d.properties);
        })
        .on("mousemove", moveLabel);

        // we add a simple handler to all the checkboxes: every time one changes,
        // just call update
        //d3.selectAll(".filter_options input").on("change", update);

        d3.selectAll("#mobilewarn")
          .style("opacity", 1)
          .transition()
          .duration(10000)
          .style("opacity", 0)
          .remove();

        function updateData(){
          console.log("button")
        }

        d3.selectAll("input[name=checkb]").on("change", function() {

        function getCheckedBoxes(chkboxName) {
      		  var checkboxes = document.getElementsByName(chkboxName);
      		  var checkboxesChecked = [];
      		  for (var i=0; i<checkboxes.length; i++) {
      		     if (checkboxes[i].checked) {
      		        checkboxesChecked.push(checkboxes[i].defaultValue);
      		     }
      		  }
      		  return checkboxesChecked.length > 0 ? checkboxesChecked : " ";
      		}

      		var checkedBoxes = getCheckedBoxes("checkb");
          var type = this.value,
          // I *think* "inline" is the default.
          display = this.checked ? "yes" : "no";
          console.log(type)
          console.log(display)
          console.log(checkedBoxes)
          updateBrew(checkedBoxes, map, path, beer, proj, proj2, beerproj)
        });

};

function selector(props){
    //change stroke
    var selected = d3.selectAll("." + props.name)
        .attr('height', '10')
        .attr('width', '10')
        .style("stroke", "blue")
        .style("stroke-width", "2");
};

function updateBrew(checkedBoxes, map, path, beer, proj, proj2, beerproj){
  //console.log(checkedBoxes.indexOf("showAll"))

console.log(proj)
var wobble = 300;

  d3.selectAll("circle.brewfillwhite")
    .style("opacity", 1)
    .transition()
    .duration(300)
    .style("opacity", 0)
    .remove();

  d3.selectAll("circle.brewfillyellow")
    .style("opacity", 1)
    .transition()
    .duration(300)
    .style("opacity", 0)
    .remove();

  d3.selectAll("image.beermap")
    .style("opacity", 1)
    .transition()
    .duration(300)
    .style("opacity", 0)
    .remove();

  if (checkedBoxes.indexOf("foods") > -1){
    map.selectAll(".beer")
          .data(beer)
          .enter()
          .append("circle")
          .attr("class","brewfillwhite")
          .filter(function(d) { return d.properties.food == 'yes'})
          .attr("d", path)
          .attr("transform", function(d) {
            return "translate(" + proj2(d.geometry.coordinates) + ")"; })
          .attr("r", 4.7)
          .style("fill", "white")
          .style("opacity", 0)
          .transition()           // apply a transition
          .duration(600)         // apply it over 4000 milliseconds
          .style("opacity", 1)

    map.selectAll(".beer")
          .data(beer)
          .enter()
          .append("circle")
          .attr("class","brewfillyellow")
          .filter(function(d) { return d.properties.food == 'yes'})
          .attr("d", path)
          .attr("transform", function(d) {
            return "translate(" + proj(d.geometry.coordinates) + ")"; })
          .attr("r", 4.7)
          .style("fill", "#ffef47")
          .style("opacity", 0)
          .transition()           // apply a transition
          .duration(600)         // apply it over 4000 milliseconds
          .style("opacity", 1)

    map.selectAll(".beer")
          .data(beer)
          .enter()
          .append("image")
          .on("mouseover", function(d){
              highlight(d.properties);
          })
          .on("mouseout", function(d){
              dehighlight(d.properties);
          })
          .on("mousemove", moveLabel)
          .attr("class","beermap")
          .filter(function(d) { return d.properties.food == 'yes'})
          .attr("d", path)
          .attr('xlink:href',"img/beer.svg")
          .attr('height', beerIcon)
          .attr('width', beerIcon)
          .attr("transform", function(d) { return "translate(" + beerproj(d.geometry.coordinates) + ")"; })
          .transition()           // apply a transition
          .duration(wobble)         // apply it over 4000 milliseconds
          .attr('height', beerIcon*1.5)
          .attr('width', beerIcon*1.5)
          .transition()           // apply a transition
          .duration(wobble)         // apply it over 4000 milliseconds
          .attr('height', beerIcon)
          .attr('width', beerIcon)

      }

  if (checkedBoxes.indexOf("kids") > -1){
    map.selectAll(".beer")
          .data(beer)
          .enter()
          .append("circle")
          .attr("class","brewfillwhite")
          .filter(function(d) { return d.properties.kidfriendl == 'yes'})
          .attr("d", path)
          .attr("transform", function(d) {
            return "translate(" + proj2(d.geometry.coordinates) + ")"; })
          .attr("r", 4.7)
          .style("fill", "white")
          .style("opacity", 0)
          .transition()           // apply a transition
          .duration(600)         // apply it over 4000 milliseconds
          .style("opacity", 1)

    map.selectAll(".beer")
          .data(beer)
          .enter()
          .append("circle")
          .attr("class","brewfillyellow")
          .filter(function(d) { return d.properties.kidfriendl == 'yes'})
          .attr("d", path)
          .attr("transform", function(d) {
            return "translate(" + proj(d.geometry.coordinates) + ")"; })
          .attr("r", 4.7)
          .style("fill", "#ffef47")
          .style("opacity", 0)
          .transition()           // apply a transition
          .duration(600)         // apply it over 4000 milliseconds
          .style("opacity", 1)

    map.selectAll(".beer")
        .data(beer)
        .enter()
        .append("image")
        .on("mouseover", function(d){
            highlight(d.properties);
        })
        .on("mouseout", function(d){
            dehighlight(d.properties);
        })
        .on("mousemove", moveLabel)
        .attr("class","beermap")
        .filter(function(d) { return d.properties.kidfriendl == 'yes'})
        .attr("d", path)
        .attr('xlink:href',"img/beer.svg")
        .attr('height', beerIcon)
        .attr('width', beerIcon)
        .attr("transform", function(d) { return "translate(" + beerproj(d.geometry.coordinates) + ")"; })
        .transition()           // apply a transition
        .duration(wobble)
        .attr('height', beerIcon*1.5)
        .attr('width', beerIcon*1.5)
        .transition()           // apply a transition
        .duration(wobble)
        .attr('height', beerIcon)
        .attr('width', beerIcon)
        }

  if (checkedBoxes.indexOf("outdoor") > -1){

      map.selectAll(".beer")
            .data(beer)
            .enter()
            .append("circle")
            .attr("class","brewfillwhite")
            .filter(function(d) { return d.properties.outside == 'yes'})
            .attr("d", path)
            .attr("transform", function(d) {
              return "translate(" + proj2(d.geometry.coordinates) + ")"; })
            .attr("r", 4.7)
            .style("fill", "white")
            .style("opacity", 0)
            .transition()           // apply a transition
            .duration(300)         // apply it over 4000 milliseconds
            .style("opacity", 1)

      map.selectAll(".beer")
            .data(beer)
            .enter()
            .append("circle")
            .attr("class","brewfillyellow")
            .filter(function(d) { return d.properties.outside == 'yes'})
            .attr("d", path)
            .attr("transform", function(d) {
              return "translate(" + proj(d.geometry.coordinates) + ")"; })
            .attr("r", 4.7)
            .style("fill", "#ffef47")
            .style("opacity", 0)
            .transition()           // apply a transition
            .duration(300)         // apply it over 4000 milliseconds
            .style("opacity", 1)

        map.selectAll(".beer")
            .data(beer)
            .enter()
            .append("image")
            .on("mouseover", function(d){
                highlight(d.properties);
            })
            .on("mouseout", function(d){
                dehighlight(d.properties);
            })
            .on("mousemove", moveLabel)
            .attr("class","beermap")
            .filter(function(d) { return d.properties.outside == 'yes'})
            .attr("d", path)
            .attr('xlink:href',"img/beer.svg")
            .attr('height', beerIcon)
            .attr('width', beerIcon)
            .attr("transform", function(d) { return "translate(" + beerproj(d.geometry.coordinates) + ")"; })
            .transition()           // apply a transition
            .duration(wobble)         // apply it over 4000 milliseconds
            .attr('height', beerIcon*1.5)
            .attr('width', beerIcon*1.5)
            .transition()           // apply a transition
            .duration(wobble)         // apply it over 4000 milliseconds
            .attr('height', beerIcon)
            .attr('width', beerIcon)
            }

}

//function to reset the element style on mouseout
function dehighlight(props){
   var selected = d3.selectAll("." + props.TRACT)
       .style("stroke", function(){
           return getStyle(this, "stroke")
       })
       .style("stroke-width", function(){
           return getStyle(this, "stroke-width")
       });

   function getStyle(element, styleName){
       var styleText = d3.select(element)
           .select("desc")
           .text();

       var styleObject = JSON.parse(styleText);

       return styleObject[styleName];
   };
   //below Example 2.4 line 21...remove info label
   d3.select(".infolabel")
      .remove();
};

function highlight(props){
    //label content
    var labelAttribute = "<h1>" + props.name +
        "</h1>";

    //create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.name + "_label")
        .html(labelAttribute);
    var regionName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.address)
    var website = infolabel.append("div")
        .attr("class", "website")
        .html(props.website)
// label with what they have
    if (props.kidfriendl == "yes")  {
    var kid = infolabel.append("div")
        .attr("class", "details")
        .attr("font-size", "0.7em")
        .html("✓ Kid Friendly&nbsp;")  }
// label with what they have
    if (props.food == "yes")  {
    var kid = infolabel.append("div")
        .attr("class", "details")
        .attr("font-size", "0.7em")
        .html("✓ Serves Food &nbsp;")  }
// label with what they have
    if (props.outside == "yes")  {
    var kid = infolabel.append("div")
        .attr("class", "details")
        .attr("font-size", "0.7em")
        .html("✓ Outdoor Seating")  }

};

// label the metro stations too on mouseover
function metrolabel(props){
    //label content
    var labelAttribute = props.NAME + " Metro";

    //create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.NAME + "_label")
        // make it smaller and more transparent
        .style("border-style","none")
        .style("font-size","0.7em")
        .style("background", "rgba(34, 34, 34, 0.5)")
        .html(labelAttribute);
};

//function to move info label with mouse
function moveLabel(){
    //get width of label
    var labelWidth = d3.select(".infolabel")
        .node()
        .getBoundingClientRect()
        .width;

    //use coordinates of mousemove event to set label coordinates
    var x1 = d3.event.clientX + 15,
        y1 = d3.event.clientY - 15,
        x2 = d3.event.clientX - labelWidth - 10,
        y2 = d3.event.clientY + 15;

    //horizontal label coordinate, testing for overflow
    var x = d3.event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1;
    //vertical label coordinate, testing for overflow
    var y = d3.event.clientY < 70 ? y2 : y1;

    d3.select(".infolabel")
        .style("left", x + "px")
        .style("top", y + "px");
};

})();
