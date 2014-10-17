// Implements behavior for a toolbar
// The toolbar must have the following form. It can contain buttons or dropdown menus
/*
 <div>
 <button data-action="myAction">My Action</button>
 <div class="dropdown-menu">
 <button data-action="menu">My Menu</button>
 <ul class="menu">
 <li data-value="option1">Option 1</li>
 <li data-value="option2">Option 2</li>
 </ul>
 </div>
 <div>
 */

// $toolbar - The root div element of the toolbar
function Toolbar($toolbar)
{
    // To overcome problems when using event handlers with public methods,
    // the global _this is set to the object's this so it's always available.
    var _this = this;

    $("button", $toolbar).click(function (e) {
        onToolbarButtonClicked($(this));
    });
    $(".menu>li", $toolbar).click(function (e) {
        onMenuItemClicked($(this)); // 'this' refers to the menu item clicked that
        // wrapped in a jQuery object $
    });

    function onToolbarButtonClicked($button)
    {
        // Get the value of the data-action custom attribute from the button.
        var action = $button.data("action");
        // Note the use of _this to call the public methods. Using 'this.' will
        // not work since this is currently pointing at the window object.
        if (!_this.toolbarButtonClicked(action)) // Has client handled the action?
        {
            if (action === "menu") // Client hasn't handled the action, so check
                    // if action was 'menu'.
                    {
                        showMenu($button.siblings("ul.menu")); // Display the menu
                    } else { // Client handled the action, so hide the menus.
                _this.hideMenus();
            }
        }
    }

    function showMenu($menu)
    {
        if ($menu.is(":visible")) // is method useses the filter 'vissible' to
                // determine if the menu is already showing.
                {
                    $menu.fadeOut("fast");
                } else {
            // Hide any open menus
            _this.hideMenus();
            // Show this menu
            $menu.fadeIn("fast");
        }
    }

    function onMenuItemClicked($item)
    {
        var $menu = $item.parent(); // get the parent element that is menu here
        var option = $menu.data("option");
        var value = $item.data("value");
        if (!_this.menuItemClicked(option, value)) // Has clint handled it?
        {
            $item.addClass("selected")
                    .siblings().removeClass("selected");
            $menu.fadeOut("fast");
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // Public methods
    /*  Two methods that are used to notify the application that either a toolbar
     button or menu item has been clicked. In this object they are just placeholders.
     The client application will override them to implement custom behavior. */
    /* The param action is the button's data-action atrribute */
    this.toolbarButtonClicked = function (action)
    {
        return false;
    };
    /* The params option and value are the menu's data-option and the menu item's
     *  data-value atrributes */
    this.menuItemClicked = function (option, value)
    {
        return false;
    };

    this.hideMenus = function ()
    {
        $(".menu", $toolbar).hide();
    };
}


