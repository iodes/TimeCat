// https://blockbuilder.org/timelyportfolio/938e17a9c82008ec16bb323320b11b5b
import * as d3 from 'd3';

export default function(svg) {
  var svg = d3.select('svg#work-timeline');
  var width = svg.node().getBoundingClientRect().width,
    height = svg.node().getBoundingClientRect().height;

  var data = [
    {
      id: 1,
      company: 'Company A',
      start: '1998-08-31',
      end: '1999-12-31',
      description: 'Title and all the stuff I did',
    },
    {
      id: 2,
      company: 'Company A',
      start: '1999-12-31',
      end: '2001-05-31',
      description: 'New Title with other sophisticated sounding items',
    },
    {
      id: 3,
      company: 'Company B',
      start: '2001-05-31',
      end: '2011-08-31',
      description: 'Really Important Sounding Title with all the buzzwords',
    },
    {
      id: 4,
      company: 'Company C',
      start: '2011-08-31',
      end: '2016-12-31',
      description: 'Even More Important Title with persuasive text',
    },
  ];
  var groups = d3
    .set(
      data.map(function(d) {
        return d.company;
      })
    )
    .values();

  var bandHeight = 50;
  var timeline = d3.layout
    .timeline()
    .size([width - 150 - 20, bandHeight - 10])
    .extent(['1998-01-01', '2016-12-31'])
    .padding(3)
    .maxBandHeight(bandHeight - 20);

  var colorScale = d3.scale.category10();

  groups.forEach(function(type, i) {
    onlyThisType = data.filter(function(d) {
      return d.company === type;
    });

    theseBands = timeline(onlyThisType);

    svg
      .append('g')
      .attr('transform', 'translate(150,' + (35 + i * 50) + ')')
      .selectAll('rect')
      .data(theseBands)
      .enter()
      .append('rect')
      .classed('rect-position', true)
      .attr('rx', 2)
      .attr('x', function(d) {
        return d.start;
      })
      .attr('y', function(d) {
        return d.y;
      })
      .attr('height', function(d) {
        return d.dy;
      })
      .attr('width', function(d) {
        return d.end - d.start;
      })
      .style('fill', function(d) {
        return colorScale(d.company);
      })
      .style('stroke', 'black')
      .style('stroke-width', 1);

    d3.select('svg')
      .append('text')
      .text(type)
      .attr('y', bandHeight + i * bandHeight)
      .attr('x', 20);
  });

  var axisScale = d3.time.scale();

  axisScale.domain(timeline.extent()).range([0, width - 150 - 20]);

  var axis = d3.svg.axis();
  axis.scale(axisScale);
  axis.tickSize(bandHeight * groups.length + 20);

  var axis_g = svg
    .append('g')
    .attr('class', 'timeline-axis')
    .attr('transform', 'translate(170,0)')
    .call(axis);

  // some default styles for our axis
  axis_g
    .selectAll('path, .tick > line')
    .style('fill', 'none')
    .style('stroke', 'black');

  svg
    .selectAll('.timeline-axis > path')
    .style('fill', 'none')
    .style('stroke', 'none');
  svg
    .selectAll('.timeline-axis .tick line')
    .style('stroke', 'gray')
    .attr('stroke-dasharray', '5 5');
  svg
    .selectAll('rect')
    .style('stroke', 'white')
    .attr('rx', 4);

  svg.attr('height', bandHeight * groups.length + 20 + 20 + 'px');

  // now render the text descriptions of each position
  var textdiv = d3.select('div#work-history');
  var posdiv = textdiv
    .selectAll('p')
    .data(data)
    .enter()
    .append('div')
    .style('border-left', function(d) {
      return '10px solid ' + colorScale(d.company);
    })
    .style('padding-left', '1em');

  posdiv
    .append('h3')
    .style('line-height', '50%')
    .text(function(d) {
      return d.company + ' | ' + d.start + ' - ' + d.end;
    });

  posdiv.append('p').text(function(d) {
    return d.description;
  });

  // add some mouseover on the rects
  svg
    .selectAll('rect.rect-position')
    .on('mouseover', highlightPos)
    .on('mouseout', unhighlightPos);

  function highlightPos(pos) {
    posdiv.each(function(d) {
      if (d.id !== pos.id) {
        d3.select(this).style('opacity', '0.5');
      }
    });
  }

  function unhighlightPos() {
    posdiv.style('opacity', '1');
  }
}
