const checkBoxList = document.querySelectorAll('.circle')
const inputFields = document.querySelectorAll('input')
const errorLevel = document.querySelector('.paragraph')
const progressLevel = document.querySelector('.progress-level')
const progressBar = document.querySelector('.progressbar')
const progressValue = document.querySelector('.progressvalue')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: '',
        completed: false,
    },
    second: {
        name: '',
        completed: false,
    },
    third: {
        name: '',
        completed: false,
    },
}

let completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
progressLevel.innerText = allQuotes[completedGoalCount]


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allFieldsFilled = [...inputFields].every(function (inputs) {
        return inputs.value
    })
        if (allFieldsFilled) {
            checkbox.parentElement.classList.toggle('completed')
           
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width= `${completedGoalCount/3 *100}%`
            progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`
            progressLevel.innerText = allQuotes[completedGoalCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

        } else {
            progressBar.classList.add('show-error')
        }
       
    })
})
inputFields.forEach((inputss) => {
    
    inputss.value = allGoals[inputss.id].name

    if (allGoals[inputss.id].completed) {
        inputss.parentElement.classList.add('completed')
    }

    inputss.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    inputss.addEventListener('input', (e) => {
        if (allGoals[inputss.id].completed) {
            inputss.value = allGoals[inputss.id].name
            return
        }
        allGoals[inputss.id].name =inputss.value
            
        
       localStorage.setItem('allGoals',JSON.stringify(allGoals))

})

})