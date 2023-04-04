class RoomDto {
    id;
    speakers;
    owner;
    type;
    topic;
    createdAt;

    constructor(room) {
        this.id = room._id;
        this.speakers = room.speakers;
        this.owner = room.owner;
        this.type = room.type;
        this.topic = room.topic;
        this.createdAt = room.createdAt;
       
    }
}
module.exports = RoomDto;