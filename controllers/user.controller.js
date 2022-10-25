exports.current_user = (req, res) => {
  const user = req.user;
  return res.json({ name: user.name });
};
