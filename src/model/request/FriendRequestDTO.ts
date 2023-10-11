export default class FriendRequestDTO{
    userId: number;
    friendId: number;

    constructor(uid: number, fid: number){
        this.userId = uid;
        this.friendId= fid;
    }
}