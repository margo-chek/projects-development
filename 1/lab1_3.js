/* Разработайте программу, которая находит самого старшего сотрудника. 
Сотрудники представлены в виде объекта, где ключом является имя сотрудника и значение - его возраст. 
Программа должна найти и вывести имя и возраст сотрудника
const staff = {
        "Вася": 23,
        "Петя": 27,
        "Даша": 22,
};
*/

function oldSearch() {
    const staff = {
        Vasja: 23,
        Petja: 27,
        Dasha: 22,
    };
    for (const prop of Object.keys(staff)) {
        console.log("staff." + prop + " = " + staff[prop]);
      }
}

function oldCompare() {
    const staff = {
        Vasja: -23,
        Petja: -27,
        Dasha: 22,
        Lena: 0,
        Masha: 18,
    };
    let maxValue = 0;
    let maxValueName = '';
    for (const prop of Object.keys(staff)) {
        if ( maxValue < staff[prop]) {
            maxValue = staff[prop],
            maxValueName = prop
        }
        console.log(maxValueName, maxValue);
    }
}

oldCompare();