"use strict";
function MyApp()
{
    var version = "v1.0";
    function setStatus(message) /* This is a private method */
    {
        $("#app>footer").text(message); /* $ sign is an alias for jQuery */
    }

    this.start = function () /* Public method */
    {
        $("#app>header").append(version);
        setStatus("ready"); /* Calls the private method */
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
    window.app = new MyApp(); /* Create an instance of MyApp */
    window.app.start(); /* Calls the public method 'start' */
});

