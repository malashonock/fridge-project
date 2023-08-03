export class FileWithUrl extends File {
  public url: string;

  public constructor(
    fileBits: BlobPart[],
    fileName: string,
    options?: FilePropertyBag | undefined
  ) {
    super(fileBits, fileName, options);
    this.url = URL.createObjectURL(this);
  }

  public onDestroy(): void {
    URL.revokeObjectURL(this.url);
  }
}
