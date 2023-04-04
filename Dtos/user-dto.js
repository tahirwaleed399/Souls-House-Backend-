class UserDto {
    id;
    email;
    activated;
    createdAt;
    profile;
    name ;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
        this.profile = user.profile;
        this.name = user.name;
    }
}
module.exports = UserDto;