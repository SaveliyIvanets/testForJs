function task(array, targetSum){ // как я понял задача на 2 указателя
    array.sort((a, b) => a - b); // сортирую массив
    let l = 0; // левый указатель
    let r = array.length - 1; // правый указатель
    while(l < r){
        if(array[l] + array[r] == targetSum){
            return [array[l], array[r]];
        }else if(array[l] + array[r] > targetSum){
            r--;
        }else if(array[l] + array[r] < targetSum){
            l++;
        }
    } // проверяю сумма правого и левого указетеля и в зависимости от суммы меняю указатель
    return []; // пустой массив в случае отсутствия пары
}
console.log(task( [3, 5, -4, 8, 11, 1, -1, 6],10));