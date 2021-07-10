const numberGen = (arr) => {
    let number = 100
    for (var i = 0; i < arr.length; i++) {
        if(arr[i].number >= number) {
            number = arr[i].number + 1
        }
    }
    return number
}

export default numberGen