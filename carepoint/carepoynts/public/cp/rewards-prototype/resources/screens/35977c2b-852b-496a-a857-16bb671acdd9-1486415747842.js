jQuery("#simulation")
  .on("click", ".s-35977c2b-852b-496a-a857-16bb671acdd9 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Button_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/35977c2b-852b-496a-a857-16bb671acdd9"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Button_2")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/d12245cc-1680-458d-89dd-4f0d7fb22724"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/d12245cc-1680-458d-89dd-4f0d7fb22724"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label_9")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/0e2b2fe6-c3e3-45b3-bd4e-0787faf0a040"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("mouseenter dragenter", ".s-35977c2b-852b-496a-a857-16bb671acdd9 .mouseenter", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getDirectEventFirer(this);
    if(jFirer.is("#s-Label_2") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-35977c2b-852b-496a-a857-16bb671acdd9 #s-Label_2": {
                      "attributes": {
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "0px",
                        "padding-left": "2px",
                        "background-color": "#EEEEEE",
                        "background-image": "none",
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#EEEEEE",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#EEEEEE",
                        "border-bottom-width": "0px",
                        "border-bottom-style": "none",
                        "border-bottom-color": "#000000",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#EEEEEE",
                        "border-radius": "4px 4px 0px 0px"
                      },
                      "expressions": {
                        "width": "Math.max(119 - 1 - 1 - 2 - 2, 0) + 'px'",
                        "height": "Math.max(40 - 1 - 0 - 2 - 0, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-35977c2b-852b-496a-a857-16bb671acdd9 #s-Label_2": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#EEEEEE",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#EEEEEE",
                        "border-bottom-width": "0px",
                        "border-bottom-style": "none",
                        "border-bottom-color": "#000000",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#EEEEEE",
                        "border-radius": "4px 4px 0px 0px",
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "0px",
                        "padding-left": "2px",
                        "-pie-background": "#EEEEEE",
                        "-pie-poll": "false"
                      },
                      "expressions-ie": {
                        "width": "Math.max(119 - 1 - 1 - 2 - 2, 0) + 'px'",
                        "height": "Math.max(40 - 1 - 0 - 2 - 0, 0) + 'px'"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label_9") && jFirer.has(event.relatedTarget).length === 0) {
      event.backupState = true;
      event.target = jFirer;
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-35977c2b-852b-496a-a857-16bb671acdd9 #s-Label_9": {
                      "attributes": {
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "0px",
                        "padding-left": "2px",
                        "background-color": "#EEEEEE",
                        "background-image": "none",
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#EEEEEE",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#EEEEEE",
                        "border-bottom-width": "0px",
                        "border-bottom-style": "none",
                        "border-bottom-color": "#000000",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#EEEEEE",
                        "border-radius": "4px 4px 0px 0px"
                      },
                      "expressions": {
                        "width": "Math.max(75 - 1 - 1 - 2 - 2, 0) + 'px'",
                        "height": "Math.max(39 - 1 - 0 - 2 - 0, 0) + 'px'"
                      }
                    }
                  },{
                    "#s-35977c2b-852b-496a-a857-16bb671acdd9 #s-Label_9": {
                      "attributes-ie": {
                        "border-top-width": "1px",
                        "border-top-style": "solid",
                        "border-top-color": "#EEEEEE",
                        "border-right-width": "1px",
                        "border-right-style": "solid",
                        "border-right-color": "#EEEEEE",
                        "border-bottom-width": "0px",
                        "border-bottom-style": "none",
                        "border-bottom-color": "#000000",
                        "border-left-width": "1px",
                        "border-left-style": "solid",
                        "border-left-color": "#EEEEEE",
                        "border-radius": "4px 4px 0px 0px",
                        "padding-top": "2px",
                        "padding-right": "2px",
                        "padding-bottom": "0px",
                        "padding-left": "2px",
                        "-pie-background": "#EEEEEE",
                        "-pie-poll": "false"
                      },
                      "expressions-ie": {
                        "width": "Math.max(75 - 1 - 1 - 2 - 2, 0) + 'px'",
                        "height": "Math.max(39 - 1 - 0 - 2 - 0, 0) + 'px'"
                      }
                    }
                  } ],
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      jEvent.launchCases(cases);
    }
  })
  .on("mouseleave dragleave", ".s-35977c2b-852b-496a-a857-16bb671acdd9 .mouseleave", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getDirectEventFirer(this);
    if(jFirer.is("#s-Label_2")) {
      jEvent.undoCases(jFirer);
    } else if(jFirer.is("#s-Label_9")) {
      jEvent.undoCases(jFirer);
    }
  })
  .on("windowresize", ".s-35977c2b-852b-496a-a857-16bb671acdd9 .windowresize", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-35977c2b-852b-496a-a857-16bb671acdd9")) {
      cases = [
        {
          "blocks": [
            {
              "condition": {
                "action": "jimLess",
                "parameter": [ {
                  "action": "jimWindowWidth"
                },"900" ]
              },
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/237d2074-94c7-47c6-a764-4c01c53072c5"
                  },
                  "exectype": "serial",
                  "delay": 0
                }
              ]
            }
          ],
          "exectype": "serial",
          "delay": 0
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });