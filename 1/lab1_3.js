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
        Vasja: -20,
        Petja: -7,
        Dasha: -10,
        Lena: -7,
        Masha: -17,
    };
    let maxValue;
    let maxValueName = [];
    for (const prop of Object.keys(staff)) {
        if (maxValue === undefined || maxValue < staff[prop]) {
            maxValueName = [];
            maxValue = staff[prop]
        }
        if (maxValue == staff[prop]) {
            maxValueName.push(prop)
        }     
    }
    let maxAge = maxValueName + " = " + maxValue;
    return maxAge;
}

const oldEmployee = oldCompare();
console.log(oldEmployee);