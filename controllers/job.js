const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");
const apply = require("../models/apply");
const jobpost = require("../models/jobpost");
const register = require("../models/register");
var full;
const uniqid = require("uniqid");
const candidate = require("../models/candidate");
const { findById } = require("../models/apply");
var x;
var y = () => {
  x = uniqid();
};

exports.authenthicate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      await jwt.verify(
        req.headers.authorization,
        "7UKj6cgSA2qR4yAj",
        function (error, decoded) {
          if (error) {
            console.log(error);
          } else {
            req.userid = decoded.id;
            console.log(req.userid);
            next();
          }
        }
      );
    } else {
      console.log("there is some error");
      console.log(Error);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.registeruser = async (req, res) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const { fname, lname, wru, gmail, password } = req.body;
    const newregister = new register({ fname, lname, wru, gmail, password });
    console.log(newregister);
    await newregister.save();
    res.json({
      message: "Successfully registered",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.loginuser = async (req, res) => {
  try {
    console.log(req.body);
    let get = await register.findOne({ gmail: req.body.gmail });
    if (get) {
      let match = bcrypt.compareSync(req.body.password, get.password);
      console.log(match);
      if (match) {
        let token = jwt.sign({ id: get._id }, "7UKj6cgSA2qR4yAj");
        console.log(token);
        res.json({
          message: `Welcome ${get.fname} ${get.lname}`,
          status: true,
          token,
        });
        full = get.fname + get.lname;
        console.log(full);
      } else {
        res.json({
          message: "Password incorrect ",
        });
      }
    } else {
      res.json({
        message: "Gmail is not registered",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.jobuser = async (req, res, next) => {
  try {
    const { position, company, salary, type, skills, ldate, pdate } = req.body;
    const newjob = new jobpost({
      position,
      company,
      salary,
      skills,
      type,
      ldate,
      pdate,
    });
    newjob.userid = req.userid;
    newjob.name = full;
    await y();
    newjob.token = x;
    console.log(newjob);
    await newjob.save();
    res.json({
      message: "Job posted",
      status: true,
    });
  } catch (error) {
    console.log(error);
    console.log("erorororo");
  }
};
exports.jobapp = async (req, res, next) => {
  try {
    let get = await jobpost.find({ userid: req.userid });
    await get.reverse();
    res.json(get);
    console.log(get);
  } catch (error) {
    console.log(error);
  }
};
exports.viewcandidates = async (req, res, next) => {
  try {
    let geta = await jobpost.findById(req.body.did);
    let l = geta.candidates.length,
      n = -1,
      m = 0,
      final = [],
      finals = [];
    get = [];
    for (let i = 0; i < l; i++) {
      get[i] = await candidate.find({ _id: geta.candidates[i] });
    }
    for (let i = 0; i < l; i++) {
      final[i] = get[i][0];
    }
    final.reverse();
    for (let i = 0; i < final.length; i++) {
      for (let j = i + 1; j < final.length; j++) {
        console.log(final[i]._id);
        console.log(final[j]._id);
        if (final[i].token === final[j].token) {
          m++;
          final[i] = undefined;
        }
      }
    }
    for (i = 0; i < final.length; i++) {
      if (final[i] != undefined) {
        n++;
        finals[n] = final[i];
      }
    }
    console.log(finals);
    res.json({
      finals,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deluser = async (req, res, next) => {
  try {
    console.log(req.body);
    let del = await jobpost.findByIdAndDelete(req.body.e);
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////
//////////////////////////////////////
exports.candidateuser = async (req, res) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    console.log(req.body);
    const {
      fname,
      lname,
      gmail,
      password,
      major,
      clg,
      start,
      end,
      skills,
      url,
    } = req.body;
    let newcandidate = new candidate({
      fname,
      lname,
      gmail,
      password,
      major,
      clg,
      start,
      end,
      skills,
      url,
    });
    await y();
    newcandidate.token = x;
    await newcandidate.save();
    res.json({
      message: "Successfully registered",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something wrong",
    });
  }
};
exports.candidatelogin = async (req, res) => {
  try {
    console.log(req.body);
    let get = await candidate.findOne({ gmail: req.body.gmail });
    if (get) {
      let match = bcrypt.compareSync(req.body.password, get.password);
      console.log(match);
      if (match) {
        let token = jwt.sign({ id: get._id }, "7UKj6cgSA2qR4yAj");
        console.log(token);
        let did = get._id;
        res.json({
          message: `Welcome ${get.fname} ${get.lname}`,
          status: true,
          token,
          did,
        });
        full = get.fname + get.lname;
        console.log(full);
      } else {
        res.json({
          message: "Password incorrect ",
        });
      }
    } else {
      res.json({
        message: "Gmail is not registered",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.offeruser = async (req, res, next) => {
  try {
    let get = await jobpost.find();
    await get.reverse();
    res.json(get);
  } catch (error) {
    console.log(error);
  }
};
exports.applyuser = async (req, res, next) => {
  try {
    let get = await candidate.findById(req.body.did);
    let al = req.body.e;
    let z = 0;
    for (i = 0; i < get.likes.length; i++) {
      if (al === get.likes[i]) {
        z++;
      }
    }
    if (z != 0) {
      res.json({
        message: "Already Applied for this Job",
      });
    } else {
      let put = await candidate.findByIdAndUpdate(req.body.did, {
        $push: {
          likes: req.body.e,
        },
      });
      await put.save();
      res.json({
        message: "Application is sent",
        status: true,
      });
    }

    let putp = await jobpost.findOne({ token: req.body.e });
    await putp.candidates.push(req.body.did);
    await putp.save();
  } catch (error) {
    console.log(error);
  }
};
exports.viewuser = async (req, res, next) => {
  try {
    console.log(req.body);
    let geta = await candidate.findById(req.body.ids);
    let l = geta.likes.length,
      n = -1,
      final = [],
      finals = [],
      get = [];
    for (let i = 0; i < l; i++) {
      get[i] = await jobpost.find({ token: geta.likes[i] });
    }
    for (i = 0; i < l; i++) {
      final[i] = get[i][0];
    }
    final.reverse();

    console.log(final);

    for (i = 0; i < final.length; i++) {
      if (final[i] != undefined) {
        n++;
        finals[n] = final[i];
      }
    }
    console.log(finals);
    res.json({
      finals,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.delapplyuser = async (req, res, next) => {
  try {
    console.log(req.body);
    let put = await candidate.findByIdAndUpdate(req.body.did, {
      $pull: {
        likes: req.body.e,
      },
    });
    await put.save();
    let putp = await jobpost.findOne({ token: req.body.e });
    await putp.candidates.pull(req.body.did);
    await putp.save();
    res.json({
      message: "Withdrawn Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.profileuser = async (req, res, next) => {
  try {
    console.log(req.body);
    let get = await candidate.findById(req.body.ids);
    console.log(get);
    res.json({
      get,
    });
  } catch (error) {
    console.log(error);
  }
};
