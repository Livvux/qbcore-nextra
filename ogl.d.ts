declare module 'ogl' {
  export class Renderer {
    constructor(options?: any);
    gl: any;
    setSize(width: number, height: number): void;
    render(args: any): void;
  }
  export class Program {
    constructor(gl: any, options: any);
    remove(): void;
  }
  export class Triangle {
    constructor(gl: any);
    remove(): void;
  }
  export class Mesh<T = any> {
    constructor(gl: any, config: any);
    remove(): void;
  }
}
