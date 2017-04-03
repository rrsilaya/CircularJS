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
			background: "#2c3e50",
			isDarkTheme: true,

			shadowColor: "rgba(0,0,0,0.3)",
			dayCount: 5,
			size: 20,

			title: {
				font: "Arial",
				size: 12,
				color: "#ffffff",
				shadowColor: "rgba(0,0,0,0.3)"
			},

			time: {
				font: "Arial",
				size: 10.5,
				color: "#ffffff",
				shadowColor: "rgba(0,0,0,0.3)"
			}
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
		};

	circular.addConfig = function (custConf) {
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

	circular.init = function(id, title, customConfig) {
		// Load Canvas
		if (!(canvas = document.getElementById(id))) {
			var suggestions = document.getElementsByTagName("canvas");
			alert("Failed to load CircularJS in canvas \"" + id + "\". Did you mean \"" + suggestions[0].id + "\"?");
		}

		canvasID = id;

		cCenter.x = (canvas.width / 2) - (canvas.width * 0.15);
		cCenter.y = canvas.height / 2;

		// Load Config
		customConfig && circular.addConfig(customConfig);

		var setter = canvas.getContext("2d");
		setter.clearRect(0, 0, canvas.width, canvas.height);

		// Fill Canvas
		setter.fillStyle = config.background;
		setter.fillRect(0, 0, canvas.width, canvas.height);

		// Draw Placeholder
		for(var i = 0; i < config.dayCount; i++) {
			setter.beginPath();
			setter.arc(cCenter.x, cCenter.y, 100 + (i * (config.size + 5)), constant.startPos, constant.endPos);
			setter.lineWidth = config.size;
			if (config.isDarkTheme) setter.strokeStyle = "rgba(256,256,256,0.075)";
			else setter.strokeStyle = "rgba(0,0,0,0.075)";
			setter.stroke();
			setter.closePath();

			// Draw title text in the middle
			if (i == 0) {
				setter.font = config.title.size + "pt " + config.title.font;
				setter.fillStyle = config.title.color;
				setter.textAlign = "center";
				setter.textBaseline = "middle";
				setter.beginPath();
				setter.fillText(title, cCenter.x, cCenter.y);
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
				setter.translate(0, -(cCenter.y) * ((0.0194 * config.size) + config.dayCount * 0.086))
				setter.rotate(-angle);
				setter.fillText((hour > 5 ? hour - 12 : hour) + 7 + ":00 ", cCenter.x, cCenter.y);
				setter.rotate(angle);
				setter.translate(0, cCenter.y * ((0.0194 * config.size) + config.dayCount * 0.086));
				setter.rotate(-angle);
			}
		}
	}

	// Set Global
	root.circular = circular;
}(this));