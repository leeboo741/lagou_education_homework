// 第一题:

/**
 *  一,  对 js 异步编程的理解
 *  1. js 是单线程的
 *  2. js 通过 eventloop 和 消息队列 实现的异步编程
 *  3. js 异步编程的主要方式有 =>
 *      {
 *          回调,
 *          事件发布/订阅模式
 *          Promise
 *          Generator/async
 *      }
 * 
 *  二,  EventLoop/消息队列作用
 *  1. eventLoop 负责监听调用栈和消息队列, 当调用栈清空后, 开始调取消息队列第一个消息开始执行
 *  2. 消息队列 用于暂存 异步调用的方法, 等待eventloop调用, 先进先出
 * 
 *  三,  宏任务/微任务
 *  1. 宏任务 回调队列中的任务称之为宏任务, 宏任务执行过程中可以加上一些额外需求,
 *      额外任务可以作为一个新的宏任务进入消息队列排队, 也可以作为当前任务的微任务,
 *      直接在当前任务结束后立即执行, 大部分异步任务都是宏任务.
 *  2. 微任务 当前任务的附加额外需求, 用以提高程序的整体响应能力.Promise()/process.nextTick属于微任务
 *  
 */


// 第二题

// setTimeout(() => {
//     var a = 'hello';
//     setTimeout(() => {
//         var b = 'lagou';
//         setTimeout(() => {
//             var c = 'i love u';
//             console.log(a + b + c);
//         }, 10)    
//     }, 10);
// }, 10)
// ================= Promise 实现 ===============
// new Promise(resolve => {
//     resolve('hello');
// }).then(value => {
//     return value + ' lagou';
// }).then(value => {
//     console.log(value + ' i love u');
// })

// 第三题

const fp = require('lodash/fp');
// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [{
        name: 'Ferrari FF',
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyker C12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8',
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 550,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra',
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    },
];

// ============= 示例 ============
// let isLastInStock = function (cars) {
//     let last_car = fp.last(cars)
//     return fp.prop('in_stock', last_car);
// }
// console.log(isLastInStock(cars)); 

// 1. 
// ============= fp.flowRight ============
// const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);
// console.log(isLastInStock(cars));

// 2. 
// ========================================
// const isFirstName = fp.flowRight(fp.prop('name'), fp.first);
// console.log(isFirstName(cars));

// 3.
// ========================================
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
// =============== 示例 ================
// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map (function (car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values);
// }
// console.log(averageDollarValue(cars));
// ======================================
// const getDollarValues = function (cars) {
//     return fp.map (function (car){
//         return car.dollar_value;
//     }, cars);
// }
// const averageDollarValue = fp.flowRight(_average,getDollarValues);
// console.log(averageDollarValue(cars));

// 4. 
// ==========================================
// let _underscore = fp.replace(/\W+/g, '_');

// const getCarNames = function (cars) {
//     return fp.map(function(car){
//         return car.name
//     },cars)
// }
// const listToLower = function (carNames) {
//     return fp.map( fp.toLower, carNames);
// }
// const listToUnderScore = function (carNames) {
//     return fp.map(_underscore,carNames);
// }
// const consoleLog = function (res) {
//     // console.log(res);
//     return res;
// }
// const sanitizeNames = fp.flowRight(listToUnderScore,consoleLog,listToLower,consoleLog,getCarNames);
// console.log(sanitizeNames(cars));


// 第四题

const {
    Container,
    MayBe
} = require('./Support');

// 1.
// let maybe = MayBe.of([5,6,1]);
// const add = function (value) {
//     return fp.add(value, 1);
// }
// let ex1 = maybe => maybe.map(x => fp.map(add,x));
// console.log(ex1(maybe)._value);

// 2.
// let xs = Container.of(['do','ray','mi','fa','so','la','ti','do']);
// let ex2 = container => container.map(value => fp.first(value));
// console.log(ex2(xs)._value);

// 3.
// let safeProp = fp.curry(function(x, o) {
//     return MayBe.of(o[x]);
// })
// let user = {
//     id: 2,
//     name: "Albert"
// }
// const getName = safeProp('name');
// let ex3 = user => {
//     return getName(user).map(value => fp.first(value))._value;
// }
// console.log(ex3(user));

// 4. 
// let ex4 = function(n) {
//     if (n) {
//         return parseInt(n);
//     }
// }

// class TestMayBe{
//     static of(value) {
//         return new TestMayBe(value);
//     }
//     constructor(value) {
//         this._value = value;
//     }
//     isNothing(){
//         return this._value === null || this._value === undefined;
//     }
//     map(fn) {
//         return this.isNothing() ? this: new TestMayBe(fn(this._value));
//     }
// }

// let ex5 = function (n) {
//     return TestMayBe.of(n)
//         .map(value => parseInt(value))
//         ._value
// }
// console.log(ex5('12'));
// console.log(ex5());


// 第五题

