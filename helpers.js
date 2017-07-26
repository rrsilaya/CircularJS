const convertTime = (time) => {
	time = time.split(":");

	time[0] = (time[0] - 7) * 4; // hours
	time[1] = (time[1] / 15); // minutes

	return ((time[0] + time[1]) * (2.0 / 48) + 1.5) * Math.PI;
};

const uuid = () => {
	let generated = "";

	for(let i = 0; i < 4; i++) {
		generated += ((1 + Math.random() * 0x10000) | 0).toString(16);
	}

	return generated;
};

const addConfig = (custConf) => {
	let i, j;

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

const drawSubject = (day, time, courseTitle, section, room, color, n) => {
	let id,
		illust = canvas.getContext("2d"),
		parseTime = function(ttime) {
			let time = ttime.split(":");

			time[0] = (time[0] - 7) * 4; // hours
			time[1] = (time[1] / 15); // minutes

			return ((time[0] + time[1]) * ((3.5 - (2 / 14) - 1.5) / 48) + 1.5) * Math.PI;
		},
		drawBounds = function(bound, x, y) {
			let dimensions = config.time.size + 1;

			bound.lineTo(x, y);
			bound.lineTo(x + dimensions, y);
			bound.lineTo(x + dimensions, y + dimensions);
			bound.lineTo(x, y + dimensions);
		};

	time = time.split("-");

	// Draw Course
	for(let i = 0; i < day.length; i++) {
		illust.beginPath();
		illust.arc(cCenter.x, cCenter.y, 100 + ((config.invertedDays ? day[i] : 4 - day[i]) * (config.size + 5)), parseTime(time[0]), parseTime(time[1]));
		illust.lineWidth = config.size;
		illust.strokeStyle = color;
		if (!config.hasEdge) illust.lineCap = "round";
		illust.stroke();
		illust.closePath();
	}

	// List Subjects
	let subjectPos = [n % 2 == 0 ? canvas.width - (canvas.width / 2.85) : canvas.width - (canvas.width / 5.45),
						(canvas.height - (canvas.height / 1.35) + (Math.floor(n / 2) * 45))];

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
};
