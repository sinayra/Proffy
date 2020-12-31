module.exports = `

input ScheduleInput {
    _id: ID
    weekday: Weekday!
    from: Time!
    to: Time!
}

type Schedule {
    _id: ID!
    "reference a previous teacher account that has been created"
    teacher: Teacher!
    weekday: Weekday
    from: Time
    to: Time
}
`;