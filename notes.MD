## Notes

# Gestures
--> Limit to 3
    - swipe from bottom to top
        - mouseDragged event
            - must start within certain area to differenciate
              from gesture 3
    - tap on some area of the screen (eg one corner)
        - mouseClick event
    - long tap then release
        - mouseDragged event
        - must start in top half of the screen
        - in mouse drag check distance travelled
        - if less than threshold keep couting time pressed
        - on release end timer

--> Give a hint once in a while
--> Feedback on event success
    - different colors / shapes for each

# Encourage people to bring others
--> If number of clients is below a threshold for a period of time,
    pop-up message along the lines of
    "Maybe this would be easier with a friend..."

--> (Maybe) Have a list of possible messages to avoid repetition 

# Display 
--> Creature
--> Feedback on successful input
--> 3 stages of "well-being"