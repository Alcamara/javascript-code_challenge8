// Problem:

//  You are tasked with writing a program that simulates a simple vending machine. The vending machine offers the following products:

//     1: Soda - $1.25
//     2: Chips - $1.50
//     3: Candy - $0.75

//  Write a function called vendingMachine that:

//     Takes an array of product numbers as input.
//     Uses a loop to process each product in the array.
//     Uses a switch statement to determine the price of each product.
//     Keeps track of the total amount the user needs to pay.
//     Prints each product name and price as it's processed.
//     After processing all products, prints the total price.

//  If an invalid product number is encountered (i.e., not 1, 2, or 3), it should print a message saying "Invalid product."
const prompt = require('prompt')

const ProgramStatus = Object.freeze({
    Running : 0,
    Shutdown : 1,
    MakePurchase: 2,
    Cancel: 3
})

const SelectStatus = Object.freeze({
    Done: 1,
    Continue: 0
})

async function userInput(inputType){
    try {

      switch (inputType) {
        case "programStatus":
            return await prompt.get(inputType) 
        case "itemNum":
            return await prompt.get(inputType) 
        case "purchaseStatus":
            return await prompt.get(inputType) 
        default:
            break;
      }

    }catch(err){
        console.log(`${err}`)
    }
}

 const vendingProducts = [
    {
        idItem: 1,
        name: "soda",
        price: 1.25
    },
    {
        idItem: 2,
        name: "Chips",
        price: 1.75
    }, 
    {
        idItem: 3,
        name: "candy",
        price: .75
    }
]

const msgPrompts = [
    "Welcome to Snack Fest!",
    "Do you want to purchase snack?",
    "Press 0 for Yes\nPress 1 for NO",
    "Invalid product!",
    "Thank you for stopping by, have a good day",
    "Please choose item Below",
    "Would you like to select another Items?",
    "Great, let's get your total!" 
]

async function runVendingMachine(){
    let programRun = 0
    const selectedProducts = []
    let result = 0

    while(programRun === ProgramStatus.Running){
        console.log(msgPrompts[0] +" "+msgPrompts[1]);
        console.log(msgPrompts[2]);
        result = await userInput('programStatus')

        if (isNaN(+result.programStatus)) {
            console.log(msgPrompts[3])
            continue
        }

        if(+result.programStatus === ProgramStatus.Shutdown) {
            console.log(msgPrompts[4])
            break
        }

        let pickstatus = 0
        while(pickstatus === SelectStatus.Continue) {
            for (const product of vendingProducts) {
                console.log(`Press ${product.idItem} ${product.name} - ${product.price}`);
            }

            const item = await userInput('itemNum')

            if (isNaN(+item.itemNum)) {
                console.log(msgPrompts[3])
                continue
            }

            selectedProducts.push(+item.itemNum)

            console.log(msgPrompts[6] + "\nPress 0 to Continue\nPress 1 to Be Done");
            const s  = await userInput('purchaseStatus')

            if (isNaN(+s.purchaseStatus)) {
                console.log(msgPrompts[3])
                continue
            }

            if(+s.purchaseStatus === SelectStatus.Done) {
                console.log(msgPrompts[7])
                break
            }

        }

        console.log(selectedProducts);
        
        
    }
}


function vendingMachine(){

}

runVendingMachine()



