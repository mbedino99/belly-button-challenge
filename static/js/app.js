// log URL in variable
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// fetch the json
d3.json(url).then(function(data) {
    console.log(data)
})

// initialize dashboard
function init() {

    let dropdownMenu = d3.select("#selDataset")
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            console.log(id)

            dropdownMenu.append('option')
            .text(id)
            .property('value', id)
        });

        let sample_1 = names[0]
        console.log(sample_1)

        buildMetadata(sample_1);
        buildBarChart(sample_1);
        buildBubbleChart(sample_1);

    });
    
}

// populate info
function buildMetadata(sample) {

    d3.json(url).then((data) => {
        let metadata = data.metadata
        let value = metadata.filter(result => result.id == sample)
        console.log(value)
        let valueData = value[0]

        d3.select('#sample-metadata').html('')

        Object.entries(valueData).forEach(([key, value]) => {
            console.log(key, value)

            d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`)
        })
    })
}

// create bar chart
function buildBarChart(sample) {

    d3.json(url).then((data) => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0];

        let sample_values = valueData.sample_values;
        let otu_ids = valueData.out_ids;
        let otu_labels = valueData.otu_labels;

        console.log(sample_values, otu_ids, otu_labels);

        let trace = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: 'bar', 
            orientation: 'h',

        }

        let layout = {
            title: 'Top 10 OTUs Present'
        };

        Plotly.newPlot('bar', [trace], layout)

    });
};

// create bubble chart
function buildBubbleChart(sample) {

    d3.json(url).then((data) => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0]

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }

        let layout = {
            title: 'Bacteria per sample',
            vovermode: 'closest',
            xaxis: {title: 'OTU ID'},
        }

        Plotly.newPlot('bubble', [trace1], layout)


    })
}

function optionChanged(value) {

    console.log(value);

    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
};

init();



