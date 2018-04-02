module.exports = {
    getGroupById: function (Group, req, res) {
        Group.getGroupById(req.params.groupId, function (err, group) {
            if (err)
                throw err;

            res.json(group);
        });
    },
    createGroup: function (Group, req, res) {
        Group.createGroup(req.body, function (err, group) {
            if (err)
                throw err;

            res.json(group);
            // TODO - set group ids in respective members
        });
    }
}