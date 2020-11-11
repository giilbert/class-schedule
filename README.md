# class schedule

everything about the schedule is located in `schedule.json`

statically serve the files in `public`


## structure of schedule.json

time is in 24 hr (military) time

````json
{
    // bell schedule
    "bellSchedule": Array [length periods] [
        [ hour, minutes],
        [ "9", "30" ],
        [ "13", "15" ],
        ... (as much as you need)
    ],


    // class schedule
    "schedule": Object {
        
        // based off of rotation (1 - 3)
        [ schedule week ex: 1]:
            
            // Monday, Tuesday, Wednesday 
            [ date # ( Mon 1 - Fri 5 )]:
            
                [ 
                    // class
                    "Math",
                    "Science",
                    "Music",
                    ...
                    ** length should correspond with the amount of periods
                ]
            ...
        ...
    }
}
````