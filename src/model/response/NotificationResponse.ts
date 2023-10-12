export default class Notification{
    id: number;
    firstname: string;
    lastname: string;
    type: string;
    text: string;
    avatar: string;
    entityId: number;
    dateAndTime: string;
    requestId: number;

    constructor(
        id: number,
        type: string,
        text: string,
        avatar: string,
        entityId: number,
        dateAndTime: string,
        firstname: string,
        lastname: string,
        rid: number,
      ) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.avatar = avatar;
        this.entityId = entityId;
        this.dateAndTime = dateAndTime;
        this.firstname = firstname;
        this.lastname = lastname;
        this.requestId = rid;
      }
}