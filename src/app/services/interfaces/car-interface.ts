export interface Car {
  id: number

  teamID: number
  brand: string
  model: string
  type: string
  color: string
  sellPrice: number
  rentPrice: number
  mainImage: string
  hasConditioner: boolean
  images: string[]
  capacity: number[]
  pledge: number
  priceMonth: number
  sumPerDay: string
  totalSum: number
  model_id: number

  group: string
  code: string
  year: number
  doors: number
  seats: number
  transmission: string
  safety_money: number

  fuel: string
  engine_size: string

  chassisNumber: string
  fuelType: string
  gearbox: string
  selfrisk: number


  fuel_consumption: string
  LVnumber: string
  REGnumber: string

  TA: Date
  OCTA: Date
  KASKO: Date
  APKOPE: Date
}
