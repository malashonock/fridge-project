export class FileWithUrl extends File {
  public clientUrl: string;

  public constructor(file: File, public serverUrl?: string) {
    super([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
    this.clientUrl = URL.createObjectURL(this);
  }

  public destroy(): void {
    URL.revokeObjectURL(this.clientUrl);
  }
}
