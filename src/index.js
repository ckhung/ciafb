import $ from 'jquery';
import dt from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import csvPath from './assets/ciafb.csv';
import Papa from 'papaparse';

$.get(csvPath, main);

function main(ciafb) {
    ciafb = Papa.parse(ciafb).data;
    console.log(ciafb);
    ciafb = ciafb.slice(1).filter(x => x.length>=7);
    console.log(ciafb);
    let i;
    ciafb = ciafb.map(function(fields) {
	for (i of [1, 5, 6]) {
	    fields[i] = parseInt(fields[i]);
	}
	for (i of [2, 3, 4]) {
	    fields[i] = parseFloat(fields[i]);
	}
	return fields;
    });
    $('#ciafb_table').DataTable({
	data: ciafb,
	fixedHeader: true,
	paging: false,
	columns: [
	    { title: 'Country' },
	    { title: 'Population' },
	    { title: 'Median age' },
	    { title: 'Population growth rate' },
	    { title: 'Birth rate' },
	    { title: 'Telephones - mobile cellular' },
	    { title: 'Internet users' },
	]
    });
    let canvas = $('#canvas')[0];
    let markerSize = ciafb.map(country => Math.sqrt(country[1])*0.005);
    console.log(markerSize);
    /*
    Plotly.newPlot(canvas, [ {
      type: 'scatter',
      mode: 'markers',
      x: ciafb.map(country => country[6]/country[1]),
      y: ciafb.map(country => country[5]/country[1]),
      marker: {
	color: 'rgba(255,255,255,0.3)',
	size: markerSize,
	line: {
	  color: 'rgba(0,0,128,1)',
	  width: 2
	}
      },
      text: ciafb.map(country => country[0])
    }], {
      xaxis: {
	type: 'linear'
      },
      yaxis: {
	type: 'linear'
      },
      hovermode: 'closest',
    });
    */
}
