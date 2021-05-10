### DayListItem
props:

* name:String the name of the day
* spots:Number the number of spots remaining
* selected:Boolean true or false declaring that this day is selected
* setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

### The DayList Component
props:

* days:Array a list of day objects (each object includes an id, name, and spots)
* day:String the currently selected day
* setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
