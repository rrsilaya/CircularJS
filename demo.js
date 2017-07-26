"use strict";
/*
*
*	CircularJS
*	Author: Ralph Lawrence Silaya
*	Definition: Circular JS is a Javascript library for drawing
*	circular schedule/timetable for university students using
*	HTML5 canvas.
* 
*/
let circular = new Circular()

circular.init("circularCanvas", {
	label: "Ralph's Schedule",
});

circular.addCourse([0, 2, 4], "9:00-14:00", "X-1L", "ICS LH3", "#aaaaaa");
circular.addCourse([0, 1, 2, 3, 4], "14:00-20:00", "C-2L", "ICSMH", "#aaaaaa");
