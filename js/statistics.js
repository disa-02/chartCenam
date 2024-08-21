let dataDays = 10;
function calculateMean(data) {
	let total = 0;
	for(let i = 1; i < data.length && i <= dataDays; i++)
		total += data[i]
	let mean = total/dataDays
	return mean
}
function calculateAllMean(currentData){
let datasets = currentData.datasets
console.log(datasets)
	let means = []
	datasets.forEach(dataset => {
		let data = dataset.data
		let mean = calculateMean(data)
		means.push(mean)
	})
	return means
}

function calculateVariance(data, mean) {
	let sumSquaredDifferences = 0;
	for (let i = 1; i < data.length && i <= dataDays; i++) {
		const difference = data[i] - mean;
		sumSquaredDifferences += difference * difference;
	}
	return sumSquaredDifferences / dataDays;
}

function calculateStandardDeviation(data) {
	const mean = calculateMean(data);
	const variance = calculateVariance(data, mean);
	const standardDeviation = Math.sqrt(variance);
	return {mean, standardDeviation}
}

function calculateRange(currentData){
	//sd = calculateStandardDeviation(currentData)
	let datasets = currentData.datasets
	datasets.forEach(dataset => {
		let data = dataset.data
		let {mean,standardDeviation} = calculateStandardDeviation(data)
		lessDs.push(mean - standardDeviation)
		addDs.push(mean + standardDeviation)
	})
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}