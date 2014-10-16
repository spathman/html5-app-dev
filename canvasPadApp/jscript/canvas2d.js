function Canvas2D($canvas)
{
    // Private variables
    var context = $canvas[0].getContext("2d"),
            width = $canvas[0].width,
            height = $canvas[0].height,
            pageOffset = $canvas.offset();

    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.globalAlpha = 1.0;
    context.lineJoin = "round";
    context.lineCap = "round";

    $(window).resize(function () {
        pageOffset = $canvas.offset();
    });

    this.getCanvasPoint = function (pageX, pageY)
    {
        // Returns canvas point given page coordinates
        return {
            x: pageX - pageOffset.left,
            y: pageY - pageOffset.top
        };
    };

    this.clear = function ()
    {
        context.clearRect(0, 0, width, height);
        return this;
    };

    this.drawPoints = function (points)
    {
        context.beginPath(); // Start the drawing path
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++)
        {
            context.lineTo(points[i].x, points[i].y);
        }
        // Nothing is drawn untill the context.stroke() is called
        context.stroke(); // Physically draw the line along the path
        return this; // Allows us to do function chaining
    };

    this.penWidth = function (newWidth)
    {
        if (arguments.length)
        {
            context.lineWidth = newWidth;
            return this;
        }
        return context.lineWidth;
    };

    this.penColor = function (newColor)
    {
        if (arguments.length)
        {
            context.strokeStyle = newColor;
            context.fillStyle = newColor;
            return this;
        }
        return context.strokeStyle;
    };

    this.penOpacity = function (newOpacity)
    {
        if (arguments.length)
        {
            context.globalAlpha = newOpacity;
            return this;
        }
        return context;
    };
}


