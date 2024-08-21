//Evento para seleccionar y procesar el archivo .csv
document.getElementById('fileInput').addEventListener('change', function(event) {
	files = event.target.files
	console.log(files)
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpiar la lista anterior, si existe

	Array.from(files).forEach((file, index) => {
        const listItem = document.createElement('div');
        listItem.id = `file-${index}`;
        listItem.textContent = `Archivo ${index + 1}: ${file.name}`;
        listItem.style.cursor = 'pointer';
		listItem.classList.add('file-item');


        listItem.addEventListener('click', function() {
            data = file;
			dataUpdate(file)
            console.log('Archivo seleccionado:', data);
        });

        fileList.appendChild(listItem);
    });
})

function dataUpdate(file){
	console.log(file)
	if (file) {
		//Analiza el csv y lo devuelve en una matriz bidimensional
		Papa.parse(file, {
			complete: function(results) {
				console.log(results)
				let header = results.data.slice(0,2)
				updateChartInformation(header)
				let data = results.data.slice(2)

				currentData = processCSV(data);
				means = calculateAllMean(currentData)
				calculateRange(currentData)
				filterData = currentData;
				updateChart(filterData);
			}
		});
	}
};

//Evento para seleccionar el tipo de cuadro
// document.getElementById('chartType').addEventListener('change', function() {
// 	const chartType = document.getElementById('chartType').value;
// 	if (filterData) {
// 		updateChart(filterData, chartType);
// 	}
// });

//Evento para seleccionar la fecha de inicio
// document.getElementById('startDate').addEventListener('change', function() {
// startDate = this.value
// 	filterData = filterDataByDate();
// 	updateChart(filterData)
// })

// //Evento para seleccionar la fecha de fin
// document.getElementById('endDate').addEventListener('change', function() {
// endDate = this.value
// 	filterData = filterDataByDate();
// 	updateChart(filterData)
// })