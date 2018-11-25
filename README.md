# WhatDoIDo
What_do_i_do is a single page web application that generates random activities or events for the user.

There are currently two type of events
=======================================
- Ad-Hoc Activities
- Planned events

###### Ad-Hoc Activies
- Ad-Hoc events are a list of default interchangable activities
- They suggest locations but they are not mapped to or require a location
- Example:
- > Walk to a park

###### Planned Events * *NZ only*
- Planned events are external events fetched via the EventFinda api
- They are at a real location supplied via the api
- If a suggested event is not desired, the user is prompted to select keywords that they disliked
- > Paint and Wine Night - Rangitoto Sunrise - Paintvine


###### Upcoming / TODO
- Support for Australian planned Events
- Disable planned events toggle when in un-supported country
- Google / Maps search for ad-hoc events
  - EG. When suggested to go to a park, suggest nearby /  random parks to visit
