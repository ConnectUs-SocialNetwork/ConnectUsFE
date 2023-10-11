export default class ProcessRequestDTO {
    requestId: number;
    accepted: boolean;
  
    constructor(requestId: number, accepted: boolean) {
      this.requestId = requestId;
      this.accepted = accepted;
    }
  }
  