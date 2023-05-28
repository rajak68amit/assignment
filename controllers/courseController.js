const { course, group, categories } = require('../models');
const statusCodes = require('../utils/responseCode');
const {catcherrHandler, successHandler } = require('../middleware/validation-middleware');
module.exports = {

    async course(req, res) {
        try {

            let coursedata = await course.findAll({ attributes: ['courseId', 'categoryId', 'courseName', 'courseDescription'] });
            const data = { msg: "courses Lists!", statusCodes: statusCodes.ok, success: true, data: coursedata }
            successHandler(res, data);
        } catch (error) {

            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async group(req, res) {
        try {

            let coursedata = await group.findAll({ attributes: [['id', 'groupId'], 'name', 'GroupDescription', 'NumberOfUsers', 'Rules', 'categoryId'] });
            const data = { msg: "Group Lists!", statusCodes: statusCodes.ok, success: true, data: coursedata }
            successHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    },
    async groupcours(req, res) {
        try {
            let coursedata = await group.findAll({
                attributes: [['id', 'groupId'], 'name', 'GroupDescription', 'NumberOfUsers', 'Rules', 'categoryId'],
                where: { id: req.params.id },
                include: [{
                    attributes: ["name", "categoryId"],
                    model: categories,
                    include: [
                        {
                            model: course,
                            attributes: ['courseId', 'courseName', 'courseDescription']
                        }
                    ]

                }]
            });

            const data = { msg: "Group Lists!", statusCodes: statusCodes.ok, success: true, data: coursedata }
            successHandler(res, data);
        } catch (error) {
            const data = { statusCodes: statusCodes.Internalservererror, error: error.message, msg: "Something went wrong!", success: false }
            catcherrHandler(res, data)
        }
    }

}
