// 
export type EventType = {
  id: string,
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
  price: string | null,
}