export const logsCreater = (oldData: any, newData: any, ObjectSoFar: any, outputData: typeof newData): any => {
    // if (JSON.stringify(oldData) !== JSON.stringify(ObjectSoFar)) {
    //     return;
    // }
    if (Array.isArray(oldData)) {
        if (oldData.length === 0) {
            return;
        }
        newData.forEach((ele: any, index: number) => {
            if (typeof newData[index] === "object") {
                logsCreater(oldData[index], newData[index], {}, newData[index])
            } else {
                if (oldData.includes(ele)) {
                    outputData[index] = null;
                }
            }
        })
    } else {
        let keys = (Object.keys(newData) as (keyof typeof newData)[]);
        if (keys.length === 0) {
            return;
        }
        for (let key of keys) {
            if (typeof newData[`${String(key)}`] === "object") {
                if (oldData[`${String(key)}`]) {
                    logsCreater(oldData[`${String(key)}`], newData[`${String(key)}`], {}, outputData[`${String(key)}`])
                }
            } else if(Array.isArray(newData[`${String(key)}`])){
                newData.forEach((ele: any, index: any) => {
                    if (oldData.includes(ele)) {
                        outputData[index] = null;
                    }
                });
                if (newData[`${String(key)}`] === oldData[`${String(key)}`]) {
                    outputData[`${String(key)}`] = null
                }
            }else{
                if(oldData[`${String(key)}`]){
                    if(oldData[`${String(key)}`] === newData[`${String(key)}`]){
                        outputData[`${String(key)}`] = null;
                    }
                    
                }
            }
        }
    }
}

let a1 = {
    firstname: "Amarjeet",
    lastname: "singh",
    email: "amarjeet.singh@gmail.com",
    phone: "12345678"
};
let b1 = {
    firstname: "Amarjeet1",
    lastname: "singh",
    email: "amarjeet1.singh@gmail.com",
    phone: "123456789"
};
let a = {
    name: "Amarjit",
    email: "amarjeet.singh@gmail.com",
    details: {
        course: "AVON",
        build: "Nova"
    },
    aman: ["flow", "chart"]
};

let b = {
    name: "Amarjit",
    email: "amarjeet.singh1@gmail.com",
    details: {
        course: "AVON",
        build: "Nova1"
    },
    aman: ["flow", "chart1"]
};


let result = logsCreater(a1, b1, {}, b1);

console.log(b1, "RRRRRRRRRR");
