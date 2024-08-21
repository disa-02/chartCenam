let myChart; // Variable global para el gráfico
let currentData; // Variable para almacenar los datos del gráfico
let datasetVisibility = {}; // Variable para almacenar la visibilidad de los datasets
let startDate;
let endDate;
let filterData;
let means;
let addDs = [];
let lessDs = [];
let actualMean = 0;
let days = 30;
let technology = ''
let tittle = ''
let files 



//Transforma los datos bidimencionales en datos del estilo "chart"
function processCSV(data) {
    const labels = data[0].slice(2); // Fechas -- slice(2) omite las dos primeras columnas que corresponden a pais y central
    const datasets = data.slice(1).map(row => { //Datos -- central + datos
        const color = getRandomColor();
        const dataset = {
            label: row[1], //Nombre de central = primera columna
            data: row.slice(2).map(value => parseFloat(value) || 0), //Obtine los datos de la central y los pasa a float -- valor defecto si no puede parsear == 0
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
        };

        //Setea la visibilidad de la central -- por defecto no muestra la central
        datasetVisibility[row[1]] = datasetVisibility[row[1]] !== undefined ? datasetVisibility[row[1]] : true;
        dataset.hidden = datasetVisibility[row[1]]; // Aplicar visibilidad almacenada
        return dataset;
    });
    // datasets.push({
    //         label: "Media", 
    //         data: Array(days).fill(0), 
    //         backgroundColor: getRandomColor(),
    //         borderColor: getRandomColor(),
    //         borderWidth: 1,
    //     })

    // datasets.push({
    //     label: "Less", 
    //     data: Array(days).fill(0), 
    //     backgroundColor: getRandomColor(),
    //     borderColor: getRandomColor(),
    //     borderWidth: 1,
    // })
    // datasets.push({
    //         label: "More", 
    //         data: Array(days).fill(0), 
    //         backgroundColor: getRandomColor(),
    //         borderColor: getRandomColor(),
    //         borderWidth: 1,
    //     })
    return { labels, datasets };
}

//Filtrar data por Fecha
function filterDataByDate() {
    const labels = currentData.labels;
    const datasets = currentData.datasets.map(dataset => {
        const dataPoints = dataset.data;
        const filteredData = labels.map((label, index) => {
            // Comprobar si la fecha está dentro del rango
            if ((startDate && label < startDate) || (endDate && label > endDate)) {
                return null; // Excluir datos fuera del rango
            }
            return dataPoints[index];
        }).filter(value => value !== null); // Eliminar los valores nulos

        return {
            ...dataset,
            data: filteredData,
            hidden: datasetVisibility[dataset.label] !== undefined ? datasetVisibility[dataset.label] : dataset.hidden
        };
    });

    // Filtrar las etiquetas (fechas) que están dentro del rango
    const filteredLabels = labels.filter(label => !(startDate && label < startDate) && !(endDate && label > endDate));
    return { labels: filteredLabels, datasets };
}

//Setea el grafico
function updateChart(data, chartType = 'line') {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // Destruir el gráfico anterior antes de crear uno nuevo
    }

    myChart = new Chart(ctx, {
        type: chartType, // Tipo de gráfico dinámico
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true, // Mostrar leyenda
                    onClick: (e, legendItem, legend) => { //Funcion que permite marcar y desmarcar las centrales
                        const datasetLabel = legendItem.text;
                        const index = legendItem.datasetIndex;
                        if(datasetLabel != "Media" && datasetLabel != "Less" && datasetLabel != "More"){
                            // if(myChart.data.datasets[index].hidden){
                            //     let mean = means[index]
                            //     data.datasets[data.datasets.length -3].data = Array(days).fill(mean)
                            
                            //     let less = lessDs[index]
                            //     data.datasets[data.datasets.length -2].data = Array(days).fill(less)

                            //     let add = addDs[index]
                            //     data.datasets[data.datasets.length -1].data = Array(days).fill(add)
                            // }
                            

                            
                        }
                        datasetVisibility[datasetLabel] = !myChart.data.datasets[index].hidden;
                        myChart.data.datasets[index].hidden = !myChart.data.datasets[index].hidden;
                        myChart.update();
                        
                    }
                }
            }
            
        }
    });
}

function updateChartInformation(header){
    tittle = header[0][1]
    technology = header[1][1]
    document.getElementById('tittle').textContent = tittle;
    document.getElementById('technology').textContent = technology;


}

