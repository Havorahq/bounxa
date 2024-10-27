// 
export type EventType = {
  id: string,
  address?: string,
  created_at: string,
  host: string,
  host_name: string
  location: string
  start_date: string
  capacity: string | null,
  end_date: string
  description: string
  type: string,
  timezone: string,
  name: string,
  price: number | null,
  timezone_utc: string | null
  blockchain_address: string | null
  chain: string | null,
  image_url: string | null,
}