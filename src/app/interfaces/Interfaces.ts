
export interface Selection{
    winetype: number;
    region: number;
}

export interface ShopcartLine{
    id: number;
    name: string;
    qty: number;
    price: number;
}

export interface Wine{
    id: number;
    name: string;
    subtitle: string;
    winetype: string;
    year: number;
    region: string;
    qty: number;
    pricesell: number;
    photobottle: string;
    producer: string;
    packing: string;
    soil: string;
    tasting: string;
    grapescoll: string;
    oenologiste: string;
    obs: string;
    alcohol: number;
    active: number;
}
