const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.round(Math.random() * 10) + 1 < 5) {
      resolve("Promise resolved!");
    } else {
      reject("Promise rejected!");
    }
  }, 1000);
});

// promise
//   .then((result) => {
//     console.log(result); // output: Promise resolved!
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const getPromise = async () => {
//   try {
//     const res = await promise;
//     console.log(res);
//     console.log("NO ERROR");
//   } catch (error) {
//     console.error(error);
//     console.log("ERROR");
//   }
// };

const promise1 = promise;
const promise2 = promise;
const promise3 = promise;

const allPromises = [promise1, promise2, promise3];

console.log(allPromises); //[ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

const finishedPromises = async () => {
  try {
    const r = await Promise.all(allPromises);
    console.log(r);
    console.log("All finished");
  } catch (e) {
    console.log(e);
    console.error("AT LEAST ONE FAILED");
  }
};

finishedPromises();
