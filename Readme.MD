# Circular
Circular is a Javascript library for drawing a week-long circular schedule/timetable for university students using HTML5 canvas.

## Setting Up
### Initialization
Initialize the library by adding the library to your HTML file. Create a `<canvas>` to your file.
```javascript
circular.init(id, customConfig);
```
* **id** - ID of the canvas
* **customConfig** - custom configurations for the canvas
```javascript
{
	label: "My Schedule", // schedule title (placed at the middle of the schedule)
	background: "#2c3e50", // canvas background color
	isDarkTheme: true, // sets the "ghosts" to light or dark
	hasEdge: true, // sets the subjects to circular or edged
	invertedDays: true, // inverts the order of days
	size: 25, // line size

	title: { // configurations for normal text
		font: "Arial",
		size: 12,
		color: "#ffffff",
	},

	time: { // configurations for time indicators
		font: "Arial",
		size: 10.5,
		color: "#ffffff",
	},

	colors: [] // color palette for subjects
}
```

### Adding Subjects
```javascript
circular.addCourse(day, time, courseTitle, section, room, color);
```
* **day** - *(array)* day of subjects -- 0: Mon, 1: Tue, 2: Wed, 3: Thu, 4: Fri
* **time** - time of the subjects *in military time* separated by "-"
* **courseTitle** - course title/course name
* **section** - section
* **room** - room *(optional)*
* **color** - color of the subject in hex *(optional, uses colors in config.colors if not specified)*
```javascript
// Example
circular.addCourse([0, 2, 4], "9:00-14:00", "X-1L", "ICS LH3", "#000000");
```
> Returns the ID of the subject

### Modifying Subjects
```javascript
circular.editSubject(id, args);
```
* **id** - id of subject to be modified
* **args** - arguments to be replaced (array)

### Removing Subjects
```javascript
circular.rmSubject(id);
```
* **id** - id of subject to be removed
> Returns the subject

### Helpers
#### Refresh Canvas
```javascript
circular.refresh();
```
#### Get Array of Subjects
```javascript
circular.getSubjects();
```
#### Search for Subject
```javascript
circular.getCourse(id);
```
#### Save/Download Schedule
```javascript
circular.download();
```

### Development
If you would like to contribute to this project, just send a pull request. If you have any questions, you can contact me via [email](mailto:rrsilaya@up.edu.ph).