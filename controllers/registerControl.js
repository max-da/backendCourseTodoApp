const bcrypt = require("bcrypt");
const User = require("../models/userSchema");


const registerGET = (req, res) => {
  res.render("register.ejs", { err: "" });
};
//Errorhantering, var tvungen att göra custom-errorhantering ist för med model först pga jag har två passwords, 
//Samt om man hashar lösenordet utan egen validation kommer ett tomt lösenordhashas och då tror modeln att 
//längden är uppfylld 
//matchar lösenorden hashas lösenordet och man sparas i databasen 
const registerPOST = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);

    if (
      (password && password != confirmPassword) ||
      (password && password.length < 5)
    ) {
      return res.render("register.ejs", {
        err: "Password is too short or doesn't match",
      });
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      }).save();
      return res.redirect("/success");
    }

    return res.render("register.ejs", { err: "Please enter all fields" });
  } catch (err) {
    console.log(err);
    if (err.toString().search("E11000")) {
      err = "E11000";
      return res.render("register.ejs", { err: err });
    }
    return res.render("register.ejs", { err: err });
  }
};
//Kollar specifikt efter E11000 vilet är mongoose-errorkod, om man försöker lägga till något i databasen som är unikt
//Så man får custom-error om man försöker registrera sig med en mail som redan är registreard


const regSuccGET = (req, res) => {
  res.render("regSuccess.ejs");
};

module.exports = {
  registerGET,
  registerPOST,
  regSuccGET,
};
