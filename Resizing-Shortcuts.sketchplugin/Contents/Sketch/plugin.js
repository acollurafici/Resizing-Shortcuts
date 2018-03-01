@import "MochaJSDelegate.js";

function onRun(context) {
  var panelWidth = 146;
  var panelHeight = 170;

  // Create an NSThread dictionary with a specific identifier
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var identifier = "co.nudgit.resizingshortcuts";

  // If there's already a panel, prevent the plugin from running
  if (threadDictionary[identifier]) return;

  // Create the panel and set its appearance
  var panel = NSPanel.alloc().init();
  panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true);
  panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
  panel.setBackgroundColor(NSColor.whiteColor());

  // Set the panel's title and title bar appearance
  panel.title = "";
  panel.titlebarAppearsTransparent = true;

  // Center and focus the panel
  panel.center();
  panel.makeKeyAndOrderFront(null);
  panel.setLevel(NSFloatingWindowLevel);

  // Make the plugin's code stick around (since it's a floating panel)
  COScript.currentCOScript().setShouldKeepAround_(true);

  // Hide the Minimize and Zoom button
  panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  panel.standardWindowButton(NSWindowZoomButton).setHidden(true);

  // Create the blurred background
  var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight));
  vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight));
  vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow);

  // Create the WebView with a request to a Web page in Contents/Resources/
  var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44));
  var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("webView.html"));
  webView.mainFrame().loadRequest(request);
  webView.setDrawsBackground(false);

  // Access the Web page's JavaScript environment
  var windowObject = webView.windowScriptObject();

  // Create the delegate
  var delegate = new MochaJSDelegate({

    // Listen to the page loading state GETSTATUS
    "webView:didFinishLoadForFrame:": (function(webView, webFrame) {

      // Get the current selection
      var selection = context.selection;
      var select = context.document.selectedLayers().layers().firstObject();
      context.document.showMessage(select.hasFixedLeft());
      if (selection.length == 1) {

        // Send the CSS attributes as a string to the Web page
        //windowObject.evaluateWebScript("updatePreview('" + selection[0].CSSAttributes().join(" ") + "')");
        
      } else {

        // Or send an empty string to the Web page
        //windowObject.evaluateWebScript("updatePreview(' ')");
      }
    }),

    // Listen to URL changes
    "webView:didChangeLocationWithinPageForFrame:": (function(webView, webFrame) {

      // Extract the URL hash (without #) by executing JavaScript in the Web page
      var hash = windowObject.evaluateWebScript("window.location.hash.substring(1)");

      // Parse the hash's JSON content
      var data = JSON.parse(hash);

      // Launch a Sketch action and focus the main window
      resize(data.action);
      //[doc showMessage: "hello"]
      //context.document.actionsController().actionForID(data.action).doPerformAction(null);
      //NSApp.mainWindow().makeKeyAndOrderFront(null);
    })
  })

  function resize(myAction) {
  var select = context.document.selectedLayers().layers().firstObject();

        select.hasFixedHeight = false;
        select.hasFixedWidth = false;

        select.hasFixedLeft = false;
        select.hasFixedTop = false;
        select.hasFixedRight = false;
        select.hasFixedBottom = false;

     // context.document.showMessage("Send it!");
    if (myAction == "h-tlr") {
        select.hasFixedHeight = true;
        select.hasFixedWidth = false;

        select.hasFixedLeft = true;
        select.hasFixedTop = true;
        select.hasFixedRight = true;
        select.hasFixedBottom = false;

    } else if (myAction == "w-tbl") {

        select.hasFixedHeight = false;
        select.hasFixedWidth = true;

        select.hasFixedLeft = true;
        select.hasFixedTop = true;
        select.hasFixedRight = false;
        select.hasFixedBottom = true;

    } else if (myAction == "w-tbr") {

        select.hasFixedHeight = false;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = true;
        select.hasFixedRight = true;
        select.hasFixedBottom = true;

    } else if (myAction == "h-blr") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = false;

        select.hasFixedLeft = true;
        select.hasFixedTop = false;
        select.hasFixedRight = true;
        select.hasFixedBottom = true;

    } else if (myAction == "wh") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = false;
        select.hasFixedRight = false;
        select.hasFixedBottom = false;

    } else if (myAction == "h-lr") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = false;

        select.hasFixedLeft = true;
        select.hasFixedTop = false;
        select.hasFixedRight = true;
        select.hasFixedBottom = false;

    } else if (myAction == "w-tb") {

        select.hasFixedHeight = false;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = true;
        select.hasFixedRight = false;
        select.hasFixedBottom = true;

    } else if (myAction == "clear") {

        

    } else if (myAction == "wh-t") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = true;
        select.hasFixedRight = false;
        select.hasFixedBottom = false;

    } else if (myAction == "wh-l") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = true;

        select.hasFixedLeft = true;
        select.hasFixedTop = false;
        select.hasFixedRight = false;
        select.hasFixedBottom = false;
        
    } else if (myAction == "wh-r") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = false;
        select.hasFixedRight = true;
        select.hasFixedBottom = false;
        
    } else if (myAction == "wh-b") {

        select.hasFixedHeight = true;
        select.hasFixedWidth = true;

        select.hasFixedLeft = false;
        select.hasFixedTop = false;
        select.hasFixedRight = false;
        select.hasFixedBottom = true;
        
    } 
      //NSApp.mainWindow().makeKeyAndOrderFront(null);
  }



  // Set the delegate on the WebView
  webView.setFrameLoadDelegate_(delegate.getClassInstance());

  // Add the content views to the panel
  panel.contentView().addSubview(vibrancy);
  panel.contentView().addSubview(webView);

  // After creating the panel, store a reference to it
  threadDictionary[identifier] = panel;

  var closeButton = panel.standardWindowButton(NSWindowCloseButton);

  // Assign a function to the Close button
  closeButton.setCOSJSTargetFunction(function(sender) {
    panel.close();

    // Remove the reference to the panel
    threadDictionary.removeObjectForKey(identifier);

    // Stop the plugin
    COScript.currentCOScript().setShouldKeepAround_(false);
  });
}

var onSelectionChanged = function(context) {
  var threadDictionary = NSThread.mainThread().threadDictionary();
  var identifier = "co.nudgit.resizingshortcuts";


  // Check if there's a panel opened or not
  if (threadDictionary[identifier]) {

    // Access the panel from the reference and the WebView
    var panel = threadDictionary[identifier];
    var webView = panel.contentView().subviews()[1];

    // Access the Web page's JavaScript environment
    var windowObject = webView.windowScriptObject();

    // Get the current selection and update the CSS preview accordingly
    var selection = context.actionContext.document.selectedLayers().layers();
    
    var select = context.document.selectedLayers().layers().firstObject();
      context.document.showMessage(select.hasFixedLeft());

    if (selection.length == 1) {
      //windowObject.evaluateWebScript("updatePreview('" + selection[0].CSSAttributes().join(" ") + "')");
    } else {
      //windowObject.evaluateWebScript("updatePreview(' ')");
    }
  }
};
