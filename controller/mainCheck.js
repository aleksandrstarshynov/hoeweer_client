const currentData = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD

let flagChecked = false; 
let SERVER_URL = "https://mywheatherapp.onrender.com"

// Get the current Flag state
async function getFlagState() {
    try {
        console.log("🚀 asking the old flag state");
         const response = await fetch(`${SERVER_URL}/get-flag`, {
             method: 'GET'
         });
         const responseData = await response.json();


         // Check if the 'changeDayDatum' field present in the answer
         if (responseData && responseData.changeDayDatum) {
             console.log('🚀🚀🚀 We got the next flag state:', responseData);
         } else {
             console.warn('Failed to get required data from response:', responseData);
         }

         return {
            changeDayFlag: responseData.changeDayFlag,
            changeDayDatum: responseData.changeDayDatum
          };

    } catch (error) {
         console.error('Error getting flag state:', error);
         return { changeDayFlag: null, changeDayDatum: null };
    }
}



// Main page render initialization
async function renderMainPage() {
    if (flagChecked) return;  
    try {
        // Get the flag state
        const { changeDayFlag, changeDayDatum } = await getFlagState(); 

        // Checking the conditions for updating the flag
        if (!changeDayFlag && currentData !== changeDayDatum) { 
            console.log("🚀🚀 Flag check done")
            async function updateData(currentData) {
                try {
                    console.log('📤 Sending a request to the server...');

                    const response = await fetch(`${SERVER_URL}/update-flag`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ currentData })
                    });    

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Сервер вернул ошибку: ${response.status} - ${errorText}`);
                    }    

                    const responseData = await response.json();
                    console.log('✅ Сервер ответил:', responseData);

                    // We draw by this the chart only after receiving the data
                    renderChart(mainElement);  

                } catch (error) {
                    console.error('❌ Error:', error);
                }
            }
            // Call the flag update function
            await updateData(currentData);

            // Call function dataProcessing on the server
            async function processData() {
                     try {
                         console.log('🚀 Sending a request from index.js for data Processing');
                         const response = await fetch(`${SERVER_URL}/process-data`, {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' }
                         });

                         if (!response.ok) {
                             const errorText = await response.text();
                             throw new Error(`The server returned an error: ${response.status} - ${errorText}`);
                         }

                         const responseData = await response.json();
                     } catch (error) {
                         console.error('❌ Error in data processing:', error);
                     }
            }
                await processData();  // Call the data processing function
}
// END of the if statement for the main Business Logic 

// Build DOM only after receiving all data
        const mainElement = document.createElement('main');

        const testDiv = document.createElement('div');
        testDiv.textContent = "testDiv test text";

        document.body.appendChild(mainElement);
        mainElement.appendChild(testDiv);

        console.log("🚀 DOM with flag data built");

// Draw the graph
        renderChart(mainElement);

    } catch (error) {
        console.error('Error initializing page:', error);
    }
}
renderMainPage();
