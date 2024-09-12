const prompt = require('prompt')
const ProgramStatus = Object.freeze({
    Running : 0,
    Shutdown : 1,
    MakePurchase: 2,
    Cancel: 3
})

const SelectStatus = Object.freeze({
    Done: 1,
    Continue: 0,
    Cancel: 3
})

async function userInput(inputType){
    try {
      let input = 0;
    
      switch (inputType) {
        case "programStatus":
            const { programStatus } = await prompt.get("programStatus")
            console.clear()
            input = +programStatus
            break; 
        case "itemNum":
            const { itemNum } = await prompt.get("itemNum")
            input = +itemNum
            break; 
        case "purchaseStatus":
            const { purchaseStatus } = await prompt.get("purchaseStatus")
            console.clear()
            input = +purchaseStatus
            break;
        case "confirm":
        const { confirm } = await prompt.get("confirm")
        console.clear()
        input = +confirm
        break;
        case "again":
            const { again } = await prompt.get("again")
            input = +again
            break;
        default:
            break;
    }

    if (isNaN(input)) {
       console.log(msgPrompts[3])
       return await userInput('again')
    }

    return input

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
    "Invalid input!",
    "Thank you for stopping by, have a good day",
    "Please choose item Below:",
    "Would you like to select another Items?",
    "Great, let's checkout!",
    "Order has been canceled",
    "The following Item(s) are in your cart:",
    "Confirm Purchase?",
    "Thanks you for your purchase! Enjoy your snack(s)!" 
]

async function runVendingMachine(){
    let programRun = 0
    let selectedProducts = []
    let result = 0

    while(programRun === ProgramStatus.Running){
        console.log(msgPrompts[0] +" "+msgPrompts[1]);
        console.log(msgPrompts[2]);
        const programStatus = await userInput('programStatus')

        if(programStatus === ProgramStatus.Shutdown) {
            console.log(msgPrompts[4])
            break
        }

        let SelectionStatus = 0
        while(SelectionStatus === SelectStatus.Continue) {
            console.log(msgPrompts[5]);
            for (const product of vendingProducts) {
                console.log(`Press ${product.idItem} ${product.name} - ${product.price}`);
            }

            const idItem = await userInput('itemNum')
            const item = vendingProducts.find((product) => product.idItem === idItem)
            console.clear()
            console.log(`Add ${item.name} to cart.`)
            selectedProducts.push(item)

            console.log(msgPrompts[6] + "\nPress 0 to Continue\nPress 1 to Be Done\nPress 3 to Cancel");
            const ss  = await userInput('purchaseStatus')
            if(ss === SelectStatus.Done) {
                console.log(msgPrompts[7])
                const confirm  = await vendingMachine(selectedProducts)
                if(confirm === 0){
                    console.log(msgPrompts[11])
                    selectedProducts = []
                }
                break
            } else if (ss === SelectStatus.Cancel){
                selectedProducts = []
                console.log(msgPrompts[8])
                SelectionStatus++
                break
            } else if (ss === SelectStatus.Continue) {
                continue
            }

        }

    }
}


async function vendingMachine(itemsInCart){
    let totalCost = 0
    console.log(msgPrompts[9])
    itemsInCart.forEach((item) => {
        console.log(`${item.idItem} ${item.name} - ${item.price}`);
        totalCost += item.price
    })
    console.log(`Your total today is ${totalCost}\n${msgPrompts[10]}\n0 yes\n1 no`)
    return await userInput('confirm')
}

runVendingMachine()



