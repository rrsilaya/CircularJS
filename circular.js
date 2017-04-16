/*
*
*	CircularJS
*	Author: Ralph Lawrence Silaya
*	Definition: Circular JS is a Javascript library for drawing
*	circular schedule/timetable for university students using
*	HTML5 canvas.
* 
*/

(function (root) {
	"use strict";

	var circular = {},
		subjects = [],
		canvasID,
		canvas,
		setter,
		cCenter = {
			x: 0,
			y: 0 // - space for labels
		},
		config = {
			label: "My Schedule",
			background: "#2c3e50",
			isDarkTheme: true,
			hasEdge: true,
			invertedDays: false,
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
		},
		// Constant Values
		constant = {
			startPos: 1.5 * Math.PI,
			endPos: (3.5 - (2 / 14)) * Math.PI
		},

		convertTime = function (time) {
			time = time.split(":");

			time[0] = (time[0] - 7) * 4; // hours
			time[1] = (time[1] / 15); // minutes

			return ((time[0] + time[1]) * (2.0 / 48) + 1.5) * Math.PI;
		},
		
		uuid = function() {
			var generated = "";

			for(var i = 0; i < 4; i++) {
				generated += ((1 + Math.random() * 0x10000) | 0).toString(16);
			}

			return generated;
		},

		addConfig = function (custConf) {
			var i, j;

			for (i in custConf) {
				if (custConf.hasOwnProperty(i) && config[i]) {
					if (typeof custConf[i] === "object") {
						for (j in custConf[i]) {
							config[i][j] = custConf[i][j];
						}
					} else {
						config[i] = custConf[i];
					}
				}
			}
		};

	circular.init = function(id, customConfig) {
		// Load Canvas
		if (!(canvas = document.getElementById(id))) {
			var suggestions = document.getElementsByTagName("canvas");
			alert("Failed to load CircularJS in canvas \"" + id + "\". Did you mean \"" + suggestions[0].id + "\"?");
		}

		canvasID = id;
		canvas.width = 950;
		canvas.height = 600;

		cCenter.x = (canvas.width / 2) - (canvas.width * 0.18);
		cCenter.y = canvas.height / 2;

		// Load Config
		customConfig && addConfig(customConfig);

		var setter = canvas.getContext("2d");
		setter.clearRect(0, 0, canvas.width, canvas.height);

		// Fill Canvas
		setter.fillStyle = config.background;
		setter.fillRect(0, 0, canvas.width, canvas.height);

		// Draw Placeholder
		for(var i = 0; i < 5; i++) {
			setter.beginPath();
			setter.arc(cCenter.x, cCenter.y, 100 + (i * (config.size + 5)), constant.startPos, constant.endPos);
			setter.lineWidth = config.size;
			if (config.isDarkTheme) setter.strokeStyle = "rgba(256,256,256,0.075)";
			else setter.strokeStyle = "rgba(0,0,0,0.1)";
			if (!config.hasEdge) setter.lineCap = "round";
			setter.stroke();
			setter.closePath();

			// Draw title text in the middle
			if (i == 0) {
				setter.font = config.title.size + "pt " + config.title.font;
				setter.fillStyle = config.title.color;
				setter.textAlign = "center";
				setter.textBaseline = "middle";
				setter.font = "bold " + config.title.size + "pt " + config.title.font;
				setter.beginPath();
				setter.fillText(config.label, cCenter.x, cCenter.y);
				setter.fill();
			}

			// Time Indicators
			setter.font = config.time.size + "pt " + config.time.font;
			setter.textAlign = "center";
			setter.textBaseline = "middle";

			// Draw time
			for (var hour = 0; hour < 13; hour++) {
				var angle = hour * Math.PI / 6.5;

				setter.rotate(angle);
				setter.translate(0, -(cCenter.y) * ((0.0194 * config.size) + 5 * 0.08))
				setter.rotate(-angle);
				setter.fillText((hour > 5 ? hour - 12 : hour) + 7 + ":00", cCenter.x, cCenter.y);
				setter.rotate(angle);
				setter.translate(0, cCenter.y * ((0.0194 * config.size) + 5 * 0.08));
				setter.rotate(-angle);
			}

			// Write Days
			var dayLabel = ["M", "T", "W", "Th", "Fr"];

			for(var j = 0; j < 5; j++) {
				setter.beginPath();
				setter.fillStyle = config.title.color;
				setter.textAlign = !config.hasEdge ? "center" : "right";
				setter.textBaseline = "middle";
				setter.fillText(dayLabel[config.invertedDays ? j : 4 - j], !config.hasEdge ? cCenter.x + 5: cCenter.x - 10, cCenter.y - (100 + (j * (config.size + 5))));
				setter.fill();
				setter.closePath();
			}
		}
	}

	circular.getSubjects = function() {
		return subjects;
	}

	circular.addCourse = function(day, time, courseTitle, section, room, color) {
		var id,
			illust = canvas.getContext("2d"),
			parseTime = function(time) {
				var time = time.split(":");

				time[0] = (time[0] - 7) * 4; // hours
				time[1] = (time[1] / 15); // minutes

				return ((time[0] + time[1]) * ((3.5 - (2 / 14) - 1.5) / 48) + 1.5) * Math.PI;
			},
			drawBounds = function(bound, x, y) {
				var dimensions = config.time.size + 1;

				bound.lineTo(x, y);
				bound.lineTo(x + dimensions, y);
				bound.lineTo(x + dimensions, y + dimensions);
				bound.lineTo(x, y + dimensions);
			};

		time = time.split("-");

		// Draw Course
		color =  color || config.colors[subjects.length % config.colors.length];
		for(var i = 0; i < day.length; i++) {
			illust.beginPath();
			illust.arc(cCenter.x, cCenter.y, 100 + ((config.invertedDays ? day[i] : 4 - day[i]) * (config.size + 5)), parseTime(time[0]), parseTime(time[1]));
			illust.lineWidth = config.size;
			illust.strokeStyle = color;
			if (!config.hasEdge) illust.lineCap = "round";
			illust.stroke();
			illust.closePath();
		}

		// List Subjects
		var subjectPos = [circular.getSubjects().length % 2 == 0 ? canvas.width - (canvas.width / 2.85) : canvas.width - (canvas.width / 5.45),
						  (canvas.height - (canvas.height / 1.35) + (Math.floor(circular.getSubjects().length / 2) * 45))];

		illust.beginPath();
		illust.fillStyle = color;
		drawBounds(illust, subjectPos[0], subjectPos[1]);
		illust.fill();
		illust.textAlign = "left";
		illust.textBaseline = "hanging";
		illust.font = "bold " + config.time.size + "pt " + config.time.font;
		illust.fillStyle = config.time.color;
		illust.fillText(courseTitle + " " + section, subjectPos[0] + 20.5, subjectPos[1] + 0.9);
		illust.font = config.time.size + "pt " + config.time.font;
		illust.fillText(room || "TBA", subjectPos[0] + 20.5, subjectPos[1] + 18);
		illust.closePath();

		// Register to Array of Subjects
		subjects.push({
			id: id = uuid(),
			args: arguments
		});

		return id;
	}

	circular.refresh = function() {
		var subject = circular.getSubjects(),
			i;
		circular.init(canvasID, config);

		subjects = []; // Empty subjects

		// Redo Subjects
		for(i = 0; i < subject.length; i++) {
			circular.addCourse(subject[i].args[0], subject[i].args[1], subject[i].args[2], subject[i].args[3], subject[i].args[4], subject[i].args[5]);
		}
	}

	circular.rmSubject = function(id) {
		for(var i in subjects) {
			if(subjects[i].id === id) {
				subjects.splice(i, 1);
				break;
			}
		}
		circular.refresh();
	}

	circular.getCourse = function(id) {
		for(var i in subjects) {
			if(subjects[i].id === id) return subjects[i];
		}
	}

	circular.editSubject = function(id, args) {
		circular.getCourse(id).args = args;
		circular.refresh();
	}

	circular.download = function() {
		var link = document.createElement("a");

		link.type = "image/png";
		link.target = "_blank";
		link.setAttribute("download", "CircularJS-Schedule");
		link.href = canvas.toDataURL();

		// Listener
		link.onclick = function() {
			this.parentNode.removeChild(this);
		}

		document.getElementsByTagName("body")[0].appendChild(link);
		link.click();
	}

	// Set Global
	root.circular = circular;
}(this));