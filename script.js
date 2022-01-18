var canvas = document.getElementById("target");

const date = new Date(Date.now());
const day = date.getDay() * 5;

const slices = [
	{ text: "Name #1", color: "#ff3fac", size: 25 },
	{ text: "Take a drink", color: "black", size: day },
	{ text: "Name #2", color: "#31d6ff", size: 25 },
	{ text: "Take a drink", color: "black", size: day },
	{ text: "Name #3", color: "#ccff00", size: 25 },
	{ text: "Take a drink", color: "black", size: day },
	{ text: "Name #4", color: "#d52e40", size: 25 },
	{ text: "Take a drink", color: "black", size: day },
];

function getTotalSliceSize() {
	let size = 0;
	for (const slice of slices) {
		size += slice.size;
	}
	return size;
}

function drawWheel() {
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var currentDeg = 0;

	const degPerSlice = (Math.PI * 2) / slices.length;
	const totalSliceSize = getTotalSliceSize();

	for (const slice of slices) {
		const sliceDegs = Math.PI * 2 * (slice.size / totalSliceSize);

		ctx.fillStyle = slice.color;

		ctx.beginPath();
		// Move to center of wheel.
		ctx.moveTo(canvas.width / 2, canvas.height / 2);

		// Draw circle arc.
		// Arc params: start x, start y, radius, startingAngle, endingAngle
		ctx.arc(
			canvas.width / 2,
			canvas.height / 2,
			canvas.height / 2,
			currentDeg,
			currentDeg + sliceDegs,
			false
		);
		// Draw line back to center from arc.
		ctx.lineTo(canvas.width / 2, canvas.height / 2);

		// Fill pathed shape.
		ctx.fill();

		currentDeg += sliceDegs;
	}
}

function getSliceOutput(slice) {
	const item = document.createElement("div");
	item.className = "list-item";
	const colorSq = document.createElement("span");
	colorSq.className = "colorSq";
	colorSq.style.backgroundColor = slice.color;

	const nameLbl = document.createElement("span");
	nameLbl.innerText = slice.text;

	item.append(...[colorSq, nameLbl]);

	return item;
}

function addSlicesToList() {
	const list = document.getElementById("list");
	list.innerHTML = "";

	const addedSlices = [];

	for (const slice of slices) {
		// Don't add duplicate slices to the list.
		if (
			addedSlices.find(
				(i) =>
					slice.color === i.color &&
					slice.text === i.text &&
					slice.size === i.size
			)
		) {
			continue;
		}

		const item = getSliceOutput(slice);
		list.appendChild(item);
		addedSlices.push(slice);
	}
}

drawWheel();
addSlicesToList();

var spinCharge = 0;
var chargeInterval = undefined;

function setSpinCharge(charge) {
	spinCharge = charge;
	const charger = document.getElementById("charger");
	charger.style.height = spinCharge * 100 + "%";
}

function chargeMouseDown() {
	if (spinSpeed > 0) {
		return;
	}

	setSpinCharge(0);
	if (chargeInterval) {
		clearInterval(chargeInterval);
	}
	chargeInterval = setInterval(() => {
		if (spinCharge < 1) {
			setSpinCharge(spinCharge + 0.01);
		}
	}, 10);
}

function chargeMouseUp() {
	if (spinSpeed > 0) {
		return;
	}

	if (chargeInterval) {
		clearInterval(chargeInterval);
	}

	if (spinCharge > 0.1) {
		spin();
	} else {
		setSpinCharge(0);
	}
}

var spinSpeed = 0;
var spinRot = Math.random() * 360;
var lastResultIndex = -1;

// Initial random rotation
canvas.style.transform = "rotateZ(" + -spinRot + "deg)";

function spin() {
	const spinBtn = document.getElementById("spin-btn");
	spinBtn.disabled = true;

	const removeBtn = document.getElementById("remove-result-btn");
	removeBtn.style.display = "none";
	const resultOutput = document.getElementById("result");
	resultOutput.innerHTML = "";

	spinSpeed = spinCharge * 20 + 10 + Math.random() * 5;
	while (spinRot > 360) {
		spinRot -= 360;
	}
	lastResultIndex = -1;

	requestAnimationFrame(continueSpin);
}

function continueSpin() {
	spinSpeed -= 0.1;

	if (spinSpeed <= 0) {
		spinSpeed = 0;

		// Determine and output result
		let resultRot = spinRot / 360;
		while (resultRot > 1) {
			resultRot--;
		}
		resultRot -= 0.25;
		if (resultRot < 0) {
			resultRot++;
		}

		const totalSliceSize = getTotalSliceSize();
		const targetSize = resultRot * totalSliceSize;
		let sizeCounter = 0;
		for (let i = 0; i < slices.length; i++) {
			const slice = slices[i];
			sizeCounter += slice.size;
			if (sizeCounter >= targetSize) {
				lastResultIndex = i;
				break;
			}
		}

		var slice = slices[lastResultIndex];

		const resultOutput = document.getElementById("result");
		resultOutput.innerHTML = "";
		var resultText = document.createElement("span");
		resultText.innerText = "Selected:";
		resultOutput.appendChild(resultText);
		var item = getSliceOutput(slice);
		resultOutput.appendChild(item);

		const removeBtn = document.getElementById("remove-result-btn");
		removeBtn.style.display = "";

		const spinBtn = document.getElementById("spin-btn");
		spinBtn.disabled = false;

		setSpinCharge(0);
	} else {
		spinRot += spinSpeed;
		canvas.style.transform = "rotateZ(" + -spinRot + "deg)";
		requestAnimationFrame(continueSpin);
	}
}

function removeLastResult() {
	if (lastResultIndex == -1) {
		return;
	}

	slices.splice(lastResultIndex, 1);
	lastResultIndex = -1;

	const removeBtn = document.getElementById("remove-result-btn");
	removeBtn.style.display = "none";

	drawWheel();
	addSlicesToList();
}

let getAngrier = false;
let angryness = 0;

setInterval(() => {
	if (!getAngrier) {
		angryness = 0;
		return;
	}

	angryness += Math.random() * 10;
	console.log(angryness);

	var el = document.getElementById("container");
	el.style.backgroundColor =
		"rgb(255, " +
		(255 - angryness).toString() +
		", " +
		(255 - angryness).toString() +
		")";
}, 1000);
