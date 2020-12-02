      // Margin and SVG initialization

      svgWidth = 600;
      svgHeight = 400;
      
      margin = {
          top: 50,
          right: 10,
          bottom: 60,
          left:10
      };
      
      width = svgWidth - margin.left - margin.right;
      height = svgHeight - margin.top - margin.bottom;
  
      // SVG wrapper creation and attribute preparation for svg group
      svg = d3.select("#scatter")
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(newsData) {

    console.log(newsData);
  
    newsData.forEach(function(data) {
        data.smokes = +data.smokes
        data.age = +data.age;
    });
  var xLinearScale = d3.scaleLinear()
  .domain([d3.min(newsData, d => d.smokes) - 1, d3.max(newsData, d => d.smokes) + 1])
  .range([0, width]);

  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(newsData, d => d.age) - 2, d3.max(newsData, d => d.age) + 2])
  .range([height, 0])
  
  // Create axes
  xAxis = d3.axisBottom(xLinearScale);
  yAxis = d3.axisLeft(yLinearScale);






 // append x axis
 var xAxis = chartGroup.append("g")
 .classed("x-axis", true)
 .attr("transform", `translate(0, ${height})`)
 .call(yAxis);

 chartGroup.append("g")
 .call(xAxis);

 var circlesGroup = chartGroup.selectAll("circle")
 .data(newsData)
 .enter()
 .append("circle")
 .attr("cx", d => xLinearScale(d[chosenXAxis]))
 .attr("cy", d => yLinearScale(d.num_hits))
 .attr("r", 20)
 .attr("fill", "pink")
 .attr("opacity", ".5");








}).catch(function(error) {
  console.log(error);
});
