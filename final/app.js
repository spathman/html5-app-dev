"use strict";

function TaskAtHandApp()
{
    var version = "v3.1",
            appStorage = new AppStorage("taskAtHand");

    function setStatus(message)
    {
        $("#app>footer").text(message);
    }

    function saveTaskList()
    {
        var tasks = [];
        $("#task-list .task span.task-name").each(function () {
            tasks.push($(this).text());
        });
        appStorage.setValue("taskList", tasks);
    }

    function addTask()
    {
        var taskName = $("#new-task-name").val();
        if (taskName.trim().length !== 0)
        {
            addTaskElement(taskName);
            saveTaskList();
        }
        // Reset the field
        $("#new-task-name").val("").focus();
    }

    function addTaskElement(taskName)
    {
        var $task = $("#task-template .task").clone();
        $("span.task-name", $task).text(taskName);

        $("#task-list").append($task);

        // Toggle details
        $("button.toggle-details", $task).click(function () {
            toggleDetails($task);
        });

        // Task events
        $task.click(function () {
            onSelectTask($task);
        });

        // Button events
        $("button.delete", $task).click(function () {
            removeTask($task);
        });
        $("button.move-up", $task).click(function () {
            moveTask($task, true);
        });
        $("button.move-down", $task).click(function () {
            moveTask($task, false);
        });

        // Task name events
        $("span.task-name", $task).click(function () {
            onEditTaskName($(this));
        });
        $("input.task-name", $task).change(function () {
            onChangeTaskName($(this));
        })
                .blur(function () {
                    $(this).hide().siblings("span.task-name").show();
                });
    }

    function toggleDetails($task)
    {
        /*
         *  The slideToggle() method is an animation function that toggles the visibility of an
         element. It makes an element visible using a sliding down motion pushing the elements
         below it down. To hide the element it slides it back up, shrinking it until it's hidden.
         There is also a method to fade elements in and out called fadeToggle(). But a slide provides
         a smoother transition when an element moves other elements out of the way when it
         becomes visible.
         
         */
        $(".details", $task).slideToggle();
        /*
         * The toggleClass() method adds a class to an element if the element doesn't already have it,
         * and removes it if it does.
         */
        $("button.toggle-details", $task).toggleClass("expanded");
    }

    function removeTask($task)
    {
        $task.remove();
        saveTaskList();
    }

    function moveTask($task, moveUp)
    {
        if (moveUp)
        {
            $task.insertBefore($task.prev());
        }
        else
        {
            $task.insertAfter($task.next());
        }
        saveTaskList();
    }

    function onSelectTask($task)
    {
        if ($task)
        {
            // Unselect other tasks
            $task.siblings(".selected").removeClass("selected");
            // Select this task
            $task.addClass("selected");
        }
    }

    function onEditTaskName($span)
    {
        $span.hide()
                .siblings("input.task-name").val($span.text()).show().focus();
    }

    function onChangeTaskName($input)
    {
        $input.hide();
        var $span = $input.siblings("span.task-name");
        if ($input.val().trim().length !== 0)
        {
            $span.text($input.val());
            saveTaskList();
        }
        $span.show();
    }

    function loadTaskList()
    {
        var tasks = appStorage.getValue("taskList");
        if (tasks)
        {
            for (var i in tasks)
            {
                addTaskElement(tasks[i]);
            }
        }
    }

    function onChangeTheme()
    {
        // Get the value of the selected option
        var theme = $("#theme>option").filter(":selected").val();
        setTheme(theme);
        appStorage.setValue("theme", theme);
    }

    function setTheme(theme)
    {
        // Change the 'href' value to selected theme's stylesheet in the html file
        $("#theme-style").attr("href", "themes/" + theme + ".css");
    }

    function loadTheme()
    {
        var theme = appStorage.getValue("theme");
        if (theme)
        {
            setTheme(theme);
            // Set the selected attribute of theme select option
            $("#theme>option[value=" + theme + "]").attr("selected", "selected");
        }
    }

    this.start = function ()
    {
        $("#new-task-name").keypress(function (e)
        {
            if (e.which === 13) // Enter key
            {
                addTask();
                return false;
            }
        })
                .focus();
        // Theme change
        $("#theme").change(onChangeTheme);

        $("#app>header").append(version);
        loadTheme();
        loadTaskList();
        setStatus("ready");
    };
}

$(function ()
{
    window.app = new TaskAtHandApp();
    window.app.start();
});