/**
 *  1. 基本逻辑 => {
 *      执行器,
 *      三种状态 pendding fulfilled rejected
 *      更改状态 resolve reject
 *      回调方法 then
 * } 
 * 
 *  2. 异步逻辑 => {
 *      then 方法等待执行
 *      then 在主线程 立即执行, 所以需要 在 then中将回调方法存储起来, 等待状态更改后执行
 *      then 方法会被多次执行, 传入多个回调方法, 所以需要一个数组 存储方法 => 利用数组将then中的回调函数存储起来, 等待状态改变后执行
 *      then 方法可以被链式调用 => 需要生成一个新的 promise 对象
 *      then 方法的返回值可以传递给下一个 promise.then 方法 => 统一实现一个 handle 方法 将值传递给生成的 promise 对象, 需要判断返回值为promise还是普通值
 *      then 无参的情况 => 实现successCallback 和 failCallback的默认实现
 *      需要注意then 方法 返回自己的情况, 会造成循环引用的问题 => 返回值和生成的Promise进行比对, 实现需要放到异步中处理, 否则会拿不到promise对象
 * }
 * 
 *  3. Promise.all / Promise.race / Promise.resovle / Promise.reject / fianlly / catch 的实现 => {
 * 
 *      Promise.all => {
 *          1. 传入数组
 *          2. 按数组顺序得到执行结果
 *          3. 一起成功, 单独失败
 *          4. 返回Promise
 *      }
 *      Promise.race => {
 *          1. 传入数组
 *          2. 返回最先执行完成的结果
 *          3. 单独成功, 单独失败
 *          4. 返回Promise
 *      }
 *      Promise.resolve => {
 *          1. 将给定的值转换成注定成功的 Promise 对象
 *          2. 值是promise对象 直接返回, 是普通值, 进行包装后 return
 *      }
 *      Promise.reject => {
 *          1. 将给定的值转换成注定成功的 Promise 对象
 *          2. 值是promise对象 直接返回, 是普通值, 进行包装后 return
 *      }
 * 
 *      finally => {
 *          1. 无论成功还是失败, 都会被调用一次
 *          2. finally 后面可以调用 then 获取值
 *          3. 如果 返回一个 异步函数, 需要 then 等待执行 
 *      }
 * 
 *      catch => {
 *          1. 捕获链条上的错误
 *          2. then 方法的变种
 *      }
 * }
 * 
 *  4. 错误的捕获 => {
 *      执行器的错误
 *      then 执行的错误
 * }
 */

// Promise 三种状态
const STATUS_PENDING = 'PENDING'; // 等待状态
const STATUS_FULFILLED = 'FULFILLED'; // 成功状态
const STATUS_REJECT = 'REJECT'; // 失败状态

class PromiseClass {

    status = STATUS_PENDING;// 当前状态 // 默认值 等待 pending
    value = undefined;// 成功传入的值
    reason = undefined;// 失败传入的原因
    successCallbackList = [];// 成功回调存储
    failCallbackList = [];// 失败回调存储

    // 传入执行器 => 立即执行 => 传入resolve 和 reject 方法参数 作为执行器的参数, 执行器中执行这两个方法来改变 promise的状态
    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    // 定义成箭头函数, 让this 指向 promise 对象
    // resolve 和 reject 方法中 更改状态后 调用 回调函数列表中的回调方法
    resolve = value => {
        // resolve 被调用 更改状态
        // 如果状态不是等待, 不能二次更改
        if (this.status !== STATUS_PENDING) return;
        this.status = STATUS_FULFILLED;
        // 保存 resolve 方法传入的值
        this.value = value;
        // 如果回调方法不为空 , 调用回调函数
        while (this.successCallbackList.length) {
            // 弹出列表第一个 并执行
            this.successCallbackList.shift()();
        }
    }
    reject = reason => {
        // reject 被调用 更改状态
        // 如果状态不是等待, 不能二次更改
        if (this.status !== STATUS_PENDING) return;
        this.status = STATUS_REJECT;
        // 保存 reject 方法传入的值
        this.reason = reason;
        // 如果回调方法不为空 , 调用回调函数
        while (this.failCallbackList.length) {
            // 弹出列表第一个 并执行
            this.failCallbackList.shift()();
        }
    }
    
