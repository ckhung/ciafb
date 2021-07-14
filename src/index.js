// jshint esversion: 6, node: true

import $ from 'jquery';
import dt from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import Papa from 'papaparse';
import Plotly from 'plotly.js-basic-dist-min';

import ciafbPath from './assets/ciafb.csv';

$.get(ciafbPath, main);

function main(ciafb) {
    ciafb = Papa.parse(ciafb, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
    } ).data;
    console.log('ciafb full data:', ciafb);
    for (let entry of ciafb) {
      for (let col in entry) {
        if (col != 'Country' && typeof entry[col] != 'number')
	  entry[col] = NaN;
      }
    }
    let cols = Object.keys(ciafb[0]);
    cols = cols.map(k => ( {
      data: k,
      title: k,
      type: 'num',
    }));
    cols[0] = Object.assign(cols[0], {
      type: 'string',
    });
    console.log('cols:', cols);
    $('#ciafb_table').DataTable({
	data: ciafb,
	paging: false,
	columns: cols,
    });

    let canvas = $('#canvas')[0];
    let markerSize = ciafb.map(entry => Math.sqrt(entry.Population)*0.005);
    console.log('markerSize:', markerSize);
    Plotly.newPlot(canvas, [ {
      type: 'scatter',
      mode: 'markers',
      x: ciafb.map(entry => entry.Internet_users/entry.Population),
      y: ciafb.map(entry => entry.Phones_mobile/entry.Population),
      text: ciafb.map(entry => entry.Country),
      marker: {
	color: 'rgba(255,255,255,0.3)',
	size: markerSize,
	line: {
	  color: 'rgba(0,0,128,1)',
	  width: 2
	}
      },
    }], {
      xaxis: {
	title: {
	  text: 'Internet users / Population'
	}
      },
      yaxis: {
	title: {
	  text: 'Phones (mobile) / Population'
	}
      },
      hovermode: 'closest',
    });
}
