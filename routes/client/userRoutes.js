const express = require('express');
const router = express.Router();
const userController = require("../../controller/client/userController")
const auth = require("../../middleware/auth");
router.route("/client/api/v1/user/create").post(userController.addUser);
router.route("/client/api/v1/user/list").post(auth(...[ 'getAllByUserInClientPlatform' ]),userController.findAllUser);
router.route("/client/api/v1/user/:id").get(auth(...[ 'getByUserInClientPlatform' ]),userController.getUser);
router.route("/client/api/v1/user/count").post(auth(...[ 'getCountByUserInClientPlatform' ]),userController.getUserCount);
router.route("/client/api/v1/user/aggregate").post(auth(...[ 'aggregateByUserInClientPlatform' ]),userController.getUserByAggregate);
router.route("/client/api/v1/user/update/:id").put(auth(...[ 'updateByUserInClientPlatform' ]),userController.updateUser);    
router.route("/client/api/v1/user/partial-update/:id").put(auth(...[ 'partialUpdateByUserInClientPlatform' ]),userController.partialUpdateUser);
router.route("/client/api/v1/user/softDelete/:id").put(auth(...[ 'softDeleteByUserInClientPlatform' ]),userController.softDeleteUser);
router.route("/client/api/v1/user/addBulk").post(userController.bulkInsertUser);
router.route("/client/api/v1/user/updateBulk").put(auth(...[ 'updateBulkByUserInClientPlatform' ]),userController.bulkUpdateUser);
router.route("/client/api/v1/user/delete/:id").delete(auth(...[ 'deleteByUserInClientPlatform' ]),userController.deleteUser);
router.route("/client/api/v1/user/change-password").put(auth(...[ 'changePasswordByUserInClientPlatform' ]),userController.changePassword);

module.exports = router;