    // then 方法  处理回调函数
    then(successCallback, failCallback) {
        // then 无参的情况  // 默认实现
        successCallback = successCallback? successCallback: value => value;
        failCallback = failCallback ? failCallback: value => value;
        // 创建一个 promise 对象 , 结束后 返回出去
        let promise2 = new PromiseClass((resolve, reject) => {
            // 如果状态成功, 调用成功方法
            // 如果状态失败, 调用失败方法
            // 如果状态等待, 存储起来 等待执行
            if (this.status === STATUS_FULFILLED) {
                setTimeout(() => {
                    try {
                        // 获取 then 方法的返回值
                        let returnValue = successCallback(this.value);
                        // 处理返回值, 注意处理循环引用的问题 
                        // 需要传入 promise2 对象, 
                        // 需要将方法提升成异步代码, 等待执行器执行完成后,生成 promise2 对象 才能获取到
                        handleThenValue(promise2, returnValue, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            } else if (this.status === STATUS_REJECT) {
                setTimeout(() =>  {
                    try {
                        // 获取 then 方法的返回值
                        let returnValue = failCallback(this.reason);
                        // 处理返回值, 注意处理循环引用的问题 
                        // 需要传入 promise2 对象, 
                        // 需要将方法提升成异步代码, 等待执行器执行完成后,生成 promise2 对象 才能获取到
                        handleThenValue(promise2, returnValue, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)
            } else {
                // push 一个 包装有回调函数的函数, 可以在函数内部对 回调函数 进行 try catch 抓取错误的操作
                this.successCallbackList.push(() => {
                    setTimeout(() =>  {
                        try {
                            // 获取 then 方法的返回值
                            let returnValue = successCallback(this.value);
                            // 处理返回值, 注意处理循环引用的问题 
                            // 需要传入 promise2 对象, 
                            // 需要将方法提升成异步代码, 等待执行器执行完成后,生成 promise2 对象 才能获取到
                            handleThenValue(promise2, returnValue, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
                this.failCallbackList.push(() => {
                    setTimeout(() =>  {
                        try {
                            // 获取 then 方法的返回值
                            let returnValue = failCallback(this.reason);
                            // 处理返回值, 注意处理循环引用的问题 
                            // 需要传入 promise2 对象, 
                            // 需要将方法提升成异步代码, 等待执行器执行完成后,生成 promise2 对象 才能获取到
                            handleThenValue(promise2, returnValue, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
            }
        })
        return promise2;
    }

    // Promise.all 方法
    static all (array) {
        // 结果容器
        let results = [];
        let count = 0;
        // 返回promise对象
        return new PromiseClass((resolve, reject) => {
            // 装载操作 for循环中有异步操作的情况, 需要进行判断是否完成, 才能执行resolve操作, 将 results 传递出去
            function addData(result, index) {
                results[index] = result
                count ++; // 计数器加1
                // 计数器 等于 array 长度时 ,说明执行完成, 可以往外 resolve
                if (count === array.length) resolve(results);
            }
            // 循环 数组
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                // 判断当前元素的类型
                if (current instanceof PromiseClass) {
                    // 是 promise 对象, 调用then 方法获取结果, 如果成功, 装入数组, 如果失败 直接 reject出去 并终止执行
                    current.then(value => {
                        addData(value, i);
                    }, reason => {
                        reject(reason);
                        return;
                    })
                } else {
                    // 是普通值装入结果数组
                    addData(current, i);
                }
            }
        }) 
    }

    // Promise.race 
    static race(array) {
        // 返回 Promise 
        // 谁先执行完成 就先返回谁
        // 需要判断是否是 promise对象
        return new PromiseClass((resolve, reject) => {
            array.forEach(current => {
                if (current instanceof PromiseClass) {
                    current.then(value => {
                        resolve(value);
                        return;
                    }, reason => {
                        reject(reason);
                        return;
                    })
                } else {
                    resolve(current);
                    return;
                }
            });
        })
    }

    // Promise.resolve
    static resolve(value){
        // 是否是 promise 对象
        if (value instanceof PromiseClass) {
            // 是 直接返回
            return value;
        } else {
            // 不是 new 一个 对象 包装
            return new PromiseClass(resolve => resolve(value));
        }
    }

    // Promise.reject
    static reject(value) {
        if (value instanceof PromiseClass) {
            return value;
        } else {
            return new PromiseClass((resolve, reject) => {
                reject(value);
            })
        }
    }

    // Finally
    finally(callback) {
        // 调用本身的 then 方法 判断状态, 在回调中 执行 finally的回调
        // 为了能后续调用then方法, 调用完then 方法后 直接将返回的promise返回
        return this.then(value => {
            // 防止callback 异步执行 后于 then 方法的执行, 将callback的返回值进行包装成 promise ,在then中返回值
            return PromiseClass.resolve(callback()).then(() => value);
        }, reason => {
            return PromiseClass.resolve(callback()).then(() => {throw reason});
        })
    }

    // Catch
    catch(failcallback) {
        // then 方法的变种, 返回promise对象, 不注册成功回调, 直接执行失败回调
        return this.then(undefined, failcallback);
    }
}

/**
 * 用以处理 回调方法 的返回值
 * @param {*} returnValue  返回值
 * @param {*} resolve  promise2 的resolve 方法
 * @param {*} reject  promise2 的 reject 方法
 */
function handleThenValue(promise, returnValue, resolve, reject) {
    if (promise === returnValue) {
        // 判断是否存在循环引用的问题, 如果存在, 抛出错误 并终止执行
        reject(new TypeError('Promise 被 循环引用'));
        return;
    }
    // 使用 promise2 的 resolve 接收返回值, 传递给 promise2 的 then 方法
    // returnValue 可能是普通值也可能是promise对象
    // 需要区分处理
    if (returnValue instanceof PromiseClass) {
        // 如果 returnValue 是 promise对象, 调用promise对象的then方法查看promise对象状态, 并将值传递下去
        returnValue.then(resolve, reject);
    } else {
        // 普通值
        resolve(returnValue);
    }
}

module.exports = PromiseClass;