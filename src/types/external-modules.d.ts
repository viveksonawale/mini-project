declare module "html2canvas" {
  export interface Options {
    scale?: number;
    useCORS?: boolean;
    backgroundColor?: string | null;
  }

  export default function html2canvas(element: HTMLElement, options?: Options): Promise<HTMLCanvasElement>;
}

declare module "jspdf" {
  export class jsPDF {
    constructor(options?: {
      orientation?: "portrait" | "landscape";
      unit?: "pt" | "mm" | "cm" | "in" | "px";
      format?: [number, number] | string;
    });

    addImage(
      imageData: string,
      format: "PNG" | "JPEG" | "WEBP",
      x: number,
      y: number,
      width: number,
      height: number,
    ): void;

    save(filename: string): void;
  }
}