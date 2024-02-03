export class LowcodeResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;

  private encoder = new TextEncoder();

  private stream: ReadableStream<Uint8Array>;

  constructor() {
    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
      },
    });
  }

  public close() {
    this.controller.close();
  }

  public pushData(chunk: string) {
    this.controller.enqueue(this.encoder.encode(chunk));
  }

  getResponse() {
    return new Response(this.stream);
  }
}
