
```js
const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
    setTimeout(function () {
        console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```
###### В консоле будет выведен 4 раза "Bad : undefined".
###### Объявление переменной через {var i;} поднимется выше цикла и выполнится первой,
###### т.е {var i;} далее цикл for(...){...}.
###### var попадает в глобальную область видимости и ему присвоится 4 после отработки всего цикла.
###### 4 потому что последнее i++ в цикле было выполнено, но цикл по условию не отработал следующую итерацию
###### поскольку у нас console.log передан в функцию, которая передана в setTimeout, js движок поместил эту функцию 
###### последней в очередь на выполнение
###### далее отрабатывает функция, переданная в setTimeout, но она не видит в своей области видимости объявление переменной {var i;}
###### и поднимается выше в область глобальную, а в глобальной области у нас уже имеется {var i;}, которому отработанный цикл присвоил значение 4.{var i = 4}
###### функция в setTimeout 4 раза вызывает консоль лог с i = 4
###### arr[4] элемента в массиве нет, поэтому в консоль попадает undefined 
###### var не ограничен областью цикла, var всплывает. 
------------------------------------------------------------------------------------------------------------------------
```js
for (let i = 0; i < arr.length; i++) {
    setTimeout(function () {
        console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```
###### в отличие от var, переменная объявленная через let не всплывает и видна в области ее объявления и ниже
###### каждую итерацию переменная переназначается
###### это можно понять попытавшись объявить i через const/ мы увидим ошибку

------------------------------------------------------------------------------------------------------------------------
```js
for (let i = 0; i < arr.length; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(arr[j] > 13 ? `Good: ${arr[j]}` : `Bad: ${arr[j]}`)
        }, 3000)
    })(i)
}
```
###### можно c помощью IIFE инкапсулировать setTimeout и аргументом передавать i каждой итерации цикла 
------------------------------------------------------------------------------------------------------------------------