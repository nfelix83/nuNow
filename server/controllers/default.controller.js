module.exports = {
  default: function (req, res, next) {
      res.sendFile(../../client/index.html);
  }
};
