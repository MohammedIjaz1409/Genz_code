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

