var startPos = 1.5 * Math.PI;
var endPos = (3.5 - (2 / 14)) * Math.PI;
var canvas = document.getElementById("myCanvas");
var canvasCenter = [canvas.width / 2, canvas.height / 2];

function initSched(title, daysCount, lineWidth, isDark) {
	var placeholder = time = canvas.getContext("2d");
	placeholder.clearRect(0,0,canvas.width,canvas.height);

	for (i = 0; i < daysCount; i++) {
		placeholder.beginPath();
		placeholder.arc(canvasCenter[0], canvasCenter[1], 100 + (i * 10), startPos, endPos);
		placeholder.lineWidth = lineWidth;
		if (isDark) placeholder.strokeStyle = "rgba(256,256,256,0.075)";
		else placeholder.strokeStyle = "rgba(0,0,0,0.075)";
		placeholder.stroke();
		placeholder.closePath();

		if (i == 0) {
			placeholder.font = "14pt Arial";
			placeholder.textAlign = "center";
			placeholder.textBaseline = "middle";
			placeholder.fillStyle = "#ffffff";
			placeholder.beginPath();
			placeholder.fillText(title, canvasCenter[0], canvasCenter[1]);
			placeholder.fill();
		}
	}

	time.font = "12pt Arial";
	time.textAlign = "center";
	time.textBaseline = "middle";

	for (hour = 0; hour < 13; hour++) {
		angle = hour * Math.PI / 6.5;

		time.rotate(angle);
		time.translate(0, -(canvasCenter[1]) * (0.485 + daysCount * 0.086)); // 915
		time.rotate(-angle);
		time.fillText((hour > 5 ? hour - 12 : hour) + 7 + ":00 ", canvasCenter[0], canvasCenter[1]);
		time.rotate(angle);
		time.translate(0, canvasCenter[1] * (0.485 + daysCount * 0.086));
		time.rotate(-angle);
	}
}

function convertTime(time) {
	time = time.split(":");

	time[0] = (time[0] - 7) * 4; // hours
	time[1] = (time[1] / 15); // minutes

	return ((time[0] + time[1]) * (2.0 / 48) + 1.5) * Math.PI;
}

function drawSubject(color, day, start, end, isRounded) {
	var subject = subjectText = canvas.getContext("2d");

	subject.beginPath();
	subject.arc(canvasCenter[0], canvasCenter[1], 100 + (day * 30), convertTime(start), convertTime(end));
	subject.lineWidth = 25;
	subject.strokeStyle = color;
	if (isRounded) subject.lineCap = "round";
	subject.stroke();
	subject.closePath();
}