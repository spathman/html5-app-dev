"use strict";
function CanvasPadApp()
{
    var version = " v4.2",
            canvas2d = new Canvas2D($("#main>canvas")),
            toolbar = new Toolbar($("#toolbar")),
            drawing = false, // Keep track of when we are drawing
            curTool = "pen",
            curAction = newAction(curTool),
            actions = []; // Store all the sets of points

    function onMouseDown(e)
    {
        e.preventDefault(); //Prevent the system setting cursor type, use the one from css
        penDown(e.pageX, e.pageY); // Pass the page coords from the mouse event
    }

    function penDown(pageX, pageY)
    {
        drawing = true; // Started drawing
        curAction = newAction(curTool);
        // Covert page coords to canvas coords and add it to current set of points
        curAction.points.push(canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(curAction); // Add the current set of points to all points
    }
    function onMouseMove(e)
    {
        penMoved(e.pageX, e.pageY);
    }
    function penMoved(pageX, pageY)
    {
        // Covert the page coords to canvas coords
        var canvasPoint = canvas2d.getCanvasPoint(pageX, pageY);
        showCoordinates(canvasPoint);

        if (drawing)
        {
            curAction.points.push(canvasPoint);
            redraw();
        }
    }

    function redraw()
    {
        canvas2d.clear();
        canvas2d.savePen();
        for (var i in actions)
        {
            var action = actions[i];
            canvas2d.penColor(action.color)
                    .penWidth(action.width)
                    .penOpacity(action.opacity);
            canvas2d.drawPoints(action.points);
        }
        canvas2d.restorePen();
    }
    function showCoordinates(point)
    {
        /*
         * The showCoordinates() method uses jQuery's text() method to put the
         * coordinates into the footer. The footer has a <span> element with an
         * id of 'coords'. That is where the coordinates are displayed.
         */
        $("#coords").text(point.x + ", " + point.y);
    }

    function onMouseUp(e)
    {
        penUp();
    }

    function penUp()
    {
        if (drawing)
        {
            drawing = false; // Stop drawing
            if (curAction.points.length < 2)
            {
                actions.pop(); // Pressed mouse button, but did not move it so cancel it
            }
        }
    }

    function toolbarButtonClicked(action)
    {
        switch (action)
        {
            case "clear":
                if (confirm("Clear the canvas?"))
                {
                    actions = [];
                    redraw();
                }
                break;
            case "undo":
                actions.pop();
                redraw();
                break;
        }
    }

    function menuItemClicked(option, value)
    {
        /*  The data-option attribute is the name of the method that is used to
         set the property in the Canvas2D object. We use the square brace
         method of accessing that method in the object, and then we execute
         it passing the data-value attribute from the menu item into it. */
        canvas2d[option](value);
    }

    // Initialize the Color menu
    function initColorMenu()
    {
        /*  Get all of the color menu items and iterates over them using the
         *  jQuery each() method. For each item, set the background color using
         *  the jQuery css() method to the value of the data-value custom
         *  attribute, which is a CSS color name.  */
        $("#color-menu li").each(function (i, e) {
            $(e).css("background-color", $(e).data("value"));
        });
    }

    function initWidthMenu()
    {
        /*  Set the bottom border to the width in the data-value custom attribute
         *  to give the user some idea of how big the line will be. */

        $("#width-menu li").each(function (i, e) {
            $(e).css("border-bottom",
                    $(e).data("value") + "px solid black");
        });
    }
    // Factory function to create an action
    function newAction(tool)
    {
        return {
            tool: tool,
            color: canvas2d.penColor(),
            width: canvas2d.penWidth(),
            opacity: canvas2d.penOpacity(),
            points: []
        }; // return these are a single object
    }

    this.start = function ()
    {
        $("#app header").append(version);

        // Populate the color and width menus
        initColorMenu();
        initWidthMenu();

        // Mouse events on the canvas
        $("#main>canvas").mousemove(onMouseMove)
                .mousedown(onMouseDown)
                .mouseup(onMouseUp)
                .mouseout(onMouseUp);
        toolbar.toolbarButtonClicked = toolbarButtonClicked;
        toolbar.menuItemClicked = menuItemClicked;
    };
}


/*
 For the most part, jQuery uses the same query syntax as CSS to select elements. The typical
 pattern is to select one or more elements and then perform some action on them, or retrieve
 data from them.

 So, for example, here is a jQuery select to get all div elements in the DOM:
 $("div")

 The following query would give you the element that has an ID of main:
 $("#main")

 Just like CSS, the hash sign selects elements with a specific ID, and a dot selects elements
 that have a specific class. You can also use compound search criteria.

 This next query would return all of the elements that are descendants of the element with
 an ID of main and have a class of selected:
 $(#main .selected")

 After you have selected one or more elements you can perform some action on them.
 A jQuery select returns a jQuery object that is like an array, but also has lots of built-in
 functions to do all sorts of things, which we will learn about as we progress through this
 book.

 For example, the following line of code would hide all of the elements returned from
 the previous select (set their CSS display attribute to none):
 $(#main .selected").hide()

 Simple and powerful. So what is the deal with the dollar sign anyway? Some people assumed
 it was some sort of magic that jQuery could use the dollar sign as an alias. But apparently the
 dollar sign is a valid character to start a variable or function name within JavaScript.

 */
$(function () /* document-ready event handler */
{
    window.app = new CanvasPadApp(); /* Create an instance of MyApp */
    window.app.start(); /* Calls the public method 'start' */
});

