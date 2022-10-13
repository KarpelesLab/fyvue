import { rest } from "@karpeleslab/klbfw";

export const getUser = async () => {
  return new Promise((resolve, reject) => {
    rest("User:get", "GET")
      .catch((err) => {
        console.log("User:get::" + err);
        reject(err);
      })
      .then((tmp) => {
        if (tmp.result == "success" && tmp.data && tmp.data.User__) {
          resolve(tmp.data);
        }
        resolve(null);
      });
  });
};


export const userLogout = async () => {
  return new Promise((resolve, reject) => {
    rest("User:logout", "Post")
      .catch((err) => {
        console.log("User:logout::" + err);
        reject(err);
      })
      .then((tmp) => {
        if (tmp.result == "success") {
          resolve(tmp.data);
        }
        resolve(null);
      });
  });
};

export const updatePwd = async (pwd, newPwd) => {
  return new Promise((resolve, reject) => {
    rest(`User/@:setPassword`, "POST", {old_password:pwd,  password:newPwd}).catch((err) => {
      console.log('UserSetPassword::'+err)
      reject(err)
    }).then((result) => resolve(result))
  })
}

export const updateEmail = async (pwd, email) => {
  return new Promise((resolve, reject) => {
    rest(`User/@:setEmail`, "POST", {email:email,  current_password:pwd}).catch((err) => {
      console.log('UserSetEmail::'+err)
      reject(err)
    }).then((result) => resolve(result))
  })
}
