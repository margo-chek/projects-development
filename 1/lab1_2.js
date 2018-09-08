/* Создайте пустой объект “user”. Добавьте свойство name со значением “Вася”. 
Добавьте свойство surname со значением “Петров”. Распечатайте в консоль.
 Поменяйте значение name на Сергей. Распечатайте в консоль.  
 Удалите свойство name из объекта. Распечатайте в консоль*/

 function main() {
   const user = {
    name: 'Vasya',
    surname: 'Petrov'
    };
    console.log(user);
    user.name = 'Sergey';
    console.log(user);
    delete user.name;
    console.log(user);
 }

 main();