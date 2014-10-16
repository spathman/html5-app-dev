"use strict";
function CanvasPadApp()
{
    var version = " v4.1",
            canvas2d = new Canvas2D($("#main>canvas")),
            drawing = false, // Keep track of when we are drawing
            points = [], // Store current set of points
            actions = []; // Store all the sets of points

    function onMouseDown(e)
    {
        e.preventDefault(); //Prevent the system setting cursor type, use the one from css
        penDown(e.pageX, e.pageY); // Pass the page coords from the mouse event
    }

    function penDown(pageX, pageY)
    {
        drawing = true; // Started drawing
        points = [];
        // Covert page coords to canvas coords and add it to current set of points
        points.push(canvas2d.getCanvasPoint(pageX, pageY));
        actions.push(points); // Add the current set of points to all points
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
            points.push(canvasPoint);
            redraw();
        }
    }

    function redraw()
    {
        canvas2d.clear();
        for (var i in actions)
        {
            canvas2d.drawPoints(actions[i]);
        }
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
        drawing = false; // Stop drawing
    }



    this.start = function ()
    {
        $("#app header").append(version);

        // Mouse events on the canvas
        $("#main>canvas").mousemove(onMouseMove)
                .mousedown(onMouseDown)
                .mouseup(onMouseUp)
                .mouseout(onMouseUp);
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

