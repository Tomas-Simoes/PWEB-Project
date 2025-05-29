
exports.checkRole = (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== "Cliente") {
        return res.status(403).json({ erro: "O Utilizador não possui a role de cliente"});
    }

    next();
}