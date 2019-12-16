export class Property {
  constructor(
    public register: string,
    public area: number,
    public name: string,
    public city: string,
    public citybbox: string,
    public bbox: string,
    public latLong: string[],
    public indigenousLand: string,
    public conservationUnit: string,
    public legalReserve: string,
    public app: string,
    public consolidatedArea: string,
    public anthropizedUse: string,
    public nativeVegetation: string,
    public owner: string,
    public cpf?: string,
    public county?: string,
    public prodesArea?: number,
    public burningSpotlights?: [],
    public burnedAreas?: [],
    public deter?: [],
    public prodesYear?: string[],
    public deterYear?: string[],
    public spotlightsYear?: [],
    // public prodesInfo?: []
  ) {}
}
