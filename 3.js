function isSquare(n) {
    if (n < 0) return false;
    if (n == 0 || n == 1) return true;
    for (var i = 0; i <= n / 2; i++) { // сократил так как для чисел из 2 половины справделиво x1 * x1 > n
        if (i * i == n) {
            return true;
        }
    }
    return false;
}
console.log(isSquare(9))
