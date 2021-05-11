### InterviewerListItem component takes in the following props:

* id:number - the id of the interviewer
* name:string - the name of the interviewer
* avatar:url - a url to an image of the interviewer
* selected:boolean - to determine if an interview is selected or not
* setInterviewer:function - sets the interviewer upon selection

### Our InterviewerList takes in three props:

* interviewers:array - an array of objects containing the information of each interviewer
* interviewer:number - the id of an interviewer
* setInterviewer:function - a function that accepts an interviewer id
