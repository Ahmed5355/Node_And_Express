/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

let myApiKey = '8e6e418f4d8804a0a133a0ec01bf3f80';

const myBtn = document.getElementById('generate');

myBtn.addEventListener('click', async  () =>{

    try{
        //DEFINE VARIABLES
        const myZipCode = document.getElementById('zip').value;
        const myContent = document.getElementById('feelings').value;
        const myUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${myZipCode}&appid=${myApiKey}&units=imperial"`;
       

        //Get the temperature
        const res = await fetch(myUrl);
        const newRes = await res.json();
        const myTemp = newRes.main.temp;
    
        //SAVE MY DATA FROM CLIENT
        await fetch('/saveMyData',{
            method:"POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: newDate,
                temp: myTemp,
                content: myContent
            })
        });
            
    


        
        const myNewData = await fetch('/myData');
        const data = await myNewData.json();
        //ADD MY DATA FOR HTML PAGE
        document.getElementById('date').innerHTML = 'The Date Is: '+data.date
        document.getElementById('temp').innerHTML = 'The Temperature Is: '+data.temp;
        document.getElementById('content').innerHTML = 'My Feeling Is: '+data.content;
 

    }catch(error){
        console.log("ERORR",error)
    }
})

