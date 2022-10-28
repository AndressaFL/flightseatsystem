exports.current_user = (req, res) => {
  const user = req.user;
  return res.json({ id: user.id, name: user.name });
};