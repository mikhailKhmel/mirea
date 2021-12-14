const specialSymbols = ['*', '/', '+', '-', '.']
const stringNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

let hasOpenBracket = 0

const outputArea = document.getElementById('output-area')
const resetBtn = document.getElementById('reset')
const resultArea = document.getElementById('result-area')

const numberZero = document.getElementById('numberZero')
const numberOne = document.getElementById('numberOne')
const numberTwo = document.getElementById('numberTwo')
const numberThree = document.getElementById('numberThree')
const numberFour = document.getElementById('numberFour')
const numberFive = document.getElementById('numberFive')
const numberSix = document.getElementById('numberSix')
const numberSeven = document.getElementById('numberSeven')
const numberEight = document.getElementById('numberEight')
const numberNine = document.getElementById('numberNine')

const division = document.getElementById('division')
const multi = document.getElementById('multi')
const minus = document.getElementById('minus')
const plus = document.getElementById('plus')

const comma = document.getElementById('comma')
const deleteBtn = document.getElementById('deleteBtn')
const brackets = document.getElementById('brackets')

const result = document.getElementById('result')

const btns = document.getElementsByTagName('button')
for (let element of btns) {
    element.className = 'btn btn-primary'
}

resetBtn.addEventListener('click', () => reset())

numberZero.addEventListener('click', () => addValue(0))
numberOne.addEventListener('click', () => addValue(1))
numberTwo.addEventListener('click', () => addValue(2))
numberThree.addEventListener('click', () => addValue(3))
numberFour.addEventListener('click', () => addValue(4))
numberFive.addEventListener('click', () => addValue(5))
numberSix.addEventListener('click', () => addValue(6))
numberSeven.addEventListener('click', () => addValue(7))
numberEight.addEventListener('click', () => addValue(8))
numberNine.addEventListener('click', () => addValue(9))

division.addEventListener('click', () => addValue('/'))
multi.addEventListener('click', () => addValue('*'))
minus.addEventListener('click', () => addValue('-'))
plus.addEventListener('click', () => addValue('+'))

comma.addEventListener('click', () => addValue('.'))
deleteBtn.addEventListener('click', () => addValue('delete'))
brackets.addEventListener('click', () => addValue('brackets'))

result.addEventListener('click', () => calculate())

let operands = []
let functions = []

function getCurrentValue() {
    return outputArea.value
}

function setValue(newValue) {
    outputArea.value = newValue
}

function setResult(newValue) {
    resultArea.textContent = newValue
}

function reset() {
    setResult('...')
    setValue('0')
}

function readDouble(s, pos) {
    let res = ''
    while (pos < s.length && (stringNumbers.includes(s[pos]) || s[pos] === '.')) {
        res = `${res}${s[pos]}`
        pos = pos + 1
    }

    return { res, pos }
}

function readFunction(s, pos) {
    return { res: s[pos], pos: pos + 1 }
}

function getToken(s, pos) {
    let q = {}
    if (pos === s.length) {
        q = undefined
    }
    if (stringNumbers.includes(s[pos])) {
        const r = readDouble(s, pos)
        console.log(r)
        q.res = parseFloat(r.res)
        q.pos = r.pos
        return q
    }
    else {
        return readFunction(s, pos)
    }
}

function isFloat(value) {
    return !isNaN(value) && value.toString().indexOf('.') != -1;
}

function isInt(value) {
    return /\d/.test(value)
}

function popFunction() {
    const b = operands.pop()
    const a = operands.pop()
    switch (functions.pop()) {
        case '+': operands.push(a + b)
            break
        case '-': operands.push(a - b)
            break
        case '*': operands.push(a * b)
            break
        case '/': operands.push(a / b)
            break
    }
}

function getPriority(op) {
    switch (op) {
        case '(':
            return -1; // не выталкивает сам и не дает вытолкнуть себя другим
        case '*': case '/':
            return 1;
        case '+': case '-':
            return 2;
        default:
    }
}

function canPop(token) {
    if (functions.length === 0) {
        return false
    }

    const p1 = getPriority(token)
    const p2 = getPriority(functions[functions.length - 1])

    return p1 >= 0 && p2 >= 0 && p1 >= p2
}

function calculate() {
    operands = []
    functions = []
    const currValue = `(${getCurrentValue()})`
    let prevToken = 'Ы'
    let pos = 0
    let token = ''
    do {
        let tokenObj = getToken(currValue, pos)

        if (tokenObj.res !== undefined) {
            token = tokenObj.res.toString()
            pos = tokenObj.pos
        }
        else {
            break
        }

        if (prevToken === '(' && (token === '+' || token === '-')) {
            operands.push(0)
        }

        if (isFloat(token) || isInt(token)) {
            operands.push(parseFloat(token))
        }
        else if (specialSymbols.includes(token) || token === '(' || token === ')') {
            if (token === ')') {
                while (functions.length > 0 && functions[functions.length - 1] !== '(') {
                    popFunction()
                }
                functions.pop()
            }
            else {
                while (canPop(token)) {
                    popFunction()
                }
                functions.push(token)
            }
        }
        prevToken = token
    } while (token !== null)

    if (operands[0] === Infinity || operands[0] === -Infinity) {
        setResult('Деление на нуль!')
        return
    }
    setResult(operands[0])
}

function addValue(inputValue) {
    console.log(`Введено значение ${inputValue} типа ${typeof inputValue}`)
    const currValue = getCurrentValue()
    const lastSymbol = currValue[currValue.length - 1]

    if (currValue !== '0' && inputValue === 'delete') {
        if (lastSymbol === '(') {
            hasOpenBracket--
        }
        const result = currValue.substring(0, currValue.length - 1)
        setValue(result === '' ? '0' : result)
        return
    }

    if (inputValue === 'brackets') {
        if (currValue === '0') {
            setValue('(')
            hasOpenBracket = true
            return
        }
        else {
            if (hasOpenBracket > 0 && (stringNumbers.includes(lastSymbol) || lastSymbol === ')')) {
                setValue(`${currValue})`)
                hasOpenBracket--
            } else if (specialSymbols.includes(lastSymbol) || lastSymbol === '(') {
                setValue(`${currValue}(`)
                hasOpenBracket++
            }
            return
        }
    }

    if (currValue === '0' && typeof inputValue === 'number') {
        setValue(`${inputValue}`)
        return
    }
    else if (specialSymbols.includes(lastSymbol)
        && specialSymbols.includes(inputValue)) {
        return
    }
    else if (lastSymbol === ')' && stringNumbers.includes(inputValue.toString())) {
        return
    }
    else if (currValue === '0' && (inputValue === '+' || inputValue === '-') && inputValue !== '.') {
        setValue(`${inputValue}`)
        return
    }
    else if (currValue === '0' && inputValue === '.') {
        setValue(`${currValue}${inputValue}`)
        return
    }
    else if (currValue !== '0') {
        setValue(`${currValue}${inputValue}`)
        return
    }
}