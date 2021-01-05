const auth = require('../util/auth');

module.exports = {
    signup: async (parent, { account }, { dataSources, res, user }, info) => {

        if (user) {
            return {
                code: 400,
                success: false,
                message: "You must logout before creating a new account",
            }
        }

        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (existingUser) {
            return {
                code: 400,
                success: false,
                message: "A user account with this email already exists",
            }
        }

        if (account.role === 'ADMIN') {
            return {
                code: 403,
                success: false,
                message: "Cannot creates an admin account via client.",
            }
        }

        const newUser = await dataSources.userAPI.addUser(account);

        if (account.role === 'STUDENT') {
            await dataSources.studentAPI.addStudent(newUser);
        }
        else if (account.role === 'TEACHER') {
            await dataSources.teacherAPI.addTeacher(newUser)
        }

        const token = auth.createToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
        });

        return {
            code: 201,
            success: true,
            message: "New user has been created",
            user: newUser
        }
    },

    logout: async (parent, args, { dataSources, res }, info) => {
        res.clearCookie("token");
        return {
            code: 204,
            success: true,
            message: "User has been logged out",
            user: undefined,
        };
    },

    login: async (parent, { account }, { dataSources, res }, info) => {
        const existingUser = await dataSources.userAPI.getUserByEmail(account.email.toLowerCase());

        if (!existingUser) {
            return {
                code: 404,
                success: false,
                message: "Incorrect email address or password.",
            }
        }

        const isValidPassword = auth.verifyPassword(
            account.password,
            existingUser.hash
        );

        if (!isValidPassword) {
            return {
                code: 404,
                success: false,
                message: "Incorrect email address or password.",
            }
        }

        const token = auth.createToken(existingUser);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
        });

        return {
            code: 200,
            success: true,
            message: "User has been logged in",
            user: existingUser
        }
    },

    updateUser: async (parent, { userInput }, { dataSources, user }, info) => {
        let userId = null;

        if (user.role === "ADMIN") {
            userId = (userInput._id ? userInput._id : user._id);
        } else {
            userId = user._id;
        }

        let existingUser = await dataSources.userAPI.getUserById(userId);

        if (existingUser) {

            return {
                code: 200,
                success: true,
                message: "User has been updated",
                user: await dataSources.userAPI.updateUser(userId, userInput)
            }
        }

        return {
            code: 404,
            success: false,
            message: "User not found",
        }
    },

    updateTeacher: async (parent, { teacherInput }, { dataSources, user }, info) => {
        let teacherBefore = null;

        if (user.role === "TEACHER") {
            teacherBefore = await dataSources.teacherAPI.getTeacherByUser(user);
        }
        else {
            if (!teacherInput._id) {
                return {
                    code: 412,
                    success: false,
                    message: "Missing required field: teacherInput._id",
                }
            }
            teacherBefore = await dataSources.teacherAPI.getTeacherById(teacherInput._id);
        }

        if (teacherBefore) {
            let { schedules, ...data } = teacherInput;

            const waitForSchedules = async () => {
                return Promise.all(schedules.map(async (schedule) => {
                    let newSchedule;
                    if (schedule._id) {
                        newSchedule = await dataSources.scheduleAPI.updateSchedule(schedule._id, schedule);
                    }
                    else {
                        newSchedule = await dataSources.scheduleAPI.addSchedule(teacherBefore._id, schedule);
                    }

                    return newSchedule._id;
                }));
            }

            data.schedule_ids = await waitForSchedules();

            const removeSchedules = teacherBefore.schedule_ids.filter((elem) => !data.schedule_ids.includes(elem));
            removeSchedules.forEach(async (id) => await dataSources.scheduleAPI.deleteSchedule(id));

            return {
                code: 200,
                success: true,
                message: "Teacher has been updated",
                teacher: await dataSources.teacherAPI.updateTeacher(teacherBefore._id, data)
            }
        }

        return {
            code: 404,
            success: false,
            message: "Teacher not found",
        }

    },

    toogleFavoriteTeacher: async (parent, { teacherId, studentId }, { dataSources, user }, info) => {
        let existingStudentId = null;
        let student;

        if (user.role === 'STUDENT') {
            student = await dataSources.studentAPI.getStudentById(user._id);

        }
        else {
            if (!studentId) {
                return {
                    code: 412,
                    success: false,
                    message: "Missing required field: studentId",
                }

            }
            student = await dataSources.studentAPI.getStudentById(studentId);
        }

        existingStudentId = student ? student._id : null;

        if (existingStudentId) {
            return {
                code: 200,
                success: true,
                message: "Student has been updated",
                student: await dataSources.studentAPI.toogleFavoriteTeacher(existingStudentId, teacherId)
            }

        }

        return {
            code: 404,
            success: false,
            message: "Student not found",
        }

    },

    addTeacherStudentConnection: async (parent, { teacherId, studentId }, { dataSources, user }, info) => {
        let existingStudentId = null;
        let student;

        if (user.role === 'STUDENT') {
            student = await dataSources.studentAPI.getStudentById(user._id);

        }
        else {
            if (!studentId) {
                return {
                    code: 412,
                    success: false,
                    message: "Missing required field: studentId",
                }
            }
            student = await dataSources.studentAPI.getStudentById(studentId);
        }

        existingStudentId = student ? student._id : null;

        if (existingStudentId) {
            return {
                code: 200,
                success: true,
                message: "Student has been updated",
                student: await dataSources.studentAPI.addTeacherStudentConnection(existingStudentId, teacherId)
            }
        }

        return {
            code: 404,
            success: false,
            message: "Student not found",
        }

    }
};