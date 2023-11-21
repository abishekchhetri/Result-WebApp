let subject = document.getElementById('listbutton');
let WnameArray = [];
let MainData = [];
let flag = 0;
confirm("Message from (creator) Avishek Chhetri : This result app automatically creates result and lets you to print or download PDF of the result in few minutes, please enter correct information to produce correct result. Press ok to continue");
subject.addEventListener('click', () => {
    if(flag===1)
    return 0;
    flag = 1;
    let name = document.getElementById('userInfo').value;
    let clz = document.getElementById('clasz').value;
    let numberStudents = document.getElementById('nos').value;
    let totalMarks = document.getElementById('totality').value;
    let section = document.getElementById('section').value;
    //****************************validate user******************** */
    if (name === "" || clz === "" || numberStudents === "") {
        alert(`input box must not be empty!!`);
        return 0;
    }
    if (isNaN(numberStudents) || isNaN(clz) || isNaN(totalMarks)) {
        alert(`enter number only in class and number of students`);
        return 0;
    }
    totalMarks = parseInt(totalMarks);
    //******************************number of student************************************* */
    let numberSubject = document.getElementById('nosu').value;
    if (numberSubject === "")
        alert(`enter number of Subject`);
    if ((!isNaN(numberSubject))) {
        let subString = "";
        numberSubject = parseInt(numberSubject);
        for (i = 1; i <= numberSubject; i++) {
            subString += `<input type='text' class='subj' placeholder='Enter name of subject ${i}'><br>`;
        }
        document.getElementById('loadlist').innerHTML = subString;
    }
    else
        alert("enter valid number of subject!");
    //**************************************************************************************** */

    document.getElementById('clickme').addEventListener('click', () => {
        if (flag === 0)
            return 0;

        let subjectArray = [];
        const subs = document.getElementsByClassName('subj');
        for (let i = 0; i < subs.length; i++) {
            if (subs[i].value === "") {
                alert('subject cannot be empty!!');
                return 0;
            }
            subjectArray[i] = subs[i].value;
        }
        const object = {
            Name: name,
            class: clz,
            numberStudents: parseInt(numberStudents),
            numberSubject: parseInt(numberSubject),
            subjectList: subjectArray,
            totalMarks: parseInt(totalMarks),
            section: section
        };
        writeData(object)
    })

})


