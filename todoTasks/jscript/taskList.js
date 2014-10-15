function Task(name)
{
    this.name = name;
    this.created = new Date();
    this.id = Task.nextTaskId++;
    this.priority = Task.priorities.normal;
    this.status = Task.statuses.notStarted;
    this.pctComplete = 0;
    this.startDate = null;
    this.dueDate = null;
}
// Define some static variables on the Task object
Task.nextTaskId = 1;
Task.priorities = { //enumerated data type
    none: 0,
    low: 1,
    normal: 2,
    high: 3
};
Task.statuses = { //enumerated data type
    none: 0,
    notStarted: 1,
    started: 2,
    completed: 3
};
/*
 * @param taskes is optional
 */
function TaskList(tasks)
{
    tasks = tasks || []; // If no tasks array passed initialize to new
    
    this.getTasks = function() // Public method
    {
        return tasks;
    };
    
    this.addTask = function(task) // Public method
    {
        tasks.push(task);
        return this;
    };
    
    this.removeTask = function(taskId)
    {
        var index = getTaskIndex(taskId);
        if(index >= 0)
        {
            var task = tasks[index];
            tasks.splice(index, 1);
            return task;
        }
        return null;
    };
    
    function getTaskIndex(taskId)
    {
        for (var i in tasks)
        {
            if (tasks[i].id === taskId)
            {
                return parseInt(i);
            }
        }
            // Not found
            return -1;
    }
    
    this.getTask = function(taskId)
    {
        var index = getTaskIndex(taskId);
        return (index >= 0 ? tasks[index] : null);
    };
    
    this.each = function(callback)
    {
        for (var i in tasks)
        {
            // Execute the callback function passed on each task
            callback(tasks[i]); 
        }
    };
}

