module.exports = `
"""
    An input with all optional fields from Teacher
"""
input TeacherInput {
    _id: ID
    bio: String
    price: String
    area: [Area]!
    schedules: [ScheduleInput]!
}

type Teacher {
    _id: ID!
    "reference a previous user account that has been created"
    user: User!
    bio: String
    price: String
    area: [Area]!
    schedules: [Schedule]!
    subject: String @deprecated(
        reason: "A teacher can have more than one subject that he can teach, so this field will be remove soon. Use 'area' instead."
        )
}
`;