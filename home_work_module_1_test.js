const PromiseClass = require('./homework_model_1');
const { resolve } = require('./homework_model_1');

let promise = new PromiseClass((resolve, reject)=> {
    // reject('失败');
    // resolve('成功');
// 
    setTimeout(function() {
        // reject('失败');
        resolve('成功')
    }, 2000)
})


// promise
//     .then()
//     .then()
//     .then(value => {
//         console.log(value)
//     })


function p1() {
    return new PromiseClass((resolve, reject)=> {
        setTimeout(()=>{
            resolve('p1');
        },2000);
    })
}
function p2() {
    return new PromiseClass((resolve, reject) => {
        setTimeout(()=>{
            reject('p2');
        },3000);
    },0)
}

function p3() {
    return new PromiseClass((resolve, reject) => {
        setTimeout(()=>{
            resolve('p3');
        },4000);
    },0)
}

function p4() {
    return new PromiseClass((resolve, reject) => {
        setTimeout(()=>{
            resolve('p4');
        },5000);
    },0)
}

PromiseClass.race([p1(),p2(),p3(),p4()]).then(value=>console.log(value), reason=>console.log(reason));

// PromiseClass.all(['a','b',1, p1(), p2(),123]).then(value => console.log(value), reason => console.log(reason));
// PromiseClass.resolve(100).then(value => console.log(value));
// PromiseClass.resolve(p1()).then(value => console.log(value));
// p2().finally(() => {
//     console.log('finally');
// }).then(value => {
//     console.log(value);
// }, reason => {
//     console.log(reason);
// })
// PromiseClass.reject('错误').then(()=>{}, reason => console.log(reason));
// promise
//     .then(value => {
//         console.log('then_1 success: ' + value);
//         throw new Error('then error');
//         // return 'aaaaa';
//     }, reason => {
//         console.log('then_1 fail: ' + reason);
//         return 100;
//     })
//     .then (value => {
//         console.log('then_2 success: ' + value);
//     }, reason => {
//         console.log('then_2 fail: ' + reason.message);
//     })

