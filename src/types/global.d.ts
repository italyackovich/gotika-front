export {}

declare namespace DG {
  function map(
    id: string,
    options: {
      center: [number, number];
      zoom: number;
      fullscreenControl?: boolean;
      zoomControl?: boolean;
    }
  ): any;

  function marker(coords: [number, number]): any;
}

