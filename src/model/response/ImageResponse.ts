export default class ImageResponse {
  id: number;
  image: string;
  postId: number;
  pagePostId: number;

  constructor(id: number, image: string, postId: number, pagePostId: number) {
    this.id = id;
    this.image = image;
    this.postId = postId;
    this.pagePostId = pagePostId;
  }
}