function writeData(object) {
    // this is object:
    // const object={
    //     Name:name,
    //     class:clz,
    //     numberStudents:numberStudents,
    //     numberSubject:numberSubject,
    //     subjectList:subjectArray,
    //     totalMarks:totalMarks
    // };
    document.getElementById('mainbox').innerHTML =
        `
    <div id="writer">
    <p>Enter name of the students from roll no 1 (don't make mistakes)</p>
    <input type="text" id="Wname" placeholder="Enter Student Name">
    <button id="btn">Enter</button>
    </div>
    <div id="bison"></div>
    <div id="boxer"></div>
    `;
    let stinger = "";
    let rollno = 1;

let val=0;
    document.getElementById('btn').addEventListener('click', () => {
        if (WnameArray.length > object.numberStudents)
            alert('name of all student added!');
        else {
            if (document.getElementById('Wname').value === "" || !(/^[a-zA-Z ]+$/.test(document.getElementById('Wname').value))) {
                alert("Enter valid data!");
                return 0;
            }
            val++;
            WnameArray.push(document.getElementById('Wname').value);
            stinger += `${rollno++}. ${document.getElementById('Wname').value}<br>`;
            //************************************ */
            document.getElementById('bison').innerHTML=`${object.numberStudents-val} name remaining<br>`;
            document.getElementById('boxer').innerHTML = stinger;
            document.getElementById('Wname').value = "";
            //************************************ */
        }

        if (WnameArray.length === object.numberStudents) {
            confirm('name entered sucessfully! now enter the marks!')
            document.getElementById('boxer').innerHTML = "";
            let string = "";
            for (let i = 0; i < object.numberSubject; i++) {
                string += `${object.subjectList[i]} Marks<br><div id="mainBoxMarks"><input type="tel" class="subjectInput" placeholder="Enter marks of ${object.subjectList[i]}"> <button class='ValidateMarks'>Validate</button><br><div class='dom'></div></div><br>`;
            }
            document.getElementById('writer').innerHTML = `<p>Now enter the marks separated by - (dash) like nepali marks : 23-12-34 etc marks must be rollno wise</p><p>Total students : ${object.numberStudents}</p>${string} <br><button id='validateAll'>Submit Marks</button><br> `;

            const noButton = document.getElementsByClassName('ValidateMarks');
            //**********************SUBJECT INPUT FIELD LIVE MARKS CHECKING******************* */
            let subjInput = document.getElementsByClassName('subjectInput');
            let checkList=document.getElementsByClassName('dom');
            for(let i=0;i<subjInput.length;i++)
            {
                document.querySelector('body').addEventListener('input',()=>{
                    checkList[i].innerHTML="";
                    let keepTable=generateTable(subjInput[i].value);
                checkList[i].innerHTML=keepTable;
                })
                subjInput[i].addEventListener('keydown',()=>{
                    checkList[i].innerHTML="";
                    let keepTable=generateTable(subjInput[i].value);
                checkList[i].innerHTML=keepTable;
                });
            }
            //******************************************************************************* */



            for (let i = 0; i < noButton.length; i++) {
                noButton[i].addEventListener('click', () => {
                    console.log(`${object.subjectList[i]} is selected/clicked`);
                    let subj = document.getElementsByClassName('subjectInput')
                    validateMarks(subj[i].value, object.numberStudents, object);
                })
            }
            document.getElementById('bison').innerHTML="";
            document.getElementById('validateAll').addEventListener('click', () => {
                let elem = window.confirm("Have you verified marks ? Are you sure you want to submit? mistakes cannot be undone!.");
                if (elem) {
                    let subj = document.getElementsByClassName('subjectInput')
                    for (let i = 0; i < object.numberSubject; i++) {
                        validateAll(subj[i].value, object.numberStudents, object);

                    }
                    console.log(`datas are name -> ${(WnameArray)} and ->${(MainData)}`);
                    document.getElementById('mainbox').innerHTML = "data submitted!! now it will be result soon!!";

                    //((((((((((((((((((((((RESULT TABLE GENERATOR))))))))))))))))))))))    
                    let tempArr = [];
                    for (let i = 0; i < object.numberStudents; i++) {
                        tempArr[i] = [];
                        for (let j = 0; j < object.numberSubject; j++) {
                            tempArr[i][j] = parseFloat(Math.round(MainData[j][i] * 100) / 100);
                        }

                    }
                    //done transposing the data matrix
                    let percentArray = [];

                    //to make the percentage array of the given data
                    for (let i = 0; i < object.numberStudents; i++) {
                        let total = 0;
                        for (let j = 0; j < object.numberSubject; j++) {
                            total += tempArr[i][j];
                        }
                        let percentage = Math.round(total / (object.totalMarks) * 100 * 100) / 100;
                        percentArray.push(percentage);
                    }
                    console.log(percentArray);
                    //**********************make position */
                    const sortedPoints = percentArray.slice().sort((a, b) => b - a);

                    console.log("Original Points:", percentArray);
                    console.log("Sorted Points (Descending):", sortedPoints);

                    let temp = new Array(percentArray.length).fill(0);
                    let ranks = 1;

                    for (let i = 0; i < sortedPoints.length; i++) {
                        if (i > 0 && sortedPoints[i] !== sortedPoints[i - 1]) {
                            ranks++;
                        }

                        for (let j = 0; j < percentArray.length; j++) {
                            if (sortedPoints[i] === percentArray[j] && temp[j] === 0) {
                                temp[j] = ranks;
                            }
                        }
                    }

                    console.log("Ranks:", temp);


                    //**********************position validated */

                    //************************************************* */
                    let strData = "<table id='onlyTable'> <tr id='mainRow'><td>SN</td><td>Name</td>";
                    let strName = "";
                    let stringData = "";
                    for (let i = 0; i < object.numberStudents; i++) {
                        let total = 0;
                        stringData += `<tr><td>${i + 1}</td><td>${WnameArray[i]}</td>`;
                        for (let j = 0; j < object.numberSubject; j++) {
                            if (i === 0)
                                strData += `<td>${object.subjectList[j]}</td>`;
                            stringData += `<td>${tempArr[i][j]}</td>`;
                            total += Math.round(tempArr[i][j] * 100) / 100;
                        }
                        let percent = Math.round(total / (object.totalMarks) * 100 * 100) / 100;
                        stringData += `<td>${Math.round(total*100)/100}</td><td>${percent}</td>`;
                        stringData += `<td>${calculateDivision(percent)}`;
                        stringData += `<td>${temp[i]}</td>`;
                        stringData += `<td></td>`;
                        stringData += "</tr>"
                    }

                    strData += `<td>Total</td>
                <td>%</td>
                <td>Div</td>
                <td>Pos</td>
                <td>Att</td>
                </tr><tr><td></td><td></td><td></td>`;
                    for (let j = 0; j < object.numberSubject; j++)
                        strData += `<td></td>`;

                    strData += "<td></td> <td></td> <td></td> <td></td></tr>"
                    stringData = strData + stringData;
                    document.getElementById('mainbox').innerHTML = `
                <dl>
                <dt>Class Teacher : ${object.Name}</dt>
                <dt>Class : ${object.class}</dt>
                <dt>Section : ${object.section}</dt>
                <dt>Number of students : ${object.numberStudents}</dt>
                </dl><br>${stringData}</table><br><br><br><br><br><br><br><br><button id="voila"onclick="window.print()">Print/Download PDF</button>`;
                }
                else {
                    alert("recheck for mistakes!!");
                }
            })


        }
    })
}
function validateAll(marksString, num, object) {
    const stArray = marksString.split('-');
    if (marksString === "" || num === "") {
        alert("empty field!!");
        return 0;
    }
    for (let i = 0; i < stArray.length; i++) {
        if (isNaN(stArray[i])) {
            alert("check marks it may not be a number");
            //red alert is needed here with flag value
            return 0;
        }
    }
    MainData.push(stArray);


}

