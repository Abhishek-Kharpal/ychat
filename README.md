# YChat
A Chrome Extension template which provides you with a chatbot at the bottom-right of your screen which will be present only on the restricted site of your choice.

## Usage
- To change the site restriction go to your manifest.ts change the url present with key matches in content script object.
- To change the API_URL from which you would be fetching the user query, visit ```src/components/chatBot/constants```.
- Assuming you have node on your machine do the following steps:
- ``` npm i```
- ``` npm run build ```
- Visit ``` chrome://extensions ``` and make sure to turn on the developer mode present on top right as toggle button.
- Dump your build by pressing load unpacked button on top right of your screen.
