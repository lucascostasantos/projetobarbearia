export const auth = (req, res, next) => {
    if (req.session.logado) {
      next();
    } else {
      return res.redirect("/login")
    }
}