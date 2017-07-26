class Circular {
    constructor (prop) {
        this.prop = prop
    }

    init (id, customConfig) {
		// Load Canvas
		if (!(canvas = document.getElementById(id))) {
			let suggestions = document.getElementsByTagName("canvas");
			alert("Failed to load CircularJS in canvas \"" + id + "\". Did you mean \"" + suggestions[0].id + "\"?");
		}

		canvasID = id;
		canvas.width = 950;
		canvas.height = 600;

		cCenter.x = (canvas.width / 2) - (canvas.width * 0.18);
		cCenter.y = canvas.height / 2;

		// Load Config
		customConfig && addConfig(customConfig);

		let setter = canvas.getContext("2d");
		setter.clearRect(0, 0, canvas.width, canvas.height);

		// Fill Canvas
		setter.fillStyle = config.background;
		setter.fillRect(0, 0, canvas.width, canvas.height);

		// Draw Placeholder
		for(let i = 0; i < 5; i++) {
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
			for (let hour = 0; hour < 13; hour++) {
				let angle = hour * Math.PI / 6.5;

				setter.rotate(angle);
				setter.translate(0, -(cCenter.y) * ((0.0194 * config.size) + 5 * 0.08))
				setter.rotate(-angle);
				setter.fillText((hour > 5 ? hour - 12 : hour) + 7 + ":00", cCenter.x, cCenter.y);
				setter.rotate(angle);
				setter.translate(0, cCenter.y * ((0.0194 * config.size) + 5 * 0.08));
				setter.rotate(-angle);
			}

			// Write Days
			let dayLabel = ["M", "T", "W", "Th", "Fr"];

			for(let j = 0; j < 5; j++) {
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

	getSubjects () {
		return subjects;
	}

	addCourse (day, time, courseTitle, section, room, ccolor) {
		let id,
			color = ccolor || config.colors[c_id % config.colors.length];

		drawSubject(day, time, courseTitle, section, room, color, subjects.length);

		// Register to Array of Subjects
		subjects.push({
			id: id = uuid(),
			args: arguments.length === 5 ?
				[...arguments, color] :
				arguments
		});

		c_id++;

		return id;
	}

	refresh () {
		let i;
		this.init(canvasID, config);

		// Redo Subjects
		for(i = 0; i < subjects.length; i++) {
			drawSubject(
				subjects[i].args[0],
				subjects[i].args[1],
				subjects[i].args[2],
				subjects[i].args[3],
				subjects[i].args[4],
				subjects[i].args[5],
				i
			);
		}
	}

	rmSubject (id) {
		for(let i in subjects) {
			if(subjects[i].id === id) {
				subjects.splice(i, 1);
				break;
			}
		}
		this.refresh();
	}

	getCourse (id) {
		for(let i in subjects) {
			if(subjects[i].id === id) return subjects[i];
		}
	}

	editSubject (id, args) {
		this.getCourse(id).args = args;
		this.refresh();
	}

	download () {
		let link = document.createElement("a");

		link.type = "image/png";
		link.target = "_blank";
		link.setAttribute("download", "CircularJS-Schedule");
		link.href = canvas.toDataURL();

		// Listener
		link.onclick = () => {
			this.parentNode.removeChild(this);
		}

		document.getElementsByTagName("body")[0].appendChild(link);
		link.click();
	}
}
