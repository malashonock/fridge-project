export class FileWithUrl extends File {
  public url: string;

  public constructor(file: File, url?: string) {
    super([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
    this.url = url || URL.createObjectURL(this);
  }

  public onDestroy(): void {
    URL.revokeObjectURL(this.url);
  }
}
