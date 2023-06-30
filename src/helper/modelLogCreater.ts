export const logsCreater = (oldData: any, newData: any, ObjectSoFar: any, outputData: typeof oldData): any => {
    if (JSON.stringify(oldData) === JSON.stringify(ObjectSoFar)) {
        return;
    }
    if (Array.isArray(oldData)) {
        if (oldData.length === 0) {
            return;
        }
        newData.forEach((ele: any, index: number) => {
            if (typeof newData[index] === "object") {
                logsCreater(oldData[index], newData[index], {}, newData[index])

            } else {
                if (ele === oldData[index]) {
                    outputData[index] = null;
                }
            }
        })
    } else {
        let keys = (Object.keys(oldData) as (keyof typeof oldData)[]);
        if (keys.length === 0) {
            return;
        }
        for (let key of keys) {
            if (typeof newData[`${String(key)}`] === "object") {
                // call
                logsCreater(oldData[`${String(key)}`], newData[`${String(key)}`], {}, newData[`${String(key)}`])
            } else {
                // ObjectSoFar[`${String(key)}`] = oldData[`${String(key)}`];
                if (newData[`${String(key)}`] === oldData[`${String(key)}`]) {
                    outputData[`${String(key)}`] = null
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

console.log(result, "RRRRRRRRRR");