function validateMarks(marksString, num, object) {
    const stArray = marksString.split('-');
    if (marksString === "" || num === "") {
        alert("empty field!!");
        return 0;
    }
    for (let i = 0; i < stArray.length; i++) {
        if (isNaN(stArray[i])) {
            alert("check marks it may not be a number");
            //red alert is needed here with flag value
            return 0;
        }
        if (stArray[i] === "" || stArray[i] === null || stArray[i] === " ") {
            alert('check the number list again!');
            return 0;
        }
        stArray[i] = parseFloat(stArray[i]);

    }
    if (stArray.length !== num) {
        alert('check Marks it is not equal to the number of students');
        return 0;
    }

    alert("Seems like alright!");
}

function calculateDivision(percentage) {
    if (isNaN(percentage)) {
        return "Invalid Input";
    }

    if (percentage >= 80) {
        return "Dist";
    } else if (percentage >= 60) {
        return "1st Div";
    } else if (percentage >= 45) {
        return "2nd Div";
    } else if (percentage >= 33) {
        return "3rd Div";
    } else {
        return "Fail";
    }
}

// function generateTable(textRandom) {
//     let string = textRandom.split('-');
//     // string.pop();
//     let tableDat = "<table id='indTable'><tr><td>RN</td>";
//     console.log(string);
//     for (let i = 0; i < string.length; i++) {
//         tableDat += `<td>${i + 1}</td>`;
//     }

//     tableDat += `</tr><tr><td>Marks</td>`;

//     for (let i = 0; i < string.length; i++) {
//         tableDat += `<td>${string[i]}</td>`;
//     }

//     tableDat += `</tr></table>`;
//     return tableDat;
// }


function generateTable(textRandom) {
    let string = textRandom.split('-'); // Filter out empty strings
    let tableDat = "<table id='indTable'><tr><td>RN</td>";
    console.log(string);
    for (let i = 0; i < string.length; i++) {
        tableDat += `<td>${i + 1}</td>`;
    }

    tableDat += `</tr><tr><td>Marks</td>`;

    for (let i = 0; i < string.length; i++) {
        tableDat += `<td>${string[i]}</td>`;
    }

    tableDat += `</tr></table>`;
    return tableDat;
}
