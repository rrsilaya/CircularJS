# Circular
Circular is a Javascript library for drawing a week-long circular schedule/timetable for university students using HTML5 canvas.

**NOTE:** This is still *under development*.

## Setting Up
1. Import the script by adding `<script src="/path/to/script/canvas.js">` inside the `<body>` tag.
2. Initialize the canvas with ID **circularCanvas**.

## Functions
#### Initialization
`initSched(title, daysCount, lineWidth, isDark)`
* title - title of the schedule
* daysCount - number of days to include **(default: M-Fr, 5)**
* lineWidth - thickness of the arc in the circle **(default: 25)**
* isDark - color of the lines; setting true will give dark lines
**Example:** `initSched("My Schedule", 5, 25, false);`

#### Add Subject
`drawSubject(color, day, start, end, isRounded);`
* color - color of the subject
* day - day to assign (integer, M is 0, T is 1, etc.)
* start, end - time start and end (7:00 to 19:00)
* isRounded - sets the subject to have circular caps
**Example:** `drawSubject("#000000", 1, "8:00", "9:30", true);`
