const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const errArr = ["Please enter all fields", "Password doesn't match", "Password is too short"]
const registerGET = (req, res) => {
  res.render("register.ejs", {err:""});
};

const registerPOST = async (req, res) => {
  try {
    const { firstname, lastname,email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);

   if (password && password != confirmPassword || password && password.length < 5){
    return res.render("register.ejs", {err:"Password is too short or doesn't match"})
   }else if (password){
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const user = await new User({
      firstname:firstname,
      lastname:lastname,
      email: email,
      password:hashedPassword,
    }).save()
    return res.redirect("/registerSuccess");
  }
  //else{}
    return res.render("register.ejs", {err:"Please entr all fields"})
 // }

  }
  catch(err){
    console.log(err)
    if (err.toString().search("E11000")){
      err = "E11000"
      return res.render("register.ejs", {err:err})
  
    }
    return res.render("register.ejs", {err:err})
  }
}































  /*   let validPassword = false;
    let longEnough = false;
    const salt = await bcrypt.genSalt(10);
    if (password === confirmPassword && password.length > 5) {
       validPassword = true;
    }
    else {
      return res.render("register.ejs",{err:"password error"})
    }
    if (validPassword ===true) {
      const hashedPassword = await bcrypt.hash(password, salt);


      const user = await new User({
        firstname:firstname,
        lastname:lastname,
        email: email,
        password: hashedPassword,
      }).save();

      return res.redirect("/registerSuccess");
    } else {
        
      //console.log(inputLength)
      return res.render("register.ejs",{err:"errArr"})
    }
 
  }
 catch(err){
   console.log(err)
 } */
 
/*     if (password.length >= 5 ) {
      longEnough = true;
    
  }
  else{
  
  return res.render("register.ejs",{err:"Password is too short"})
 }  
    if (password === confirmPassword && longEnough ===true ) {
       validPassword = true; 
     
   }
   else{
   
   return res.render("register.ejs",{err:"Passwords doesn't match"})
  }  
  
  if (validPassword ===true) {
      const hashedPassword = await bcrypt.hash(password, salt);


      const user = await new User({
        firstname:firstname,
        lastname:lastname,
        email: email,
        password: hashedPassword,
      }).save();

      return res.redirect("/registerSuccess");
    } else {
        
      //console.log(inputLength)
      return res.render("register.ejs",{err:errArr})
    }
  } catch (err) {
    console.log(err)
    return res.render("register.ejs",{err:err})
  } */


const regSuccGET = (req,res)=>{
  
 
  res.render("regSuccess.ejs");

 
}

module.exports = {
  registerGET,
  registerPOST,
  regSuccGET
};
