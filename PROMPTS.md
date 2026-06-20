# AI promt documentation

## 16 June 2026

### Prompt 1

prompt:Generate a code to make my website completely responsive for mobile , tablet , desktop .
mobile max-width:786px; 
tablet min-width:789px and max-width:1024px;
desktop max-width:1025px;                                            
change  my navbar into hamburger menu on mobile screen ,
the navbar elements should appear when someone click it , 
appear in a vertical manner with smooth transitions with same background color , 
the logo :AI Creator Business Manager should be placed at top left corner with margin top:20px; margin-left:10px .
hamburger menu font size:24px and placed at the top left corner as the logo. The navbar height:around 60px;

purpose: Creating Responsive Design

Result:Implemented media queries and a hamburger menu.

Problems faced and changes made: 
change 1

In generated code , for destop screen pixel from 1025px , the Ai assistant button is moved slightly toward right and didnt fit quite well 
So corrected the code by adding width:100%

change2

Navigation Bar height was not enough and changed from 60px to 100px

Change 3
font size was not the same for the Creator buisness manager AI , Changed to the same size as 20px

Change 4

Designed and made popup button by my own development: 
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #822cfb;
        color: #fff;
        font-weight: 500;
        font-size: 12px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.2s ease;


### Prompt 2

prompt: when  the menu icon is clicked , the dropdown overlaps the logo:creator business manager AI , list down the code that prevent overlap without changing the logo's font size , position and margin , padding.

purpose: To avoid overlapping 

Result: Implemented code successfully without any problem and changed width manually for perfectness.


## 17 JUNE 2026

No prompt , Only self code.



## 18 JUNE 2026

## Prompt 1

Generate a code to make my website completely responsive for mobile , tablet , desktop . mobile max-width:786px; tablet min-width:789px and max-width:1024px;desktop max-width:1025px;                                               where all the div boxes are fully responsive and change accordingly to the devices used . , keep the same resposive that aldready made for logo,navigation bar and hamburger menu -do nto change anything from that , make fully responsive website according to the given requirement 

Failure : All my div Boxes become invisible and doesnt make reponsive.

## PROMPT 2

Create a modern floating AI chatbot that appears at the bottom-left corner when the AI Assistant button is clicked. The chatbot should have a compact size , smooth open/close animations, a header with an AI icon and close button, a scrollable chat area, message input field, Send and Submit buttons, typing indicator animation, and a professional  design. The chatbot should be responsive,  defaultly hidden , and open/close with smooth transitions.the AI chatbot should not hide any element and the colour should be white , matching colors with website.

## 19 JUNE 2026

## PROMPT 1

In enter revenue button - near grapgh , add revenue source - Youtube , Instagram ,Collaborations and Other , total should be done and shown , submit and cancel button also to be shown , don't change existing code that are not required ,clean , responsive UI design , as a pie chart , shows percentage , total , padding is 10px ,the percentage should be showed in the right side center , the pie chart should be realistic and with nice ui animations and real colors violet , pink ,light blue and yellow for following youtube , instagram , collobrations , others, the pie chart should be continuous with total inside the pie chart. , should be placed left side . the total should be included inside the source by revenue and padding should be 10px 

result:Implemented code successfully without any problem.

## PROMPT 2

when i enter my revenue in my graph , also needed to be stored in the revenue total div with darker font and should show the percentage of profit or loss , revenue . the profit percentage should be shown in green  , same for loss red color .compare the revenue btw two months , current month and previous month and show percentage

result: Implemented code successfully without any problem.

## 20 JUNE 2026

### Prompt 1

create app.py and install flask and generate a code to connect API from openrouter.com client is openai , also the backend ;python should be connected to frontened;HTML , CSS ,JS . the API is for AI assistant ;chatbox . set max-tokens 1000 .


### Prompt 2

Act as an expert frontend developer and UI/UX designer. I need you to build a "Tasks and Reminders" component using modern, clean, UI desgn.
Here is the exact functionality and layout I need:

The Main View:
   A dedicated container/div titled "Tasks & Reminders". It should display tasks as a numbered list.
 By default, only the top 3 tasks should be visible.
   Below the third task, there must be a "Show More" / "View All" button that expands or lists down the remaining tasks when clicked.

 The "+ New Tasks and Reminder" Button:
   Place a prominent, stylish action button at the top or bottom of the main view.
    Clicking this button opens a small popup/modal page.

The Popup Form:
   
      Task Title (Input field)
      Reminder Details/Notes (Textarea or input field)
      Completion Date (Date picker)
   Action Buttons: A "Submit" button and a "Cancel" button.
   Behavior:The popup should NOT automatically hide or close unexpectedly; it should stay open until the user explicitly clicks "Submit" or "Cancel".


 When the user fills out the form and clicks "Submit", the entered data must instantly sent to the main "Tasks & Reminders", listed in numbered list.

 UI/UX Design Requirements:
   Use a modern, professional, and eye-catching color palette.
   Use smooth transitions/animations for opening the popup and expanding the task list.
   
provide the complete, clean, and well-commented code (HTML/CSS/JS).


### promt 3 

show only 3 tasks and the height of the task & remainder div is equal to the div in the same the row . , show the tasks in a small -medium sized. when i click see more , the tasks div should adjust and becomes small as possible and then extend .


### Promt 4

In the enter revenue button ,add : No of brand deals(shown only when clicked)  , for all month, the entered value in the brand deals is directed or shown in the Brand Deals div , which has same font size and font wieght as there in revenue div .

### prompt 5 
when no of deals entered , it should not disappear , once closed and opened again , i need a button remove , that removes all the value entered.

## prompt 6




Analyze creator data:
Followers
Engagement rate
Views
Audience demographics
Content nichePrevious brand deals

Revenue data
 Create an AI recommendation engine that provides:
Best brand categories to approach
Potential sponsorship opportunities
Revenue growth ideas
Content improvement suggestions
Pricing suggestions for collaborations
Audience growth strategies
 The AI output should include:
Recommendation title
Reason behind recommendation
Expected impact
Priority level (High/Medium/Low)
Action steps
 Integrate it into the existing frontend:
Add a recommendation section/card
Display AI-generated suggestions dynamically
Keep the current UI design unchanged
Make it responsive for mobile, tablet, and desktop
 Backend:
Connect the AI model API
Create an endpoint for recommendations
Send creator data as input
Return structured JSON response
 Code requirements:
Do not rewrite existing files unnecessarily
Modify only required files
Keep code clean and commented
Make sure existing features continue working

Input example:
topic: "Gaming",

 followers: 50000,

 engagement: "8%",

 avgViews: 20000,

 audience: "18-24",

 previousDeals: ["Gaming accessories"],

 revenue: 3000



Output example:



 recommendation: "Partner with gaming hardware brands",

 reason: "Your audience matches gaming product buyers",

 impact: "Increase sponsorship revenue",

 priority: "High",

 action: "Contact keyboard, mouse and PC brands"




