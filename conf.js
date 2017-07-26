const config = {
	label: "My Schedule",
	background: "#2c3e50",
	isDarkTheme: true,
	hasEdge: true,
	invertedDays: true,
	size: 25,

	title: {
		font: "Arial",
		size: 12,
		color: "#ffffff",
	},

	time: {
		font: "Arial",
		size: 10.5,
		color: "#ffffff",
	},

	colors: ["#1abc9c",
				"#2ecc71",
				"#3498db",
				"#8e44ad",
				"#f1c40f",
				"#d35400",
				"#e74c3c",
				"#7f8c8d",
				"#16a085",
				"#9b59b6",
				"#f39c12"]
};

const cCenter = {
	x: 0,
	y: 0 // - space for labels
};

const constant = {
	startPos: 1.5 * Math.PI,
	endPos: (3.5 - (2 / 14)) * Math.PI
};

let subjects = [],
	canvasID,
	canvas,
	setter,
	c_id = 0;